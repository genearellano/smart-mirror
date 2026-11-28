import { useState, useEffect } from "react"
import { SpotifyLogin, SpotifyCallback } from "../services/spotify"

function Music() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/callback") {
            SpotifyCallback()
                .then((token) => {
                    if (token) {
                        setIsConnected(true);
                        window.history.replaceState({}, "", "/")
                    }
                })
                .catch(console.error)
        }
    }, [])

    if(!isConnected){
        return(
            <>
                <button onClick={SpotifyLogin} className="bg-blue-500 py-2 px-2 text-center rounded-lg hover:bg-sky-700">
                    Connect Spotify
                </button>
            </>
        )
    }
    else{
        return(
            <>
                <p>Connected to Spotify!</p>
            </> 
        )
    }
}

export default Music