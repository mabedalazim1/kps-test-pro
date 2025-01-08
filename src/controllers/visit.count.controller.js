const { Count_Visits,Login_count , LoginData} = require('./../models/school.model')

const addVisits = async (req, res, next) => {
    try {
        const {type} = req.params
        const data = await Count_Visits.findAll({
            where: { id: 1 },
        })
        
        var visits = data[0].visits
        var pageviews = data[0].pageviews+1;

        if(type === 'visit'){
            visits = data[0].visits+1;
          }

         await Count_Visits.update({
            pageviews ,
            visits,
        }, {
            where: { id: 1,}
        },)
        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json("ok")
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}
const countVisits = async (req, res, next) => {
    try {
      
        const data = await Count_Visits.findAll({
            where: { id: 1 },
        })
        
        
        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

const countLogin = async (req, res, next) => {
    try {
      
        const data = await Login_count.findAll()
        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json({count:data.length})
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}


const addLogin = async (req, res, next) => {
    try {
      
        const date = new Date();
        const new_count_login = {
            userSchoolId: req.body.userSchoolId,
            page : req.body.page,
            createdAt: date,
            updatedAt: date,
        }
        const data = await Login_count.create(new_count_login)

        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json({data})
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}

const loginData = async (req, res, next) => {
    try {
      
        const data = await LoginData.findAll()
        if (data.length === 0) {
            res.status(204).send({ message: "No Content" })
        } else {
            res.status(200).json({data})
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
        console.log("Error", err)
    }
}
module.exports = {
    addVisits,
    countVisits,
    countLogin,
    addLogin,
    loginData,
}