const Signin = () => {

    const signinHandler = () => {

    }
    return (
        <form>
            <br />
            <label>Email Address <br />
                <input className="border-2 pl-3 pr-8 py-2" type="text" placeholder="example@gmail.com" />
            </label>
            <br />
            <label>Password<br />
                <input className="border-2 pl-3 pr-8 py-2" type="text" placeholder="********" />
            </label>
            <br />
            <button className="bg-slate-950 border-2 border-black text-white py-2 px-8 mt-4 hover:bg-white hover:text-slate-950 hover:border-2 hover:border-black" type="submit">Log In</button>
        </form>
    )
}

export default Signin
