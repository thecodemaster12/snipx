import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

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

    setSnippets((prev) => [...prev, optimisticSnippet]);

    try {
      const res = await fetch("http://localhost:4000/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippet),
      });

      if (!res.ok) throw new Error("Failed to add snippet");

      const data = await res.json();

      setSnippets((prev) => prev.map((s) => (s.id === tempId ? data : s)));

      toast.success("Snippet added ✅");
    } catch (error) {
      setSnippets((prev) => prev.filter((s) => s.id !== tempId));

      toast.error("Failed to add snippet ❌");

      throw error;
    }
  };

  const deleteSnippet = async (id) => {
    const previous = snippets;

    setSnippets((prev) => prev.filter((s) => s.id !== id));

    try {
      const res = await fetch(`http://localhost:4000/snippets/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Snippet deleted 🗑️");
    } catch (error) {
      setSnippets(previous);

      toast.error("Delete failed, restored ❌");

      throw error;
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return (
    <SnippetContext.Provider
      value={{ snippets, loading, addSnippet, deleteSnippet }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
