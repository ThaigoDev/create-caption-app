// servidor.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- INICIALIZAÇÃO DO CLIENTE GEMINI ---
// Pega a chave da API do arquivo .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configurações do modelo. Você pode ajustar a temperatura e outros parâmetros aqui.
const generationConfig = {
  temperature: 0.7,
};

// Escolha do modelo do Gemini. 'gemini-1.5-flash' é rápido e eficiente.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(bodyParser.json());
app.use(cors()); // Permite requisições de qualquer origem (ideal para desenvolvimento)
app.use(express.static('public'));

/*
// ✨ EXEMPLO para Produção: Configuração CORS mais restritiva (DESCOMENTE SE PRECISAR)
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://SEU_DOMINIO_DE_PRODUCAO.com'], // Substitua pelo seu domínio
  methods: ['POST'], // Apenas o método POST é usado neste servidor
  allowedHeaders: ['Content-Type'],
}));
*/


// --- FUNÇÃO REUTILIZÁVEL PARA GERAR CONTEÚDO ---
/**
 * Gera conteúdo usando o modelo Gemini com base em um prompt.
 * @param {string} prompt O texto de entrada para o modelo.
 * @param {import('express').Response} res O objeto de resposta do Express.
 * @param {string} responseKey A chave que será usada no JSON de resposta (ex: 'legenda', 'roteiro').
 */
const gerarConteudoGemini = async (prompt, res, responseKey) => {
  if (!prompt) {
    return res.status(400).json({ error: 'O campo "prompt" é obrigatório.' });
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Retorna a resposta no formato { [responseKey]: "texto gerado" }
    res.json({ [responseKey]: text });

  } catch (err) {
    console.error("Erro na API do Gemini:", err);
    res.status(500).json({ error: `Erro ao gerar ${responseKey}` });
  }
};


// --- ROTAS DA API ---
// Todas as rotas agora usam a função reutilizável para manter o código limpo (DRY).

app.post('/gerar-legenda', (req, res) => {
  gerarConteudoGemini(req.body.prompt, res, 'legenda');
});

app.post('/gerar-roteiro', (req, res) => {
  gerarConteudoGemini(req.body.prompt, res, 'roteiro');
});

app.post('/gerar-copy-visual', (req, res) => {
  gerarConteudoGemini(req.body.prompt, res, 'copy');
});

app.post('/gerar-copy-content', (req, res) => {
  gerarConteudoGemini(req.body.prompt, res, 'copy');
});

app.post('/analise-content', (req, res) => {
  gerarConteudoGemini(req.body.prompt, res, 'analise');
});

app.post('/gerar-entrevista', (req, res) =>