# CI/CD Pipeline Setup Guide

This guide will help you set up automated deployments for your CyberWave Security website.

## Overview

We have 3 GitHub Actions workflows:

1. **Test** (`test.yml`) - Runs on every push and PR to validate code
2. **Frontend Deploy** (`frontend-deploy.yml`) - Deploys React app to IONOS
3. **Backend Deploy** (`backend-deploy.yml`) - Deploys Node.js API to IONOS

## 🔐 GitHub Secrets Setup

You need to add these secrets to your GitHub repository:

### Navigate to Secrets

1. Go to your GitHub repository
2. Click **Settings**
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Required Secrets

#### Frontend Deployment (FTP)

| Secret Name | Description | Example |
|------------|-------------|---------|
| `VITE_API_URL` | Your production API URL | `https://api.cyberwavesecurity.co.uk` |
| `FTP_HOST` | IONOS FTP hostname | `ftp.cyberwavesecurity.co.uk` |
| `FTP_USERNAME` | IONOS FTP username | `your-ftp-user` |
| `FTP_PASSWORD` | IONOS FTP password | `your-ftp-password` |

#### Backend Deployment (SSH)

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SSH_HOST` | IONOS server hostname | `your-server.ionos.com` |
| `SSH_USERNAME` | SSH username | `your-ssh-user` |
| `SSH_PASSWORD` | SSH password | `your-ssh-password` |
| `SSH_PORT` | SSH port (optional) | `22` |

## 📋 Step-by-Step Setup

### Step 1: Get IONOS FTP Credentials

1. Log into IONOS Control Panel
2. Go to **Hosting** → **FTP Access**
3. Note down:
   - FTP Host (e.g., `ftp.cyberwavesecurity.co.uk`)
   - FTP Username
   - FTP Password

### Step 2: Get IONOS SSH Credentials

1. In IONOS Control Panel, go to **Server & Cloud**
2. Click on your server
3. Look for **SSH Access** settings
4. Note down:
   - SSH Host
   - SSH Username
   - SSH Password (or set up SSH key)

### Step 3: Add Secrets to GitHub

For each secret above:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: Enter the secret name exactly as shown above
4. Value: Enter your actual value
5. Click **Add secret**

### Step 4: Configure IONOS Server Paths

Edit `.github/workflows/backend-deploy.yml` and update the path:

```yaml
script: |
  # Update this path to match your IONOS setup
  cd /var/www/vhosts/cyberwavesecurity.co.uk/api
```

## 🚀 How It Works

### Automatic Deployment

When you push to `main` branch:

1. **Test Workflow** runs first
   - Lints code
   - Builds frontend
   - Checks backend syntax

2. **Frontend Deploy** (if frontend files changed)
   - Builds production frontend
   - Uploads to IONOS via FTP
   - Deploys to your website

3. **Backend Deploy** (if backend files changed)
   - Connects to IONOS via SSH
   - Pulls latest code
   - Installs dependencies
   - Restarts PM2 service

### Manual Deployment

You can trigger deployments manually:

1. Go to **Actions** tab in GitHub
2. Select the workflow you want to run
3. Click **Run workflow**
4. Choose branch and click **Run workflow**

## 📂 Directory Structure on IONOS

Make sure your IONOS server has this structure:

```
/var/www/vhosts/cyberwavesecurity.co.uk/
├── httpdocs/              # Frontend files (FTP deploys here)
│   ├── index.html
│   ├── assets/
│   └── ...
└── api/                   # Backend files (SSH deploys here)
    └── backend/
        ├── src/
        ├── package.json
        └── .env
```

## 🔧 First-Time IONOS Setup

Before the CI/CD pipeline works, you need to set up IONOS once:

### Backend Setup on IONOS

1. SSH into your IONOS server:
```bash
ssh your-user@your-server.ionos.com
```

2. Create directories:
```bash
mkdir -p /var/www/vhosts/cyberwavesecurity.co.uk/api
cd /var/www/vhosts/cyberwavesecurity.co.uk/api
```

3. Clone your repository:
```bash
git clone https://github.com/Christocentric1/cyberwave-website.git .
```

4. Create backend `.env` file:
```bash
cd backend
nano .env
```

Add your production configuration:
```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://cyberwavesecurity.co.uk,https://www.cyberwavesecurity.co.uk

DB_HOST=localhost
DB_USER=dbu2695988
DB_PASSWORD=your_database_password
DB_NAME=dbs14992394
DB_PORT=3306

SMTP_HOST=smtp.ionos.co.uk
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@cyberwavesecurity.org
SMTP_PASSWORD=@Shelah2020
SMTP_FROM=contact@cyberwavesecurity.org

RECIPIENT_EMAIL=contact@cyberwavesecurity.org
```

5. Install dependencies and start:
```bash
npm install --production
npm install -g pm2
pm2 start src/server.js --name cyberwave-api
pm2 save
pm2 startup
```

### Frontend Setup

The frontend will be deployed automatically via FTP to `httpdocs/`

## 🧪 Testing the Pipeline

### Test Locally First

Before pushing:

```bash
# Test frontend build
npm run build

# Test backend
cd backend
npm install
npm start
```

### Push and Monitor

1. Push your changes:
```bash
git add .
git commit -m "Your message"
git push origin main
```

2. Watch the deployment:
   - Go to **Actions** tab in GitHub
   - Click on the running workflow
   - Monitor the progress

## 📊 Workflow Status Badges

Add these to your README.md to show build status:

```markdown
![Test](https://github.com/Christocentric1/cyberwave-website/workflows/Test/badge.svg)
![Deploy Frontend](https://github.com/Christocentric1/cyberwave-website/workflows/Deploy%20Frontend/badge.svg)
![Deploy Backend](https://github.com/Christocentric1/cyberwave-website/workflows/Deploy%20Backend/badge.svg)
```

## 🐛 Troubleshooting

### Frontend deployment fails

**Check:**
- FTP credentials are correct
- FTP host is reachable
- You have write permissions to `httpdocs/`

### Backend deployment fails

**Check:**
- SSH credentials are correct
- Git is installed on IONOS server
- PM2 is installed globally
- Backend `.env` file exists on server

### Deployment succeeds but site doesn't work

**Frontend:**
- Check that `VITE_API_URL` secret is set correctly
- Verify files uploaded to correct directory

**Backend:**
- SSH into server and check: `pm2 logs cyberwave-api`
- Verify `.env` file has correct values
- Check database connection

## 🔒 Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use GitHub Secrets for all credentials
3. ✅ Use SSH keys instead of passwords when possible
4. ✅ Regularly rotate passwords and tokens
5. ✅ Limit FTP/SSH access to specific IPs if possible

## 📝 Common Commands

### GitHub Actions

```bash
# View workflow runs
gh run list

# View logs for a specific run
gh run view [run-id] --log

# Re-run failed workflow
gh run rerun [run-id]
```

### On IONOS Server

```bash
# Check backend status
pm2 status cyberwave-api

# View logs
pm2 logs cyberwave-api

# Restart backend
pm2 restart cyberwave-api

# Stop backend
pm2 stop cyberwave-api
```

## 🎯 Next Steps

1. ✅ Add all required secrets to GitHub
2. ✅ Set up IONOS server directories
3. ✅ Create backend `.env` on server
4. ✅ Test manual deployment first
5. ✅ Push to main and watch automated deployment
6. ✅ Monitor logs and fix any issues

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [IONOS Hosting Guide](https://www.ionos.co.uk/help/hosting/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)

## 🆘 Need Help?

If you encounter issues:

1. Check workflow logs in GitHub Actions tab
2. SSH into IONOS and check PM2 logs
3. Verify all secrets are set correctly
4. Review this documentation

---

**Last Updated:** December 2024
