# SSL Certificate Troubleshooting Guide

## Error: Certbot Failed to Authenticate

**Error Message:**
```
The Certificate Authority failed to download the challenge files from the temporary
standalone webserver started by Certbot on port 80.
```

## Diagnosis Steps

### 1. Check if Port 80 is Already in Use

```bash
# Check what's using port 80
sudo lsof -i :80
# Or
sudo netstat -tulpn | grep :80
# Or
sudo ss -tulpn | grep :80
```

**If something is using port 80:**
```bash
# Stop the service (example: nginx, apache)
sudo systemctl stop nginx
sudo systemctl stop apache2

# Then retry certbot
```

### 2. Check Firewall (UFW)

```bash
# Check UFW status
sudo ufw status

# If UFW is active, ensure port 80 is allowed
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Reload UFW
sudo ufw reload
```

### 3. Check Cloud Provider Firewall/Security Groups

**PENTING:** Jika VPS dari cloud provider (DigitalOcean, AWS, Google Cloud, etc), cek di dashboard web mereka:

- **AWS EC2**: Security Groups → Inbound Rules → Allow HTTP (80) and HTTPS (443)
- **DigitalOcean**: Networking → Firewall → Add Inbound Rules for ports 80, 443
- **Google Cloud**: VPC Network → Firewall Rules → Create rule for tcp:80,443
- **Azure**: Network Security Group → Inbound security rules
- **Vultr/Linode**: Firewall settings in control panel

**Harus allow:**
- Port 80 (HTTP) from 0.0.0.0/0 (anywhere)
- Port 443 (HTTPS) from 0.0.0.0/0 (anywhere)

### 4. Verify DNS is Pointing Correctly

```bash
# Check DNS resolution
dig satria.me
dig www.satria.me

# Or use nslookup
nslookup satria.me
nslookup www.satria.me

# Should return your VPS IP address
```

**Wait for DNS propagation:**
- DNS changes can take 1-48 hours to propagate
- Use https://dnschecker.org to check global propagation
- Test: `ping satria.me` should return your VPS IP

### 5. Test Port 80 Accessibility from Internet

```bash
# Start a simple test server on port 80
sudo python3 -m http.server 80

# Then from another computer/phone (not VPS), browse to:
# http://satria.me
# http://www.satria.me

# Should see directory listing or "Directory listing" page
# Press Ctrl+C to stop the test server
```

## Solutions

### Solution 1: Stop Services Using Port 80

```bash
# Stop nginx if running
sudo systemctl stop nginx
sudo systemctl status nginx

# Stop apache if running
sudo systemctl stop apache2

# Kill any process on port 80
sudo lsof -ti:80 | xargs sudo kill -9

# Retry certbot
sudo certbot certonly --standalone -d satria.me -d www.satria.me
```

### Solution 2: Use Webroot Method (if you have nginx running)

If you want to keep nginx running:

```bash
# Create webroot directory
sudo mkdir -p /var/www/certbot

# Get certificate using webroot
sudo certbot certonly --webroot -w /var/www/certbot -d satria.me -d www.satria.me
```

But first, update your nginx config to serve the challenge:

```nginx
server {
    listen 80;
    server_name satria.me www.satria.me;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
```

### Solution 3: Use DNS Challenge (Alternative to HTTP)

```bash
# Install DNS plugin (example for Cloudflare)
sudo apt install python3-certbot-dns-cloudflare

# Get certificate using DNS challenge
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /path/to/cloudflare.ini -d satria.me -d www.satria.me
```

### Solution 4: Deploy Without SSL First (Development)

For testing purposes, you can deploy without SSL first:

#### Edit docker-compose.yml

```bash
cd /opt/satria-web
nano docker-compose.yml
```

**Comment out or remove nginx and certbot services:**

```yaml
services:
  mongodb:
    # ... keep as is

  app:
    # ... keep as is
    ports:
      - "3000:3000"  # Make sure this is exposed

  # Comment out these services:
  # nginx:
  #   ...
  # certbot:
  #   ...
```

Then deploy:

```bash
docker-compose up -d
```

Access via: `http://your-vps-ip:3000` or `http://satria.me:3000`

## Recommended Fix for Your Situation

Based on the error, try this sequence:

### Step 1: Check and Fix Firewall

```bash
# Check if port 80 is blocked
sudo ufw status

# If active, allow port 80
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

### Step 2: Check Cloud Provider Firewall

**GO TO YOUR VPS PROVIDER DASHBOARD** and ensure ports 80 and 443 are open in the firewall/security group.

### Step 3: Verify DNS

```bash
# Check if DNS is pointing to your VPS
dig satria.me +short
# Should return your VPS IP (202.74.75.145)
```

If not correct, wait for DNS propagation.

### Step 4: Test Port 80 Reachability

```bash
# Stop any service on port 80
sudo systemctl stop nginx 2>/dev/null || true
sudo systemctl stop apache2 2>/dev/null || true

# Start test server
sudo python3 -m http.server 80
```

From your local computer, visit: `http://satria.me` and `http://www.satria.me`

If you can't access it, the problem is:
- ❌ Cloud provider firewall blocking port 80
- ❌ DNS not pointing correctly
- ❌ ISP blocking port 80 (rare)

If you CAN access it:
- ✅ Port 80 is reachable
- ✅ Proceed with certbot

### Step 5: Get Certificate

```bash
# Stop test server (Ctrl+C)

# Ensure nothing is on port 80
sudo lsof -i :80

# Get certificate
sudo certbot certonly --standalone -d satria.me -d www.satria.me

# Follow prompts:
# - Enter email
# - Agree to terms
# - Wait for validation
```

### Step 6: Copy Certificates to Project

```bash
cd /opt/satria-web

# Create SSL directory
mkdir -p nginx/ssl

# Copy certificates
sudo cp -r /etc/letsencrypt/live nginx/ssl/
sudo cp -r /etc/letsencrypt/archive nginx/ssl/

# Fix permissions
sudo chown -R $USER:$USER nginx/ssl
```

### Step 7: Update Nginx Config

```bash
nano nginx/nginx.conf
```

Ensure paths are correct:
```nginx
ssl_certificate /etc/nginx/ssl/live/satria.me/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/live/satria.me/privkey.pem;
```

### Step 8: Deploy with Docker

```bash
docker-compose build
docker-compose up -d
```

## Quick Deploy Without SSL (Temporary Solution)

If SSL setup is too complex right now, deploy without it:

1. **Edit docker-compose.yml** - comment out nginx and certbot
2. **Run:** `docker-compose up -d`
3. **Access:** `http://satria.me:3000`
4. **Add SSL later** when you have more time

## Common Issues

### Issue: DNS Not Propagated
**Solution:** Wait 1-24 hours for DNS propagation

### Issue: Cloud Firewall Blocking
**Solution:** Check provider dashboard and open ports 80, 443

### Issue: Port 80 Already in Use
**Solution:** `sudo lsof -ti:80 | xargs sudo kill -9`

### Issue: UFW Blocking
**Solution:** `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`

## Need Help?

1. Check what's on port 80: `sudo lsof -i :80`
2. Check firewall: `sudo ufw status`
3. Check DNS: `dig satria.me +short`
4. Test accessibility: `curl -I http://satria.me`

Send me the output of these commands for further troubleshooting.
