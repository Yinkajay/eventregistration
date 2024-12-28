import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../UI/Navbar"
import EventDetailPicture from '/events/EventDetail.jpg'
import AuthContext from "../context/AuthContext"

const EventDetail = () => {
    const { id } = useParams()
    console.log(id)
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [registerMessage, setRegisterMessage] = useState("");

    // const { id: userId } = useContext(AuthContext)

    const ReadableDate = ({ isoDate }) => {
        // Convert the ISO date to a readable format
        const date = new Date(isoDate);
        const readableDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return <div>{readableDate}</div>;
    };



    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch event details");
                }
                const data = await response.json();
                console.log(data)
                setEvent(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const registerForEvent = async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            alert('You need to log in to register')
            return
        }

        try {
            const response = await fetch(`http://localhost:5000/api/events/register`, {
                method: 'POST',
                body: JSON.stringify({ eventId: id }),
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json()
            console.log(data)
            if (response.ok) {
                console.log('good')
                setRegisterMessage("You have successfully registered for this event.");
            } else {
                console.log('huhhh')
                // const errorData = await response.json();
                // setRegisterMessage(errorData.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error registering for event:", error.message);
            setRegisterMessage("Something went wrong or you've registered already. Please try again.");
        }
    }

    if (loading) return <p>Loading event details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <div className="">
                <img src={EventDetailPicture} className="m-2 w-1/3 mx-auto" />
            </div>
            <div className="px-4">
                <h1 className="font-bold text-xl">{event.title}</h1>
                <p className="font-semibold text-lg">{event.subtitle}</p>
                <p>{event.description}</p>
                <p>
                    {event.date} at {event.time}
                </p>
                <p>{event.venue}, {event.city}</p>
                <p>Duration: {event.duration}</p>
                <button onClick={registerForEvent} className="p-2 border-2 border-black">Register</button>
                {registerMessage && <p>{registerMessage}</p>}
            </div>
        </>
    )
}

export default EventDetail