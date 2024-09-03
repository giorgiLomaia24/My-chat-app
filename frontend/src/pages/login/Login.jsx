import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

function Login() {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const { loading,login} = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({userName,password});

    }
    return (
        <div className="flex flex-col items-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">Login  <span className="text-blue-500">ChatAPP</span></h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2"><span className="text-base label-text text-gray-300">Username</span></label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label p-2"><span className="text-base label-text text-gray-300">Password</span></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                   <h6 className='mt-2'> Don't have an account? <Link to={'/signup'} className="link link-warning">register</Link></h6> 
                   <button  type="submit" className="btn btn-block btn-sm mt-2">Login</button>

                </form>
            </div>
        </div>
    )
}

export default Login