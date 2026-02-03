import { useEffect, useState } from 'react';
import CategorySection from '../components/CategorySection';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { fetchEtsyTrends } from '../services/etsyService';
import { fetchFlipkartTrends } from '../services/flipkartService';
import { fetchGoogleRisingSearches, fetchGoogleCategoryTrends } from '../services/googleTrendsService';
import { fetchSpotifyTopCharts } from '../services/spotifyService';
import { fetchAppleMusicCharts } from '../services/appleMusicService';
import { fetchYoutubeMusicTrends } from '../services/youtubeMusicService';
import './stylings/Home.css';

const initialState = {
  products: [],
  searches: [],
  music: [],
};

function Home() {
  const [trendData, setTrendData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTrends = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const [etsy, flipkart, rising, categories, spotify, apple, youtube] = await Promise.all([
          fetchEtsyTrends(),
          fetchFlipkartTrends(),
          fetchGoogleRisingSearches(),
          fetchGoogleCategoryTrends(),
          fetchSpotifyTopCharts(),
          fetchAppleMusicCharts(),
          fetchYoutubeMusicTrends(),
        ]);

        setTrendData({
          products: [etsy, flipkart],
          searches: [rising, categories],
          music: [spotify, apple, youtube],
        });
      } catch (error) {
        setErrorMessage('We had trouble loading the latest trends. Showing cached highlights instead.');
        setTrendData(initialState);
      } finally {
        setLoading(false);
      }
    };

    loadTrends();
  }, []);

  return (
    <main className="home">
      <header className="home__hero">
        <div>
          <p className="home__eyebrow">Trend Intelligence Platform</p>
          <h1 className="home__title">Trend Aggregator</h1>
          <p className="home__subtitle">
            A unified dashboard to monitor fast-moving product, search, and music trends across platforms.
          </p>
        </div>
        <div className="home__status">
          <span className="home__status-dot" />
          <span>Live updates with resilient fallbacks</span>
        </div>
      </header>

      {loading ? <Loader message="Fetching the latest trends..." /> : null}
      {errorMessage ? <ErrorState message={errorMessage} /> : null}

      {!loading && (
        <section className="home__content">
          <CategorySection
            title="Trending Products"
            description="Top product momentum from curated commerce marketplaces."
            sections={trendData.products}
          />
          <CategorySection
            title="Search & Words"
            description="Fast-rising keywords and breakout topics in India."
            sections={trendData.searches}
          />
          <CategorySection
            title="Songs & Music"
            description="Charts and viral hits across streaming platforms."
            sections={trendData.music}
          />
        </section>
      )}
    </main>
  );
}

export default Home;
