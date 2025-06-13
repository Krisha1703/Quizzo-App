//Action Menus

import Image from "next/image";

const ActionMenu = ({ isOpen = false, actions = [], menuClass = "" }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Desktop version (md and above) */}
      <div
        className={`hidden md:flex bg-white px-3 py-2 rounded-lg justify-center items-center gap-2 ${menuClass}`}
      >
        {actions.map(({ name, icon, alt, width, height, onClick }) => (
          <button
            key={name}
            onClick={onClick}
            className="hover:scale-105 transition-transform duration-150"
          >
            <Image src={icon} alt={alt} width={width} height={height} />
          </button>
        ))}
      </div>

      {/* Mobile version (below md) */}
      <div
        className={`flex md:hidden absolute right-0 mt-2 bg-white rounded shadow-lg p-2 gap-3 z-10 ${menuClass}`}
      >
        {actions.map(({ name, icon, alt, width, height, onClick }) => (
          <button
            key={name}
            onClick={onClick}
            className="hover:scale-105 transition-transform duration-150"
          >
            <Image src={icon} alt={alt} width={width} height={height} />
          </button>
        ))}
      </div>
    </>
  );
};

export default ActionMenu;
