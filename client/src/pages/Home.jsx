import { useEffect, useMemo, useState } from "react";
import { LEAGUES } from "../data/leagues";
import { TEAM_COLOR_CLASSES } from "../constants/teamColors.js";
import GlowButton from "../components/ui/Glowbutton.jsx";
import TeamGrid from "../components/ui/TeamGrid.jsx";
import RetentionToggle from "../components/ui/RetentionToggle.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [hostUserName, setHostUserName] = useState("");
  const [league, setLeague] = useState("IPL");
  const [hostTeam, setHostTeam] = useState(null);

  const [isRetentionEnabled, setIsRetentionEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [isPrivate, setIsPrivate] = useState(false);
  const [leagues, setLeagues] = useState([]);
  const navigate = useNavigate();

  const currentData = useMemo(
    () => LEAGUES.find((l) => l.league === league),
    [league],
  );

  const currentLeague = useMemo(
    () => leagues.find((l) => l.shortName === league),
    [leagues, league],
  );

  const handleCreateRoom = async () => {
    if (!hostUserName || !hostTeam || !currentLeague?._id) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hostUserName,
        hostTeamName: hostTeam.id, // "MI"
        leagueId: currentLeague._id, // Mongo ObjectId
        isPrivate,
        isRetentionEnabled,
      }),
    });

    const data = await res.json();
    localStorage.setItem("participantId", data.participantId);
    localStorage.setItem("roomId", data.roomId);

    navigate(`/room/${data.roomId}`);

    console.log("Room created:", data);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/leagues")
      .then((res) => res.json())
      .then((data) => {
        setLeagues(data);
        setLeague(data[0]?.shortName); // default
      });
  }, []);

  return (
    <div className=" grid place-items-center">
      <main className="mt-5 w-full flex flex-col items-center gap-6">
        {/* Shared width wrapper */}
        <div className="w-full max-w-72 md:max-w-lg lg:max-w-xl space-y-6">
          {/* Buttons */}
          <div className="flex border border-white/20 rounded-sm overflow-hidden">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-2 font-bold transition bodyText
      ${
        activeTab === "create"
          ? "bg-amber-500 text-black"
          : "text-white/60 hover:text-white"
      }`}
            >
              Create Game
            </button>

            <button
              onClick={() => setActiveTab("join")}
              className={`flex-1 py-2 font-bold transition bodyText
      ${
        activeTab === "join"
          ? "bg-amber-500 text-black"
          : "text-white/60 hover:text-white"
      }`}
            >
              Join Room
            </button>
          </div>

          {activeTab === "create" && (
            <div className="grid grid-cols-3 gap-x-3 gap-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-3 border-white/10 bodyText col-span-3 text-sm"
                value={hostUserName}
                onChange={(e) => setHostUserName(e.target.value)}
              />
              <select
                className="border border-white/10 bodyText text-sm col-span-1 p-2"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
              >
                {["IPL", "SA20", "BBL", "100"].map((league) => (
                  <option key={league} value={league} className="p-2 bg-black">
                    {league}
                  </option>
                ))}
              </select>
              <RetentionToggle
                className="col-span-2 px-2"
                value={isRetentionEnabled}
                onChange={setIsRetentionEnabled}
              />

              <div className="flex w-full rounded-lg bg-white/10 p-1 col-span-3 bodyText ">
                <button
                  type="button"
                  onClick={() => setIsPrivate(false)}
                  className={`flex-1 py-2 text-sm rounded-md transition-all 
      ${
        !isPrivate
          ? "bg-amber-400 text-black"
          : "text-white/70 hover:text-white"
      }`}
                >
                  Public
                </button>

                <button
                  type="button"
                  onClick={() => setIsPrivate(true)}
                  className={`flex-1 py-2 text-sm rounded-md transition-all
      ${
        isPrivate ? "bg-amber-400 text-black" : "text-white/70 hover:text-white"
      }`}
                >
                  Private
                </button>
              </div>
              {currentData && (
                <div className="col-span-3">
                  <p className="text-[11px] tracking-wide uppercase text-white/30 pb-2">
                    Choose your team
                  </p>
                  <TeamGrid
                    teams={currentData.teams}
                    selectedTeam={hostTeam}
                    onSelect={setHostTeam}
                  />
                </div>
              )}
              <div className="flex flex-col mt-5 gap-2  w-full bodyText col-span-3">
                <GlowButton
                  label="Create Room"
                  color="#fbbf24"
                  onClick={handleCreateRoom}
                  disabled={!hostUserName || !league || !hostTeam}
                />
              </div>
            </div>
          )}

          {activeTab === "join" && (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter Room Code"
                className="w-full border p-3 border-white/10"
              />

              <GlowButton label="Join Room" color="#22c55e" />

              <button className="border p-2 border-white/10 font-semibold">
                Browse Live
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
