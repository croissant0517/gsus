import type { NextApiRequest, NextApiResponse } from 'next'
import { VideoFile } from '../../video'
import axios from 'axios'

type Data = {
  name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    axios(`https://api.pexels.com/videos/videos/${id}`, {
      headers: {
        'Authorization': process.env.PEXEL_KEY ?? ''
      }
    }).then(response => {
      // filter the HD quality file
      const srcLink = response.data.video_files.find((file: VideoFile) => file.width === 1280);
      res.status(200).json(srcLink);
    }).catch(error => {
      res.status(400).json({ error, })
    })
}