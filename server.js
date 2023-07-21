const express = require('express');
const { readFile, writeFile } = require('node:fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const getFunc = (getRoute, path) => {
  app.get(getRoute, async (req, res) => {
    try {
      readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        res.status(200).send(data);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const postFunc = (postRoute, path) => {
  app.post(postRoute, async (req, res, next) => {
    try {
      writeFile(path, JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('file written');
      });
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  });
};

getFunc('/data', './database/database-redux.json');
getFunc('/data-route', './database/database-route.json');

postFunc('/post-data', './database/database-redux.json');

app.listen(8080, () => console.log('server running on 8080..'));
