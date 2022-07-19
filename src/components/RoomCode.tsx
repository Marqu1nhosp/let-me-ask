import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss'
import { useParams } from 'react-router-dom';
type RoomCodeProps = {
    code: string;
}

type RoomParams = {
    id: string;
}

export function RoomCode(props: RoomCodeProps){

    const params = useParams<RoomParams>()
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code"/>
            </div>
            <span> Sala #{props.code}{params.id}</span>
        </button>
    )
}