import { NavLink, useNavigate } from "react-router-dom"
import { Home } from "../components/Home"

const Navbar = () => {
    const navigate = useNavigate()

    const goToAuthPage = () => {
        navigate('/auth')
    }

    return (
        <nav className="h-max bg-black p-4 flex justify-between">
            <div className="">
                <h1 className="text-white">Event Master</h1>
            </div>
            <div className="text-white font-bold">
                <NavLink className='mx-3' to='/'>Home</NavLink>
                <NavLink className='mx-3' to='/events'>Events</NavLink>
                <NavLink className='mx-3' to='/dashboard'>Dashboard</NavLink>
            </div>
            <div className="">
                <button className="bg-white text-sm p-1 text-black" onClick={goToAuthPage}>Sign In</button>
            </div>
        </nav>
    )
}

export default Navbar