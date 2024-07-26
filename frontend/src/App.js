import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPannel';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserView from './components/UserView';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<UserView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
