const Header = () => {
  return (
    <>
        <header className="shadow-md bg-gray-50">
            <nav className="flex justify-between p-4">
                <h2 className="text-gray-900">SnipX</h2>
                <div className="">
                    <button className="text-gray-900">Logout</button>
                </div>
            </nav>
        </header>
    </>
  )
}

export default Header