//Action Menus

import Image from "next/image";

const ActionMenu = ({ isOpen = false, actions = [], menuClass = "", assignment }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`flex bg-white px-2 md:px-3 py-2 md:mt-0 mt-2 rounded-lg justify-center items-center md:gap-2 gap-3 z-10 absolute ${assignment ? "right-[11.5vw]" : "right-0"}  ${menuClass}`}
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
  );
};

export default ActionMenu;
