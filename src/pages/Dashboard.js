import React, { useState, useEffect } from 'react';
import { generateText } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = await generateText(model, inputText, token);
      setOutputText(data);
      setChatHistory([...chatHistory, { input: inputText, output: data }]);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Mimix AI</h1>
        <div className="header-right">
          <select value={model} onChange={(e) => setModel(e.target.value)} className="model-select">
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="text-davinci-002">text-davinci-002</option>
            <option value="Gemini">Gemini</option>
            <option value="Claude">Claude</option>
          </select>
          <button className="btn" onClick={() => navigate('/image-generation')}>Go to Image Generation</button>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="content">
        <div className="chat-history">
          <h2>previous convo</h2>
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-entry">
              <p><strong>User:</strong> {chat.input}</p>
              <p><strong>AI:</strong> {chat.output}</p>
            </div>
          ))}
        </div>
        <div className="generation-section">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <textarea 
            value={outputText} 
            readOnly 
            placeholder="AI generated text will appear here..." 
            className="output-text"
          />
          <div className="input-container">
            <textarea 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              placeholder="Enter your text here..." 
            />
            <div className="buttons">
              <button className="icon-btn" onClick={handleSubmit}>
                <FaPaperPlane />
              </button>
              <button className="icon-btn">
                <FaPaperclip />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
