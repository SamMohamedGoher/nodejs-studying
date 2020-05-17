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

function inputValidation(x) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(x, schema);
}


app.use(express.json());

let arr = [
    {id: 1, name:`course1`},
    {id: 2, name:`course2`},
    {id: 3, name:`course3`}
];

app.get(`/api/courses`, (req, res) => {
    res.status(200).send(`
    <h1>Courses:</h1>
    <h2><a href="http://localhost:3000/api/courses/1">Go to course1</a></h2>
    <h2><a href="http://localhost:3000/api/courses/2">Go to course2</a></h2>
    <h2><a href="http://localhost:3000/api/courses/3">Go to course3</a></h2>
    `);
});

app.get(`/api/courses/:id`, (req, res) => {
    let currentCourse = arr.find(x => x.id === parseInt(req.params.id));
    if(!currentCourse) return res.status(404).send(`<h2>this course not found</h2>`)
    res.status(200).send(currentCourse);
});

app.post(`/api/courses`, (req, res) => {
    const {error} = inputValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newCourse = {
        id: arr.length +1,
        name: req.body.name
    };
    arr[arr.length] = newCourse;
    res.status(200).send(newCourse);
});

app.put(`/api/courses/:id`, (req, res) => {
    const currentCourse = arr.find(x => x.id === parseInt(req.params.id));
    if(!currentCourse) return res.status(404).send(`this course not found`);
    const {error} = inputValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    currentCourse.name = req.body.name;
    res.status(200).send(currentCourse);
});

app.delete(`/api/courses/:id`, (req, res) => {
    const currentCourse = arr.find(x => x.id === parseInt(req.params.id));
    if(!currentCourse) return res.status(404).send(`this course not found`);
    let index = arr.indexOf(currentCourse);
    arr.splice(index, 1);
    res.send(currentCourse);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}`));

*/

// first project 'vidly'

/*

const express = require(`express`);
const Joi = require(`joi`);

const app = express();
app.use(express.json());

let genreStore = [
    {id: 1, name: `horor`, movies: [
        {id: 1, name: `Us (2019)`},
        {id: 2, name: `Get Out (2017)`},
        {id: 3, name: `The Conjuring`}
    ]},
    {id: 2, name: `action`, movies: [
        {id: 1, name: `The Avengers`},
        {id: 2, name: `Mission Impossible`},
        {id: 3, name: `John Wick`}
    ]},
    {id: 3, name: `drama`, movies: [
        {id: 1, name: `Parasite`},
        {id: 2, name: `Once Upon a Time in HollyWood`},
        {id: 3, name: `Joker`}
    ]}
];

function inputValidation(genre) {
    const schema = {
        name: Joi.string().min(3).required(),
        movies: Joi.array().min(3).required() || [
            {name: Joi.string().min(3).required()},
            {name: Joi.string().min(3).required()},
            {name: Joi.string().min(3).required()}
        ]
    };
    return Joi.validate(genre, schema);
}

app.get(`/api/genres`, (req, res) => {
    res.send(`
    <h1>Movies genres:</h1>
    <h3><a href="http://localhost:3000/api/genres/horor">horor movies</a></h3>
    <h3><a href="http://localhost:3000/api/genres/action">action movies</a></h3>
    <h3><a href="http://localhost:3000/api/genres/drama">drama movies</a></h3>
    `);
});

app.get(`/api/genres/:name`, (req, res) => {
    const currentGenre = genreStore.find(x => x.name === req.params.name);
    if(!currentGenre) return res.status(404).send(`<h3>the current movies genre not found</h3>`);
    res.status(200).send(`
    <h1>${currentGenre.name} movies:</h1>
    <h3>${currentGenre.movies[0].name}</h3>
    <h3>${currentGenre.movies[1].name}</h3>
    <h3>${currentGenre.movies[2].name}</h3>
    `);
});

app.post(`/api/genres/`, (req, res) => {
    let {error} = inputValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const newGenre = {
        id: genreStore.length +1,
        name: req.body.name,
        movies: [
            {id: 1, name: req.body.movies[0].name},
            {id: 2, name: req.body.movies[1].name},
            {id: 3, name: req.body.movies[2].name}
        ]
    };
    genreStore[genreStore.length] = newGenre;
    res.status(200).send(newGenre);
});

app.put(`/api/genres/:id`, (req, res) => {
    const currentGenre = genreStore.find(x => x.id === parseInt(req.params.id));
    if(!currentGenre) return res.status(404).send(`<h3>the current movies genre not found</h3>`);
    let {error} = inputValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    currentGenre.name = req.body.name;
    currentGenre.movies = req.body.movies;
    res.status(200).send(currentGenre);
});

app.delete(`/api/genres/:id`, (req, res) => {
    const currentGenre = genreStore.find(x => x.id === parseInt(req.params.id));
    if(!currentGenre) return res.status(404).send(`<h3>the current movies genre not found</h3>`);
    let index = genreStore.indexOf(currentGenre);
    genreStore.splice(index, 1);
    res.status(200).send(currentGenre);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to port ${port}...`));

*/

