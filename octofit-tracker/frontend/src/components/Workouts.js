import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching workouts from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Workouts API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutsData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed workouts data:', workoutsData);
      
      setWorkouts(workoutsData);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-4"><div className="text-center">Loading workouts...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.length === 0 ? (
          <div className="col-12">
            <p>No workouts found.</p>
          </div>
        ) : (
          workouts.map((workout, index) => (
            <div key={workout.id || index} className="col-md-6 col-lg-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || workout.title || 'Workout'}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {workout.description || 'No description'}<br/>
                    <strong>Duration:</strong> {workout.duration || 'N/A'} minutes<br/>
                    <strong>Difficulty:</strong> {workout.difficulty_level || workout.difficulty || 'N/A'}<br/>
                    <strong>Category:</strong> {workout.category || workout.workout_type || 'N/A'}<br/>
                    <strong>Created:</strong> {workout.created_at || workout.date_created || 'N/A'}
                  </p>
                  {workout.exercises && Array.isArray(workout.exercises) && (
                    <div>
                      <strong>Exercises:</strong>
                      <ul className="list-unstyled mt-2">
                        {workout.exercises.map((exercise, exerciseIndex) => (
                          <li key={exerciseIndex} className="badge bg-primary me-1 mb-1">
                            {typeof exercise === 'string' ? exercise : exercise.name || exercise.exercise_name || 'Exercise'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {workout.instructions && (
                    <div className="mt-2">
                      <strong>Instructions:</strong>
                      <p className="small text-muted">{workout.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Workouts;