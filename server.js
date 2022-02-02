import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import bodyParser from "body-parser";
import { initAPIs } from "./api/routes/apj.route.js";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 3001;
const URI = process.env.URI;

export const upload = multer({dest: './public/uploads'});

app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.render('index');
});

initAPIs(app);

//Database
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) =>{
        app.listen(PORT, () => {
            console.log("Ket noi thanh cong "+ PORT);
        });
    })
    .catch((err) => {
        console.log('err: ' + err);
    });
