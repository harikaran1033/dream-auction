import { TEAM_COLOR_CLASSES } from "../../constants/teamColors";

const TeamGrid = ({ teams, selectedTeam, onSelect, disabledTeams = [] }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 w-full">
    {teams.map((team) => {
      const isSelected = selectedTeam?.id === team.id;
      const isDisabled = disabledTeams.includes(team.id);

      return (
        <div
          key={team.id}
          onClick={() => {
            if (!isDisabled) onSelect(team);
          }}
          className={`
            relative group flex items-center justify-center bodyText h-10 rounded-md font-semibold text-sm
            ${TEAM_COLOR_CLASSES[team.color]}
            ${isSelected ? "ring-2 ring-white" : ""}
            ${isDisabled ? "opacity-40 cursor-not-allowed grayscale" : "cursor-pointer hover:opacity-90"}
            transition
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
            {isDisabled ? "Already taken" : team.name}
          </span>

          {/* LOCK OVERLAY */}
          {isDisabled && (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/80">
              🔒
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export default TeamGrid;
