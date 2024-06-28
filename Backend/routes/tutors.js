
import express from 'express';
import { check, validationResult } from 'express-validator';
import pool from '../config/db.js';

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    try {
      const newTutor = await pool.query(
        'INSERT INTO tutors (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );

      res.json(newTutor.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
