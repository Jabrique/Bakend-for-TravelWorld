import express from 'express';
import { createContact, getAllContacts, getSingleContact } from '../controllers/contactController.js';
import verifyToken, { verifyAdmin } from '../utils/verifyToken.js';


const contactRoute = express.Router();

contactRoute.post('/' ,createContact);

contactRoute.get('/:id', verifyToken, verifyAdmin, getSingleContact);

contactRoute.get('/', verifyToken, verifyAdmin, getAllContacts);


export default contactRoute;
