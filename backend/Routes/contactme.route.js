import express from 'express'
import { contactFormContoller } from '../controllers/contactform.controller.js'

const router = express.Router() 
router.post('/api/contact',contactFormContoller)

export default router;

