const youtubeFallback = [
  {
    title: 'Weekend Roadtrip Mix',
    subtitle: 'Various Artists · Rank 1',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=200&q=80',
    rank: 1,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Bollywood Chill Vibes',
    subtitle: 'Various Artists · Rank 2',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=200&q=80',
    rank: 2,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Monsoon Mood',
    subtitle: 'Various Artists · Rank 3',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=200&q=80',
    rank: 3,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Lo-fi Hindi Beats',
    subtitle: 'Various Artists · Rank 4',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=200&q=80',
    rank: 4,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Viral Shorts Anthems',
    subtitle: 'Various Artists · Rank 5',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80',
    rank: 5,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Punjabi Party Hits',
    subtitle: 'Various Artists · Rank 6',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=200&q=80',
    rank: 6,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Indie Spotlight',
    subtitle: 'Various Artists · Rank 7',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80',
    rank: 7,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Dancefloor Pulse',
    subtitle: 'Various Artists · Rank 8',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=200&q=80',
    rank: 8,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Romantic Rewinds',
    subtitle: 'Various Artists · Rank 9',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80',
    rank: 9,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
  {
    title: 'Acoustic Covers',
    subtitle: 'Various Artists · Rank 10',
    image: 'https://images.unsplash.com/photo-1454922915609-78549ad709bb?auto=format&fit=crop&w=200&q=80',
    rank: 10,
    platform: 'YouTube Music',
    url: 'https://music.youtube.com',
  },
];

export const fetchYoutubeMusicTrends = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/youtube-music');
    if (!response.ok) {
      throw new Error('Failed to load YouTube Music trends');
    }
    const data = await response.json();
    return {
      title: 'YouTube Music Trending',
      subtitle: 'India · Most popular videos',
      items: data.items || [],
    };
  } catch (error) {
    return {
      title: 'YouTube Music Trending',
      subtitle: 'India · Fallback playlist',
      items: youtubeFallback,
    };
  }
};
