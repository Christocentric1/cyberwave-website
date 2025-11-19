import express from 'express';
import { submitContact, getAllContacts, getContactById } from '../controllers/contactController.js';
import { contactValidationRules } from '../middleware/validators.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.post('/submit', contactRateLimiter, contactValidationRules, submitContact);

// Admin routes (optional - add authentication middleware if needed)
router.get('/', getAllContacts);
router.get('/:id', getContactById);

export default router;
