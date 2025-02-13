"use client";

import dynamic from "next/dynamic";
import { encodeContentState } from "@iiif/vault-helpers";

const Viewer = dynamic(
  () => import("@samvera/clover-iiif/viewer").then((Clover) => Clover.default),
  {
    ssr: false,
  }
);

const ManifestViewer = ({ manifest, canvasId }: { manifest: string, canvasId?: string }) => {
  let manifestUrl = manifest
  if (manifest.includes('ub-iiif.vercel.app/api/manifest/marcus/')) {
    manifestUrl = manifest.replace(
      'https://ub-iiif.vercel.app/api/manifest/marcus/',
      'https://api.ub.uib.no/items/'
    ) + '?as=iiif'
  }
  if (manifest.startsWith('/api')) {
    manifestUrl = `http://localhost:3000${manifest}`
  }

  let iiif = null

  if (canvasId) {
    iiif = encodeContentState(JSON.stringify({
      id: canvasId,
      type: "Canvas",
      partOf: [
        {
          id: manifestUrl,
          type: "Manifest",
        },
      ],
    }))
  } else {
    iiif = manifestUrl
  }
  console.log(iiif)
  return (
    <div style={{ position: "relative", height: "700x", zIndex: "0" }}>
      <Viewer
        iiifContent={iiif}
        options={{
          canvasHeight: '700px',
          background: 'black',
          showIIIFBadge: false,
          showTitle: false,
          informationPanel: {
            open: false,
            renderToggle: false,
          }
        }}
      />
    </div>
  );
};

export default ManifestViewer;
