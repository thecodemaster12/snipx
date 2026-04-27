import { createContext, useState } from "react";
import snippetsData from "../data/snippets.json";

export const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState(snippetsData);

  return (
    <SnippetContext.Provider value={{ snippets }}>
      {children}
    </SnippetContext.Provider>
  );
};
