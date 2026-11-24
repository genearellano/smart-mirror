import {useState, useEffect} from "react"

function currDateTime() {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date())
        },1000)
        return () => clearInterval(interval)
    },[])

    return (
        <div className="absolute right-5 top-5">
            <div className="bg-blue-500 py-2 px-2 text-center rounded-lg">{now.toLocaleDateString("en-US",{
                month: "long",
                day: "numeric",
                year: "numeric"
            })}</div>
            <div className="bg-blue-500 py-2 px-2 text-center rounded-lg">{now.toLocaleTimeString()}</div>
        </div>
    );
}

export default currDateTime;