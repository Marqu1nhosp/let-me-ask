import { database } from '../services/firebase'
import { useNavigate } from 'react-router-dom';
import { FormEvent }from 'react'
import { auth, firebase } from '../services/firebase';
import illustrationImg from  '../assets/images/illustration.svg'
import logoImg from  '../assets/images/logo.svg'
import googleIconImg from  '../assets/images/google-icon.svg'
import { Button } from '../components/Button'


import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';



export function Home(){
    const navigate = useNavigate();
   const { user, signInWithGoogle } = useAuth();
   const [roomCode, setRoomCode] = useState('')


async function handleCreateRoom(){
if(!user){
    await signInWithGoogle()
}

        navigate('rooms/new');
        
    }

    async function handleJoinRoom(event: FormEvent){
            event.preventDefault();

            if(roomCode.trim() == ''){
                return;
            }

            const roomRef = await database.ref(`rooms/${roomCode}`).get();

            if(!roomRef.exists()){
                alert('Sala não existe!');
                return;
            }

            if(roomRef.val().endedAt){
                alert('Sala esta fechada!')
                return;
            }

            navigate(`/rooms/${roomCode}`);
    }
    return( 
    
    <div id="page-auth">
        <aside>
            <img src={illustrationImg} alt=""></img>
            <strong>Crie Salas Q&amp;A ao-vivo </strong>
            <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>
        <main>
           
            <div className="main-content">
                <img src={logoImg} alt="letmeask"></img>
                <button onClick={handleCreateRoom} className="create-room"> 
                <img src={googleIconImg} alt="Logo do google"></img>
                    Crie sua sala com o google
                </button>
                <div className="separator">
                    ou entre em uma sala
                </div>
                <form onSubmit={handleJoinRoom}>
                    <input 
                    type="text"
                    placeholder="Digite o código da sala"
                    onChange={event => setRoomCode(event.target.value)}
                    value = {roomCode}
                    />
                    <Button type="submit">
                        Entrar na sala
                    </Button>
                  </form>
            </div>
        </main>
    </div>
    
    )
       
}