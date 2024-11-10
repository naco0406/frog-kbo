import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GameList from '../pages/GameList';
import CreateGame from '../pages/CreateGame';
import EditGame from '../pages/EditGame';

const KboRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/create" element={<CreateGame />} />
            <Route path="/edit/:id" element={<EditGame />} />
        </Routes>
    );
};

export default KboRoutes;