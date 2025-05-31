import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PrismaClient } from '../lib/generated/prisma/index.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const prisma = new PrismaClient()

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
        is_verified: false,
      },
    })

    const { password: _, ...userWithoutPassword } = user

    res.status(201).json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'User creation failed' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user

    res.json({ message: 'Login successful', token, user: userWithoutPassword })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
}
