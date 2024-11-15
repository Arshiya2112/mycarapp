 
export const Button = ({ label, onClick }) => {
    return (
      <>
        <div className="w-full bg-purple-900 text-white text-lg px-2 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:text-white cursor-pointer hover:scale-105">
          <button
          onClick={onClick}
          
          type="submit" className="">
            {label}
          </button>
        </div>
      </>
    );
  };
  