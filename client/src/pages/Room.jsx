import { useParams } from "react-router-dom";

const Room = () => {
   
    const {roomID} = useParams()

  return <div className="roomBG">Room {roomID}</div>;
};

export default Room;
