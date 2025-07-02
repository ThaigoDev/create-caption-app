// servidor.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// 1. TROCA da biblioteca OpenAI pela do Google Generative AI
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// 2. INICIALIZAÇÃO do cliente do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash", // Um modelo rápido e eficiente do Gemini
  generationConfig: {
    temperature: 0.7, // A temperatura é definida aqui na configuração do modelo
  }
});


// Rota para gerar legenda
app.post('/gerar-legenda', async (req, res) => {
  const { prompt } = req.body;
  try {
    // 3. ADAPTAÇÃO da chamada para a API do Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const legenda = response.text();
    
    res.json({ legenda });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar legenda com o Gemini' });
  }
});

// Rota para gerar roteiro
app.post('/gerar-roteiro', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const roteiro = response.text();

    res.json({ roteiro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar roteiro com o Gemini' });
  }
});

// Rota para gerar copy visual
app.post('/gerar-copy-visual', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const copy = response.text();

    res.json({ copy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar copy com o Gemini' });
  }
});

// Rota para gerar copy de conteúdo
app.post('/gerar-copy-content', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const copy = response.text();

    res.json({ copy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar copy com o Gemini' });
  }
});

// Rota de análise de conteúdo
app.post('/analise-content', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analise = response.text();

    res.json({ analise });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar análise com o Gemini' });
  }
});

// Rota para gerar entrevista
app.post('/gerar-entrevista', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const entrevista = response.text();

    res.json({ entrevista });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar Entrevista com o Gemini' });
  }
});

// Inicia o servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
});