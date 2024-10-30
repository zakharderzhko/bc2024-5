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

