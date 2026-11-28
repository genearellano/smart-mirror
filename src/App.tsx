import { BrowserRouter, Routes, Route, Link } from "react-router"
import { useState } from "react"
import "./index.css"
import Music from "./components/Music"
import CurrDateTime from "./components/currDateTime"

function App() {
  const [num, setNum] = useState<number>(0)

  return (
  <>
    <CurrDateTime />
    <div><Music /></div>
  </>
  );
}

export default App;