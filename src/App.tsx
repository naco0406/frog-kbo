import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameList from './pages/GameList';
import CreateGame from './pages/CreateGame';
import EditGame from './pages/EditGame';
import Chat from './pages/Chat';
import KboRoutes from './routes/kboRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/kbo/*" element={<KboRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;