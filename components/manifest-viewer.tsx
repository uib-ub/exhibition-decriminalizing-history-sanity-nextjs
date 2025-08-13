"use client";

import dynamic from "next/dynamic";
import { encodeContentState } from "@iiif/vault-helpers";

const Viewer = dynamic(
  () => import("@samvera/clover-iiif/viewer").then((Clover) => Clover.default),
  {
    ssr: false,
  }
);

const MANIFEST_SERVICE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://decriminalizing-history.uib.no'

const ManifestViewer = ({ manifest, canvasId }: { manifest: string, canvasId?: string }) => {
  let manifestUrl = manifest
  if (manifest.startsWith('/api')) {
    manifestUrl = `${MANIFEST_SERVICE_URL}${manifest}`
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

  return (
    <div style={{ position: "relative", zIndex: "0" }}>
      <Viewer
        iiifContent={iiif}
        options={{
          canvasHeight: '600px',
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
