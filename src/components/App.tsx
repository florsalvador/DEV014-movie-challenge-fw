import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
// import Pagination from './Pagination';
import "../styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Pagination currentPage={1} totalPages={10} onSelectPage={function (n: number): void {
          console.log("You clicked page " + n);
        } } />} /> */}
      </Routes>
    </Router>
  )
}

export default App
