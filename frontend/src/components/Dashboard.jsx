import { useContext, useEffect, useState } from "react"
import LoadingSpinner from "../UI/LoadingSpinner"
import Navbar from '../UI/Navbar'
import AuthContext from "../context/AuthContext"

const Dashboard = () => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const {userInfo, setUserInfo, Logout} = useContext(AuthContext)


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Or get the token from cookies
            if (!token) {
                alert('You are not logged in!');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    // setUserData(data);
                    setUserInfo(data)
                } else {
                    alert('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="">
                Loading...
            </div>
        )
    }
    return (
        <>
            <Navbar />
            {/* <h1>Welcome, {userData?.first_name}</h1> */}
            <h1>Welcome, {userInfo?.first_name}</h1>
            <h2>Your registered events </h2>
            <h1></h1>
            <button className="bg-black text-sm p-2 text-white" onClick={Logout}>Logout</button>
        </>
    )
}

export default Dashboard