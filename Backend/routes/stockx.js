// Backend/routes/stockx.js
import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = express.Router();

// Route: GET /api/stockx/search?q=...
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter `q` is required.' });
  }

  try {
    const searchUrl = `https://stockx.com/search?s=${encodeURIComponent(query)}`;
    const { data } = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const $ = cheerio.load(data);
    const results = [];

    $('div.css-1m051bw').each((_, el) => {
      const name = $(el).find('p.css-3lpefb').text().trim();
      const price = $(el).find('div.css-13l1g1p').text().trim();
      const image = $(el).find('img').attr('src');
      const link = 'https://stockx.com' + $(el).find('a').attr('href');

      if (name && link && image) {
        results.push({ name, price, image, link });
      }
    });

    res.json({ results });
  } catch (error) {
    console.error('[StockX Scraper Error]', error.message);
    res.status(500).json({ error: 'Failed to scrape StockX.' });
  }
});

export default router; // export default

// This code defines a route for searching StockX products. It uses axios to fetch the search results page and cheerio to parse the HTML and extract product details. The results are returned as a JSON response.
// The route is mounted in the main server file (server.js) under the path /api/stockx/search. The scraper handles errors gracefully and logs them to the console.
// The code is structured to be modular, allowing for easy expansion and maintenance. The use of async/await makes the code cleaner and easier to read.
// The scraper is designed to be efficient and only fetches the necessary data, reducing the load on both the server and the client. The use of a user-agent header mimics a real browser request, which can help avoid being blocked by StockX's servers.
// The code is ready to be integrated into a larger application, and can be easily modified to include additional features such as pagination or filtering based on different criteria.
// The scraper is designed to be efficient and only fetches the necessary data, reducing the load on both the server and the client. The use of a user-agent header mimics a real browser request, which can help avoid being blocked by StockX's servers.