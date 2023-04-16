import Level from "../interfaces/Level";

const LEVELS: Level[] = [
  {
    name: "Lived There",
    color: "#e84c3d",
    backgroundColor: "bg-[#e84c3d]",
    hoverColor: "hover:bg-[#e84c3d]",
    value: 5,
  },
  {
    name: "Stayed There",
    color: "#d58337",
    backgroundColor: "bg-[#d58337]",
    hoverColor: "hover:bg-[#d58337]",
    value: 4,
  },
  {
    name: "Visited There",
    color: "#f3c218",
    backgroundColor: "bg-[#f3c218]",
    hoverColor: "hover:bg-[#f3c218]",
    value: 3,
  },
  {
    name: "Alighted There",
    color: "#30cc70",
    backgroundColor: "bg-[#30cc70]",
    hoverColor: "hover:bg-[#30cc70]",
    value: 2,
  },
  {
    name: "Passed There",
    color: "#3598db",
    backgroundColor: "bg-[#3598db]",
    hoverColor: "hover:bg-[#3598db]",
    value: 1,
  },
  {
    name: "Never Been There",
    color: "white",
    backgroundColor: "bg-white",
    hoverColor: "hover:bg-[#eaeaea]",
    value: 0,
  },
];

export default LEVELS;