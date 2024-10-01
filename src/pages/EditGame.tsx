import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import GameForm from '../components/GameForm';
import { Game } from '../types/Game';
import { API_BASE_URL } from '../constants.ts/api';

const EditGame: React.FC = () => {
    const [game, setGame] = useState<Game | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchGame();
    }, [id]);

    const fetchGame = async () => {
        const response = await axios.get(`${API_BASE_URL}/kbo/games/${id}`);
        setGame(response.data);
    };

    const handleSubmit = async (updatedGame: Game) => {
        await axios.put(`${API_BASE_URL}/kbo/games/${id}`, updatedGame);
        navigate('/');
    };

    if (!game) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Game</h1>
            <GameForm onSubmit={handleSubmit} initialData={game} />
        </div>
    );
};

export default EditGame;