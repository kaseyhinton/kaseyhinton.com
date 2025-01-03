# C#

## Simple server watch program

[JS Alternate Example](js.md#simple-server-watch-program)

Program.cs

```csharp
using System.Net;
using System.Net.Sockets;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var app = builder.Build();

        Dictionary<IPAddress, IpAddressCacheResult> IpAddressCache =
            new Dictionary<IPAddress, IpAddressCacheResult>();

        app.MapGet("/server/{ipaddress}", (string ipaddress) =>
        {
            try
            {
                var addresses = Dns.GetHostAddresses(ipaddress);
                if (!addresses.Any())
                    return "Error";

                if (IpAddressCache.ContainsKey(addresses[0]) && DateTime.Now - IpAddressCache[addresses[0]].LastPingDate < TimeSpan.FromSeconds(60))
                    return IpAddressCache[addresses[0]].Status;
                else if (IpAddressCache.ContainsKey(addresses[0]))
                    IpAddressCache.Remove(addresses[0]);

                IPEndPoint ipep = new IPEndPoint(addresses[0], 80);
                Socket server = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                server.Connect(ipep);

                string status = server.Connected ? "Online" : "Offline";

                IpAddressCache.Add(addresses[0], new IpAddressCacheResult
                {
                    LastPingDate = DateTime.Now,
                    Status = status
                });

                return status;
            }
            catch (Exception)
            {
                return "Error";
            }
        });

        app.Run($"http://localhost:4000");
    }
}

class IpAddressCacheResult
{
    public string? Status { get; set; }
    public DateTime LastPingDate { get; set; }
}
```

## Visual Studio invalid certificate on localhost

Some helpful commands for redoing the localhost certificate flow in .net core
from here [Docs](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-dev-certs)

Package manager console

```bash
dotnet dev-certs https --clean
dotnet dev-certs https --trust
dotnet dev-certs https --check
```

Microsoft edge still saying certificate error when making the HTTP requests

- [ ] Open this URL in edge://flags
- [ ] Search localhost
- [ ] Enable - allow invalid certificates for resources loaded from localhost
- [ ] Restart Edge
