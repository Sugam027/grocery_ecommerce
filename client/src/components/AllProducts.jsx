import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Card from '../components/Card'
import { useContextProvider } from "../context/AppContext";

// const items = Array.from({ length: 100 }, (_, i) => i + 1) 
const AllProducts = () => {
    const { products, categories, addToCart, removeFromCart, cartItems, navigate } = useContextProvider();
    const [currentPage, setCurrentPage] = useState(0)
    const maxLimit = 1000;
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const itemsPerPage = 12
    const pageCount = Math.ceil(products.length / itemsPerPage)

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const start = currentPage * itemsPerPage
    const currentItems = products.slice(start, start + itemsPerPage)

    const handleMinChange = (value) => {
    const val = Math.min(Number(value), maxPrice);
        setMinPrice(val);
    };

    const handleMaxChange = (value) => {
        const val = Math.max(Number(value), minPrice);
        setMaxPrice(val);
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
                {/* <div>
                    <p className="block text-xs font-medium text-gray-700">Filters</p>

                    <div className="mt-1 space-y-2">
                    <details
                        className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                    >
                        <summary
                        className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                        >
                        <span className="text-sm font-medium"> Availability </span>

                        <span className="transition group-open:-rotate-180">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                            </svg>
                        </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                        <header className="flex items-center justify-between p-4">
                            <span className="text-sm text-gray-700"> 0 Selected </span>

                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                            Reset
                            </button>
                        </header>

                        <ul className="space-y-1 border-t border-gray-200 p-4">
                            <li>
                            <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterInStock"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                            </label>
                            </li>

                            <li>
                            <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterPreOrder"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                            </label>
                            </li>

                            <li>
                            <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterOutOfStock"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                            </label>
                            </li>
                        </ul>
                        </div>
                    </details>

                    <details
                        className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                    >
                        <summary
                        className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                        >
                        <span className="text-sm font-medium"> Price </span>

                        <span className="transition group-open:-rotate-180">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                            </svg>
                        </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                        <header className="flex items-center justify-between p-4">
                            <span className="text-sm text-gray-700"> The highest price is $600 </span>

                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                            Reset
                            </button>
                        </header>

                        <div className="border-t border-gray-200 p-4">
                            <div className="flex justify-between gap-4">
                            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">$</span>

                                <input
                                type="number"
                                id="FilterPriceFrom"
                                placeholder="From"
                                className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                                />
                            </label>

                            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">$</span>

                                <input
                                type="number"
                                id="FilterPriceTo"
                                placeholder="To"
                                className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                                />
                            </label>
                            </div>
                        </div>
                        </div>
                    </details>

                    <details
                        className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                    >
                        <summary
                        className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                        >
                        <span className="text-sm font-medium"> Colors </span>

                        <span className="transition group-open:-rotate-180">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                            </svg>
                        </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                        <header className="flex items-center justify-between p-4">
                            <span className="text-sm text-gray-700"> 0 Selected </span>

                            <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                            Reset
                            </button>
                        </header>

                        <ul className="space-y-1 border-t border-gray-200 p-4">
                            <li>
                            <label htmlFor="FilterRed" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterRed"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Red </span>
                            </label>
                            </li>

                            <li>
                            <label htmlFor="FilterBlue" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterBlue"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Blue </span>
                            </label>
                            </li>

                            <li>
                            <label htmlFor="FilterGreen" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterGreen"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Green </span>
                            </label>
                            </li>

                            <li>
                            <label htmlFor="FilterOrange" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterOrange"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Orange </span>
                            </label>
                            </li>

                            <li>
                            <label htmlFor="FilterPurple" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterPurple"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Purple </span>
                            </label>
                            </li>

                            <li>
                            <label htmlFor="FilterTeal" className="inline-flex items-center gap-2">
                                <input
                                type="checkbox"
                                id="FilterTeal"
                                className="size-5 rounded-sm border-gray-300 shadow-sm"
                                />

                                <span className="text-sm font-medium text-gray-700"> Teal </span>
                            </label>
                            </li>
                        </ul>
                        </div>
                    </details>
                    </div>
                </div> */}

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
                        <div className="relative mb-4 h-2 mt-2 bg-gray-300 rounded-full">
                            <div
                            className="absolute h-3 bg-green-500 rounded-full"
                            style={{
                                left: `${(minPrice / maxLimit) * 100}%`,
                                width: `${((maxPrice - minPrice) / maxLimit) * 100}%`,
                            }}
                            ></div>
                            <input type="range"
                                min="0"
                                max={maxLimit}
                                value={minPrice}
                                onChange={(e) => handleMinChange(e.target.value)}
                                className="absolute w-full pointer-events-none appearance-none bg-transparent"
                                style={{ zIndex: 3, marginTop: "-2px" }}
                            />
                            <input
                                type="range"
                                min="0"
                                max={maxLimit}
                                value={maxPrice}
                                onChange={(e) => handleMaxChange(e.target.value)}
                                className="absolute w-full pointer-events-none appearance-none bg-transparent"
                                style={{ zIndex: 2, marginTop: "-2px" }}
                            />
                        </div>
                            <div className="flex justify-between gap-2">
                                <div className="flex-1 ">
                                <input
                                    type="number"
                                    min="0"
                                    max={maxLimit}
                                    value={minPrice}
                                    onChange={(e) => handleMinChange(e.target.value)}
                                    className="w-full text-center border rounded-full px-4 py-2 text-sm text-gray-700"
                                    placeholder="AED 0"
                                />
                                </div>
                                <span className="text-gray-500 text-xl">–</span>
                                <div className="flex-1">
                                <input
                                    type="number"
                                    min="0"
                                    max={maxLimit}
                                    value={maxPrice}
                                    onChange={(e) => handleMaxChange(e.target.value)}
                                    className="w-full text-center border rounded-full px-4 py-2 text-sm text-gray-700"
                                    placeholder={`AED ${maxPrice}`}
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
                            <label  className="inline-flex items-center gap-2">
                                <input type="checkbox" className="size-5 rounded-sm border-gray-300 shadow-sm" />
                                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                            </label>
                        </div>
                        ))}
                    </div>
                    </details>

                    {/* Pack Size / Weight */}
                    <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
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
                                <input type="checkbox" className="size-5 rounded-sm border-gray-300 shadow-sm" />
                                <span className="text-sm font-medium text-gray-700">{size}</span>
                            </label>
                        </div>
                        ))}
                    </div>
                    </details>

                </div>
                </div>


            </div>

          
          
            <div className="w-3/4">
            <div className="flex gap-4 flex-wrap">
                {currentItems.map((product) => (
                    <Card key={product.id} product={product} />
                ))}

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