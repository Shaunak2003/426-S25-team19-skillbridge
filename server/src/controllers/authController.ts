import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../config/db';

export const signup = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name, level, credits, current_courses, saved_courses, rating`,
      [name, hashed]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    console.log(name, password)
    const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
    const user = result.rows[0];
    console.log("Username from db: ", user.name)
    if (!user) return res.status(401).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
