import { useNavigate } from "react-router-dom"
import Navbar from "../UI/Navbar"

export const Home = () => {
    const navigate = useNavigate()

    const goToAuthPage = () => {
        navigate('/auth')
    }
    return (
        <>
            {/* <nav className="h-max bg-black py-4 flex justify-center">
                <h1>Event Master</h1>
                <button className="bg-white p-1 text-black" onClick={goToAuthPage}>Sign In</button>
            </nav> */}
            <Navbar />
            <h1>Register for the hottest events today!</h1>



            {/* <h1 className='text-2xl w-max mx-auto mb-4'>Auth Form</h1>
            <section className='bg-blue-200 md:w-1/2 lg:w-1/3 mx-auto rounded-lg'>
                <div className="flex justify-evenly rounded-t-lg bg-blue-50">
                    <div className={`rounded-t-lg cursor-pointer py-4 text-center flex-1 ${mode === 'sign up' ? 'bg-slate-950 text-white' : ''}`} onClick={() => switchMode('sign up')}>Sign Up</div>
                    <div className={`rounded-t-lg cursor-pointer py-4 text-center flex-1 ${mode === 'sign in' ? 'bg-slate-950 text-white' : ''}`} onClick={() => switchMode('sign in')}>Log In</div>
                </div>
                <form className='text-center p-4'>
                    {mode == 'sign up' ? <Signup /> : <Signin />}
                </form>
            </section> */}
        </>
    )
}