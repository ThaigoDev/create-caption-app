// servidor.js
const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
require('dotenv').config(); 
const { OpenAI } = require('openai'); // ou use fetch se quiser

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // se você colocar o HTML no diretório 'public'
app.use(cors());
const openai = new OpenAI({ apiKey:process.env.OPENAI_API_KEY });

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
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
