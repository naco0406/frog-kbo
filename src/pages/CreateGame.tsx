import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GameForm from '../components/GameForm';
import { Game } from '../types/Game';
import { API_BASE_URL } from '../constants.ts/api';

const CreateGame: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (game: Game) => {
        await axios.post(`${API_BASE_URL}/kbo/games`, game);
        navigate('/');
    };

    return (
        <div>
            <h1>Create New Game</h1>
            <GameForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateGame;