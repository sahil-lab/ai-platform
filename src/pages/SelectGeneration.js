import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectGeneration() {
  const navigate = useNavigate();

  const handleTextGeneration = () => {
    navigate('/generate-text');
  };

  const handleImageGeneration = () => {
    navigate('/generate-image');
  };

  return (
    <div className="SelectGeneration">
      <h1>Select Generation Type</h1>
      <button onClick={handleTextGeneration}>Text Generation</button>
      <button onClick={handleImageGeneration}>Image Generation</button>
    </div>
  );
}

export default SelectGeneration;
