import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import GenreSelect from "../components/GenreSelect";
import tmdbApi from "../services/tmdbApi";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchMovies = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (searchQuery) {
        response = await tmdbApi.searchMovies(searchQuery, page);
      } else if (selectedGenre) {
        response = await tmdbApi.getMoviesByGenre(selectedGenre, page);
      } else {
        // Par défaut, on affiche les films populaires
        response = await tmdbApi.getMoviesByGenre("", page);
      }
      setMovies(response.results);
      setTotalPages(Math.min(response.total_pages, 500)); // TMDB limite à 500 pages
      setCurrentPage(page);
    } catch (err) {
      setError("Erreur lors du chargement des films");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(1);
  }, [searchQuery, selectedGenre]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre("");
    setCurrentPage(1);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Recherche de Films</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="col-md-6">
          <GenreSelect onGenreChange={handleGenreChange} />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {movies.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {movies.length === 0 && !loading && (
            <div className="alert alert-info">Aucun film trouvé.</div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
