const QRCode = require('qrcode')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const dataURL = await QRCode.toDataURL(JSON.stringify(req.body.payload))
    const data = dataURL.replace('data:image/png;base64,', '')
    const image = Buffer.from(data, 'base64')
    res.setHeader('Content-Type', 'image/png')
    // res.setHeader('Content-Length', image.length)

    res.status(200).send(image)
  } else {
    res.status(400).json('Unsupported operation')
  }
}