import React, { useState } from 'react';
import { Game } from '../types/Game';

interface Props {
    onSubmit: (game: Game) => void;
    initialData?: Game;
}

const GameForm: React.FC<Props> = ({ onSubmit, initialData }) => {
    const [game, setGame] = useState<Game>(initialData || {
        date: '',
        homeTeam: '',
        awayTeam: '',
        stadium: '',
        result: '',
        attendanceCount: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGame({ ...game, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(game);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" name="date" value={game.date} onChange={handleChange} required />
            <input type="text" name="homeTeam" value={game.homeTeam} onChange={handleChange} placeholder="Home Team" required />
            <input type="text" name="awayTeam" value={game.awayTeam} onChange={handleChange} placeholder="Away Team" required />
            <input type="text" name="stadium" value={game.stadium} onChange={handleChange} placeholder="Stadium" required />
            <input type="text" name="result" value={game.result} onChange={handleChange} placeholder="Result" required />
            <input type="number" name="attendanceCount" value={game.attendanceCount} onChange={handleChange} placeholder="Attendance" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default GameForm;