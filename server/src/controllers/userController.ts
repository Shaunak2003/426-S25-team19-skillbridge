// src/controllers/userController.ts
import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/* export const createUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
        [name, password] 
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }; */
  
export const getUserInterests = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
        const result = await pool.query('SELECT preset_interests, custom_interests FROM user_interests WHERE user_id = $1', [userId])
        const row = result.rows[0]
        res.json({
            interests: row.preset_interests,
            keywords: row.custom_interests.map((text: string, i: number) => ({
              id: i + 1,
              text,
              isInterest: false
            }))
          });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch interests' })
    }
}