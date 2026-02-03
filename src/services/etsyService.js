const fallbackProducts = [
  {
    title: 'Handwoven Jute Storage Basket',
    subtitle: '$28 · Minimal home décor',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=200&q=80',
    rank: 1,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Personalized Name Necklace',
    subtitle: '$34 · Custom jewelry',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=200&q=80',
    rank: 2,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Botanical Line Art Prints',
    subtitle: '$16 · Set of 3',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=80',
    rank: 3,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Leather Journal Bundle',
    subtitle: '$22 · Handmade stationery',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=200&q=80',
    rank: 4,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Terracotta Planter Set',
    subtitle: '$40 · Indoor plants',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=200&q=80',
    rank: 5,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Custom Pet Portrait',
    subtitle: '$65 · Personalized art',
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=200&q=80',
    rank: 6,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Hand-poured Soy Candles',
    subtitle: '$24 · Cozy scents',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=200&q=80',
    rank: 7,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Vintage Brass Mirror',
    subtitle: '$48 · Antique vibe',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=200&q=80',
    rank: 8,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Crochet Baby Blanket',
    subtitle: '$36 · Soft pastels',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=200&q=80',
    rank: 9,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
  {
    title: 'Hand-painted Coffee Mugs',
    subtitle: '$18 · Artisan ceramics',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=200&q=80',
    rank: 10,
    platform: 'Etsy',
    url: 'https://www.etsy.com',
  },
];

const normalizeProduct = (product, index) => ({
  title: product.title,
  subtitle: `$${product.price} · ${product.category}`,
  image: product.thumbnail,
  rank: index + 1,
  platform: 'Etsy',
  url: `https://www.etsy.com/search?q=${encodeURIComponent(product.title)}`,
});

export const fetchEtsyTrends = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=10');
    if (!response.ok) {
      throw new Error('Failed to load Etsy trends');
    }
    const data = await response.json();
    const items = data.products?.map(normalizeProduct);

    if (!items || items.length === 0) {
      return {
        title: 'Etsy Trending Products',
        subtitle: 'Curated picks (fallback)',
        items: fallbackProducts,
      };
    }

    return {
      title: 'Etsy Trending Products',
      subtitle: 'Live snapshot with fallback support',
      items,
    };
  } catch (error) {
    return {
      title: 'Etsy Trending Products',
      subtitle: 'Curated picks (fallback)',
      items: fallbackProducts,
    };
  }
};
