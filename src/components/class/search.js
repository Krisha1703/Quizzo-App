//Search Component

const Search = ({searchQuery, setSearchQuery, heading}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold">{heading}</h2>
        <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-primary text-white placeholder-white"
        />
    </div>
  )
}

export default Search
