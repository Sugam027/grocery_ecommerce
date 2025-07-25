import React, { useRef, useEffect, useState } from 'react';
import logo from '../../assets/tajaghar_logo.png'
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import API from '../../API';
import { useContextProvider } from '../../context/AppContext';

const AdminLayout = () => {
  const loadingRef = useRef(null);
  const location = useLocation();
  const [loadingDone, setLoadingDone] = useState(false);
  const {navigate} = useContextProvider();

  const isActive = (path) => location.pathname === path;

  // Start loading bar when route changes
  useEffect(() => {
    setLoadingDone(false); // Hide content
    loadingRef.current?.continuousStart();
    const timer = setTimeout(() => loadingRef.current?.complete(), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Called when loading bar finishes
  const handleLoaderFinish = () => {
    setLoadingDone(true); // Now show the content
  };

  const handleLogout = async() => {
    await API.get('/api/admin/logout');
    localStorage.removeItem("isAdmin");
    navigate('/admin-login'); // Redirect to login
};

  return (
    <>
    <LoadingBar
        color="#4CB944"
        ref={loadingRef}
        height={3}
        onLoaderFinished={handleLoaderFinish}
    />
    {loadingDone ? (
    <div className="flex flex-1 bg-gray-50 min-h-screen">
        <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
                <div className="flex items-center flex-shrink-0 px-4">
                    <img className="w-auto h-8" src={logo} alt="" />
                </div>

                <div className="px-4 mt-8">
                    <label htmlFor="" className="sr-only"> Search </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>

                        <input type="search" name="" id="" className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                    </div>
                </div>

                <div className="px-4 mt-6">
                    <hr className="border-gray-200" />
                </div>

                <div className="flex flex-col flex-1 px-3 mt-6">
                    <div className="space-y-4">
                        <nav className="flex-1 space-y-2">
                            <a
                                href="/admin"
                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 ${
                                    isActive("/admin")
                                    ? "bg-[#4CB944] text-white"
                                    : "text-gray-900 hover:bg-[#4CB944] hover:text-white"
                                }`}
                                >
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </a>

                            {/* <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Tickets
                            </a> */}

                            {/* <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Agents
                            </a> */}

                            {/* <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Customers
                                <svg className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a> */}
                        </nav>

                        <hr className="border-gray-200" />

                        <nav className="flex-1 space-y-2">
                            <a
                                href="/admin/category"
                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 ${
                                    isActive("/admin/category")
                                    ? "bg-[#4CB944] text-white"
                                    : "text-gray-900 hover:bg-[#4CB944] hover:text-white"
                                }`}
                                >
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                Category
                            </a>
                            <a
                                href="/admin/products"
                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 ${
                                    isActive("/admin/products")
                                    ? "bg-[#4CB944] text-white"
                                    : "text-gray-900 hover:bg-[#4CB944] hover:text-white"
                                }`}
                                >
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                                Products
                            </a>

                            <a
                                href="/admin/orders"
                                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200 ${
                                    isActive("/admin/orders")
                                    ? "bg-[#4CB944] text-white"
                                    : "text-gray-900 hover:bg-[#4CB944] hover:text-white"
                                }`}
                                >
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Orders
                            </a>

                            {/* <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Analytics
                                <svg className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a> */}
                        </nav>

                        <hr className="border-gray-200" />

                        {/* <nav className="flex-1 space-y-2">
                            <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                <svg className="flex-shrink-0 w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>  
                                Settings
                            </a>
                        </nav> */}
                    </div>

                    <div className="pb-4 mt-20">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
                    >
                        <img
                        className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
                        alt=""
                        />
                        Jacob Jones
                        <svg
                        className="w-5 h-5 ml-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full mt-2 px-4 py-2 text-sm font-medium text-left text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                        🔓 Logout
                    </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col flex-1">
            <main>
                <div className="py-6">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    </div>

    ): (
        <>
            <div className="min-h-screen flex bg-gray-100 animate-pulse">
            {/* Sidebar Skeleton */}
            <div className="w-64 bg-white p-4 hidden md:block">
                <div className="h-8 bg-gray-300 rounded mb-6"></div>
                <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded w-3/4"></div>
                ))}
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 p-6">
                {/* <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div className="p-4 bg-white rounded-lg shadow-md">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                ))}
                </div> */}
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
                <div className="p-4 h-2/3 bg-white rounded-lg shadow-md">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
            </div>
        </>
    )}
    </>
  )
}

export default AdminLayout