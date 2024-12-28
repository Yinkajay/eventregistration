import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const Signin = () => {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
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

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)



    const handleChange = (e) => {
        // validateInputs()
        const { name, value } = e.target
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }))
    }

    const validateInputs = () => {
        let valid = true
        const tempErrorState = {
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

        if (userInfo.email.trim().length === 0 || !userInfo.email.includes('@')) {
            console.log('Invalid email')
            tempErrorState.email = true
            valid = false
        }

        if (userInfo.password.length < 5) {
            console.log('Invalid password')
            tempErrorState.password = {
                value: true,
                message: 'Password must be greater than 5 characters'
            };
            valid = false;
        }

        setError(tempErrorState)

        return valid
    }

    const signinHandler = async (e) => {
        e.preventDefault()
        if (!validateInputs()) return

        // const tempErrorState = {
        //     email: false,
        //     password: {
        //         value: false,
        //         message: ''
        //     },
        //     serverError: {
        //         value: false,
        //         message: ''
        //     }
        // }

        setError((prevError) => ({
            ...prevError,
            serverError: {
                value: false,
                message: ''
            }
        }));


        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userInfo.email,
                    password: userInfo.password
                })
            })

            if (!response.ok) {
                // Extract error details from the response if available
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log('Login successful:', data);
            setIsLoggedIn(true)
            navigate('/dashboard');
        } catch (error) {
            // tempErrorState.serverError = {
            //     value: true,
            //     message: error.message
            // }
            setError((prevError) => ({
                ...prevError,
                serverError: {
                    value: true,
                    message: error.message
                }
            }));
            console.log('Error trying to login', error.message)
        }
    }
    return (
        <>
            <br />
            <label>Email Address <br />
                <input onChange={handleChange} className="border-2 pl-3 pr-8 py-2" type="email" placeholder="example@gmail.com" name="email" value={userInfo.email} />
            </label>
            {error.email && <p className="text-xs mt-2 text-red-500">Email is invalid</p>}
            <br />
            <label>Password<br />
                <input onChange={handleChange} className="border-2 pl-3 pr-8 py-2" type="password" placeholder="********" name="password" value={userInfo.password} />
            </label>
            {error.password.value && <p className="text-xs mt-2 text-red-500">{error.password.message}</p>}
            <br />
            {error.serverError.value && <p className="text-xs mt-2 text-red-500">{error.serverError.message}</p>}
            <button onClick={signinHandler} className="bg-slate-950 border-2 border-black text-white py-2 px-8 mt-4 hover:bg-white hover:text-slate-950 hover:border-2 hover:border-black" type="submit">Log In</button>
        </>
    )
}

export default Signin
