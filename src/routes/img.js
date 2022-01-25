import express from 'express';
const router = express.Router();
import fs from 'fs';
import path from 'path';
import request from 'request';

import puck from '../imgVariants/puck.js'
import inversePuck from '../imgVariants/inversePuck.js';

router.get('/:imgSize/:imgHeight?', async function (req, res) {
    try {
        const url = req.query.url === undefined ? 'https://doggo.ninja/8191iq.png' : req.query.url;
        let inverse = req.query.inverse === undefined ? 'false' : req.query.inverse;
        
        const imgSize = req.params.imgSize;
        const imgHeight = req.params.imgHeight == undefined ? imgSize : req.params.imgHeight;
        console.log({url, imgSize, imgHeight, inverse});
        
        let data;
        const { padding, margin } = inverse === 'true' ? inversePuck(imgHeight) : puck(imgHeight);
        request({
            url: url,
            encoding: null
        }, 
        function (err, response, body) {
            if (!err && response.statusCode == 200) {
                data = 'data:' + response.headers["content-type"] + ';base64,' + Buffer.from(body).toString('base64');
            }
        }).on('complete', () => {
            const element = `
            <svg width="${imgSize}" height="${imgHeight}" xmlns="http://www.w3.org/2000/svg" style="
                border-radius: 50%; 
                padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px; 
                margin: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;
                ">
                <image href="${data}" height="100%"/>
            </svg>`
            res.setHeader('content-type', 'image/svg+xml');
            res.status(200).send(element);
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
});

export default router;