const express = require("express");
const vehiculo = require("../models/Vehiculo");
const router = express.Router();
//Get all vehiculoss
router.get("/vehiculos", async (req, res) => {
    try {
        const vehiculos = await vehiculo.find();
        res.json(vehiculos)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get vehiculo by ID

router.get('/vehiculos/:id', async (req, res) => {
  try {
      const vehiculoObject = await vehiculo.findOne({ id: req.params.id })
      if (vehiculoObject == null) {
          res.status(400).json(404);
      } else {
          res.json(vehiculoObject);
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// post Create/Insert one vehiculos
router.post('/vehiculo', async (req, res) => {
    const vehiculoObject = new vehiculo({
        id:req.body.id,
        placa: req.body.placa,
        modelo: req.body.modelo,
        marca: req.body.marca,
        año: req.body.año,
        color:req.body.color
    });

    try {
        const vehiculoToSave = await vehiculoObject.save();
        res.status(200).json(vehiculoToSave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//delete
router.delete('/vehiculo/:id', async (req, res) => {
    await vehiculo.findOneAndRemove({id: req.params.id})
    .then(res.json({status: 'Deleted!'}))
    .catch((error) => res.status(400).json({ message: error.message }));
  } )
//update
router.put('/vehiculo/:id', async (req, res) => {
    try {
        const updatedData = req.body;
        const options = { new: true };
  
        const result = await vehiculo.findOneAndUpdate(
          {id: req.params.id}, updatedData, options
        )
          if(!result){
            res.status(400).json({ message: 'id or body incorrect' })
          }else{
            res.send(result)
          }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  })
module.exports = router

