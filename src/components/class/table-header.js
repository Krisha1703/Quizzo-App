// Table Header Component

const TableHeader = ({headerTitles = [], columns}) => {
  return (
    <div className={`hidden md:grid grid-cols-${columns} gap-3 my-2`}>
        {headerTitles.map((title) => (
        <div
            key={title}
            className="bg-primary text-white font-semibold text-center py-2 px-3 rounded-lg shadow-sm"
        >
            {title}
        </div>
        ))}
    </div>
  )
}

export default TableHeader