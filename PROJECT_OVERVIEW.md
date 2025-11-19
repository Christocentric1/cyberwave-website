# CyberWave Security - Full Stack Project

Complete website for CyberWave Security with React frontend and Node.js backend.

## Project Structure

```
cyberwave-website/
├── backend/                    # Node.js/Express backend API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Middleware (validation, rate limiting)
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (email, etc.)
│   │   └── server.js          # Main application
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   ├── README.md             # Backend documentation
│   └── DEPLOYMENT.md         # IONOS deployment guide
│
├── src/                       # React frontend
│   ├── components/           # React components
│   ├── pages/               # Page components
│   └── ...
├── public/                   # Static assets
├── .env.example             # Frontend env template
├── .env.production          # Production configuration
├── package.json             # Frontend dependencies
└── vite.config.ts           # Vite configuration
```

## Tech Stack

### Frontend
- **React** 18.3+ with TypeScript
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Zod** - Validation

### Backend
- **Node.js** 18+
- **Express** - Web framework
- **MySQL** - Database
- **Nodemailer** - Email service
- **PM2** - Process manager (production)

## Features

### Completed Features
✅ Responsive website design
✅ Contact form with backend integration
✅ Email notifications (admin + user confirmation)
✅ MySQL database storage
✅ Rate limiting and spam protection
✅ Input validation and sanitization
✅ Security headers (Helmet, CORS)
✅ Error handling
✅ Health monitoring endpoint

### Pages
- Home (Hero, Services, Features)
- EDR (Endpoint Detection & Response)
- Pricing (Calculator, Service Plans)
- About
- Contact (Form with backend integration)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MySQL database
- SMTP credentials for email

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cyberwave-website
   ```

2. **Frontend Setup**
   ```bash
   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env

   # Start development server
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

3. **Backend Setup**
   ```bash
   # Navigate to backend
   cd backend

   # Install dependencies
   npm install

   # Create environment file
   cp .env.example .env

   # Edit .env with your database and SMTP credentials
   nano .env

   # Start backend server
   npm run dev
   ```
   Backend API will be available at `http://localhost:3000`

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - API Health: http://localhost:3000/health

## Environment Configuration

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

### Backend (backend/.env)
See `backend/.env.example` for all required variables:
- Database credentials (IONOS MySQL)
- SMTP settings (IONOS email or other provider)
- Recipient email: `info@cyberwavesecurity.co.uk`
- CORS allowed origins

## Deployment

### Production Build

**Frontend:**
```bash
npm run build
```
Outputs to `dist/` directory

**Backend:**
```bash
cd backend
npm install --production
npm start
```

### IONOS Hosting

See detailed deployment guide: [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)

**Quick Summary:**
1. Upload frontend build to IONOS web hosting
2. Upload backend to IONOS server (via SSH/FTP)
3. Configure MySQL database in IONOS control panel
4. Set up environment variables
5. Configure SMTP with IONOS email
6. Use PM2 to run backend
7. Configure Apache/Nginx reverse proxy
8. Set up SSL certificate

**URLs:**
- Frontend: `https://cyberwavesecurity.co.uk`
- Backend API: `https://api.cyberwavesecurity.co.uk`

## API Endpoints

### Public Endpoints
- `GET /health` - API health check
- `POST /api/contact/submit` - Submit contact form

### Admin Endpoints (optional - add auth)
- `GET /api/contact` - Get all contacts (paginated)
- `GET /api/contact/:id` - Get specific contact

See [backend/README.md](backend/README.md) for detailed API documentation.

## Testing

### Test Backend API
```bash
cd backend
./test-api.sh
# Or specify URL
./test-api.sh https://api.cyberwavesecurity.co.uk
```

### Manual Testing
```bash
# Health check
curl http://localhost:3000/health

# Submit contact form
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

## Database Schema

### contacts Table
- `id` - Auto-increment primary key
- `name` - Contact name (VARCHAR 255)
- `email` - Contact email (VARCHAR 255)
- `company` - Company name (VARCHAR 255, optional)
- `message` - Message content (TEXT)
- `ip_address` - Client IP (VARCHAR 45)
- `user_agent` - Browser info (TEXT)
- `created_at` - Timestamp (auto)

## Security Features

1. **Rate Limiting**: 5 submissions per 15 min per IP
2. **Input Validation**: Server-side validation with express-validator
3. **SQL Injection Prevention**: Parameterized queries
4. **XSS Protection**: Input sanitization
5. **CORS**: Restricted to allowed origins
6. **Security Headers**: Helmet middleware
7. **HTTPS**: SSL/TLS encryption (production)

## Email Configuration

### Email Flow
1. User submits contact form
2. Backend validates and stores in database
3. Email sent to `info@cyberwavesecurity.co.uk`
4. Confirmation email sent to user
5. Success response returned to frontend

### IONOS SMTP Settings
```
Host: smtp.ionos.co.uk
Port: 587
Security: STARTTLS
```

## Development Commands

### Frontend
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Development with auto-reload
npm start            # Production mode
```

## Troubleshooting

### Contact Form Not Working
1. Check backend is running: `curl http://localhost:3000/health`
2. Check browser console for errors
3. Verify VITE_API_URL in frontend .env
4. Check backend logs: `pm2 logs cyberwave-api`

### Database Connection Failed
1. Verify MySQL is running
2. Check credentials in backend/.env
3. Test: `mysql -u username -p -h host database`

### Emails Not Sending
1. Verify SMTP credentials in backend/.env
2. Check email account exists in IONOS
3. Review backend console logs for errors

### CORS Errors
1. Add frontend URL to ALLOWED_ORIGINS in backend/.env
2. Include protocol: `https://cyberwavesecurity.co.uk`
3. Restart backend after changes

## Support & Documentation

- Backend Documentation: [backend/README.md](backend/README.md)
- Deployment Guide: [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)
- IONOS Support: https://www.ionos.co.uk/help/

## Maintenance

### Update Application
```bash
git pull origin main
npm install
npm run build

cd backend
npm install --production
pm2 restart cyberwave-api
```

### Backup Database
```bash
mysqldump -u username -p database > backup.sql
```

### Monitor Backend
```bash
pm2 status
pm2 logs cyberwave-api
pm2 monit
```

## License

Private and proprietary - CyberWave Security Ltd.
