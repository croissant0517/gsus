import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { keyword } = req.query;
    
    axios(`https://api.pexels.com/videos/search?query=${keyword}`, {
      headers: {
        'Authorization': process.env.PEXEL_KEY ?? ''
      }
    }).then(response => {
      res.status(200).json(response.data)
    }).catch(error => {
      res.status(400).json({ error: 'No Data' })
    })
}