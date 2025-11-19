# CyberWave Security Backend API

Backend API for the CyberWave Security website, built with Node.js, Express, and MySQL.

## Features

- ✅ Contact form submission with email notifications
- ✅ MySQL database storage for all submissions
- ✅ Email notifications to admin and confirmation to users
- ✅ Rate limiting to prevent spam
- ✅ Input validation and sanitization
- ✅ CORS support for cross-origin requests
- ✅ Security headers with Helmet
- ✅ Comprehensive error handling

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MySQL** - Database
- **Nodemailer** - Email service
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## Quick Start

### Prerequisites

- Node.js 18+ installed
- MySQL database
- SMTP email account

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Configure your `.env` file with actual values:
   - Database credentials
   - SMTP credentials
   - Recipient email

4. Start the server:
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

5. The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /health
```

Returns the API status and uptime.

**Response:**
```json
{
  "success": true,
  "message": "CyberWave API is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 123.456
}
```

### Submit Contact Form
```
POST /api/contact/submit
```

Submits a contact form and sends email notifications.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "message": "I would like to inquire about your services..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you within 24 hours.",
  "contactId": 123
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### Get All Contacts (Admin)
```
GET /api/contact?page=1&limit=20
```

Retrieves all contact submissions with pagination.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Example Corp",
      "message": "Message content...",
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### Get Contact by ID (Admin)
```
GET /api/contact/:id
```

Retrieves a specific contact submission.

## Database Schema

### contacts Table

| Column       | Type           | Description                    |
|-------------|----------------|--------------------------------|
| id          | INT (PK)       | Auto-incrementing ID           |
| name        | VARCHAR(255)   | Contact's name                 |
| email       | VARCHAR(255)   | Contact's email                |
| company     | VARCHAR(255)   | Company name (optional)        |
| message     | TEXT           | Message content                |
| ip_address  | VARCHAR(45)    | Client IP address              |
| user_agent  | TEXT           | Client user agent              |
| created_at  | TIMESTAMP      | Submission timestamp           |

Indexes:
- `idx_email` on email column
- `idx_created_at` on created_at column

## Environment Variables

See `.env.example` for all required environment variables.

**Required:**
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - MySQL database name
- `SMTP_HOST` - SMTP server host
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `RECIPIENT_EMAIL` - Email to receive contact form submissions

**Optional:**
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)
- `SMTP_PORT` - SMTP port (default: 587)
- `SMTP_SECURE` - Use SSL/TLS (default: false)

## Security Features

1. **Rate Limiting**: 5 contact form submissions per 15 minutes per IP
2. **Input Validation**: All inputs are validated and sanitized
3. **CORS**: Configured to allow only specific origins
4. **Helmet**: Security headers to protect against common vulnerabilities
5. **SQL Injection Protection**: Using parameterized queries
6. **XSS Protection**: Input sanitization

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed IONOS deployment instructions.

## Development

### Running in Development Mode

```bash
npm run dev
```

This uses Node.js's built-in watch mode for automatic reloading.

### Testing the API

Use curl, Postman, or any HTTP client:

```bash
# Health check
curl http://localhost:3000/health

# Submit contact form
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "message": "This is a test message"
  }'
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # Database connection and initialization
│   ├── controllers/
│   │   └── contactController.js # Contact form logic
│   ├── middleware/
│   │   ├── rateLimiter.js      # Rate limiting configuration
│   │   └── validators.js       # Input validation rules
│   ├── routes/
│   │   └── contactRoutes.js    # Contact API routes
│   ├── services/
│   │   └── emailService.js     # Email sending service
│   └── server.js               # Main application entry point
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── DEPLOYMENT.md              # Deployment guide
```

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### Email Not Sending
- Verify SMTP credentials
- Check SMTP host and port
- Review email service logs in console

### CORS Errors
- Add your frontend domain to `ALLOWED_ORIGINS` in `.env`
- Ensure the format is correct (include protocol: `https://example.com`)

### Port Already in Use
- Change the `PORT` in `.env`
- Or kill the process using the port: `lsof -ti:3000 | xargs kill`

## License

Private and proprietary.

## Support

For issues or questions, contact the development team.
