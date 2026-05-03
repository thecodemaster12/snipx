import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

const CodeBlock = ({ code, language }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const highlight = async () => {
      const result = await codeToHtml(code, {
        lang: language || "javascript",
        theme: "night-owl",
      });

      setHtml(result);
    };

    highlight();
  }, [code, language]);

  return (
    <div
      className="mt-3 rounded overflow-hidden text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CodeBlock;