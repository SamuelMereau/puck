"use strict";
import { Router } from 'itty-router'
const router = Router();

import puck from './helpers/imgVariants/puck.js';
import inversePuck from './helpers/imgVariants/inversePuck.js';
import createSvg from './helpers/createSvg.js';

// Register img route
router.get('/:imgSize/:imgHeight?', async (req) => {
  const { params, query } = req;

  if (params.imgSize == 'favicon.ico' || params.imgHeight == 'favicon.ico') {
    return;
  }

  const imgSize = params.imgSize,
        imgHeight = params.imgHeight === undefined ? imgSize : params.imgHeight,
        // Queries
        url = query.url,
        inverse = query.inverse;
  console.log({ imgSize, imgHeight, url, inverse });
  
  const { padding, margin } = inverse == 'true' ? inversePuck(imgHeight) : puck(imgHeight); 

  try {
    let data;

    const img = await fetch(url)
      .then(
        async function (response) {
          if (response.status !== 200) {
            console.log('An error occurred fetching the image, with status code: ' + response.status);
            return;
          }
          
          function base64Encode(buf) {
            let string = '';
            (new Uint8Array(buf)).forEach(
              (byte) => { string += String.fromCharCode(byte) }
            )
            // This should be equivalent to Buffer.from(string).toString('base64'), 
            // However this does not yield the same result as btoa() using CF Workers.
            return btoa(string)
          }

          data = `data:${response.headers.get('content-type')};base64,${base64Encode(await response.arrayBuffer())}`;            
        }
      );
    const element = createSvg({
      width: imgSize,
      height: imgHeight,
      padding: padding,
      margin: margin,
      imgData: data
    });
    return new Response(element, { status: 200, headers: { 'content-type': 'image/svg+xml' }});
  } catch (ex) {
    console.log("caught error: " + ex);
  }
});

// Handles exceptions where the router cannot identify a given route, instead of giving a CloudFlare error screen.
router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
