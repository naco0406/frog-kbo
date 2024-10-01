import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameList from './pages/GameList';
import CreateGame from './pages/CreateGame';
import EditGame from './pages/EditGame';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/edit/:id" element={<EditGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;