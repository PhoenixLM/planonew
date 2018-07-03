const Imovel = require('../models/imovel')

module.exports = (app) => {
    app.get('/search/vendas/:proc&:tipo&:bairro&:valor', (req, res, next) => {
        var query = {}
        query["isVenda"] = true
        var reqProc   = req.params.proc
        if(reqProc !== 'null') query["procedencia"] = reqProc
        var reqTipo   = req.params.tipo
        if(reqTipo !== 'null') query["tipo"] = reqTipo
        var reqBairro = req.params.bairro
        if(reqBairro !== 'null') query["bairro"] = reqBairro
        var reqValor  = req.params.valor
        if(reqValor !== 'null') query["valor"] = {$lt : reqValor}

        Imovel.find(query, (err, imovels) => {
            if(err) next(err)
            else if(!imovels.length) res.send(null)
            else res.send(imovels)
        })
    })

    app.get('/search/vendas/destaques', (req, res, next) => {
        var query = {}
        query["isDestaque"] = true
        query["isVenda"] = true

        Imovel.find(query, (err, imovels) => {
            if(err) next(err)
            else if(!imovels.length) res.send(null)
            else res.send(imovels)
        })
    })

    app.get('/search/vendas/oportunidades', (req, res, next) => {
        var query = {}
        query["isOportunidade"] = true
        query["isVenda"] = true

        Imovel.find(query, (err, imovels) => {
            if(err) next(err)
            else if(!imovels.length) res.send(null)
            else res.send(imovels)
        })
    })
    app.get('/search/alugueis/destaques', (req, res, next) => {
        var query = {}
        query["isDestaque"] = true
        query["isVenda"] = false
    
        Imovel.find(query, (err, imovels) => {
            if(err) next(err)
            else if(!imovels.length) res.send(null)
            else res.send(imovels)
        })
    })
    
    app.get('/search/alugueis/oportunidades', (req, res, next) => {
        var query = {}
        query["isOportunidade"] = true
        query["isVenda"] = false
    
        Imovel.find(query, (err, imovels) => {
            if(err) next(err)
            else if(!imovels.length) res.send(null)
            else res.send(imovels)
        })
    })

    app.get('/search/alugueis/:tipo&:bairro&:valor', (req, res, next) => {
        var query = {}
        query["isVenda"] = false
        var reqTipo   = req.params.tipo
        if(reqTipo !== 'null') query["tipo"] = reqTipo
        var reqBairro = req.params.bairro
        if(reqBairro !== 'null') query["bairro"] = reqBairro
        var reqValor  = req.params.valor
        if(reqValor !== 'null') query["valor"] = {$lt : reqValor}

        Imovel.find(query, (err, imovels) => {
            if(err) next(err)
            else res.send(imovels)
        })        
    })
}
