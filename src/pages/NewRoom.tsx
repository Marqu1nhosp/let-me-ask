import { Link, useNavigate } from 'react-router-dom';
import { FormEvent }from 'react'
import { database } from '../services/firebase'
import illustrationImg from  '../assets/images/illustration.svg'
import logoImg from  '../assets/images/logo.svg'
import googleIconImg from  '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { userInfo } from 'os';

export function NewRoom(){
    const { user } = useAuth();
    const navigate = useNavigate();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
            event.preventDefault();

            if(newRoom.trim() == ''){
                return;
            }

            const roomRef = database.ref('rooms');

            const firebaseRoom = await roomRef.push({
                title: newRoom,
                authorId: user?.id,

            });

            navigate(`/rooms/${firebaseRoom.key}`);
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
                   
                        <h2>Criar uma nova sala</h2>
                        <form onSubmit={handleCreateRoom}>
                            <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                            />
                            <Button type="submit">
                                Criar sala
                            </Button>
                        </form>
                        <p>
                            Quer Entrar em uma sala existente? <Link to="/">clique aqui</Link>
                        </p>
                </div>
            </main>
        </div>
        
        )
}