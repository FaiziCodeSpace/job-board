import fs from 'fs';
import url from 'url';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const SECRET = 'mysecretkey';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getIndexPage = (req, res) => res.render('indexPage');
export const getLoginPage = (req, res) =>  res.render('loginPage');
export const getRegisterPage = (req, res) => res.render('registerPage');



const authData = path.join(__dirname, '../data/usersDB.json');
const loadUsersData = () => JSON.parse(fs.readFileSync(authData));
const saveUsersData = (data) => fs.writeFileSync(authData, JSON.stringify(data, null, 2));

export const registerUser = (req, res) => {
    const { user, email, password } = req.body;
    const userDB = loadUsersData(); 
    const username = userDB.find(u => u.user === user);
    if(username) return res.render('registerPage', {error: `user already exist`});
    const id = uuidv4().slice(0, 6);
    userDB.push({ id, user, email, password });
    saveUsersData(userDB);
    res.redirect('/login');
}

export const loginUser = (req, res) => {
    const { user, password } = req.body;
    const userDB = loadUsersData();
    const profile = userDB.find(u => u.user === user && u.password === password);
    if(!profile) return res.send('Invalid Credentials!');
    const token = jwt.sign({ id: profile.id, username: profile.user }, SECRET, {expiresIn: '1h'});
    res.cookie('token', token, {httpOnly: true});
    res.redirect('/jobBoard');
} 








