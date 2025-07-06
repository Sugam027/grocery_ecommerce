import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContextProvider } from '../context/AppContext';
import Card from '../components/Card';

const SearchResultsPage = () => {
  const { products } = useContextProvider();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('text')?.toLowerCase() || '';

  const filtered = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description?.join(' ').toLowerCase().includes(query))
    );
  });

  return (
    <section className="px-4 md:px-12 lg:px-16 xl:px-16 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-[#4CB944]">"{query}"</span>
      </h2>
      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {filtered.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResultsPage;
