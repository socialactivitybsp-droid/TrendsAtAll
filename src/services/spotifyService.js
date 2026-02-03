const parseCsv = (text) => {
  const rows = text.split('\n').slice(1).filter(Boolean);
  return rows.map((row) => {
    const [position, trackName, artist, streams, url] = row.split(',');
    return { position, trackName, artist, streams, url };
  });
};

const normalizeTrack = (track, index) => ({
  title: track.trackName?.replace(/\"/g, '') || 'Track',
  subtitle: `${track.artist?.replace(/\"/g, '') || 'Artist'} · Rank ${index + 1}`,
  image: '',
  rank: index + 1,
  platform: 'Spotify',
  url: track.url?.replace(/\"/g, '') || 'https://open.spotify.com',
});

const fetchChartCsv = async (url) => {
  const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
  if (!response.ok) {
    throw new Error('Failed to load Spotify charts');
  }
  return response.text();
};

export const fetchSpotifyTopCharts = async () => {
  try {
    const csv = await fetchChartCsv('https://spotifycharts.com/regional/in/daily/latest/download');
    const tracks = parseCsv(csv).slice(0, 10);
    return {
      title: 'Spotify Top Charts',
      subtitle: 'India · Daily chart',
      items: tracks.map(normalizeTrack),
    };
  } catch (error) {
    const csv = await fetchChartCsv('https://spotifycharts.com/viral/in/daily/latest/download');
    const tracks = parseCsv(csv).slice(0, 10);
    return {
      title: 'Spotify Top Charts',
      subtitle: 'India · Viral chart',
      items: tracks.map(normalizeTrack),
    };
  }
};
