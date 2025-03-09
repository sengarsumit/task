require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
const PORT = 3000;
const GITHUB_API = 'https://api.github.com';
const { GITHUB_USERNAME, GITHUB_TOKEN } = process.env;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

// GET /github → Show user data
app.get('/github', async (req, res) => {
  try {
    const response = await axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers });
    const repos = await axios.get(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos`, { headers });

    res.json({
      username: response.data.login,
      followers: response.data.followers,
      following: response.data.following,
      repositories: repos.data.map(repo => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /github/:repo → Show repository details
app.get('/github/:repo', async (req, res) => {
  try {
    const { repo } = req.params;
    const response = await axios.get(`${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}`, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /github/:repo/issues → Create an issue
app.post('/github/:repo/issues', async (req, res) => {
  try {
    const { repo } = req.params;
    const { title, body } = req.body;

    const response = await axios.post(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo}/issues`,
      { title, body },
      { headers }
    );

    res.json({ issue_url: response.data.html_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
