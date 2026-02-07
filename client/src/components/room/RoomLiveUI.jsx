import { LEAGUES } from "../../data/leagues";
import { TEAM_COLOR_CLASSES } from "../../constants/teamColors";
import { useState } from "react";
import { useEffect } from "react";

const RoomLiveUI = ({ room }) => {
  const [players, setPlayers] = useState([]);

  const participantId = localStorage.getItem("participantId");
  const hostParticipantId = room.host.participantId;

  const isHost = participantId === hostParticipantId;

  const leagueData = LEAGUES.find((l) => l.league === room.league.shortName);

  const myTeam = room.joinedTeams.find(
    (t) => t.participantId === participantId,
  );

  useEffect(() => {
    const fetchForRetain = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/rooms/league/${room.league._id}/franchise/${myTeam.teamName}`,
          {
            method: "GET",
            headers: { "content-Type": "application/json" },
          },
        );

        const data = await res.json();
        setPlayers(data);
        console.log(players);
        console.log(room)
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchForRetain();
  }, []);

  if (!leagueData) return null;

  if (!myTeam) {
    return <p>Waiting to join room…</p>;
  }

  return (
    <div className="space-y-3 max-w-xl">
      <h1 className="text-xl font-bold bodyText">{room.roomName}</h1>

      <div className="flex gap-2 items-center">
        <p className="bodyText">Phase: {room.phase}</p>
        {isHost && (
          <span className="text-xs px-2 py-0.5 rounded bg-amber-400 text-black font-semibold">
            HOST
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {players.map((player) => {
          const isOverseas =
            player.playerId.nationality !== room.league.homeCountry;

          return (
            <div
              key={player.playerId._id}
              className="p-3 rounded bg-white/5 flex justify-between items-center"
            >
              {/* Left: Player info */}
              <div>
                <p className="font-semibold bodyText">
                  {player.playerId.fullName}
                </p>

                <p className="text-xs text-white/60">
                  {player.playerId.role}
                  {" · "}
                  {player.playerId.battingStyle}
                </p>

                <p className="text-xs text-white/40">
                  Base ₹{player.franchisePrice / 1e7} Cr
                </p>
              </div>

              {/* Right: Badges */}
              <div className="flex flex-col items-end gap-1">
                {/* Overseas / Home */}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold
              ${
                isOverseas
                  ? "bg-red-500/80 text-white"
                  : "bg-green-500/80 text-black"
              }
            `}
                >
                  {isOverseas ? "OS" : "HOME"}
                </span>

                {/* Role */}
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 font-semibold">
                  {player.playerId.role}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <ul
        className="
    grid grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-3
  "
      >
        {room.joinedTeams.map((t) => {
          const isYou = t.participantId === participantId;
          const isHostTeam = t.participantId === hostParticipantId;

          const teamMeta = leagueData.teams.find(
            (team) => team.id === t.teamName,
          );

          const teamColorClass =
            TEAM_COLOR_CLASSES[teamMeta?.color] ?? "bg-white/10";

          return (
            <li
              key={t.participantId}
              className={`
          relative p-3 rounded text-sm flex flex-col gap-1
          ${teamColorClass}
          ${isYou ? "ring-2 ring-green-400" : ""}
        `}
            >
              {/* Team + User */}
              <span className="font-semibold truncate">{t.teamName}</span>
              <span className="text-xs opacity-80 truncate">{t.userName}</span>

              {/* Badges */}
              <div className="absolute top-2 right-2 flex gap-1">
                {isHostTeam && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-black font-bold">
                    HOST
                  </span>
                )}
                {isYou && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500 text-black font-bold">
                    YOU
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoomLiveUI;
