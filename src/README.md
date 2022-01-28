## Puck Worker

Puck Image Modification API using Cloudflare Workers.

### Usage

Visit https://puck.samuelmereau.workers.dev/

URL Params & Queries allowed:

- `imgWidth` (`int`) (https://puck.samuelmereau.workers.dev/[imgWidth])
  - Sets the width of the image (e.g 50). If imgHeight is left undefined, this value is also set as the height.

    ![imgWidth Example](https://puck.samuelmereau.workers.dev/50?url=https://doggo.ninja/CZv83D.png)

- `imgHeight` (`int`) (https://puck.samuelmereau.workers.dev/[imgWidth]/[imgHeight])
  - Sets the height of the image to create a rectangle. Optional.

    ![imgHeight Example](https://puck.samuelmereau.workers.dev/50/75?url=https://doggo.ninja/CZv83D.png)

- `url` (https://puck.samuelmereau.workers.dev/[imgWidth]?url={URL})
  - Sets the image for the API to fetch for modification. If invalid, the API will return a placeholder image instead.
  - Allowed MIME types: `image/png`, `image/jpeg`, `image/gif`, `image/svg+xml`

    ![url Example](https://puck.samuelmereau.workers.dev/100?url=https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c)<br/>
    *Image URL: https://unsplash.com/photos/LZVmvKlchM0*

    ![url Example 2](https://puck.samuelmereau.workers.dev/100?url=https://media0.giphy.com/media/dAWZiSMbMvObDWP3aA/giphy.gif)<br/>
    *Support for animated GIFs*

    ![url Example 2](https://puck.samuelmereau.workers.dev/100?url=https://example.com/somepng.png)<br/>
    *Requesting an invalid URL*
    

- `inverse` (`bool`) (https://puck.samuelmereau.workers.dev/[imgWidth]?url={URL}&inverse=[true/false])
  - If true, the API will return the inversed version of the puck modification.

    ![inverse Example](https://puck.samuelmereau.workers.dev/50?url=https://doggo.ninja/CZv83D.png&inverse=true)

### Installation

1. Install Cloudflare's [wrangler](https://github.com/cloudflare/wrangler) CLI, then login to configure

```shell
$ npm install -g @cloudflare/wrangler
# or
$ yarn global add @cloudflare/wrangler
```
```shell
$ wrangler login
```

2. Run the `npm run dev` command
   
```shell
$ cd ./src/
$ npm run dev
```

### License

[MIT](https://choosealicense.com/licenses/mit/)

---

Template generated from [`itty-router`](https://github.com/kwhitley/itty-router) package.