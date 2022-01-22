const express = require('express');
const fs = require('fs');
const path = require('path');
const request = require('request').defaults({ encoding: null });
const cors = require('cors');

const app = express();

const port = 3000;

/* Middlewares */
app.use(cors());

/* Routes */
app.get('/:imgSize/:imgHeight?', async function (req, res) {
    try {
        const url = req.query.url;
        const imgSize = req.params.imgSize;
        const imgHeight = req.params.imgHeight;
        console.log({url, imgSize, imgHeight});
        let data = "test";
        request.get(url, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                data = 'data:' + response.headers["content-type"] + ';base64,' + Buffer.from(body).toString('base64');
            }
        }).on('complete', () => {
            res.send(`<img src="${data}" alt="test"/>`);
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
});

app.listen(port, function (req, res) {
    console.log(`Server is listening on port ${port}`);
})