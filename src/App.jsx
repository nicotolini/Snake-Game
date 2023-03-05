import { Route, Routes } from "react-router-dom"
import GameStart from "./Screen/GameStart"
import Snake from "./Screen/Snake"


function App() {
  return (
  <Routes>
    <Route path="*" element={<GameStart />} /> 
    <Route path="/snake" element={<Snake/>} />
  </Routes>
  )
}

export default App
