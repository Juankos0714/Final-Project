
import express from 'express';
import { check, validationResult } from 'express-validator';
import pool from '../config/db.js';

const router = express.Router();


router.post(
  '/',
  [
    check('tutor_id', 'Tutor ID is required').not().isEmpty(),
    check('student_id', 'Student ID is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tutor_id, student_id, date } = req.body;
    try {
      const newSession = await pool.query(
        'INSERT INTO sessions (tutor_id, student_id, date) VALUES ($1, $2, $3) RETURNING *',
        [tutor_id, student_id, date]
      );

      res.json(newSession.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await pool.query('SELECT * FROM sessions');
    res.json(sessions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
