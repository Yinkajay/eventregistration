import { useState } from "react"

const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const signupHandler = () => {

    }

    return (
        <>
            <label>First Name <br />
                <input onChange={(e, currentInfo) => ''} className="border-2 pl-3 pr-8 py-2" type="text" placeholder="First Name" />
            </label>
            <br />
            <label>Last Name <br />
                <input className="border-2 pl-3 pr-8 py-2" type="text" placeholder="Last Name" />
            </label>
            <br />
            <label>Email Address <br />
                <input className="border-2 pl-3 pr-8 py-2" type="text" placeholder="example@gmail.com" />
            </label>
            <br />
            <label>Password<br />
                <input className="border-2 pl-3 pr-8 py-2" type="text" placeholder="********" />
            </label>
            <br />
            <label>Confirm Password<br />
                <input className="border-2 pl-3 pr-8 py-2" type="text" placeholder="********" />
            </label>
            <br />
            <button className="bg-slate-950 border-2 border-black text-white py-2 px-8 mt-4 hover:bg-white hover:text-slate-950 hover:border-2 hover:border-black" type="submit">Sign Up</button>
        </>
    )
}

export default Signup
