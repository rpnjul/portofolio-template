# Deployment Guide - Satria.me Portfolio

Panduan lengkap untuk deploy aplikasi Next.js + MongoDB ke VPS Ubuntu menggunakan Docker.

## Prerequisites

### Di Local Machine:
- Git sudah terinstall
- Repository sudah di-push ke GitHub/GitLab

### Di VPS Ubuntu 22.04:
- SSH access ke VPS
- Domain sudah di-pointing ke IP VPS
- Root atau sudo access

---

## 1. Setup VPS Ubuntu

### 1.1 Login ke VPS
```bash
ssh root@your-vps-ip
```

### 1.2 Update System
```bash
apt update && apt upgrade -y
```

### 1.3 Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start Docker service
systemctl start docker
systemctl enable docker

# Verify installation
docker --version
```

### 1.4 Install Docker Compose
```bash
# Install Docker Compose
apt install docker-compose -y

# Verify installation
docker-compose --version
```

### 1.5 Install Git
```bash
apt install git -y
```

---

## 2. Clone Repository

```bash
# Navigate to desired directory
cd /opt

# Clone your repository
git clone https://github.com/yourusername/satria-web.git

# Navigate to project directory
cd satria-web
```

---

## 3. Configure Environment Variables

### 3.1 Create .env file
```bash
cp .env.example .env
nano .env
```

### 3.2 Update .env dengan nilai yang sesuai:
```env
# MongoDB Configuration
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=StrongPassword123!@#
MONGODB_URI=mongodb://admin:StrongPassword123!@#@mongodb:27017
DB_NAME=satriame

# Auto Migration & Seeding
AUTO_MIGRATE=true
AUTO_SEED=true

# Default Admin User
DEFAULT_ADMIN_USERNAME=satria
DEFAULT_ADMIN_PASSWORD=YourSecureAdminPass123!
DEFAULT_ADMIN_NAME=Satria Aprilian

# JWT Secret (generate dengan: openssl rand -base64 32)
JWT_SECRET=your-generated-jwt-secret-here

# Application URL
NEXT_PUBLIC_BASE_URL=https://satria.me

# Node Environment
NODE_ENV=production
```

**PENTING:**
- Ganti semua password dengan password yang kuat
- Generate JWT_SECRET dengan: `openssl rand -base64 32`
- Ganti `yourdomain.com` dengan domain Anda yang sebenarnya

### 3.3 Update Nginx Configuration
```bash
nano nginx/nginx.conf
```

Ganti `yourdomain.com` dengan domain Anda di semua tempat:
- `server_name yourdomain.com www.yourdomain.com;`
- Path SSL certificate sesuai domain Anda

---

## 4. Setup SSL Certificate (HTTPS)

### 4.1 Install Certbot
```bash
apt install certbot -y
```

### 4.2 Get SSL Certificate (Sebelum run Docker)
```bash
# Stop nginx jika sedang running
systemctl stop nginx 2>/dev/null || true

# Get certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificate akan disimpan di: /etc/letsencrypt/live/yourdomain.com/
```

### 4.3 Copy Certificates ke Project
```bash
mkdir -p nginx/ssl
cp -r /etc/letsencrypt/live/yourdomain.com nginx/ssl/live/
cp -r /etc/letsencrypt/archive/yourdomain.com nginx/ssl/archive/
```

**ATAU** untuk development tanpa SSL:

Edit `docker-compose.yml` dan comment out service `nginx` dan `certbot`:
```yaml
# Uncomment ini untuk development tanpa SSL
# services:
#   nginx:
#   certbot:
```

Lalu akses aplikasi langsung via port 3000: `http://your-ip:3000`

---

## 5. Build & Run Docker Containers

### 5.1 Build Images
```bash
docker-compose build
```

### 5.2 Start Services
```bash
# Start in detached mode
docker-compose up -d

# Or start with logs visible
docker-compose up
```

### 5.3 Check Running Containers
```bash
docker-compose ps
```

Output seharusnya:
```
NAME                   STATUS    PORTS
satriame-app           Up        0.0.0.0:3000->3000/tcp
satriame-mongodb       Up        0.0.0.0:27017->27017/tcp
satriame-nginx         Up        0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

---

## 6. Verify Deployment

### 6.1 Check Application Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mongodb
docker-compose logs -f nginx
```

### 6.2 Test Application
```bash
# Test HTTP (should redirect to HTTPS)
curl http://yourdomain.com

# Test HTTPS
curl https://yourdomain.com

# Test API
curl https://yourdomain.com/api/posts
```

### 6.3 Access Website
Open browser: `https://yourdomain.com`

### 6.4 Login ke Dashboard
1. Go to: `https://yourdomain.com/masuk`
2. Username: `satria` (atau sesuai DEFAULT_ADMIN_USERNAME)
3. Password: Sesuai DEFAULT_ADMIN_PASSWORD di .env

---

## 7. Useful Commands

### 7.1 Docker Management
```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (WARNING: deletes database!)
docker-compose down -v

# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart app

# View logs
docker-compose logs -f app

# Execute command in container
docker-compose exec app sh
docker-compose exec mongodb mongosh
```

### 7.2 Database Management
```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p YourMongoPassword

# Inside mongosh:
use satriame
db.posts.find()
db.users.find()
```

### 7.3 Update Application
```bash
# Pull latest code
cd /opt/satria-web
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Or use this one-liner
git pull && docker-compose down && docker-compose build && docker-compose up -d
```

---

## 8. Firewall Configuration (UFW)

```bash
# Enable UFW
ufw enable

# Allow SSH (IMPORTANT: do this first!)
ufw allow 22/tcp

# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Check status
ufw status
```

---

## 9. Setup Auto-Renewal SSL Certificate

### 9.1 Create Renewal Script
```bash
nano /opt/renew-ssl.sh
```

Content:
```bash
#!/bin/bash
certbot renew --quiet
cp -r /etc/letsencrypt/live/yourdomain.com /opt/satria-web/nginx/ssl/live/
docker-compose -f /opt/satria-web/docker-compose.yml restart nginx
```

### 9.2 Make Executable
```bash
chmod +x /opt/renew-ssl.sh
```

### 9.3 Add to Crontab
```bash
crontab -e
```

Add this line:
```
0 0 * * 0 /opt/renew-ssl.sh
```

---

## 10. Monitoring

### 10.1 Check Disk Space
```bash
df -h
```

### 10.2 Check Container Resources
```bash
docker stats
```

### 10.3 Check Application Health
```bash
curl https://yourdomain.com
```

---

## 11. Backup Strategy

### 11.1 Backup MongoDB
```bash
# Create backup directory
mkdir -p /opt/backups

# Backup database
docker-compose exec -T mongodb mongodump --username admin --password YourPassword --authenticationDatabase admin --out /data/backup

# Copy to host
docker cp satriame-mongodb:/data/backup /opt/backups/mongodb-$(date +%Y%m%d)
```

### 11.2 Restore MongoDB
```bash
docker-compose exec -T mongodb mongorestore --username admin --password YourPassword --authenticationDatabase admin /data/backup
```

### 11.3 Automated Backup Script
```bash
nano /opt/backup-db.sh
```

Content:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
mkdir -p $BACKUP_DIR

docker-compose -f /opt/satria-web/docker-compose.yml exec -T mongodb \
  mongodump --username admin --password YourPassword --authenticationDatabase admin --out /data/backup

docker cp satriame-mongodb:/data/backup $BACKUP_DIR/mongodb-$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "mongodb-*" -mtime +7 -exec rm -rf {} \;
```

Make executable and add to crontab:
```bash
chmod +x /opt/backup-db.sh
crontab -e
# Add: 0 2 * * * /opt/backup-db.sh
```

---

## 12. Troubleshooting

### 12.1 Container Not Starting
```bash
# Check logs
docker-compose logs app

# Check container status
docker-compose ps

# Restart specific service
docker-compose restart app
```

### 12.2 MongoDB Connection Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Check if MongoDB is healthy
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

### 12.3 Nginx Not Working
```bash
# Check nginx logs
docker-compose logs nginx

# Test nginx configuration
docker-compose exec nginx nginx -t

# Reload nginx
docker-compose exec nginx nginx -s reload
```

### 12.4 Port Already in Use
```bash
# Check what's using port
lsof -i :80
lsof -i :443
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

### 12.5 SSL Certificate Issues
```bash
# Check certificate
certbot certificates

# Renew manually
certbot renew --force-renewal

# Update nginx with new cert
cp -r /etc/letsencrypt/live/yourdomain.com /opt/satria-web/nginx/ssl/live/
docker-compose restart nginx
```

---

## 13. Performance Optimization

### 13.1 Enable Docker Logging Rotation
```bash
nano /etc/docker/daemon.json
```

Add:
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Restart Docker:
```bash
systemctl restart docker
```

### 13.2 Resource Limits
Edit `docker-compose.yml` to add resource limits:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

---

## 14. Security Best Practices

1. **Never commit .env file to Git**
2. **Use strong passwords** for all services
3. **Enable firewall (UFW)**
4. **Keep system updated**: `apt update && apt upgrade`
5. **Enable fail2ban** for SSH protection
6. **Regular backups** of database
7. **Monitor logs** regularly
8. **Use SSL/HTTPS** always

---

## Quick Reference

### Start Application
```bash
cd /opt/satria-web
docker-compose up -d
```

### Stop Application
```bash
docker-compose down
```

### Update Application
```bash
git pull && docker-compose down && docker-compose build && docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Backup Database
```bash
/opt/backup-db.sh
```

---

## Support

Jika ada masalah, cek:
1. Container logs: `docker-compose logs -f`
2. System resources: `docker stats`
3. Disk space: `df -h`
4. Firewall: `ufw status`

---

**Last Updated:** 2024
**Application:** Satria.me Portfolio
**Stack:** Next.js 15 + MongoDB + Docker + Nginx
