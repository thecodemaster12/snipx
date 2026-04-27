import { useContext } from "react";
import { SnippetContext } from "../../context/SnippetContext";
import SnippetCard from "./SnippetCard";

const SnippetList = () => {
  const { snippets } = useContext(SnippetContext);
  return (
    <div className="space-y-3">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};

export default SnippetList;
