import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Card from '../components/Card'
import { useContextProvider } from "../context/AppContext";

const AllProducts = () => {
    const { products, categories, navigate } = useContextProvider();
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 12

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const [tempMinPrice, setTempMinPrice] = useState(0);
    const [tempMaxPrice, setTempMaxPrice] = useState(1000);
    const [tempCategories, setTempCategories] = useState([]);

    const [filtersApplied, setFiltersApplied] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleMinChange = (value) => {
        const val = Math.min(Number(value), tempMaxPrice);
        setTempMinPrice(val);
    };

    const handleMaxChange = (value) => {
        const val = Math.max(Number(value), tempMinPrice);
        setTempMaxPrice(val);
    };

    const handleTempCategoryChange = (category) => {
        if (tempCategories.includes(category)) {
        setTempCategories(tempCategories.filter(c => c !== category));
        } else {
        setTempCategories([...tempCategories, category]);
        }
    };

    const applyFilters = () => {
        setMinPrice(tempMinPrice);
        setMaxPrice(tempMaxPrice);
        setSelectedCategories(tempCategories);
        setFiltersApplied(true);
        setCurrentPage(0);
    };

    const resetFilters = () => {
        setTempMinPrice(0);
        setTempMaxPrice(1000);
        setTempCategories([]);
        setMinPrice(0);
        setMaxPrice(1000);
        setSelectedCategories([]);
        setFiltersApplied(false);
        setCurrentPage(0);
    };

    const filteredProducts = products.filter(product => {
        const priceMatch = product.offerPrice >= minPrice && product.offerPrice <= maxPrice;
        const categoryName = product.category?.name || product.category; 

        const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(categoryName);

        return priceMatch && categoryMatch;
    });

    const displayedProducts = filtersApplied ? filteredProducts : products;

    const pageCount = Math.ceil(displayedProducts.length / itemsPerPage);
    const start = currentPage * itemsPerPage;
    const currentItems = displayedProducts.slice(start, start + itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
        <section>
      <div className="px-4 md:px-12 lg:px-16 xl:px-16 py-4">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
            dicta incidunt est ipsam, officia dolor fugit natus?
          </p>
        </header>

        <div className="mt-8 block lg:hidden">
          <button
            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span className="text-sm font-medium"> Filters & Sorting </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 rtl:rotate-180"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="mt-4 lg:mt-8 flex justify-between lg:gap-8">
            <div className="hidden space-y-4 lg:block w-1/4">
                <div>
                    <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700"> Sort By </label>

                    <select id="SortBy" className="mt-1 rounded-sm border-gray-300 text-sm">
                    <option value="Title, DESC">Title, DESC</option>
                    <option value="Title, ASC">Title, ASC</option>
                    <option value="Price, DESC">Price, DESC</option>
                    <option value="Price, ASC">Price, ASC</option>
                    </select>
                </div>
                <div>
                <p className="block text-xs font-medium text-gray-700">Filters</p>

                <div className="mt-1 space-y-2">
                    {/* Price Range */}
                    <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                            <span className="text-sm font-medium"> Price Range </span>
                            <span className="transition group-open:-rotate-180">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white p-4 space-y-4">
                            <div className="flex justify-between gap-2">
                                <div className="flex-1 ">
                                <input
                                    type="number"
                                    min="0"
                                    value={tempMinPrice}
                                    onChange={(e) => handleMinChange(e.target.value)}
                                    className="w-full text-center border rounded-full px-4 py-2 text-sm text-gray-700"
                                    placeholder="Rs 0"
                                />
                            </div>
                            <span className="text-gray-500 text-xl">–</span>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    min="0"
                                    value={tempMaxPrice}
                                    onChange={(e) => handleMaxChange(e.target.value)}
                                    className="w-full text-center border rounded-full px-4 py-2 text-sm text-gray-700"
                                    placeholder="Rs 0"
                                />
                                </div>
                            </div>
                        
                        </div>
                    </details>

                    {/* Category */}
                    <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                            <span className="text-sm font-medium"> Category </span>
                            <span className="transition group-open:-rotate-180">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white p-4 space-y-2">
                            {categories.map((cat, index) => (
                                <div key={index}>
                                    <label className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="size-5 rounded-sm border-gray-300 shadow-sm accent-green-600"
                                        checked={tempCategories.includes(cat.name)}
                                        onChange={() => handleTempCategoryChange(cat.name)}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </details>

                    {/* Pack Size / Weight */}
                    {/* <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                            <span className="text-sm font-medium"> Pack Size / Weight </span>
                            <span className="transition group-open:-rotate-180">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white p-4 space-y-2">
                            {["250g", "500g", "1kg", "5kg", "Pack of 2", "Pack of 5"].map((size, index) => (
                            <div key={index}>
                                <label className="inline-flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="size-5 rounded-sm border-gray-300 shadow-sm"
                                    checked={tempSizes.includes(size)}
                                    onChange={() => handleTempSizeChange(size)}
                                />
                                <span className="text-sm font-medium text-gray-700">{size}</span>
                                </label>
                            </div>
                            ))}
                        </div>
                    </details> */}

                </div>
                    <div className="flex gap-4 mt-4">
                    <button
                        className="flex-1 bg-[#4CB944] text-white py-2 px-4 rounded cursor-pointer"
                        onClick={applyFilters}
                    >
                        Apply
                    </button>

                    <button
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-pointer"
                        onClick={resetFilters}
                    >
                        Reset
                    </button>
                    </div>
                </div>


            </div>
          
            <div className="w-3/4">
                <div className="flex gap-4 flex-wrap">
                    {currentItems.length === 0 ? (
                        <p>No products found.</p>
                        ) : (
                        currentItems.map(product => (
                            <Card key={product._id} product={product} />
                        ))
                    )}

                </div>

                <div className="mt-6 flex justify-center">
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName="flex space-x-2"
                        activeClassName="font-bold text-[#4CB944]"
                        pageLinkClassName="px-3 py-1 block w-full h-full hover:text-gray-500"
                        previousLinkClassName="px-3 py-1 block w-full h-full hover:text-gray-500"
                        nextLinkClassName="px-3 py-1 block w-full h-full hover:text-gray-500"
                        previousLabel="←"
                        nextLabel="→"
                        pageClassName=" border rounded cursor-pointer"
                        previousClassName="border rounded cursor-pointer"
                        nextClassName="border rounded cursor-pointer"
                        breakLabel="..."
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                    />
                </div>
            </div>
        </div>
      </div>
    </section>

        </>
    )
}

export default AllProducts