// Resource Table Rows Component

const ResourceTableRow = ({ filteredResources }) => {
  return (
    <>
      {filteredResources.map((res) => (
          <div
            key={res.id}
            className="hidden md:grid grid-cols-3 gap-4 items-center"
          >
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {res.description}
            </div>
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {new Date(res.createdAt).toLocaleString()}
            </div>
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                download
              >
                Download
              </a>
            </div>
          </div>
        ))}

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-secondary rounded-lg shadow p-4 space-y-1 text-white"
            >
              <p><span className="font-semibold">Description:</span> {res.description}</p>
              <p><span className="font-semibold">Uploaded:</span> {new Date(res.createdAt).toLocaleString()}</p>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline font-semibold"
                download
              >
                Download
              </a>
            </div>
          ))}
        </div>
    </>
  );
};

export default ResourceTableRow;
