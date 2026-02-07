import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoaderOverlay from "../components/ui/LoaderOverlay";
import JoinRoomUI from "../components/room/JoinRoomUI";
import RoomLiveUI from "../components/room/RoomLiveUI";
  import { socket } from "../../sockets/socket.js";


const Room = () => {
  const { roomId } = useParams();
  // const inviteLink = `${window.location.origin}/room/${roomId}`;

  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const participantId = localStorage.getItem("participantId");

  useEffect(() => {
    const fetchRoomById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rooms/${roomId}`);

        const data = await res.json();

        setRoom(data);
        console.log(data);
      } catch (err) {
        console.log(err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomById();
  }, [roomId, navigate]);



useEffect(() => {
  socket.emit("join-room", roomId);

  socket.on("room-updated", (updatedRoom) => {
    setRoom(updatedRoom);
  });

  return () => {
    socket.off("room-updated");
  };
}, [roomId]);




  const isJoined = room?.joinedTeams?.some(
    (t) => t.participantId === participantId,
  );

  return (
    <div>
      <LoaderOverlay show={loading} />
      {!isJoined ? (
        <JoinRoomUI
          room={room}
          setRoom={setRoom}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          userName={userName}
          setUserName={setUserName}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
        />
      ) : (
      <RoomLiveUI room={room} />
      )}
    </div>
  );
};

export default Room;
