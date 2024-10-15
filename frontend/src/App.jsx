import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'

function App() {
  const [mode, setMode] = useState('sign up')
  // const mm = isSigningUp ? 'sign up' : 'sign in'

  const switchMode = (wantedMode) => {
    if (mode === 'sign up' && wantedMode === 'sign up') {
      return
      // setMode('sign in')
    } else if (mode === 'sign up' && wantedMode !== 'sign up') {
      setMode('sign in')
    } else if (mode === 'sign in' && wantedMode === 'sign in') {
      return
    } else {
      setMode('sign up')
    }
  }

  return (
    <main>
      <h1 className='text-2xl w-max mx-auto mb-4'>Auth Form</h1>
      <section className='bg-blue-300 w-1/3 mx-auto rounded-lg'>
        <div className="flex justify-evenly rounded-t-lg bg-blue-100">
          <div className="cursor-pointer py-4" onClick={() => switchMode('sign up')}>Sign Up</div>
          <div className="cursor-pointer py-4" onClick={() => switchMode('sign in')}>Log In</div>
        </div>
        <form className='border-2 border-black text-center p-4'>
          {mode == 'sign up' ? <Signup /> : <Signin />}
        </form>
      </section>
    </main>
  )
}

export default App