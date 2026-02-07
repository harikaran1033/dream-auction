import { LEAGUES } from "../../data/leagues";
import GlowButton from "../ui/Glowbutton";
import TeamGrid from "../ui/TeamGrid";

const JoinRoomUI = ({
  room,
  setRoom,
  selectedTeam,
  setSelectedTeam,
  userName,
  setUserName,
  roomCode,
  setRoomCode,
  }
) => {
    
const leagueData = LEAGUES.find(
  (l) => l.league === room?.league?.shortName
);

if (!room || !leagueData) {
  return <p className="text-white">Loading room…</p>;
}


  const takenTeams = room.joinedTeams.map((t) => t.teamName);

  const handleJoin = async () => {
    if (!userName || !selectedTeam) {
      alert("Enter username and select team");
    }

    try {
      const res = await fetch("http://localhost:5000/api/rooms/join", {
        method: "post",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room._id,
          userName,
          teamName: selectedTeam.id,
          roomCode: room.visibility === "private" ? roomCode : undefined,
        }),
      });

      const data = await res.json();
      localStorage.setItem("participantId", data.participantId);

      setRoom(data.room);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 h-screen flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">{room.roomName}</h2>

      <input
        placeholder="Your Name"
        className="w-full border p-2"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      {room.visibility === "private" && (
        <input
          placeholder="Room Code"
          className="w-full border p-2"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
      )}

      <TeamGrid
        teams={leagueData.teams}
        selectedTeam={selectedTeam}
        onSelect={setSelectedTeam}
        disabledTeams={takenTeams}
      />

      <GlowButton label="Join Room" onClick={handleJoin} />
    </div>
  );
};

export default JoinRoomUI;
