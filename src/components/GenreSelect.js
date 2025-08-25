import React, { useEffect, useState } from "react";
import tmdbApi from "../services/tmdbApi";

const GenreSelect = ({ onGenreChange, selectedGenre }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await tmdbApi.getGenres();
        setGenres(genreList);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des genres");
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <div>Chargement des genres...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="genre-buttons">
      <h5 className="mb-3">Catégories</h5>
      <div className="d-flex flex-wrap gap-2">
        <button
          className={`btn ${selectedGenre === "" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onGenreChange("")}
        >
          Tous les films
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`btn ${
              selectedGenre === genre.id.toString() ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => onGenreChange(genre.id.toString())}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelect;
