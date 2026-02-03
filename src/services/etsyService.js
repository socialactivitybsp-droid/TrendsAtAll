const normalizeProduct = (product, index) => ({
  title: product.title,
  subtitle: `$${product.price} · ${product.category}`,
  image: product.image || product.thumbnail || '',
  rank: index + 1,
  platform: 'Etsy',
  url: `https://www.etsy.com/search?q=${encodeURIComponent(product.title)}`,
});

const fetchPrimaryProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=10');
  if (!response.ok) {
    throw new Error('Failed to load Etsy trends');
  }
  return response.json();
};

const fetchSecondaryProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=10');
  if (!response.ok) {
    throw new Error('Failed to load Etsy trends');
  }
  return response.json();
};

const mapProducts = (data) => {
  const items = (data.products || data || []).map(normalizeProduct);
  return items.slice(0, 10);
};

export const fetchEtsyTrends = async () => {
  try {
    const primaryData = await fetchPrimaryProducts();
    const items = mapProducts(primaryData);
    if (items.length === 0) {
      throw new Error('No Etsy trends found');
    }
    return {
      title: 'Etsy Trending Products',
      subtitle: 'Live marketplace snapshot',
      items,
    };
  } catch (error) {
    const secondaryData = await fetchSecondaryProducts();
    const items = mapProducts(secondaryData);
    return {
      title: 'Etsy Trending Products',
      subtitle: 'Live marketplace snapshot (backup feed)',
      items,
    };
  }
};
