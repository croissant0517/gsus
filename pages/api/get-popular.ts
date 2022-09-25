import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 
    const { page } = req.query;
    
    axios(`https://api.pexels.com/videos/popular`, {
        headers: {
            'Authorization': process.env.PEXEL_KEY ?? ''
        },
        params: {
            page: page ?? 1,
            per_page: 15,
            min_width: 1920,
            min_height: 1080,
        }
    }).then(response => {
      res.status(200).json(response.data)
    }).catch(error => {
      res.status(400).json({ error: 'No Data' })
    })
}