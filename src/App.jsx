import HomePage from "./components/pages/HomePage"


const App = () => {
  return (
    <>
      <main>
        <div className="bg-gray-900 text-white min-h-screen">
          <div className="container mx-auto">
            <HomePage />
          </div>
        </div>
      </main>
    </>
  )
}

export default App