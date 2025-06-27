// React Frontend for URL Shortener using MUI

import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

function App() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortUrl, setShortUrl] = useState('');
  const [stats, setStats] = useState(null);

  const handleShorten = async () => {
    const res = await fetch('http://localhost:5000/shorturls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, shortcode, validity })
    });
    const data = await res.json();
    setShortUrl(data.shortLink);
  };

  const handleStats = async () => {
    const code = shortcode || shortUrl.split('/').pop();
    const res = await fetch(`http://localhost:5000/shorturls/stats/${code}`);
    const data = await res.json();
    setStats(data);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          🔗 URL Shortener
        </Typography>

        <TextField label="Long URL" fullWidth margin="normal" value={url} onChange={e => setUrl(e.target.value)} />
        <TextField label="Custom Shortcode (optional)" fullWidth margin="normal" value={shortcode} onChange={e => setShortcode(e.target.value)} />
        <TextField label="Validity (minutes)" type="number" fullWidth margin="normal" value={validity} onChange={e => setValidity(e.target.value)} />

        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleShorten}>
          Shorten URL
        </Button>

        {shortUrl && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Short URL:</Typography>
            <Typography variant="body1" color="primary">
              <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
            </Typography>
            <Button onClick={handleStats} variant="outlined" sx={{ mt: 1 }}>
              View Stats
            </Button>
          </Box>
        )}

        {stats && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>📊 Stats</Typography>
            <Typography>Total Clicks: {stats.totalClicks}</Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>Original URL: {stats.originalUrl}</Typography>
            <Typography>Created: {new Date(stats.createdAt).toLocaleString()}</Typography>
            <Typography>Expires: {new Date(stats.expiryAt).toLocaleString()}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
