import { createContext, useEffect, useState } from "react";

export const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSnippets = async () => {
    try {
      const res = await fetch("http://localhost:4000/snippets");
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }
      const data = await res.json();
      setSnippets(data);
    } catch (error) {
      console.log(`Snippet error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const addSnippet = async (snippet) => {
    try {
      const res = await fetch("http://localhost:4000/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippet),
      });

      if (!res.ok) {
        throw new Error("Failed to add snippet");
      }

      const data = await res.json()

      setSnippets((prev) => [...prev, data])

      return data
    } catch (error) {
      console.error(`Add snippet error: `, error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <SnippetContext.Provider value={{ snippets, loading, addSnippet }}>
      {children}
    </SnippetContext.Provider>
  );
};
