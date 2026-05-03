import { useContext } from "react";
import { SnippetContext } from "@/context/SnippetContex.jsx";
import { toast } from "sonner";

const SnippetCard = ({ snippet }) => {
  const { deleteSnippet } = useContext(SnippetContext);

  const handleDelete = (id) => {
    toast("Delete this snippet?", {
      action: {
        label: "Delete",
        onClick: () => deleteSnippet(id),
      },
      cancel: {
        label: "Cancel",
      },
    });
  };
  return (
    <>
      <div className="bg-gray-700 p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-100">{snippet.title}</h2>

        <p className="text-sm text-gray-400 mt-1">{snippet.language}</p>

        <pre className="bg-gray-100 p-3 mt-3 rounded text-sm overflow-x-auto">
          <code>{snippet.code}</code>
        </pre>

        <div className="mt-2 flex gap-2 flex-wrap">
          {snippet.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <button type="button" onClick={() => handleDelete(snippet.id)}>
        Delete
      </button>
    </>
  );
};

export default SnippetCard;
