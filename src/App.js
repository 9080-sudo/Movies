import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Popular from "./components/Popular/Popular";
import TopRated from "./components/TopRated/TopRated";
import Upcoming from "./components/Upcoming/Upcoming";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { useState } from "react";
import Search from "./components/Search/Search";


function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Popular setSearch={setSearch} />} />
        <Route path="/popular" element={<Popular setSearch={setSearch} />} />
        <Route path="/top-rated" element={<TopRated setSearch={setSearch} />} />
        <Route path="/upcoming" element={<Upcoming setSearch={setSearch} />} />
        <Route
          path="/movie-details/:movieId"
          element={<MovieDetails setSearch={setSearch} />}
        />
        <Route path="/search" element={<Search search={search} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
