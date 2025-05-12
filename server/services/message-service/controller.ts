// src/controllers/messageController.ts
import { Request, Response } from 'express';
import pool  from "../../services/db";

export const getConversation = async (req: Request, res: Response) => {
  const { userId, otherUserId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE (sender_id = $1 AND receiver_id = $2) 
          OR (sender_id = $2 AND receiver_id = $1) 
       ORDER BY sent_at ASC`,
      [userId, otherUserId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  const { sender_id, receiver_id, content } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, content) 
       VALUES ($1, $2, $3) RETURNING *`,
      [sender_id, receiver_id, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
