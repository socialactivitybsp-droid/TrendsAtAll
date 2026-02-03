import express from 'express';
import { fetchYouTubeMusic } from '../services/fetchYouTubeMusic.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await fetchYouTubeMusic();
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: 'Failed to fetch YouTube Music trends', items: [] });
  }
});

export default router;
