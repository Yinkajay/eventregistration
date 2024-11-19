import { useEffect, useState } from "react"
import Navbar from "../UI/Navbar"

const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getEvents = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:5000/api/events')
                const results = await response.json()
                console.log(results)
                setEvents(results)

            } catch (error) {
                console.log('An error occurred', error)
            }
            setLoading(false)
        }

        getEvents()
    }, [])

    return (
        <>
        <Navbar />
            <h1>Check out the list of events below</h1>
            {/* <section className="grid grid-cols-3 gap-1"> */}
            <section className="flex flex-wrap gap-2">
                {events?.map((event) => (
                    <div className="bg-lime-200 hover:scale-105 hover:cursor-pointer p-2 my-2 w-[31%]">
                        <h1 className="font-medium">{event.title}</h1>
                        <p className="text-sm">{event.subtitle}</p>
                        <p>Location - {event.city}</p>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Events