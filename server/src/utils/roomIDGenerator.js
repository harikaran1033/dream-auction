export const generateRoomCode = () =>{
    
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let roomID = ""

    for(let i = 0; i < 8 ; i++){
         roomID+= [Math.floor(Math.random() * chars.length)]
    }
    
    return roomID
}