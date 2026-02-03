const normalizeSong = (song, index) => ({
  title: song.name,
  subtitle: `${song.artistName} · Rank ${index + 1}`,
  image: song.artworkUrl100 || song.artworkUrl60 || '',
  rank: index + 1,
  platform: 'Apple Music',
  url: song.url || 'https://music.apple.com',
});

const fetchPrimaryChart = async () => {
  const response = await fetch('https://rss.applemarketingtools.com/api/v2/in/music/most-played/10/songs.json');
  if (!response.ok) {
    throw new Error('Failed to load Apple Music chart');
  }
  return response.json();
};

const fetchSecondaryChart = async () => {
  const response = await fetch('https://itunes.apple.com/in/rss/topsongs/limit=10/json');
  if (!response.ok) {
    throw new Error('Failed to load Apple Music chart');
  }
  return response.json();
};

export const fetchAppleMusicCharts = async () => {
  try {
    const data = await fetchPrimaryChart();
    const items = (data.feed?.results || []).map(normalizeSong);
    return {
      title: 'Apple Music Charts',
      subtitle: 'India · Most played',
      items,
    };
  } catch (error) {
    const data = await fetchSecondaryChart();
    const entries = data.feed?.entry || [];
    const items = entries.map((entry, index) => ({
      title: entry['im:name']?.label || 'Song',
      subtitle: `${entry['im:artist']?.label || 'Artist'} · Rank ${index + 1}`,
      image: entry['im:image']?.[2]?.label || '',
      rank: index + 1,
      platform: 'Apple Music',
      url: entry.link?.attributes?.href || 'https://music.apple.com',
    }));
    return {
      title: 'Apple Music Charts',
      subtitle: 'India · Top songs',
      items,
    };
  }
};
