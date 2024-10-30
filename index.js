const { Command } = require('commander');
const program = new Command();

program
  .option('-h, --host <type>', 'server host')
  .option('-p, --port <type>', 'server port')
  .option('-c, --cache <path>', 'cache directory')
  .parse(process.argv);
  
const option = program.opts();

if(!option.host){
    console.error("Please, specify the server address")
}
if(!option.port){
    console.error("Please, specify the server port")
}
if(!option.cache){
    console.error("Please, specify the path to the directory that will contain cached files")
}
const { host, port, cache } = program.opts();
console.log(`Host: ${host}, Port: ${port}, Cache Directory: ${cache}`);

const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

server.listen(option.port, option.host, () => {
    console.log(`Server is running on http://${option.host}:${option.port}`);
});

app.get('/notes/:noteName', (req, res) => {
    const notePath = path.join(option.cache, req.params.noteName);

    if (!fs.existsSync(notePath)) {
        return res.status(404).send('Not found');
    }

    const noteText = fs.readFileSync(notePath, 'utf8');
    res.send(noteText);
});

app.put('/notes/:noteName', (req, res) => {
    const notePath = path.join(option.cache, req.params.noteName);

    if (!fs.existsSync(notePath)) {
        return res.status(404).send('Not found');
    }

    const newText = req.body.text || '';
    fs.writeFileSync(notePath, newText);
    res.send('Note updated');
});

app.delete('/notes/:noteName', (req, res) => {
    const notePath = path.join(option.cache, req.params.noteName);

    if (!fs.existsSync(notePath)) {
        return res.status(404).send('Not found');
    }

    fs.unlinkSync(notePath);
    res.send('Note deleted');
});

app.get('/notes', (req, res) => {
    const files = fs.readdirSync(options.cache);
    const notes = files.map(fileName => {
        const text = fs.readFileSync(path.join(options.cache, fileName), 'utf8');
        return { name: fileName, text };
    });

    res.json(notes);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/write', (req, res) => {
    const noteName = req.body.note_name;
    const noteText = req.body.note;
    if (notesDatabase.has(noteName)) {
        return res.status(400).send('Note already exists');
    }
    notesDatabase.set(noteName, noteText);
    res.status(201).send('Note created');
});