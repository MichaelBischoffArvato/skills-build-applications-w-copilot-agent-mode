import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import components
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('OctoFit Tracker App initialized');
  console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);
  
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Home component
const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-4">🐙 Welcome to OctoFit Tracker</h1>
          <p className="lead">Your personal fitness tracking application</p>
          <hr className="my-4" />
          <p>
            Track your activities, compete with teams, and achieve your fitness goals!
          </p>
          <div className="row mt-4">
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">👥 Users</h5>
                  <p className="card-text">Manage user profiles and authentication</p>
                  <Link to="/users" className="btn btn-primary">View Users</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">🏃 Activities</h5>
                  <p className="card-text">Log and track your fitness activities</p>
                  <Link to="/activities" className="btn btn-primary">View Activities</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">🏆 Teams</h5>
                  <p className="card-text">Create and manage fitness teams</p>
                  <Link to="/teams" className="btn btn-primary">View Teams</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">🏅 Leaderboard</h5>
                  <p className="card-text">See who's leading the competition</p>
                  <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">💪 Workouts</h5>
                  <p className="card-text">Discover personalized workout suggestions</p>
                  <Link to="/workouts" className="btn btn-success">View Workouts</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
