const {Router} = require('express')
const router = Router();
const Fac = require('../models/Facilities')


// /api/admin/facilities
router.get('/facilities', async (req, res) => {
    try {
        let allFacility = await Fac.find({}, {name: 1, _id: false})
        allFacility = allFacility.map(item => item.name)
        res.json(allFacility);
        console.log('facilities is find')

    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }
})

// /api/admin/facilities
router.post('/facilities', async (req, res) => {
    try {
        const { nameFacilities } = req.body;
        const candidate = await Fac.findOne({ name: nameFacilities })

        if (candidate) {
            return res.status(400).json({message: "Facilities already exist!"})
        }

        const newFacility = new Fac({ name: nameFacilities })
        await newFacility.save();

        res.status(201).json({ message: "Facilities added", nameFacilities })
        console.log('Create new facilities')
    } catch (e) {
        res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = router
