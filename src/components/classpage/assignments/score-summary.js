// Score Summary for Teachers Component

const ScoreSummary = ({stats}) => {
  return (
    <div className="mt-10 mb-10 bg-secondary text-white p-4 rounded-md shadow-md md:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Score Summary</h3>
        <div className="flex gap-6">
          <p>
            <strong>Min:</strong> {stats.min}
          </p>
          <p>
            <strong>Mean:</strong> {stats.mean.toFixed(2)}
          </p>
          <p>
            <strong>Max:</strong> {stats.max}
          </p>
        </div>
      </div>
  )
}

export default ScoreSummary