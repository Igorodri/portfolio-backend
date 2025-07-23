const express = require('express')
const db = require('../database.js');

const routes = express()

routes.post('/forms', async (req,res) => {
    const {nome,email,telefone,tipo_site,objetivos,referencias} = req.body

    if(!nome || !email || !telefone || !tipo_site || !objetivos || !referencias){
        return res.status(400).json({error: 'Campos não preenchidos'});
    }

    try{
        await db.query(
            'INSERT INTO formularios (nome,email,telefone,tipo_site,objetivo_site,referencia_site,created_at) VALUES (?,?,?,?,?,?,?)', [nome,email,telefone,tipo_site,objetivos,referencias,  new Date()]
        )


        return res.status(201).json({message: 'Formulário enviado com sucesso!'})
    }catch(error){
        console.error(error)
        return res.status(500).json({erro:'Erro interno no servidor'})
    }
})

routes.get('/projetos', async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM projetos');

        console.log(rows)

        return res.json(rows)
    }catch(error){
        console.error(error)
        return res.status(500).json({erro: 'Erro interno no servidor'})
    }
})

module.exports = routes