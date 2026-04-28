const SnippetForm = () => {
  return (
    <>
      <form className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-50 font-semibold text-lg">Title</label>
          <input className="bg-gray-400 p-2 rounded-md" type="text" name="title" id="" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="language" className="text-gray-50 font-semibold text-lg">Language</label>
          <input className="bg-gray-400 p-2 rounded-md" type="text" name="language" id="" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="text-gray-50 font-semibold text-lg">Code</label>
          <textarea className="bg-gray-400 p-2 rounded-md" name="code" id="" rows="8"></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-gray-50 font-semibold text-lg">Tags</label>
          <input className="bg-gray-400 p-2 rounded-md" type="text" name="tags" placeholder="JS, debug" />
        </div>
        <button type="submit" className="py-2 px-6 bg-blue-400 text-white rounded-md">Add</button>
      </form>
    </>
  )
}

export default SnippetForm