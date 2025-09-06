import React from 'react';
import axios from 'axios';

const PollList = ({ polls, onVote }) => {
  const handleVote = async (pollId, option) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para votar.');
      return;
    }

    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      await axios.post(
        apiBase + `/api/polls/${pollId}/vote`,
        { option },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Voto registrado!');
      onVote();
    } catch (error) {
      console.error('Erro ao votar:', error);
      alert('Erro ao votar.');
    }
  };

  return (
    <div className="poll-list">
      <h2>Enquetes</h2>
      {polls.length === 0 ? (
        <p>Nenhuma enquete disponível.</p>
      ) : (
        polls.map(poll => (
          <div key={poll.id} className="poll-item">
            <h3>{poll.question}</h3>
            <ul>
              {poll.options.map(option => (
                <li key={option}>
                  <button onClick={() => handleVote(poll.id, option)}>
                    {option} ({poll.votes[option] || 0} votos)
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PollList;
