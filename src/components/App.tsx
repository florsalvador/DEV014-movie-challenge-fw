// import { useState } from "react"
import "../styles/App.css"
import MovieCard from "./MovieCard"
// import getMovies from "../services/APIService.ts"

function App() {
  // const [count, setCount] = useState(0)
  // const movieList = getMovies();
  const movieTest = {
    "id": 653346,
    "title": "Kingdom of the Planet of the Apes",
    // "title": undefined,
    "year": "2024",
    // "year": null,
    "posterPath": "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    // "posterPath": "https://image.tmdb.org/t/p/w500null",
    "genreIds": [ 878, 12, 28 ],
    "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike."
  }

  return (
    <>
      <h1>Bestmovies</h1>
      <MovieCard movie={movieTest} />
    </>
  )
}

export default App
