// Input Field Component for Class Editing Form

const InputField = ({
  fieldname,
  label,
  formData,
  setFormData,
  errors = {},
  handleInputChange,
  readOnly = false,
  type = "textarea", 
  rows = 4,      
}) => {
  const inputClass = `w-full mt-1 p-2 border rounded ${
    readOnly
      ? "border-gray-200 bg-gray-100 cursor-not-allowed"
      : "border-gray-300"
  }`;

  return (
    <div className="flex-1">
      <label className="block text-sm font-bold">
        {label} <span className="text-red-500">*</span>
      </label>

      {type === "textarea" ? (
        <textarea
          name={fieldname}
          value={formData[fieldname]}
          onChange={(e) => handleInputChange({ e, setFormData })}
          readOnly={readOnly}
          rows={rows}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          name={fieldname}
          value={formData[fieldname]}
          onChange={(e) => handleInputChange({ e, setFormData })}
          readOnly={readOnly}
          className={inputClass}
        />
      )}

      {!readOnly && errors?.[fieldname] && (
        <p className="text-red-500 text-sm">{errors[fieldname]}</p>
      )}
    </div>
  );
};

export default InputField;
