import express from 'express';
import { fetchAppleMusic } from '../services/fetchAppleMusic.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await fetchAppleMusic();
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: 'Failed to fetch Apple Music charts', items: [] });
  }
});

export default router;
