import React from 'react';
import axios from 'axios';

const PollList = ({ polls, onVote }) => {
  const handleVote = async (pollId, option) => {
    const token = localStorage.getItem('token');
    console.log('Iniciando votação...');
    console.log('Poll ID:', pollId);
    console.log('Opção selecionada:', option);
    console.log('Token presente:', !!token);

    if (!token) {
      alert('Você precisa estar logado para votar.');
      return;
    }

    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      console.log('API Base:', apiBase);
      console.log('URL completa:', apiBase + `/api/polls/${pollId}/vote`);

      const response = await axios.post(
        apiBase + `/api/polls/${pollId}/vote`,
        { option },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Resposta da votação:', response);
      console.log('Status da resposta:', response.status);

      alert('Voto registrado!');
      onVote();
    } catch (error) {
      console.error('Erro ao votar:', error);
      if (error.response) {
        console.error('Dados do erro:', error.response.data);
        console.error('Status do erro:', error.response.status);
      } else {
        console.error('Erro de rede ou outro:', error.message);
      }
      alert('Erro ao votar.');
    }
  };

  return (
    <div className="poll-list">
      <h2>Enquetes</h2>
      {polls.length === 0 ? (
        <div className="no-polls">
          <div className="no-polls-illustration">
            <i className="fas fa-chart-bar"></i>
          </div>
          <h3>Nenhuma enquete ativa no momento</h3>
          <p>Volte em breve para participar das nossas enquetes!</p>
        </div>
      ) : (
        polls.map(poll => {
          const totalVotes = Object.values(poll.votes || {}).reduce((sum, votes) => sum + votes, 0);
          return (
            <div key={poll.id} className="poll-item">
              <h3>{poll.question}</h3>
              <div className="poll-options">
                {poll.options.map(option => {
                  const voteCount = poll.votes[option] || 0;
                  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                  return (
                    <div key={option} className="poll-option">
                      <button
                        className="vote-button"
                        onClick={() => handleVote(poll.id, option)}
                      >
                        <span className="option-text">{option}</span>
                        <span className="vote-count">({voteCount})</span>
                      </button>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="percentage">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="total-votes">
                Total de votos: {totalVotes}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PollList;
