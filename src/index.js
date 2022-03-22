"use strict";
import { Router } from 'itty-router'
const router = Router();

import validate from './helpers/validate.js';
import puck from './helpers/imgVariants/puck.js';
import inversePuck from './helpers/imgVariants/inversePuck.js';
import createSvg from './helpers/createSvg.js';

// Register img route
router.get('/:imgSize/:imgHeight?', async (req) => {
  const { params, query } = req;

  if (params.imgSize == 'favicon.ico' || params.imgHeight == 'favicon.ico') {
    return;
  }

  if (validate.isNumeric(params.imgSize) == false || params.imgHeight != undefined ? validate.isNumeric(params.imgHeight) == false : false) {
    return BadRequest();
  }
        // Params
  const imgSize = parseInt(params.imgSize),
        imgHeight = params.imgHeight == undefined ? imgSize : parseInt(params.imgHeight),
        // Queries
        url = await validate.url(query.url) == false ? 'https://doggo.ninja/D1sIG3.jpg' : query.url,
        inverse = query.inverse;

  console.log({ imgSize, imgHeight, url, inverse });
  
  const { padding, margin } = inverse == 'true' ? inversePuck(imgHeight) : puck(imgHeight); 

  try {
    let data;

    const img = await fetch(url)
      .then(
        async function (response) {
          if (response.status !== 200) {
            throw new Error('Bad Request');
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
  } catch (err) {
    throw new Error(err);
  }
});

// Redirect root route to the GitHub page
router.get("/", async (req) => {
  return Response.redirect("https://github.com/SamuelMereau/puck", 302);
});

// Handles exceptions where the router cannot identify a given route, instead of giving a CloudFlare error screen.
router.all("*", () => new Response("404, not found!", { status: 404 }));

addEventListener('fetch', (e) => {
  // Only allow GET requests to the API
  if(e.request.method == 'GET') {
    e.respondWith(
      router
        .handle(e.request)
        .catch(errorHandler)
    );
  } else {
     e.respondWith(MethodNotAllowed(e.request));
  }
});

/**
 * Handles caught errors from the API
 * @param {Error} error Error object
 * @returns {Response} Error response
 */
function errorHandler(error) {
  return new Response(`An error was encountered on the server. Please review the URL and retry.`, {
    status: error.status || 500
  });
}

/**
 * Returns a Method Not Allowed status 
 * @param {Request} request Request object
 * @returns {Response} Method Not Allowed response
 */
function MethodNotAllowed(request) {
  return new Response(`Method ${request.method} not allowed`, {
    status: 405
  });
}

/**
 * Returns a Bad Request status
 * @returns {Response} Bad Request response 
 */
function BadRequest() {
  return new Response(`Bad Request, please review the syntax of the URL.`, { 
    status: 400 
  });
}