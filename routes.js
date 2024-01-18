const express = require('express');
const router = express.Router()
const db = require('./db');
const ValidatorMiddlware = require('./middlewares/validatorMiddleware')


// Endpoint de Leitura de Alunos (Read)
    router.get("/alunos",(req, res) => {
      const query = "SELECT * FROM alunos";

      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send("Erro ao obter alunos");
        } else {
          res.json(result);
        }
      });
    });
  
  // Endpoint de Criação de Aluno (Create)
  router.post('/alunos', ValidatorMiddlware.validateInput, (req, res) => {
    const { nome, idade } = req.body;
  
    const query = `INSERT INTO alunos (nome, idade) VALUES ('${nome}', ${idade})`;
  
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send('Erro ao criar aluno');
      } else {
        res.status(201).send('Aluno criado com sucesso');
      }
    });
  });
  
  // Endpoint de Atualização de Aluno (Update)
  router.put('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
  
    const query = `UPDATE alunos SET nome='${nome}', idade=${idade} WHERE id_aluno=${id}`;
  
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send('Erro ao atualizar aluno');
      } else {
        res.send('Aluno atualizado com sucesso');
      }
    });
  });
  
  // Endpoint de Exclusão de Aluno (Delete)
  router.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;
  
    const query = `DELETE FROM alunos WHERE id_aluno=${id}`;
  
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send('Erro ao excluir aluno');
      } else {
        res.send('Aluno excluído com sucesso');
      }
    });
  });

  // AUlAS

  // Endpoint de Criação de Aula (Create)
    router.post("/aulas", (req, res) => {
      const { nome_aula, descricao } = req.body;

      const query = `INSERT INTO aulas (nome_aula, descricao) VALUES ('${nome_aula}', '${descricao}')`;

      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send(`Erro ao criar aula: ${JSON.stringify(err)}`);
        } else {
          res.status(201).send(`Aula criada com sucesso`);
        }
      });
    });
  
  // Endpoint de Leitura de Aulas (Read)
  router.get('/aulas', (req, res) => {
    const query = 'SELECT * FROM aulas';
  
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(`Erro ao obter aulas : ${JSON.stringify(err)}`);
      } else {
        res.json(result);
      }
    });
  });
  
  // Endpoint de Atualização de Aula (Update)
  router.put('/aulas/:id', (req, res) => {
    const { id } = req.params;
    const { nome_aula, descricao } = req.body;
  
    const query = `UPDATE aulas SET nome_aula='${nome_aula}', descricao='${descricao}' WHERE id_aula=${id}`;
  
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(`Erro ao atualizar aula: ${JSON.stringify(err)}`);
      } else {
        res.send('Aula atualizada com sucesso');
      }
    });
  });
  
  // Endpoint de Exclusão de Aula (Delete)
  router.delete('/aulas/:id', (req, res) => {
    const { id } = req.params;
  
    const query = `DELETE FROM aulas WHERE id_aula=${id}`;
  
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).send(`Erro ao excluir aula: ${JSON.stringify(err)}`);
      } else {
        res.send('Aula excluída com sucesso');
      }
    });
  });

  // Ednpoint para criar inscrição em aulas
  router.post('/inscricao', (req,res) => {
    const {id_aula, id_aluno} = req.body
    const query = `INSERT INTO alunos_aulas (id_aula, id_aluno) VALUES (${id_aula}, ${id_aluno})`

    db.query(query,(err,result) => {
      if(err){
        res.status(500).send(`Erro ao inscrever-se`);
      }else {
        res.send(`Inscrição realizada com sucesso! :)`)
      }
    })
  })

  // Endpoint para verificar a inscrição 

  router.get('/inscricao', (req,res)=> {
    const query = `SELECT * FROM alunos_aulas`;

    db.query(query, (err,result)=>{
      if(err){
        res.status(500).send("Erro ao localizar inscrição")
      } else{
        res.json(result);
      }
    })
  })

  //Endpoint pra retornar todas as aulas de um aluno específico
  router.get('/inscricao/:id', (req, res)=>{
    const {id} = req.params
    const query = `SELECT * FROM alunos_aulas WHERE id_aluno = ${id}`

    db.query(query, (err, result)=>{
      if(err){
        res.status(500).send(`Erro ao retornar aluno: ${JSON.stringify(err)}`)
      } else {
        res.json(result)
      }
    })
  })
  
  //ENDPOINT atualização alunos e aula
  router.put('/inscricao/:id', (req, res) =>{
    const {id} = req.params;
    const{id_aula, id_aluno} = req.body;

    const query = `UPDATE alunos_aulas SET id_aluno=${id_aluno}, id_aula =${id_aula} WHERE id_aluno =${id} `

    db.query(query, (err, result)=>{
      if(err){
        res.status(500).send(`Erro ao atualizar aluno: ${JSON.stringify(err)}`)
      } else {
        res.json(result)
      }
    })
  })

module.exports = router;