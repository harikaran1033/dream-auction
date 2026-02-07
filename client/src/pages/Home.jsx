import { useEffect, useMemo, useState } from "react";
import { LEAGUES } from "../data/leagues";
import { TEAM_COLOR_CLASSES } from "../constants/teamColors.js";
import GlowButton from "../components/ui/Glowbutton.jsx";
import TeamGrid from "../components/ui/TeamGrid.jsx";
import RetentionToggle from "../components/ui/RetentionToggle.jsx";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/ui/Tabs.jsx";
import LoaderOverlay from "../components/ui/LoaderOverlay.jsx";

const ROOM_TABS = [
  { label: "Create Game", value: "create" },
  { label: "Join Room", value: "join" },
];

const Home = () => {
  const [hostUserName, setHostUserName] = useState("");
  const [league, setLeague] = useState("IPL");
  const [hostTeam, setHostTeam] = useState(null);

  const [isRetentionEnabled, setIsRetentionEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [isPrivate, setIsPrivate] = useState(false);
  const [leagues, setLeagues] = useState([]);
  const navigate = useNavigate();

  const [publicRooms, setPublicRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

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
    localStorage.setItem("roomCode", data.roomCode);

    navigate(`/room/${data.roomId}`);

    console.log("Room created:", data);
  };

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leagues");
        const data = await res.json();

        setLeagues(data);
        setLeague(data[0]?.shortName); // default
      } catch (error) {
        console.error("Failed to fetch leagues", error);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    if (activeTab !== "join") return;

    const fetchPublicRooms = async () => {
      try {
        setLoadingRooms(true);

        const res = await fetch("http://localhost:5000/api/rooms/public");
        const data = await res.json();
        console.log(data);

        setPublicRooms(data);
      } catch (error) {
        console.error("Failed to fetch public rooms", error);
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchPublicRooms();
  }, [activeTab]);

return (
    <div className="min-h-screen w-full bg-[#0B0F1A] text-white flex items-center justify-center px-4">
      {/* MAIN WRAPPER */}
      <div className="w-full max-w-xl">

        {/* HEADER */}
        <header className="text-center mb-6 mt-6">
          <h1 className="hero-title text-5xl tracking-widest uppercase">
            Cricket Auction
          </h1>
          <p className="text-xs uppercase tracking-wider text-white/40 mt-1">
            Create or join a live auction room
          </p>
        </header>

        {/* CARD */}
        <div className="bg-[#141A2A] border border-white/10 rounded-2xl shadow-xl p-5 space-y-6">

          {/* TABS */}
          <Tabs
            tabs={ROOM_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* CREATE TAB */}
          {activeTab === "create" && (
            <div className="grid grid-cols-3 gap-4 bodyText">

              {/* NAME */}
              <input
                type="text"
                placeholder="Auctioneer Name"
                className="col-span-3 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400"
                value={hostUserName}
                onChange={(e) => setHostUserName(e.target.value)}
              />

              {/* LEAGUE */}
              <select
                className="col-span-1 bg-black/30 border border-white/10 rounded-lg px-3 py-3 text-sm"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
              >
                <option value="">League</option>
                {["IPL", "SA20", "BBL", "100"].map((l) => (
                  <option key={l} value={l} className="bg-black">
                    {l}
                  </option>
                ))}
              </select>

              {/* RETENTION */}
              <RetentionToggle
                className="col-span-2"
                value={isRetentionEnabled}
                onChange={setIsRetentionEnabled}
              />

              {/* PUBLIC / PRIVATE */}
              <div className="col-span-3 flex bg-black/30 border border-white/10 rounded-lg p-1">
                {["Public", "Private"].map((type) => {
                  const active = (type === "Private") === isPrivate;
                  return (
                    <button
                      key={type}
                      onClick={() => setIsPrivate(type === "Private")}
                      className={`flex-1 py-2 rounded-md text-sm transition-all
                        ${
                          active
                            ? "bg-amber-400 text-black font-semibold"
                            : "text-white/60 hover:text-white"
                        }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              {/* TEAM SELECT */}
              {currentData && (
                <div className="col-span-3">
                  <p className="text-[11px] uppercase tracking-widest text-white/40 mb-2">
                    Select Your Team
                  </p>
                  <TeamGrid
                    teams={currentData.teams}
                    selectedTeam={hostTeam}
                    onSelect={setHostTeam}
                  />
                </div>
              )}

              {/* CTA */}
              <div className="col-span-3 pt-4">
                <GlowButton
                  label="Start Auction"
                  color="#fbbf24"
                  onClick={handleCreateRoom}
                  disabled={!hostUserName || !league || !hostTeam}
                />
              </div>
            </div>
          )}

          {/* JOIN TAB */}
          {activeTab === "join" && (
            <div className="space-y-4 bodyText">

              {/* PRIVATE JOIN */}
              <input
                type="text"
                placeholder="Enter Private Room Code"
                className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm"
              />

              <GlowButton label="Join Private Room" color="#22c55e" />

              {/* PUBLIC ROOMS */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                  Public Rooms
                </p>

                {loadingRooms && (
                  <p className="text-white/40 text-sm">Loading rooms…</p>
                )}

                {!loadingRooms && publicRooms.length === 0 && (
                  <p className="text-white/50 text-sm">
                    No public rooms available
                  </p>
                )}

                <div className="space-y-3">
                  {publicRooms.map((room) => (
                    <div
                      key={room._id}
                      className="bg-black/30 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{room.roomName}</p>
                        <span className="text-xs text-amber-400 uppercase">
                          {room.phase}
                        </span>
                      </div>

                      <p className="text-xs text-white/50 mt-1">
                        {room?.league?.shortName} · {room?.joinedTeams?.length}/
                        {room.maxTeams}
                      </p>

                      <button
                        className="w-full mt-3 py-2 border border-white/20 rounded-lg tracking-wide font-semibold hover:bg-amber-400 hover:text-black transition"
                        onClick={() => navigate(`/room/${room._id}`)}
                      >
                        Join Auction
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <p className="text-center text-[10px] uppercase tracking-widest text-white/20 mt-6">
          Live cricket auction experience
        </p>
      </div>
    </div>
  );
};

export default Home;
