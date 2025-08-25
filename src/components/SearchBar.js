import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar mb-4">
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Rechercher un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
