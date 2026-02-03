const normalizeProduct = (product, index) => ({
  title: product.title,
  subtitle: `₹${product.price} · ${product.category}`,
  image: product.thumbnail || product.image || '',
  rank: index + 1,
  platform: 'Flipkart',
  url: `https://www.flipkart.com/search?q=${encodeURIComponent(product.title)}`,
});

const fetchPrimaryProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=10&skip=10');
  if (!response.ok) {
    throw new Error('Failed to load Flipkart trends');
  }
  return response.json();
};

const fetchSecondaryProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=10');
  if (!response.ok) {
    throw new Error('Failed to load Flipkart trends');
  }
  return response.json();
};

const mapProducts = (data) => {
  const items = (data.products || data || []).map(normalizeProduct);
  return items.slice(0, 10);
};

export const fetchFlipkartTrends = async () => {
  try {
    const primaryData = await fetchPrimaryProducts();
    const items = mapProducts(primaryData);
    if (items.length === 0) {
      throw new Error('No Flipkart trends found');
    }
    return {
      title: 'Flipkart Best Sellers',
      subtitle: 'Live commerce snapshot',
      items,
    };
  } catch (error) {
    const secondaryData = await fetchSecondaryProducts();
    const items = mapProducts(secondaryData);
    return {
      title: 'Flipkart Best Sellers',
      subtitle: 'Live commerce snapshot (backup feed)',
      items,
    };
  }
};
