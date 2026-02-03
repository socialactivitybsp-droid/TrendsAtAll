const parseTrendingFeed = (xmlText) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, 'text/xml');
  const entries = Array.from(xml.getElementsByTagName('entry'));
  return entries.map((entry, index) => {
    const title = entry.getElementsByTagName('title')[0]?.textContent || 'Trending track';
    const author = entry.getElementsByTagName('name')[0]?.textContent || 'YouTube Music';
    const link = entry.getElementsByTagName('link')[0]?.getAttribute('href') || 'https://music.youtube.com';
    const thumbnail = entry.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url') || '';
    return {
      title,
      subtitle: `${author} · Rank ${index + 1}`,
      image: thumbnail,
      rank: index + 1,
      platform: 'YouTube Music',
      url: link,
    };
  });
};

export const fetchYoutubeMusicTrends = async () => {
  try {
    const response = await fetch(
      'https://api.allorigins.win/raw?url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchart%3Dmost_popular%26regionCode%3DIN'
    );
    if (!response.ok) {
      throw new Error('Failed to load YouTube Music trends');
    }
    const text = await response.text();
    const items = parseTrendingFeed(text).slice(0, 10);
    return {
      title: 'YouTube Music Trending',
      subtitle: 'India · Most popular videos',
      items,
    };
  } catch (error) {
    return {
      title: 'YouTube Music Trending',
      subtitle: 'India · Data unavailable',
      items: [],
    };
  }
};
