export const InputBox = ({ label, placeholder, onChange, type="text", name, value }) => {
    return (
      <>
        <div>
          <div className="text-md font-bold text-purple-900 text-left px-2 py-1 mt-3">
            {label}
          </div>
          <input
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            className="w-full text-left px-2 py-1 border rounded-lg border-purple-300 bg-white"
          />
        </div>
      </>
    );
  };
  