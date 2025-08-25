import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750.png?text=No+Image";

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={movie.title}
          style={{ height: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">
            <small className="text-muted">
              {new Date(movie.release_date).getFullYear()}
            </small>
          </p>
          <p className="card-text">
            {movie.overview.substring(0, 100)}
            {movie.overview.length > 100 ? "..." : ""}
          </p>
          <Link to={`/movie/${movie.id}`} className="btn btn-primary">
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
