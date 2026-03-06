function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "10px",
        fontSize: "16px",
        width: "300px",
        marginBottom: "20px"
      }}
    />
  );
}

export default SearchBar;