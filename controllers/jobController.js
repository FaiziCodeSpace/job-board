import url from 'url';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const jobsDB = path.join(__dirname, '../data/jobsDB.json');

const loadJobData = () => JSON.parse(fs.readFileSync(jobsDB));
const saveJobData = (data) => fs.writeFileSync(jobsDB, JSON.stringify(data, null, 2));


export const getshowJobs = (req, res) => {
    const jobs = loadJobData();
    res.render('JobBoardPage', {username: req.user.username, jobs})
}

export const createJob = (req, res) => {
    const jobs = loadJobData();
    const { topic, desription, salary, date } = req.body;
    const alreadyExist = jobs.find(u=>u.topic===topic);
    if(alreadyExist) return res.render(jobBoard, {error: 'Job Already Exists'});
    const id = uuidv4().slice(0, 6);
    jobs.push({ id, topic, desription, salary, date });
    saveJobData(jobs);
    res.redirect('/jobBoard');
} 