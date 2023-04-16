import Position from "./interfaces/Position";

interface TooltipProps {
  country: string;
  position: Position;
}

const Tooltip: React.FC<TooltipProps> = ({ country, position }) => {
  return (
    <div
      className={`pointer-events-none bg-slate-100 p-2 rounded-xl absolute z-20 shadow-2xl`}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <span>{country}</span>
    </div>
  );
};

export default Tooltip;
