// path module

/*

const path = require('path');

let pathObj = path.parse(__filename);

console.log(`File name: ${pathObj.name}${pathObj.ext}`);

*/

// os (OperatingSystem) module

/*

const os = require('os');

console.log(`Free memory: ${(os.freemem()/1024/1024/1024).toFixed(1)} GB`);

console.log(`Total memory: ${(os.totalmem()/1024/1024/1024).toFixed(1)} GB`);

*/

// fs (FileSystem) module

/*

const fs = require('fs');

let filesSync = fs.readdirSync('./');

console.log(`Sync way: ${filesSync}`);

fs.readdir('./', (err, file) => {
    if(err) {
        console.log(`Error!!`, err);
    } else console.log(`Files: ${file}`);
});

*/

// Event module

/*

const LisLogger = require(`./message`);

const loggerLis = new LisLogger();

loggerLis.on(`IDs`, (par) => {
    console.log(`IDs: [${par}]`);
});

loggerLis.logger(`sending IDs...`);

*/

// http module

/*

const http = require(`http`);

const server = http.createServer((req, res) => {
    if(req.url === `/`) {
        res.write(`
        <!doctype html>
        <html>
        <head>
            <title>Example Domain</title>
        
            <meta charset="utf-8" />
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
            body {
                background-color: #f0f0f2;
                margin: 0;
                padding: 0;
                font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                
            }
            div {
                width: 600px;
                margin: 5em auto;
                padding: 2em;
                background-color: #fdfdff;
                border-radius: 0.5em;
                box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
            }
            a:link, a:visited {
                color: #38488f;
                text-decoration: none;
            }
            @media (max-width: 700px) {
                div {
                    margin: 0 auto;
                    width: auto;
                }
            }
            </style>    
        </head>
        
        <body>
        <div>
            <h1>Example Domain</h1>
            <p>This domain is for use in illustrative examples in documents. You may use this
            domain in literature without prior coordination or asking for permission.</p>
            <p><a href="https://www.iana.org/domains/example">More information...</a></p>
        </div>
        </body>
        </html>
        `);
    }
});

server.listen(8080);
console.log(`Listening to port 8080...`);

*/

// RESTful APIs using express

/*

const express = require(`express`);
const Joi = require(`joi`);

const app = express();
app.use(express.json());

let x = 0;
function idGenerate() {
    x++;
    return x;
}

let coursesArray = [
    {id: idGenerate(), name: `course1`},
    {id: idGenerate(), name: `course2`},
    {id: idGenerate(), name: `course3`}
];

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).max(12).required() 
    };
    return Joi.validate(course, schema);
}

app.get(`/api/courses`, (req, res) => {
    res.send(`
    <h1>Courses:</h1>
    <h2><a href="http://localhost:8080/api/courses/1">Go to course1</a></h2>
    <h2><a href="http://localhost:8080/api/courses/2">Go to course2</a></h2>
    <h2><a href="http://localhost:8080/api/courses/3">Go to course3</a></h2>
    `);
});

app.get(`/api/courses/:id`, (req, res) => {
    let currentCourse = coursesArray.find(x => req.params.id == x.id);
    if(!currentCourse) return res.status(404).send(`<h1>this course is not found</h1>`);
    else res.status(200).send(currentCourse);
});

app.post(`/api/courses`, (req ,res) => {
    const result = validateCourse(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    else {
        let newCourse = {
            id: coursesArray.length +1,
            name: req.body.name
        };
        coursesArray.push(newCourse);
        res.status(200).send(newCourse);
    }
});

app.put(`/api/courses/:id`, (req, res) => {
    let currentCourse = coursesArray.find(arr => arr.id == req.params.id);
    if(!currentCourse) return res.status(404).send(`<h1>this course is not found</h1>`);
    else {
        const result = validateCourse(req.body);
        if(result.error) return res.status(400).send(result.error.details[0].message);
        else {
        currentCourse.name = req.body.name;
        res.status(200).send(currentCourse);
        }
    }
});

app.delete(`/api/courses/:id`, (req, res) => {
    let currentCourse = coursesArray.find(arr => arr.id == req.params.id);
    if(!currentCourse) return res.status(404).send(`<h1>this course is not found</h1>`);
    else {
        let index = coursesArray.indexOf(currentCourse);
        coursesArray.splice(index, 1);
        res.status(200).send(currentCourse);
    }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});

*/

