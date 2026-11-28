export async function SpotifyLogin() {
    const clientId = "6d03d1dd1ebc4fb79ebcedb45439a886"
    const redirectUri = "http://127.0.0.1:5173/callback"
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"

    const verifier = Array.from(
        crypto.getRandomValues(new Uint8Array(64)),
        (byte) => characters[byte % characters.length]
    ).join("")

    const hash = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(verifier)
    )

    const challenge = btoa(
        String.fromCharCode(...new Uint8Array(hash))
    ).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

    sessionStorage.setItem("spotify_verifier", verifier)

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: "user-read-currently-playing",
        code_challenge_method: "S256",
        code_challenge: challenge,
    })

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
}

export async function SpotifyCallback() {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    if (!code) return null

    const verifier = sessionStorage.getItem("spotify_verifier")

    if (!verifier) {
        throw new Error("Missing verifier")
    }

    const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: "6d03d1dd1ebc4fb79ebcedb45439a886",
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "http://127.0.0.1:5173/callback",
                code_verifier: verifier,
            }),
        }
    )

    if (!response.ok) {
        throw new Error("Spotify authentication failed")
    }

    const data = await response.json()

    sessionStorage.removeItem("spotify_verifier")

    return data.access_token as string
}