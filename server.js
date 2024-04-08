const express = require("express");
const path = require("path");

const axios = require("axios");
const app = express();
const port = 3000;
app.use(express.static(path.join(path.resolve("./public"))));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve("./public", "index.html")));
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const options = {
    method: "GET",
    url: "https://spotify81.p.rapidapi.com/download_track",
    params: {
      q: q,
      onlyLinks: "1",
    },
    headers: {
      "X-RapidAPI-Key": "6e90cbe16cmsh81ec7fcccf1af13p1576c3jsna916174e5723",
      "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.send(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log(`server started at ${port}`);
});
