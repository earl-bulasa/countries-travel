import LEVELS from "./data/Levels";
import Position from "./interfaces/Position";

interface MenuProps {
  country: string;
  position: Position;
  handleMenuSelect: (value: number, color: string) => void;
}



const Menu: React.FC<MenuProps> = ({ country, position, handleMenuSelect }) => {
  return (
    <div
      className="bg-white border-black absolute z-50 rounded-xl shadow-2xl text-xs"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div className="p-1">
        <span>{country}</span>
      </div>
      <ul className="list-none">
        {LEVELS.map((level) => (
          <ol
            className={`p-1 cursor-pointer ${level.hoverColor}`}
            onClick={() => handleMenuSelect(level.value, level.color)}
            key={level.value}
          >
            {level.name}
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
