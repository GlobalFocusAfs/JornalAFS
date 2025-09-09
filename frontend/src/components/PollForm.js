import React, { useState } from 'react';
import axios from 'axios';

const PollForm = ({ onNewPoll }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [criando, setCriando] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCriando(true);

    const token = localStorage.getItem('token');
    const filteredOptions = options.filter(opt => opt.trim() !== '');

    console.log('Iniciando criação de enquete...');
    console.log('Pergunta:', question);
    console.log('Opções filtradas:', filteredOptions);
    console.log('Token presente:', !!token);

    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      console.log('API Base:', apiBase);
      console.log('URL completa:', apiBase + '/api/polls');

      const response = await axios.post(
        apiBase + '/api/polls',
        { question, options: filteredOptions },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Resposta da API:', response);
      console.log('Status da resposta:', response.status);

      if (response.status === 200) {
        alert('Enquete criada com sucesso!');
        setQuestion('');
        setOptions(['', '']);
        onNewPoll();
      }
    } catch (error) {
      console.error('Erro ao criar enquete:', error);
      if (error.response) {
        console.error('Dados do erro:', error.response.data);
        console.error('Status do erro:', error.response.status);
        alert('Erro: ' + error.response.data);
      } else {
        console.error('Erro de rede ou outro:', error.message);
        alert('Erro ao criar enquete. Verifique sua conexão.');
      }
    } finally {
      setCriando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="poll-form">
      <h2>Criar Enquete</h2>
      <input
        type="text"
        placeholder="Pergunta da enquete"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      {options.map((option, index) => (
        <div key={index} className="option-input">
          <input
            type="text"
            placeholder={`Opção ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
          {options.length > 2 && (
            <button type="button" onClick={() => removeOption(index)}>Remover</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addOption}>Adicionar Opção</button>
      <button type="submit" disabled={criando}>
        {criando ? 'Criando...' : 'Criar Enquete'}
      </button>
    </form>
  );
};

export default PollForm;
