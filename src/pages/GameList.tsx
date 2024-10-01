import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Game } from '../types/Game';
import { API_BASE_URL } from '../constants.ts/api';

const GameList: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        const response = await axios.get(`${API_BASE_URL}/kbo/games`);
        setGames(response.data);
    };

    const deleteGame = async (id: number) => {
        await axios.delete(`${API_BASE_URL}/kbo/games/${id}`);
        fetchGames();
    };

    return (
        <div>
            <h1>KBO Games</h1>
            <Link to="/create">Add New Game</Link>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        {game.date}: {game.homeTeam} vs {game.awayTeam} - {game.result}
                        <Link to={`/edit/${game.id}`}>Edit</Link>
                        <button onClick={() => deleteGame(game.id!)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;