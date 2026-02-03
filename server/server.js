import express from 'express';
import cors from 'cors';
import googleTrendsRoutes from './routes/googleTrends.js';
import appleMusicRoutes from './routes/appleMusic.js';
import youtubeMusicRoutes from './routes/youtubeMusic.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'trend-aggregator-api' });
});

app.use('/api/google-trends', googleTrendsRoutes);
app.use('/api/apple-music', appleMusicRoutes);
app.use('/api/youtube-music', youtubeMusicRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error', message: err.message || 'Unexpected error' });
});

app.listen(PORT, () => {
  console.log(`Trend API server running on port ${PORT}`);
});
