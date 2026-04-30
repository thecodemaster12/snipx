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
        const tempId = Date.now();

        const optimisticSnippet = { ...snippet, id: tempId };

        // 1. add instantly
        setSnippets((prev) => [...prev, optimisticSnippet]);

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

            const data = await res.json();

            // 2. replace temp with real
            setSnippets((prev) =>
                prev.map((s) => (s.id === tempId ? data : s))
            );

        } catch (error) {
            // 3. rollback (remove temp)
            setSnippets((prev) => prev.filter((s) => s.id !== tempId));

            alert("Add failed. Try again.");

            throw error;
        }
    };

    const deleteSnippet = async (id) => {
        // 1. backup current state
        const previousSnippets = snippets;

        // 2. optimistic UI update
        setSnippets((prev) => prev.filter((s) => s.id !== id));

        try {
            const res = await fetch(`http://localhost:4000/snippets/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete snippet");
            }

        } catch (error) {
            // 3. rollback
            setSnippets(previousSnippets);

            // 4. inform user
            alert("Delete failed. Restored item.");

            throw error;
        }
    };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <SnippetContext.Provider value={{ snippets, loading, addSnippet, deleteSnippet }}>
      {children}
    </SnippetContext.Provider>
  );
};
