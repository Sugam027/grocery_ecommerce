import {React, useState, useEffect} from 'react'
import { useContextProvider } from '../../context/AppContext';
import toast from 'react-hot-toast';
import API from '../../API';

const AdminLogin = () => {
    const {isAdmin, setIsAdmin, navigate, axios} = useContextProvider()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) =>{
        try {
            event.preventDefault();
            const {data} = await API.post('/api/admin/login', {email, password})
            if(data.success){
                setIsAdmin(true)
                navigate('/admin')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() =>{
        if(isAdmin){
            navigate("/admin");
        }
    }, [isAdmin, navigate])

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-gray-100'>
            <form onSubmit={onSubmitHandler} className="relative flex flex-col gap-4 m-auto p-8 py-8 text-center w-80 sm:w-[500px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <span className='absolute top-2 right-2 hover:opacity-50' onClick={() => navigate("/")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                    </svg>
                </span>
                <h1 className="text-gray-900 text-3xl mt-5 font-medium">Login</h1>
                <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                    </svg>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email id" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
                </div>

                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                    </svg>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
                </div>
                <div className="mt-5 text-left text-indigo-500">
                    <a className="text-sm" href="#">Forgot password?</a>
                </div>
                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                    Login
                </button>
            </form>
        </div>
    )
}

export default AdminLogin