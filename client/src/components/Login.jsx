import React from 'react'
import { useContextProvider } from '../context/AppContext';
import toast from 'react-hot-toast';
import API from '../API'

const Login = () => {
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {setShowUserLogin, fetchCartFromDB, navigate, setUser, axios} = useContextProvider();

    const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        if (state === "login") {
            const { data } = await API.post('/api/user/login', { email, password });

            if (data.success) {
                toast.success("Login successful!");
                setUser(data.user);
                console.log(data.user);
                await fetchCartFromDB(data.user.id);
                setShowUserLogin(false);
                navigate('/');
            } else {
                if (typeof data.message === 'object') {
                    if (data.message.emailError) toast.error(data.message.emailError);
                    if (data.message.passwordError) toast.error(data.message.passwordError);
                } else {
                    toast.error(data.message || "Login failed");
                }
            }
        } else {
            const { data } = await API.post('/api/user/register', { name, email, password });

            if (data.success) {
                toast.success("Account created! Logging you in...");
                setState('login');
            } else {
                toast.error(data.message || "Registration failed");
            }
        }
    } catch (error) {
        toast.error("Server error: " + error.message);
    }
    };


    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-gray-100'>
            <form onSubmit={onSubmitHandler} className="relative flex flex-col gap-4 m-auto p-8 py-8 text-center w-80 sm:w-[500px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <span className='absolute top-2 right-2 hover:opacity-50' onClick={() => setShowUserLogin(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                    </svg>
                </span>
                <h1 className="text-gray-900 text-3xl mt-5 font-medium">{state === "login" ? "Login" : "Sign Up"}</h1>
                {state === "login" && (
                <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
                )}
                {state === "register" && (
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="11"  fill="none">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" fill="#6B7280"/>
                        </svg>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
                </div>
                )}
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
                {state === "login" && (
                <div className="mt-5 text-left text-indigo-500">
                    <a className="text-sm" href="#">Forgot password?</a>
                </div>
                )}
                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-[#4CB944] hover:opacity-90 transition-opacity">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
                {state === "register" ? (
                    <p className="text-gray-500 text-sm mt-3 mb-11">Already have an account?<span className="text-indigo-500 cursor-pointer " onClick={() => setState("login")}> Login</span></p>
                ) : (
                    <p>
                        Don’t have an account?<span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer text-sm mt-3 mb-11"> Sign up</span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default Login