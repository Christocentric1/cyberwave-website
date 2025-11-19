# CyberWave Security - Quick Start Guide

## What Was Built

A complete Node.js backend API for your CyberWave Security website with:

✅ **Contact Form Backend**
- Accepts form submissions from your website
- Validates all inputs (name, email, company, message)
- Stores submissions in MySQL database
- Rate limiting to prevent spam (5 submissions per 15 min)

✅ **Email System**
- Sends email to: **info@cyberwavesecurity.co.uk**
- Sends confirmation email to the user
- Beautiful HTML email templates
- Uses IONOS SMTP or any email provider

✅ **MySQL Database**
- Automatic table creation
- Stores all contact submissions
- Tracks IP address and timestamp
- Ready for IONOS MySQL

✅ **Security Features**
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting
- Security headers (Helmet)

## Local Development

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**Required in .env:**
- MySQL database credentials (host, user, password, database name)
- SMTP credentials (host, user, password)
- Recipient email: info@cyberwavesecurity.co.uk

```bash
# Start backend server
npm run dev
```

Backend will run on: http://localhost:3000

### 2. Frontend Setup (Terminal 2)

```bash
# In the root directory
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm run dev
```

Frontend will run on: http://localhost:5173

### 3. Test the Contact Form

1. Open http://localhost:5173/contact
2. Fill out the contact form
3. Click "Send Message"
4. Check the email at info@cyberwavesecurity.co.uk

## IONOS Deployment

### Step 1: Database Setup

1. Log into IONOS Control Panel
2. Go to **Databases** → **MySQL**
3. Create a new database
4. Note down:
   - Database host
   - Database name
   - Username
   - Password

### Step 2: Email Setup

1. In IONOS Control Panel, create email account:
   - noreply@cyberwavesecurity.co.uk (for sending)
2. Note down the password
3. SMTP settings:
   ```
   Host: smtp.ionos.co.uk
   Port: 587
   Security: STARTTLS
   ```

### Step 3: Upload Backend

**Via SSH (Recommended):**
```bash
# Connect to IONOS server
ssh username@your-server.ionos.com

# Navigate to your web directory
cd /var/www/vhosts/cyberwavesecurity.co.uk/

# Create api directory
mkdir api
cd api

# Upload files (from your computer)
git clone <your-repo-url>
# OR use SCP/SFTP

# Install dependencies
npm install --production

# Create .env file
nano .env
```

**Configure .env on server:**
```env
NODE_ENV=production
PORT=3000

# Your IONOS database
DB_HOST=localhost  # or IONOS provided host
DB_USER=your_ionos_db_user
DB_PASSWORD=your_ionos_db_password
DB_NAME=your_database_name

# Your IONOS email
SMTP_HOST=smtp.ionos.co.uk
SMTP_PORT=587
SMTP_USER=noreply@cyberwavesecurity.co.uk
SMTP_PASSWORD=your_email_password

# Recipient
RECIPIENT_EMAIL=info@cyberwavesecurity.co.uk

# CORS
ALLOWED_ORIGINS=https://cyberwavesecurity.co.uk,https://www.cyberwavesecurity.co.uk
```

### Step 4: Start Backend with PM2

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start src/server.js --name cyberwave-api

# Save PM2 configuration
pm2 save

# Set up auto-start on reboot
pm2 startup
```

### Step 5: Configure Reverse Proxy

Set up Apache or Nginx to route `api.cyberwavesecurity.co.uk` to `localhost:3000`

**See detailed instructions in:** `backend/DEPLOYMENT.md`

### Step 6: Upload Frontend

```bash
# Build frontend locally
npm run build

# Upload dist/ folder to IONOS web hosting
# Usually to: /var/www/vhosts/cyberwavesecurity.co.uk/httpdocs/
```

### Step 7: Configure Frontend

Update `dist/assets/*.js` or rebuild with:
```env
# .env.production
VITE_API_URL=https://api.cyberwavesecurity.co.uk
```

Then rebuild: `npm run build`

### Step 8: Test Production

```bash
# Test API health
curl https://api.cyberwavesecurity.co.uk/health

# Test contact form
# Visit: https://cyberwavesecurity.co.uk/contact
# Fill and submit the form
```

## File Structure

```
cyberwave-website/
├── backend/                      # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js      # MySQL connection
│   │   ├── controllers/
│   │   │   └── contactController.js  # Form handling
│   │   ├── middleware/
│   │   │   ├── rateLimiter.js   # Rate limiting
│   │   │   └── validators.js    # Input validation
│   │   ├── routes/
│   │   │   └── contactRoutes.js # API routes
│   │   ├── services/
│   │   │   └── emailService.js  # Email sending
│   │   └── server.js            # Main app
│   ├── .env.example             # Environment template
│   ├── package.json
│   ├── README.md                # Backend docs
│   ├── DEPLOYMENT.md            # Deployment guide
│   ├── setup.sh                 # Setup script
│   └── test-api.sh              # Test script
├── src/
│   └── pages/
│       └── Contact.tsx          # Updated with API integration
├── .env.example
├── .env.production
└── PROJECT_OVERVIEW.md
```

## API Endpoints

### Public Endpoints

**POST /api/contact/submit**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "message": "Your message here"
}
```

**GET /health**
```json
{
  "success": true,
  "message": "CyberWave API is running"
}
```

### Admin Endpoints (Optional)

**GET /api/contact** - Get all contacts (paginated)
**GET /api/contact/:id** - Get specific contact

## Testing

### Test Backend Locally
```bash
cd backend
./test-api.sh
```

### Test Production
```bash
cd backend
./test-api.sh https://api.cyberwavesecurity.co.uk
```

## Common Issues & Solutions

### Contact form not sending
- Check backend is running: `pm2 status`
- Check logs: `pm2 logs cyberwave-api`
- Verify API URL in frontend .env

### Database connection error
- Verify MySQL credentials in .env
- Check MySQL is running: `systemctl status mysql`
- Test connection: `mysql -u user -p -h host database`

### Email not sending
- Verify SMTP credentials in .env
- Check email account exists in IONOS
- Review backend logs for email errors

### CORS errors
- Add your domain to ALLOWED_ORIGINS in backend/.env
- Include https:// protocol
- Restart backend: `pm2 restart cyberwave-api`

## Important Files to Configure

1. **backend/.env** - Database and email credentials
2. **.env.production** - Frontend API URL
3. Backend CORS settings (ALLOWED_ORIGINS)

## Next Steps

1. ✅ Set up IONOS MySQL database
2. ✅ Configure IONOS email account
3. ✅ Upload backend to IONOS server
4. ✅ Configure environment variables
5. ✅ Start backend with PM2
6. ✅ Set up reverse proxy
7. ✅ Configure SSL certificate
8. ✅ Build and upload frontend
9. ✅ Test contact form

## Support

- **Backend Docs:** `backend/README.md`
- **Deployment Guide:** `backend/DEPLOYMENT.md`
- **Full Project Overview:** `PROJECT_OVERVIEW.md`
- **IONOS Support:** https://www.ionos.co.uk/help/

## Email Configuration Summary

**Sender:** noreply@cyberwavesecurity.co.uk (configure in IONOS)
**Recipient:** info@cyberwavesecurity.co.uk
**SMTP Provider:** IONOS SMTP (smtp.ionos.co.uk:587)

When a user submits the contact form:
1. Form data saved to MySQL database
2. Email sent to info@cyberwavesecurity.co.uk
3. Confirmation email sent to the user
4. Success message shown to user

---

**All code has been committed and pushed to the branch:**
`claude/build-backend-ionos-01KtDrMvCxgoWBTGS17ZqUXR`

You're ready to deploy to IONOS! 🚀
