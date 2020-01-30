const express = require('express');

const server = express();
server.use(express.json());

const projects = [];


// Middleware
server.use((req, res, next)=>{
    console.count('Total requisições');
    return next();
});

// Verifica se o projeto existe
function verificaSeProjetoExiste(req, res, next) {

    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({error: 'Projeto não existe!'});
    }

    return next();
}


//create projects
server.post('/projects', (req, res) => {
    const { id, title } = req.body;
    
    projects.push({
        id,
        title,
        tasks: []
    });

    return res.json(projects);
});

// list projects/
server.get('/projects', (req, res) => {
    return res.json(projects);
});

// update projects
server.put('/projects/:id', verificaSeProjetoExiste, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;
  
    return res.json(project);
});

// update projects
server.delete('/projects/:id', verificaSeProjetoExiste, (req, res) => {
    const { id } = req.params;

    const project = projects.find(p => p.id == id);

    projects.splice(project, 1);
  
    return res.send();
});



//create tasks
server.post('/projects/:id/tasks', verificaSeProjetoExiste,  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    
    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(projects);
});

// list projects/
server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.listen(3080);
