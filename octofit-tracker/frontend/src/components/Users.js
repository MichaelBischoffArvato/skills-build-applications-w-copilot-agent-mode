import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
      console.log('Fetching users from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const usersData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed users data:', usersData);
      
      setUsers(usersData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-4"><div className="text-center">Loading users...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <div className="row">
        {users.length === 0 ? (
          <div className="col-12">
            <p>No users found.</p>
          </div>
        ) : (
          users.map((user, index) => (
            <div key={user.id || index} className="col-md-6 col-lg-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.username || user.name || 'User'}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email || 'N/A'}<br/>
                    <strong>First Name:</strong> {user.first_name || user.firstName || 'N/A'}<br/>
                    <strong>Last Name:</strong> {user.last_name || user.lastName || 'N/A'}<br/>
                    <strong>Date Joined:</strong> {user.date_joined || user.created_at || 'N/A'}<br/>
                    <strong>Active:</strong> {user.is_active !== undefined ? (user.is_active ? 'Yes' : 'No') : 'N/A'}
                  </p>
                  {user.profile && (
                    <div>
                      <strong>Profile:</strong>
                      <p className="small">
                        Age: {user.profile.age || 'N/A'}<br/>
                        Height: {user.profile.height || 'N/A'}<br/>
                        Weight: {user.profile.weight || 'N/A'}
                      </p>
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

export default Users;