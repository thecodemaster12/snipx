import { Toaster } from "sonner"
import HomePage from "./components/pages/HomePage"
import { SnippetProvider } from "./context/SnippetContex"


const App = () => {
  return (
    <>
      <main>
        <div className="bg-gray-900 text-white min-h-screen">
          <div className="container mx-auto">
            <SnippetProvider>
              <HomePage />
              <Toaster position="top-right" richColors />
            </SnippetProvider>
          </div>
        </div>
      </main>
    </>
  )
}

export default App