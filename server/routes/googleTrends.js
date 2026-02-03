import express from 'express';
import { fetchDailyTrends, fetchRealtimeTrends } from '../services/fetchGoogleTrends.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await fetchDailyTrends();
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: 'Failed to fetch Google Trends', items: [] });
  }
});

router.get('/realtime', async (req, res) => {
  try {
    const data = await fetchRealtimeTrends();
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: 'Failed to fetch Google Trends realtime', items: [] });
  }
});

export default router;
