// Dynamic List Input Field for Class Editing Form

import Image from "next/image";

const DynamicListInput = ({
  title,
  values,
  newValue,
  setNewValue,
  onAdd,
  onChange,
  onDelete,
  error,
  placeholder,
  dualInputMode = false,
  dayValue = "",
  setDayValue = () => {},
  timeValue = "",
  setTimeValue = () => {},
  dayOptions = [],
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-bold">
        {title} <span className="text-red-500">*</span>
      </label>

      {dualInputMode ? (
        <div className="flex flex-col sm:flex-row gap-2 my-2">
          <select
            value={dayValue}
            onChange={(e) => setDayValue(e.target.value)}
            className="border p-2 rounded md:w-2/3"
          >
            <option value="">Day</option>
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <div className="flex flex-row gap-2 md:w-full">
            <input
              type="text"
              placeholder="Time (e.g. 10:00 AM)"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              className="p-2 w-5/6 md:w-full border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={onAdd}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 my-2">
          <input
            type="text"
            placeholder={placeholder}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-5/6 md:w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={onAdd}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      )}

      <ul className="list-disc ml-5 space-y-2">
        {values.map((item, idx) => (
          <li key={idx} className="flex flex-row items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(e, idx)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => onDelete(idx)}
              className="bg-red-500 text-white px-3 py-1 rounded hidden md:block"
            >
              Delete
            </button>
            <Image
              src={"/Assets/delete.svg"}
              width={25}
              height={25}
              alt="delete"
              className="md:hidden"
            />
          </li>
        ))}
      </ul>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DynamicListInput;
