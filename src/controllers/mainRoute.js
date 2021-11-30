const express = require('express');
const router = express.Router()

module.exports = function mainRout(model, url) {
    const modleName = url.substring(1)
    router
        .route(url)
        .get((req, res) => {
            model.findAll().then(data => {
                if (data.length === 0) {
                    res.status(204).json({ msg: "No Content" })
                    
                }
                else  res.status(200).json(data)
            }).catch(err => {
                res.status(500).json({ error: err })
                console.log("Erorr", err)
            })
        }).post((req, res) => {
            let body = req.body
            model.create(body).then(data => {
                res.status(201).json(data)
            }).catch(err => {
                res.status(500).json({ msg: "Cann't add this item", error: err })
            })
        })
    router

        .route(`${url}/:modelId`)
        .get((req, res) => {
            const id = req.params.modelId
            model.findOne({
                where: {
                    id: id,
                }
            }).then(result => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(404).send({
                        message: `Cannot find ${modleName} with id=${id}.`
                    })
                }
            })
                .catch(err => {
                    res.status(500).send({
                        message: `Error retrieving ${modleName} with id=${id}`
                    })
                })
        }).put((req, res) => {
            const id = req.params.modelId
            model.update(req.body, {
                where: { id: id }
            }).then(num => {
                if (num == 1) {
                    res.send({
                        message: `${modleName} was updated successfully.`,
                        num
                    })
                } else {
                    res.send({
                        message: `Cannot update ${modleName} with id=${id}. 
                        Maybe ${modleName} was not found or body is empty!`
                    })
                }
            }).catch(err => {
                res.status(500).send({
                    message: `Error updating ${modleName} with id= ${id} `
                })
            })
        })
        .delete((req, res) => {
            const id = req.params.modelId
            model.destroy({
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: `${modleName} was deleted successfully!`
                        })
                    } else {
                        res.status(404).send({
                            message: `Cannot delete ${modleName} with id=${id}. Maybe Section was not found!`
                        })
                    }
                }).catch((err) => {
                    res.status(500).send({
                        message: `Could not delete ${modleName} with id= ${id}`,
                        error: err
                    })
                })
        })
    return router
}