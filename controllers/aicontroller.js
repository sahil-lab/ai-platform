const axios = require('axios');
const axiosRetry = require('axios-retry').default;

// Implement retry mechanism with exponential delay
axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => axiosRetry.isRetryableError(error)
});

const generateText = async (req, res) => {
    const { model, text } = req.body;

    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not set in environment variables');
        }

        let apiResponse;
        let output;

        switch (model) {
            case 'Gemini':
                // Gemini doesn't have a public API yet. This is a placeholder.
                throw new Error('Gemini API is not available');

            case 'text-davinci-002':
                apiResponse = await axios.post('https://api.openai.com/v1/completions', {
                    model: 'text-davinci-002',
                    prompt: text,
                    max_tokens: 100,
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                output = apiResponse.data.choices[0].text;
                break;

            case 'gpt-3.5-turbo':
                apiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: text }
                    ],
                    max_tokens: 100,
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });
                output = apiResponse.data.choices[0].message.content;
                break;

            case 'Claude':
                // Claude doesn't have a public API. This is a placeholder.
                throw new Error('Claude API is not publicly available');

            default:
                return res.status(400).json({ error: 'Invalid model selected' });
        }

        res.json({ output });
    } catch (error) {
        console.error('Error generating text:', error.message);
        console.error('Error details:', error.response ? error.response.data : error);
        res.status(500).json({ error: 'Error generating text', details: error.message });
    }
};

const generateImage = async (req, res) => {
    const { prompt } = req.body;

    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not set in environment variables');
        }

        const apiResponse = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt,
            n: 1,
            size: "1024x1024"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ image_url: apiResponse.data.data[0].url });
    } catch (error) {
        console.error('Error generating image:', error.message);
        console.error('Error details:', error.response ? error.response.data : error);
        res.status(500).json({ error: 'Error generating image', details: error.message });
    }
};

const generateChatCompletion = async (req, res) => {
    const { messages } = req.body;

    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not set in environment variables');
        }

        const apiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ output: apiResponse.data.choices[0].message.content });
    } catch (error) {
        console.error('Error generating chat completion:', error.message);
        console.error('Error details:', error.response ? error.response.data : error);
        res.status(500).json({ error: 'Error generating chat completion', details: error.message });
    }
};

module.exports = { generateText, generateImage, generateChatCompletion };
