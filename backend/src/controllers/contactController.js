import { validationResult } from 'express-validator';
import pool from '../config/database.js';
import { sendContactEmail, sendConfirmationEmail } from '../services/emailService.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, company, message } = req.body;

    // Get client IP and user agent
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.get('user-agent');

    // Save to database
    const [result] = await pool.query(
      `INSERT INTO contacts (name, email, company, message, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, company || null, message, ip_address, user_agent]
    );

    console.log(`📝 New contact submission from ${email} (ID: ${result.insertId})`);

    // Prepare contact data
    const contactData = {
      name,
      email,
      company,
      message,
      ip_address
    };

    // Send emails (don't wait for confirmation email)
    try {
      await sendContactEmail(contactData);
      sendConfirmationEmail(contactData); // Fire and forget
    } catch (emailError) {
      console.error('Email sending error:', emailError.message);
      // Still return success since data was saved to database
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      contactId: result.insertId
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.'
    });
  }
};

// Get all contacts (admin endpoint - optional)
export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [contacts] = await pool.query(
      `SELECT id, name, email, company, message, created_at
       FROM contacts
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM contacts'
    );

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit)
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts'
    });
  }
};

// Get contact by ID (admin endpoint - optional)
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const [contacts] = await pool.query(
      `SELECT * FROM contacts WHERE id = ?`,
      [id]
    );

    if (contacts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contacts[0]
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact'
    });
  }
};
