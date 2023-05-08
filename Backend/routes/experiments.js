const express = require('express');
const Experiment = require('../Models/Experiment'); 
const router = express.Router();
const ExpDetails = require('../Models/ExpDetails')

router.get('/getAllExperiments', async(req, res)=>{
    try{
        const experiments = await Experiment.find()
        res.json(experiments);
    } catch(err){
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }

})

router.get('/getEperiment/:id', async (req, res) => {
    try {
        let id = req.params.id
        let Exp = await Experiment.find({ _id: id }) 
        res.json( Exp)

    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/addExperiment', async (req, res) => {
    try {
        let title = req.body.title
        let description = req.body.description
        let section = req.body.section
        let url = req.body.url
        let ex = await Experiment.findOne({ title: title });
        if (ex) {
            return res.status(400).json({ error: "Experiment exists" })
        }
         
        
        Exp = await Experiment.create({
            title: title,
            description: description,
            section: section,
            redirectURL:url
        });

        res.json(Exp)

    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})


router.get('/getSection/:section', async(req, res) => {

    try{
        let section = req.params.section;
        let ex = await Experiment.find({ section: section });
        res.json(ex)

    } catch (err) {
        console.log(err)
        res.status(500).send("Kuch nahi mila vro")
    }
})

router.post('/addExpDetails', async (req, res) => {

    try{
        let title = req.body.title
        let theory = req.body.theory
        let objective = req.body.objective
        let simulation = req.body.simulation
        let procedure = req.body.procedure
        let eid = req.body.eId
        await ExpDetails.create({
            title: title,
            theory:theory,
            objective: objective,
            simulation:simulation,
            procedure:procedure,
            eId:eid
        });

        res.json({success:'true'})



    } catch(err){
        console.log(err)
        res.status(500).send("Locha hua vro")
    }

});


router.get('/getExpDetails/:id', async (req, res) => {

    try{
        let id = req.params.id 
        let exp = await ExpDetails.find({eId:id})
        if(exp) res.json({exp,'success':'true' })
        
        


    } catch(err){
        console.log(err)
        res.status(500).json({exp:null, 'success':'false'})
    }

});

module.exports = router;