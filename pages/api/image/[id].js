/* eslint-disable import/no-anonymous-default-export */
import httpProxy from 'http-proxy'
// const API_URL = process.env.API_URL // The actual URL of your API
const API_URL = 'https://cdn.sanity.io'
const proxy = httpProxy.createProxyServer()

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false
  }
}
export default (req, res) => {
  /* console.log(JSON.stringify(req, null, 2))
  const request = req.replace('api/image/') */
  proxy.web(request, res, { target: API_URL, changeOrigin: true })
}
