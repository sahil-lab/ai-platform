import React, { useState } from 'react';
import { generateImage } from '../services/api';

function GenerateImage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    const data = await generateImage(prompt);
    setImageUrl(data.image_url);
  };

  return (
    <div className="GenerateImage">
      <h1>AI Image Generation</h1>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter prompt for image generation"
      />
      <button onClick={handleSubmit}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated by AI" />}
    </div>
  );
}

export default GenerateImage;
