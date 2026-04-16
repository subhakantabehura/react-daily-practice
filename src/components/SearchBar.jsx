import { useState } from "react";

function SearchBar() {
  const [text, setText] = useState("");

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Type here..."
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      />

      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        {text.toUpperCase()}
      </p>
    </div>
  );
}

export default SearchBar;