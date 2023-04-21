import LEVELS from "../data/Levels";

interface WorldLevelProps {
  total: number;
  name: string;
}

const WorldLevel: React.FC<WorldLevelProps> = ({ total, name }) => {
  return (
    <div className="flex flex-col gap-y-2 mt-5">
      <span>{name} Level {total} </span>
      {LEVELS.map((level) => (
        <div className="flex gap-x-1" key={level.value}>
          <div
            className={`${level.backgroundColor} border border-black w-10 h-7`}
          ></div>
          <span>{level.name}</span>
        </div>
      ))}
    </div>
  );
};

export default WorldLevel;
