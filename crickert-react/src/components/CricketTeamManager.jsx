import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketTeamManager.css';
import config from './config';

const CricketTeamManager = () => {
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({ id: '', teamName: '', captain: '', country: '', numberOfPlayers: '' });
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    
    // New state for fetching by ID
    const [idToFetch, setIdToFetch] = useState('');
    const [fetchedTeam, setFetchedTeam] = useState(null);

    const baseUrl = `${config.url}/cricket-api`;

    useEffect(() => {
        fetchAllTeams();
    }, []);

    const fetchAllTeams = async () => {
        try {
            const response = await axios.get(`${baseUrl}/all`);
            setTeams(response.data);
        } catch (error) {
            const errorMessage = error.response?.data || 'Failed to fetch teams.';
            setMessage(`Error: ${errorMessage}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeam({ ...team, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!team.id || !team.teamName || !team.captain || !team.country || !team.numberOfPlayers) {
            setMessage('Please fill in all fields.');
            return;
        }

        const url = isEditing ? `${baseUrl}/update` : `${baseUrl}/add`;
        const method = isEditing ? 'put' : 'post';

        try {
            await axios[method](url, team);
            setMessage(`Team ${isEditing ? 'updated' : 'added'} successfully!`);
            fetchAllTeams();
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data || 'Failed to save the team.';
            setMessage(`Error: ${errorMessage}`);
        }
    };

    const handleEdit = (teamToEdit) => {
        setIsEditing(true);
        setTeam(teamToEdit);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this team?')) {
            try {
                await axios.delete(`${baseUrl}/delete/${id}`);
                setMessage('Team deleted successfully!');
                fetchAllTeams();
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.response?.data || 'Failed to delete the team.';
                setMessage(`Error: ${errorMessage}`);
            }
        }
    };
    
    // New function to fetch a single team
    const getTeamById = async () => {
        if (!idToFetch) {
            setMessage("Please enter a Team ID to fetch.");
            setFetchedTeam(null);
            return;
        }
        try {
            const response = await axios.get(`${baseUrl}/get/${idToFetch}`);
            setFetchedTeam(response.data);
            setMessage('Team found successfully!');
        } catch (error) {
            setFetchedTeam(null);
            const errorMessage = error.response?.data || 'Team not found.';
            setMessage(`Error: ${errorMessage}`);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setTeam({ id: '', teamName: '', captain: '', country: '', numberOfPlayers: '' });
    };

    return (
        <div className="container">
            <header>
                <h1>🏏 Cricket Team Manager</h1>
            </header>
            <main>
                <div className="form-container">
                    <h2>{isEditing ? 'Edit Team' : 'Add a New Team'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="number" name="id" value={team.id} onChange={handleInputChange} placeholder="Team ID" disabled={isEditing} />
                        <input type="text" name="teamName" value={team.teamName} onChange={handleInputChange} placeholder="Team Name" />
                        <input type="text" name="captain" value={team.captain} onChange={handleInputChange} placeholder="Captain" />
                        <input type="text" name="country" value={team.country} onChange={handleInputChange} placeholder="Country" />
                        <input type="number" name="numberOfPlayers" value={team.numberOfPlayers} onChange={handleInputChange} placeholder="Number of Players" />
                        <button type="submit">{isEditing ? 'Update Team' : 'Add Team'}</button>
                        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
                    </form>
                </div>

                {/* New Fetch by ID Section */}
                <div className="fetch-container">
                    <h2>Find a Team by ID</h2>
                    <div className="fetch-controls">
                        <input
                            type="number"
                            value={idToFetch}
                            onChange={(e) => setIdToFetch(e.target.value)}
                            placeholder="Enter Team ID to fetch"
                        />
                        <button onClick={getTeamById}>Fetch Team</button>
                    </div>
                    {fetchedTeam && (
                        <div className="fetched-team-card">
                            <h3>Team Found:</h3>
                            <p><strong>ID:</strong> {fetchedTeam.id}</p>
                            <p><strong>Name:</strong> {fetchedTeam.teamName}</p>
                            <p><strong>Captain:</strong> {fetchedTeam.captain}</p>
                            <p><strong>Country:</strong> {fetchedTeam.country}</p>
                            <p><strong>Players:</strong> {fetchedTeam.numberOfPlayers}</p>
                        </div>
                    )}
                </div>

                {message && <p className="message">{message}</p>}

                <div className="table-container">
                    <h2>Available Teams</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Team Name</th>
                                <th>Captain</th>
                                <th>Country</th>
                                <th>Players</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.teamName}</td>
                                    <td>{t.captain}</td>
                                    <td>{t.country}</td>
                                    <td>{t.numberOfPlayers}</td>
                                    <td>
                                        <button onClick={() => handleEdit(t)}>Edit</button>
                                        <button onClick={() => handleDelete(t.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default CricketTeamManager;