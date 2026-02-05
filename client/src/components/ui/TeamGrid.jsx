import { TEAM_COLOR_CLASSES } from "../../constants/teamColors";

const TeamGrid = ({ teams, selectedTeam, onSelect }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 w-full">
    {teams.map((team) => (
      <div
        key={team.id}
        onClick={() => onSelect(team)}
        className={`relative group flex items-center justify-center bodyText h-10 rounded-md font-semibold cursor-pointer
          ${TEAM_COLOR_CLASSES[team.color]}
          ${selectedTeam?.id === team.id ? "ring-2 ring-white" : ""}
          hover:opacity-90 transition text-sm
        `}
      >
        {team.id}

        {/* Tooltip */}
        <span
          className="
            pointer-events-none
            absolute -top-8 left-1/2 -translate-x-1/2
            whitespace-nowrap
            rounded bg-black px-2 py-1 text-xs text-white
            opacity-0 scale-95
            group-hover:opacity-100 group-hover:scale-100
            transition-all duration-200
            z-10
          "
        >
          {team.name}
        </span>
      </div>
    ))}
  </div>
);

export default TeamGrid;
