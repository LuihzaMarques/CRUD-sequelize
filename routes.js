const express = require('express');
const router = express.Router()
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;app

app.use(bodyParser.json());

const routes = require('./routes')


db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta : ${port}`)
})

//endpoint de leitura de alunos(read)
router.get("/alunos", (req,res)=>{
  const query = "SELECT * FROM alunos";

  db.query(query, (err,result)=>{
      if(err){
          res.status(500).send("erro ao obter alunos");
      }else {
          res.json(result);
      }
  });
});

//endpoint de criação de alunos (create) --
router.post('/alunos', (req,rest)=>{

  const {nome, idade} = req.body;

  const query = `INSERT INTO alunos (nome, idade) VALUES ('${nome}', '${descricao})`;


  db.query(query, (err,result) => {
    if(err){
      res.status(500).send("Erro ao criar aluno");
    } else{
      res.status(201).send("Aluno cadastrado");
    }
  })
})

//endpoint de atualização de aluno (upadate)
router.put('/alunos/:id', (req,res)=>{

  const { id } = req.params;
  const { nome, idade } = req.body;

  const query = `UPDATE alunos SET nome= '${nome}, idade=${idade} WHERE id_aluno=${id}`;

  db.query(query, (err, result) => {
    if(err){
      res.status(500).send('Erro ao atualizar aluno');
    } else {
      res.send('Aluno atualizado com sucesso');
    }
  });
});


//Endopoint de exclusão de aluno (delete)
router.delete('/alunos/:id', (req,res)=>{
  
  const { id } = req.params;
  
  const query = `DELETE FROM alunos WHERE id_alunos=${id}`;

  db.query(query, (err, result) => {
    if(err){
      res.status(500).send('Erro ao excluir aluno');
    } else {
      res.send('Aluno excluído com sucesso');
    }
  });
});


// CRUD PARA AS AULAS

//endpoint de criação de aula (Create)
router.post("/alunos", (req,res)=>{
  const { nome_aula, descricao } = req.body;

  const query = `INSERT INTO aula (nome_aula, descricao) VALUE ('${nome_aula}', '${descricao}')`;

  db.query(query, (err, result)=>{
    if(err){
      res.status(500).send( `Erro ao criar aula: ${JSON.stringify(err)}`);
    } else {
      res.status(201).send("Aula criada com sucesso");
    }
  });
});

//endpoint de leitura de aulas (Read)
router.get('/alunas', (req,res) =>{
  const query = 'SELECT * FROM aulas';

  db.query(query, (err, result)=>{
    if(err){
      res.status(500).send('Erro ao obter aula');
    } else {
      res.json(result);
    }
  });
});

//endoid de atualização de aula (Update)
router.put('/aulas/:id', (req, res)=>{
  const { id } = req.params;
  const { nome_aula, descricao } = req.body; 

  const query = `UPDATE aulas SET nome_aula='${nome_aula}', descricao='${descricao}' WHERE id_aula=${id}`;

  db.query(query(err, result) => { 

  })
})