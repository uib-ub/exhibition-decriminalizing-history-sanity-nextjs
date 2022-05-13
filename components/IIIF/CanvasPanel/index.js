import Script from 'next/script'

const CanvasPanel = () => {

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@digirati/canvas-panel-web-components@latest" />
      <canvas-panel
        canvas-id="https://digirati-co-uk.github.io/wunder/canvases/0"
        manifest-id="https://digirati-co-uk.github.io/wunder.json"
      />
    </>

  )
}

export default CanvasPanel