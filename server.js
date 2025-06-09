// servidor.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✨ Já está importado!
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();

// Middlewares
app.use(bodyParser.json()); // Para analisar JSON no corpo das requisições
app.use(express.static('public')); // Se você estiver servindo arquivos estáticos de um diretório 'public'

// ✨ CONFIGURAÇÃO CORS:
// Esta linha já permite que QUALQUER origem faça requisições à sua API.
// Para fins de desenvolvimento (como http://127.0.0.1:5500), isso é ideal.
// Se você for para produção, considere a opção mais segura abaixo.
app.use(cors());

// ✨ EXEMPLO para Produção: Configuração CORS mais restritiva (DESCOMENTE SE PRECISAR)
/*
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://SEU_DOMINIO_DE_PRODUCAO.com'], // Substitua pelo seu domínio real em produção
  methods: ['GET', 'POST'], // Especifique os métodos HTTP que suas rotas usam
  allowedHeaders: ['Content-Type', 'Authorization'], // Especifique cabeçalhos adicionais que seu frontend envia
}));
*/

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Rota para gerar legenda
app.post('/gerar-legenda', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const legenda = completion.choices[0].message.content;
    res.json({ legenda });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar legenda' });
  }
});

// Rota para gerar roteiro
app.post('/gerar-roteiro', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const roteiro = completion.choices[0].message.content;
    res.json({ roteiro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar roteiro' });
  }
});

// Rota para gerar copy visual
app.post('/gerar-copy-visual', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const copy = completion.choices[0].message.content;
    res.json({ copy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar copy' });
  }
});

// Rota para gerar copy de conteúdo
app.post('/gerar-copy-content', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const copy = completion.choices[0].message.content;
    res.json({ copy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar copy' });
  }
});

// Rota de análise de conteúdo (aquela que seu frontend está chamando)
app.post('/analise-content', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const analise = completion.choices[0].message.content;
    res.json({ analise });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar análise' });
  }
});

// Rota para gerar entrevista
app.post('/gerar-entrevista', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const entrevista = completion.choices[0].message.content;
    res.json({ entrevista });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar Entrevista' });
  }
});

// Inicia o servidor
app.listen(process.env.PORT || 3000, () => { // Adicione || 3000 para um fallback caso PORT não esteja definido
  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
});