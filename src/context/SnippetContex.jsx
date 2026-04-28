import { Children, createContext, useEffect, useState } from "react";

export const SnippetContext = createContext();

export const SnippetProvider = ({children}) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSnippets = async () => {
    try {
      const res = await fetch("http://localhost:3001/snippets");
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`);
      }
      const data = await res.json();
      setSnippets(data)
    } catch (error) {
      console.log(`Snippet error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <SnippetContext.Provider value={{snippets , loading}}>
      {children}
    </SnippetContext.Provider>
  );
};
