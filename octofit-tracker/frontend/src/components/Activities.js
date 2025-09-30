import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
      console.log('Fetching activities from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Activities API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activitiesData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed activities data:', activitiesData);
      
      setActivities(activitiesData);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-4"><div className="text-center">Loading activities...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <div className="row">
        {activities.length === 0 ? (
          <div className="col-12">
            <p>No activities found.</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={activity.id || index} className="col-md-6 col-lg-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.activity_type || activity.name || 'Activity'}</h5>
                  <p className="card-text">
                    <strong>User:</strong> {activity.user || activity.user_id || 'Unknown'}<br/>
                    <strong>Duration:</strong> {activity.duration || 'N/A'} minutes<br/>
                    <strong>Calories:</strong> {activity.calories_burned || activity.calories || 'N/A'}<br/>
                    <strong>Date:</strong> {activity.date || activity.created_at || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Activities;