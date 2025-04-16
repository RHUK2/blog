iex "Remove-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' ";

netsh interface portproxy show v4tov4
netsh interface portproxy reset ipv4
