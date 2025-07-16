import {React, useState} from 'react'
import logo from '../assets/tajaghar_logo.png'
import { useContextProvider } from '../context/AppContext';
import API from '../API';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { navigate, getCartCount, setCartItems, setShowUserLogin, user, setUser } = useContextProvider();

    const handleSearch = (e) => {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    if (searchQuery.trim()) {
      navigate(`/search?text=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

    const logoutUser = async() => {
        try {
            const {data} = await API.get('/api/user/logout');
            if(data.success){
                toast.success('Logged out successfully');
                setShowUserLogin(false)
                setUser(false)
                setCartItems({});
                navigate('/');
            }else{
                toast.error('Logged out failed');
            }
        } catch (err) {
            toast.error('Logged out failed');
            console.log("fail")
            console.error("Logout failed", err);
            navigate('/');
        }
    };

  return (
    <>
    <nav className="flex items-center justify-between px-4 md:px-12 lg:px-16 xl:px-16 py-4 border-b border-gray-300 bg-white relative transition-all">
        <div className='w-[250px]'>
            <a href="/">
                <img className="w-full object-cover" src={logo} alt="tajagharlogo"/>
            </a>
        </div>
        <div className="sm:flex items-center gap-8 w-md" >
            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-md" style={{width: '100%'}}>
                <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search ..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
                }} />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleSearch}>
                    <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
        <div className="flex items-center gap-10">
            {/* <div className="relative cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" fill='#4CB944'>
                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" stroke="#4CB944" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div> */}
            <div className=" relative cursor-pointer" onClick={() => {navigate("/cart"); scrollTo(0,0)}}>
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#4CB944" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button className="absolute cursor-pointer -top-2 -right-3 text-xs text-white bg-[#4CB944] w-[18px] h-[18px] rounded-md">{getCartCount()}</button>
            </div>
            {user ? (
                <div className="relative group cursor-pointer">
                    <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4CB944" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                    </div>
                    {/* Optional dropdown */}
                    {dropdownOpen && (
                        <div className="absolute flex flex-col bg-white border shadow-md right-0 mt-2 w-32 z-10">
                        <button onClick={() => navigate("/profile")} className="px-4 py-2 hover:bg-gray-100 text-sm text-left">Profile</button>
                        <button onClick={() => navigate("/order")} className="px-4 py-2 hover:bg-gray-100 text-sm text-left">Orders</button>
                        <button onClick={() => logoutUser()} className="px-4 py-2 hover:bg-gray-100 text-sm text-left text-red-500">Logout</button>
                        </div>
                    )}
                </div>
            
            ) : (
            <button className="cursor-pointer px-8 py-2 bg-[#4CB944] hover:bg-[#417B38] transition text-white rounded-md"  onClick={() => {setShowUserLogin(true)}}>
                Login
            </button>
            )}
        </div>

            

            {/* <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button> */}

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <a href="/" className="block">Home</a>
                <a href="/shop" className="block">Shop</a>
                <a href="/shop" className="block">Shop</a>
                <a href="/shop" className="block">Shop</a>
                <a href="/shop" className="block">Shop</a>
                <a href="/shop" className="block">Shop</a>
                {user ? (
                <div className="relative group cursor-pointer">
                    <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4CB944" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                    </div>
                    {/* Optional dropdown */}
                    {dropdownOpen && (
                        <div className="absolute flex flex-col bg-white border shadow-md right-0 mt-2 w-32 z-10">
                        <button onClick={() => navigate("/profile")} className="px-4 py-2 hover:bg-gray-100 text-sm text-left">Profile</button>
                        <button onClick={() => navigate("/orders")} className="px-4 py-2 hover:bg-gray-100 text-sm text-left">Orders</button>
                        <button onClick={() => logoutUser()} className="px-4 py-2 hover:bg-gray-100 text-sm text-left text-red-500">Logout</button>
                        </div>
                    )}
                </div>
                ) : (
                <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-md"  onClick={() => {setShowUserLogin(true)}}>
                    Login
                </button>
                )}
            </div>

    </nav>
    <nav className="flex items-center justify-center px-4 md:px-12 lg:px-16 xl:px-16 py-4 border-b border-gray-300 bg-white relative transition-all">
        <div className="flex items-center gap-8">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/products/vegetables">Vegetables</a>
            <a href="/products/fruits">Fruits</a>
            <a href="/products/bakery-and-dairy">Bakery & Dairy</a>
            <a href="/products/cooking-oil">Cooking oil</a>
            <a href="/products/biscuits-and-coolies">Biscuits & Cookies</a>
            <a href="/products/fruits-juice">Fruits juice</a>
        </div>
    </nav>
    

    </>

  )
}

export default Navbar