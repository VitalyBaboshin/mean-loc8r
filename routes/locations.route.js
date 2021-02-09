const {Router} = require('express')
const router = Router();
const {location: locationSchema, openingTime: openingTimeSchema} = require('../models/Location')

// /api/locations Создание нового местоположения необходим auth (проверяем токен в опциях запроса из миддлвеера))
router.post('/', async(req, res) => {
    try{

        const {name, address, facilities, rating, reviews, openingTimes, coords} = req.body;
        // console.log(...openingTime)
        const newlocation = new locationSchema({
            name, address, facilities, rating, reviews, coords, openingTimes
        })


        res.status(201).json({ message: 'Create new location' })
        await newlocation.save();
        console.log('create new location')

    }catch (e) {
        res.status(500).json({message: 'Internal server error -- create location'})
    }
})

// /api/locations Чтение списка местоположений
router.get('/', async(req, res) => {
    try{

        
        const locations = await locationSchema.find(err => {
            if (err) {
                console.log('err findAllLocation:', err.CastError)
            }
        })
        res.json(locations);

    } catch (e) {
        res.status(500).json({message: 'Internal server error -- get all location'})
    }
})

//api/locations Чтение конкретного местоположения
router.get('/:id', async (req, res) => {
    try{

         const location = await locationSchema.findById(req.params.id, (err) => {
            if (err) {
                console.log('err findById:', err.CastError)
            }

        });
        if(!location) {
            res.status(404).json({message: 'location not found'})
            return
        }
        res.json(location)


    } catch (e) {
        res.status(500).json({message: 'Internal server error -- get location id'})
    }
})
//api/locations Создание нового отзыва
router.post('/:id/reviews', async (req, res) => {
    try{
        console.log('Create new review')
        const {rating, reviewText, author} = req.body;

        let locationForReview = await locationSchema.findById(req.params.id).select(['rating', 'reviews']) ;

        locationForReview.reviews.push({
            author, rating, reviewText
        })
        // let updateAverageRating = function (totalRating, length, rating) {
        //     console.log(totalRating, length, rating)
        //     return (totalRating*(length-1) + rating)/length;
        // }
        locationForReview.rating = (locationForReview.rating*(locationForReview.reviews.length-1) + rating)/locationForReview.reviews.length;

        await locationForReview.save( '', err => {
            if (err) {
                res.status(404).json({message: 'location not save'})
            }
        })

        res.json(locationForReview.reviews[locationForReview.reviews.length-1])
    } catch (e) {
        res.status(500).json({message: 'Internal server error -- get location id'})
    }
})
// api/locations Создание координат для локации
router.post('/:id/coords', async (req, res) => {
    try{
        console.log('Create new coords')
        const coord = req.body;
        console.log(coord)
        let locationForCoord = await locationSchema.findById(req.params.id).select(['coords']) ;
        console.log(locationForCoord)
        try  {
            locationForCoord.coords = coord
        }catch (e) {
            console.log(e.message)
        }

        console.log(locationForCoord)
        // let updateAverageRating = function (totalRating, length, rating) {
        //     console.log(totalRating, length, rating)
        //     return (totalRating*(length-1) + rating)/length;
        // }

        await locationForCoord.save( '', err => {
            if (err) {
                res.status(404).json({message: 'location not save'})
            }
        })

        res.json(locationForCoord.coords)
    } catch (e) {
        res.status(500).json({message: 'Internal server error -- get location id'})
    }
})

module.exports = router
