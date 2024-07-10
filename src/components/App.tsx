import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import "../styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  )
}

export default App
