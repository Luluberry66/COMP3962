import express from 'express';
// import modules below
import { getItems } from './controller/getItems.js';


// create router
const router = express.Router();

// define routes below
router.get('/getItems', getItems);


export { router };