import { SnippetContext } from "@/context/SnippetContex"
import { useContext } from "react"
import SnippetCard from "./SnippetCard"

const SnippetList = () => {
  const {snippets, loading} = useContext(SnippetContext)

  if (loading) return <p className="text-gray-400">Loading snippets...</p>
  
  return (
    <>
      <div className="space-y-3">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </>
  )
}

export default SnippetList