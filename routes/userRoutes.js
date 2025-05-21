import { Hono } from 'hono'
import { signupController, signinController, updateProfileController, getProfileController } from '../controllers/userController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

export const userRoutes = new Hono()

userRoutes.post('/signup', signupController)
userRoutes.post('/signin', signinController)
userRoutes.get('/profile', authenticate, getProfileController)
userRoutes.put('/profile', authenticate, updateProfileController)
userRoutes.get('/profile/:id', authenticate, getProfileController)