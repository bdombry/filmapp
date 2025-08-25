import React, { useEffect, useState } from "react";
import tmdbApi from "../services/tmdbApi";

const GenreSelect = ({ onGenreChange }) => {
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
    <div className="mb-4">
      <select
        className="form-select"
        onChange={(e) => onGenreChange(e.target.value)}
        defaultValue=""
      >
        <option value="">Tous les genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelect;
