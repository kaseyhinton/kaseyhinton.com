# Alpine

##### Complete Setup Guide: Cryptgeon with Caddy on Alpine Linux
##### Prerequisites
- Fresh Alpine Linux VPS/VM
- Root or sudo access
- Domain name pointed to your server IP

##### Update the Alpine Linux system
```bash
# Update package list and upgrade system
apk update && apk upgrade
```

##### Install Docker & Docker Compose
```bash
# Install Docker
sudo apk add docker

# Start Docker service
sudo rc-service docker start
sudo rc-update add docker boot
```

```bash
# Install docker-compose
sudo apk add docker-compose

# Verify installation
docker --version
docker compose --version
```

##### Firewall Setup using iptables
```bash
# Install iptables if not present
sudo apk add iptables

# Allow SSH (port 22) - VERY IMPORTANT!
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP and HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Set default policies
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# Allow loopback
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A OUTPUT -o lo -j ACCEPT

# Allow established connections
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Save iptables rules (if using persistent iptables)
sudo apk add iptables-legacy
sudo rc-service iptables save
sudo rc-update add iptables
```

##### UFW setup
```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status verbose
```

##### Create Project Directory
```bash
# Create project directory
mkdir ~/cryptgeon && cd ~/cryptgeon
```

##### Create docker-compose.yml:
```yaml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    command: redis-server --save "" --appendonly no
    tmpfs:
      - /data
    networks:
      - app-network

  app:
    image: cupcakearmy/cryptgeon:latest
    depends_on:
      - redis
    environment:
      SIZE_LIMIT: 4 MiB
    networks:
      - app-network

  caddy:
    image: caddy:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - app
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge

volumes:
  caddy_data:
  caddy_config:
```

##### Create Caddyfile (no extension):
```text
myapp.com {
    reverse_proxy app:8000
    
    # Security headers
    header {
        Strict-Transport-Security "max-age=63072000"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
        -Server
    }
}
```

##### Deploy the Application
```bash
# Deploy the stack
docker compose up -d

# Check if all services are running
docker compose ps

# View logs to ensure everything started correctly
docker compose logs -f
```

##### Verify services are running
```bash
docker compose ps
```


##### Maintenance Commands

```bash
# Stop the application
docker compose down

# Start the application
docker compose up -d

# Update the application
docker compose pull
docker compose up -d

# View logs
# All services
docker compose logs

# Specific service
docker compose logs caddy
docker compose logs app
```