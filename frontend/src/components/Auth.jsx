import { useState } from "react"
import Signin from "./Signin"
import Signup from "./Signup"
import Navbar from "../UI/Navbar"

const Auth = () => {
    const [mode, setMode] = useState('sign up')
    // const mm = isSigningUp ? 'sign up' : 'sign in'

    const switchMode = (wantedMode) => {
        if (mode === 'sign up' && wantedMode === 'sign up') {
            return
        } else if (mode === 'sign up' && wantedMode !== 'sign up') {
            setMode('sign in')
        } else if (mode === 'sign in' && wantedMode === 'sign in') {
            return
        } else {
            setMode('sign up')
        }
    }

    return (
        <>
        <Navbar/>
            {/* <h1 className='text-2xl w-max mx-auto mb-4'>Event Master</h1> */}
            <section className='bg-blue-200 md:w-1/2 lg:w-1/3 my-2 mx-auto rounded-lg'>
                <div className="flex justify-evenly rounded-t-lg bg-blue-50">
                    <div className={`rounded-t-lg cursor-pointer py-4 text-center flex-1 ${mode === 'sign up' ? 'bg-slate-950 text-white' : ''}`} onClick={() => switchMode('sign up')}>Sign Up</div>
                    <div className={`rounded-t-lg cursor-pointer py-4 text-center flex-1 ${mode === 'sign in' ? 'bg-slate-950 text-white' : ''}`} onClick={() => switchMode('sign in')}>Log In</div>
                </div>
                <form className='text-center p-4'>
                    {mode == 'sign up' ? <Signup /> : <Signin />}
                </form>
            </section>
        </>
    )
}

export default Auth