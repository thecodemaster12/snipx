import Header from "../Header"
import SnippetForm from "../snippets/SnippetForm"
import SnippetList from "../snippets/SnippetList"
import SnippetSearch from "../snippets/SnippetSearch"

const HomePage = () => {
  return (
    <>
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl mb-6">Snipx</h2>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-md text-black">
          <SnippetForm />
        </div>
        <div className="bg-gray-50 p-4 rounded-md text-black">
          <SnippetSearch />
        </div>
        <div className="bg-gray-800 p-4 rounded-md text-black">
          <SnippetList />
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage