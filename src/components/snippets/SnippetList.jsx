import { SnippetContext } from "@/context/SnippetContex"
import { useContext } from "react"
import SnippetCard from "./SnippetCard"

const SnippetList = () => {
  const {snippets, loading} = useContext(SnippetContext)
  return (
    <>
      <div className="space-y-3">
        {snippets.map((snippet, i) => (
          <SnippetCard key={i} snippet={snippet} />
        ))}
      </div>
    </>
  )
}

export default SnippetList