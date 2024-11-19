import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../UI/LoadingSpinner"

const Signup = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: {
            value: false,
            message: ''
        },
        serverError: {
            value: false,
            message: ''
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }))
    }

    const validateErrors = () => {
        let valid = true

        const tempErrorState = {
            firstName: false,
            lastName: false,
            email: false,
            password: {
                value: false,
                message: ''
            },
            serverError: {
                value: false,
                message: ''
            }
        }

        if (userInfo.firstName.trim().length < 3) {
            console.log('Invalid first name')
            tempErrorState.firstName = true
            valid = false
        }

        if (userInfo.lastName.trim().length < 3) {
            console.log('Invalid last name')
            tempErrorState.lastName = true
            valid = false
        }

        if (userInfo.email.trim().length === 0 || !userInfo.email.includes('@')) {
            console.log('Invalid email')
            tempErrorState.email = true
            valid = false
        }
        if (userInfo.password.length < 5) {
            tempErrorState.password = {
                value: true,
                message: 'Password must be greater than 5 characters'
            };
            valid = false;
        } else if (userInfo.password !== userInfo.confirmPassword) {
            tempErrorState.password = {
                value: true,
                message: 'Passwords do not match'
            };
            valid = false;
        }

        setError(tempErrorState)
        return valid
    }

    const signupHandler = async (e) => {
        e.preventDefault()

        if (!validateErrors()) return

        if (error.firstName || error.lastName || error.email || error.password.value) {
            return
        }

        setLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: userInfo.firstName,
                    last_name: userInfo.lastName,
                    email: userInfo.email,
                    password: userInfo.password
                })
            })

            console.log(response)
            if (!response.ok) {
                const errorText = await response.text();  // Capture error response in text
                throw new Error(`Server Error: ${response.status}. Message: ${errorText}`);
            }
            const data = await response.json()
            console.log(data)
            setLoading(false)
            navigate('/check-email')


        } catch (error) {
            setError(prev => ({
                ...prev,
                serverError: {
                    value: true,
                    message: error.message
                }
            }))
            console.error('Error during signup request:', error.message);
        }
        setLoading(false)
    }

    return (
        <>
            <label>First Name <br />
                <input
                    onChange={handleChange}
                    name="firstName"
                    className="border-2 pl-3 pr-8 py-2"
                    type="text"
                    placeholder="First Name"
                    value={userInfo.firstName}
                />
            </label>
            {error.firstName && <p className="text-xs mt-2 text-red-500">First Name has to be more than 2 characters</p>}
            <label className="block">Last Name <br />
                <input
                    onChange={handleChange}
                    name="lastName"
                    className="border-2 pl-3 pr-8 py-2"
                    type="text"
                    placeholder="Last Name"
                    value={userInfo.lastName}
                />
            </label>
            {error.lastName && <p className="text-xs mt-2 text-red-500">Last Name has to be more than 2 characters</p>}
            <label className="block">Email Address <br />
                <input
                    onChange={handleChange}
                    name='email'
                    className="border-2 pl-3 pr-8 py-2"
                    type="text"
                    placeholder="example@gmail.com"
                    value={userInfo.email}
                />
            </label>
            {error.email && <p className="text-xs mt-2 text-red-500">Email is invalid</p>}
            <label className="block">Password<br />
                <input
                    onChange={handleChange}
                    name="password"
                    className="border-2 pl-3 pr-8 py-2"
                    type="password"
                    placeholder="********"
                    value={userInfo.password}
                />
            </label>
            {error.password.value && <p className="text-xs mt-2 text-red-500">{error.password.message}</p>}
            <label>Confirm Password<br />
                <input
                    name="confirmPassword"
                    onChange={handleChange}
                    className="border-2 pl-3 pr-8 py-2"
                    type="password"
                    placeholder="********"
                    value={userInfo.confirmPassword}
                />
                {error.password.value && <p className="text-xs mt-2 text-red-500">{error.password.message}</p>}
            </label>
            <br />
            <button className="bg-slate-950 border-2 border-black text-white py-2 px-8 mt-4 hover:bg-white hover:text-slate-950 hover:border-2 hover:border-black" type="submit" onClick={signupHandler}>{loading ? < LoadingSpinner />:'Sign Up'}</button>
            {error.serverError.value && <p className="text-xs mt-2 text-red-500">{error.serverError.message}</p>}
        </>
    )
}

export default Signup
