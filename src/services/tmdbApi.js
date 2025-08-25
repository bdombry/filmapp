import axios from "axios";

const API_KEY = "9b94be477609e938e50c425eee3bd6ef"; // Remplacez par votre clé API TMDB
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = {
  // Recherche de films
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
          page,
          language: "fr-FR",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche de films:", error);
      throw error;
    }
  },

  // Obtenir les films par genre
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          page,
          language: "fr-FR",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des films par genre:",
        error
      );
      throw error;
    }
  },

  // Obtenir les détails d'un film
  getMovieDetails: async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "credits,reviews",
          language: "fr-FR",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du film:",
        error
      );
      throw error;
    }
  },

  // Obtenir la liste des genres
  getGenres: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: "fr-FR",
        },
      });
      return response.data.genres;
    } catch (error) {
      console.error("Erreur lors de la récupération des genres:", error);
      throw error;
    }
  },
};

export default tmdbApi;
