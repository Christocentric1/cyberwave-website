# CyberWave Security Backend - IONOS Deployment Guide

This guide will help you deploy the CyberWave Security backend to IONOS hosting.

## Prerequisites

- IONOS hosting account with Node.js support
- IONOS MySQL database access
- SSH access to your IONOS server
- Domain configured (e.g., api.cyberwavesecurity.co.uk for backend)

## Step 1: MySQL Database Setup

### 1.1 Create Database

1. Log into your IONOS control panel
2. Navigate to **Databases** → **MySQL Databases**
3. Create a new database:
   - Database name: `cyberwave_db` (or your preferred name)
   - Note the database hostname, username, and password

### 1.2 Database Connection Info

You'll need these details for your `.env` file:
- `DB_HOST`: Usually `localhost` or provided by IONOS
- `DB_USER`: Your database username
- `DB_PASSWORD`: Your database password
- `DB_NAME`: Your database name
- `DB_PORT`: Usually `3306`

## Step 2: Email Configuration (IONOS SMTP)

IONOS provides SMTP service for sending emails:

### IONOS SMTP Settings:
```
SMTP_HOST=smtp.ionos.co.uk (or smtp.ionos.com for US)
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@cyberwavesecurity.co.uk
SMTP_PASSWORD=your-email-password
```

**Note:** Use an email account created in your IONOS hosting panel.

## Step 3: Upload Backend Files to IONOS

### 3.1 Via SSH (Recommended)

1. Connect to your IONOS server via SSH:
   ```bash
   ssh username@your-server.ionos.com
   ```

2. Navigate to your web directory:
   ```bash
   cd /var/www/vhosts/cyberwavesecurity.co.uk/
   ```

3. Create an `api` directory for the backend:
   ```bash
   mkdir -p api
   cd api
   ```

4. Upload files using SCP or Git:

   **Option A: Using Git (Recommended)**
   ```bash
   git clone https://github.com/your-repo/cyberwave-website.git
   cd cyberwave-website/backend
   ```

   **Option B: Using SCP from your local machine**
   ```bash
   scp -r backend/* username@your-server.ionos.com:/var/www/vhosts/cyberwavesecurity.co.uk/api/
   ```

### 3.2 Via FTP/SFTP

1. Use an FTP client like FileZilla
2. Connect using your IONOS FTP credentials
3. Upload the entire `backend` folder to your desired location

## Step 4: Install Dependencies

Connect via SSH and run:

```bash
cd /var/www/vhosts/cyberwavesecurity.co.uk/api
npm install --production
```

## Step 5: Configure Environment Variables

1. Create the `.env` file:
   ```bash
   nano .env
   ```

2. Add your configuration (replace with actual values):

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Allowed origins for CORS
ALLOWED_ORIGINS=https://cyberwavesecurity.co.uk,https://www.cyberwavesecurity.co.uk

# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=cyberwave_db
DB_PORT=3306

# Email Configuration (IONOS SMTP)
SMTP_HOST=smtp.ionos.co.uk
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@cyberwavesecurity.co.uk
SMTP_PASSWORD=your_email_password
SMTP_FROM=noreply@cyberwavesecurity.co.uk

# Recipient Email
RECIPIENT_EMAIL=info@cyberwavesecurity.co.uk
```

3. Save and exit (Ctrl+X, then Y, then Enter)

## Step 6: Set Up Node.js Process Manager (PM2)

PM2 keeps your Node.js application running in the background:

### 6.1 Install PM2 globally
```bash
npm install -g pm2
```

### 6.2 Start the application
```bash
pm2 start src/server.js --name cyberwave-api
```

### 6.3 Configure PM2 to start on system boot
```bash
pm2 startup
pm2 save
```

### 6.4 Useful PM2 commands
```bash
# View application status
pm2 status

# View logs
pm2 logs cyberwave-api

# Restart application
pm2 restart cyberwave-api

# Stop application
pm2 stop cyberwave-api

# Monitor resources
pm2 monit
```

## Step 7: Configure Reverse Proxy (Apache/Nginx)

Your Node.js app runs on port 3000, but you want it accessible via a subdomain like `api.cyberwavesecurity.co.uk`.

### For Apache (Common on IONOS)

1. Create/edit Apache virtual host configuration:
   ```bash
   sudo nano /etc/apache2/sites-available/api.cyberwavesecurity.co.uk.conf
   ```

2. Add the following configuration:

```apache
<VirtualHost *:80>
    ServerName api.cyberwavesecurity.co.uk

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    # Logging
    ErrorLog ${APACHE_LOG_DIR}/api-error.log
    CustomLog ${APACHE_LOG_DIR}/api-access.log combined
</VirtualHost>
```

3. Enable required modules and site:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2ensite api.cyberwavesecurity.co.uk.conf
sudo systemctl reload apache2
```

### For Nginx

```nginx
server {
    listen 80;
    server_name api.cyberwavesecurity.co.uk;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Step 8: SSL Certificate (HTTPS)

### Option 1: IONOS SSL Certificate

1. Purchase/activate SSL certificate in IONOS control panel
2. Follow IONOS instructions to install it

### Option 2: Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d api.cyberwavesecurity.co.uk

# Auto-renewal
sudo certbot renew --dry-run
```

After SSL is configured, update your `.env` ALLOWED_ORIGINS to use `https://`.

## Step 9: Update Frontend Configuration

On your main website (frontend), create/update `.env.production`:

```env
VITE_API_URL=https://api.cyberwavesecurity.co.uk
```

Then rebuild your frontend:
```bash
npm run build
```

## Step 10: Testing

### 10.1 Test Health Endpoint
```bash
curl https://api.cyberwavesecurity.co.uk/health
```

Expected response:
```json
{
  "success": true,
  "message": "CyberWave API is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 123.456
}
```

### 10.2 Test Contact Form
Use the contact form on your website or test with curl:

```bash
curl -X POST https://api.cyberwavesecurity.co.uk/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### Check Application Logs
```bash
pm2 logs cyberwave-api
```

### Check Database Connection
```bash
pm2 logs cyberwave-api --lines 50 | grep "Database"
```

### Check if Node.js is running
```bash
pm2 status
```

### Restart Application
```bash
pm2 restart cyberwave-api
```

### Check Apache/Nginx Logs
```bash
# Apache
sudo tail -f /var/log/apache2/api-error.log

# Nginx
sudo tail -f /var/log/nginx/error.log
```

### Database Issues
- Verify MySQL is running: `sudo systemctl status mysql`
- Test connection: `mysql -u username -p -h localhost database_name`

### Email Issues
- Check SMTP credentials in `.env`
- Verify email account exists in IONOS control panel
- Check logs for specific email errors

## Security Checklist

- ✅ `.env` file is created and not committed to Git
- ✅ Database uses strong password
- ✅ CORS is configured with specific allowed origins
- ✅ Rate limiting is enabled
- ✅ HTTPS/SSL is configured
- ✅ Helmet security headers are enabled
- ✅ PM2 is configured to restart on failure

## Maintenance

### Update Application
```bash
cd /var/www/vhosts/cyberwavesecurity.co.uk/api
git pull origin main
npm install --production
pm2 restart cyberwave-api
```

### Backup Database
```bash
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql
```

### Monitor Resources
```bash
pm2 monit
```

## Support

For IONOS-specific support:
- IONOS Help Center: https://www.ionos.co.uk/help/
- Contact IONOS support for server/hosting issues

For application issues:
- Check application logs: `pm2 logs cyberwave-api`
- Review this documentation
- Check GitHub repository issues
