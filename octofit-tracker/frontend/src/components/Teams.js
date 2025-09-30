import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Fetching teams from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams API Response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamsData = data.results ? data.results : (Array.isArray(data) ? data : []);
      console.log('Processed teams data:', teamsData);
      
      setTeams(teamsData);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mt-4"><div className="text-center">Loading teams...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <p>No teams found.</p>
          </div>
        ) : (
          teams.map((team, index) => (
            <div key={team.id || index} className="col-md-6 col-lg-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name || 'Team'}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {team.description || 'No description'}<br/>
                    <strong>Members:</strong> {team.member_count || team.members?.length || 0}<br/>
                    <strong>Created:</strong> {team.created_at || team.date_created || 'N/A'}<br/>
                    <strong>Leader:</strong> {team.leader || team.team_leader || 'N/A'}
                  </p>
                  {team.members && Array.isArray(team.members) && (
                    <div>
                      <strong>Team Members:</strong>
                      <ul className="list-unstyled mt-2">
                        {team.members.map((member, memberIndex) => (
                          <li key={memberIndex} className="badge bg-secondary me-1 mb-1">
                            {typeof member === 'string' ? member : member.username || member.name || 'Member'}
                          </li>
                        ))}
                      </ul>
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

export default Teams;