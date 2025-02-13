# Decriminalizing History

Decriminalizing History is a physical and digital exhibition launced 1. September 2022. The exhibition is a collaboration between the University of Bergen Library and David Carrillo-Rangel. 

It is a [Next.js](https://nextjs.org/) project bootstrapped with a [`Sanity studio`](https://sanity.io).


## Development

```bash
npm install
npm run dev
```

## Issues

We are using the Sanity Image API in the generated manifests. The sizes in `info.json` are not in the power of two, which is required by OpenSeadragon. See https://github.com/openseadragon/openseadragon/issues/2618.

To fix this, we need to override the openseadragon version in the `package.json` file.

```json
  // ... existing code ...
  "overrides": {
    "openseadragon": "4.0.0",
    "@samvera/clover-iiif": {
      "openseadragon": "4.0.0"
    }
  },
```

## URLs

* Web
  * https://decriminalizing-history.uib.no
* Studio
  * https://decrimhist.sanity.studio/studio/