import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

function Signup() {
    const [inputs, setInputs] = useState({
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });
    const {loading,signup } = useSignup();
    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender: gender });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }
    return (
        <div className="flex flex-col items-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">Sign Up  <span className="text-blue-500">ChatAPP</span></h1>
                <form onSubmit={handleSubmit}>
                <div>
                        <label className="label p-2"><span className="text-base label-text text-gray-300">Full Name</span></label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="label p-2"><span className="text-base label-text text-gray-300">Username</span></label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={inputs.userName}
                            onChange={(e) => setInputs({...inputs, userName: e.target.value})}/>
                    </div>
                    <div>
                        <label className="label p-2"><span className="text-base label-text text-gray-300">Password</span></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                    </div>
                    <div>
                        <label className="label p-2"><span className="text-base label-text text-gray-300">Confirm Password</span></label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="input input-bordered input-info w-full max-w-xs"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}/>
                    </div>
                    <GenderCheckBox handleCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                    <h6 className='mt-2 text-gray-300'> Already have an account? <Link to={'/login'} className="link link-warning">Login</Link></h6>
                    <button type='submit' className="btn btn-block btn-sm mt-2">Sign up</button>

                </form>
            </div>

        </div>
    )
}

export default Signup