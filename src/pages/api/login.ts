import path from 'path'
import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

interface userCredentials {
  email: string
  password: string
  accessToken: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: {
        timestamp: new Date(),
        status: 400,
        error: 'Bad request',
        message: `Missing parameter [${
          !email ? 'email' : !password ? 'password' : ''
        }]`,
        path: req.url
      }
    })
  }
  const jsonDirectory = path.join(process.cwd(), 'userCredentials.json')
  const fileContents = await fs.readFile(jsonDirectory, 'utf8')
  const {
    accessToken,
    email: fileEmail,
    password: filePass
  } = JSON.parse(fileContents) as userCredentials

  if (fileEmail === email && filePass === password)
    res.status(200).json({ accessToken: accessToken })
  else
    res.status(400).json({
      error: {
        timestamp: new Date(),
        status: 400,
        error: 'Bad request',
        message: `Email or password are incorrect`,
        path: req.url
      }
    })
}
