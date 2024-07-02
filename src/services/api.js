import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const generateText = async (model, text, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/generate`,
      { model, text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.output;
  } catch (error) {
    console.error('Error generating text:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const generateImage = async (prompt, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/generate-image`,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.image_url;
  } catch (error) {
    console.error('Error generating image:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const generateChatCompletion = async (messages, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat/completions`,
      { messages },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.output;
  } catch (error) {
    console.error('Error generating chat completion:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error signing up:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export { generateText, generateImage, generateChatCompletion, signup, login };
