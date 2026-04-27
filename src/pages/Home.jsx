import SnippetList from "../components/snippets/SnippetList";

const Home = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">🧠 Snippet Vault</h1>

        {/* Placeholder sections (we’ll build next step) */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            Add Snippet Form (coming next)
          </div>

          <div className="bg-white p-4 rounded shadow">
            Search Bar (coming next)
          </div>

          <SnippetList />
        </div>
      </div>
    </>
  );
};

export default Home;
