import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../services/tmdbApi";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await tmdbApi.getMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des détails du film");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Film non trouvé</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-8">
          <h1 className="mb-3">{movie.title}</h1>
          <p className="text-muted">
            {new Date(movie.release_date).getFullYear()} |{" "}
            {movie.genres.map((genre) => genre.name).join(", ")} |{" "}
            {Math.floor(movie.runtime / 60)}h{movie.runtime % 60}min
          </p>
          <h4>Synopsis</h4>
          <p>{movie.overview}</p>

          <div className="mt-4">
            <h4>Distribution principale</h4>
            <div className="row">
              {movie.credits.cast.slice(0, 4).map((actor) => (
                <div key={actor.id} className="col-md-3 mb-3">
                  <div className="card">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : "https://via.placeholder.com/200x300.png?text=No+Image"
                      }
                      alt={actor.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h6 className="card-title">{actor.name}</h6>
                      <p className="card-text">
                        <small>{actor.character}</small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4>Avis des spectateurs</h4>
            {movie.reviews.results.length > 0 ? (
              <div className="list-group">
                {movie.reviews.results.slice(0, 5).map((review) => (
                  <div key={review.id} className="list-group-item">
                    <h6>{review.author}</h6>
                    <p className="mb-1">
                      {review.content.substring(0, 200)}...
                    </p>
                    <small className="text-muted">
                      {new Date(review.created_at).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <p>Aucun avis disponible pour ce film.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
