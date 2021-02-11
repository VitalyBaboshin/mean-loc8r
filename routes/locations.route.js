const {Router} = require('express')
const router = Router();

const {location: locationSchema, openingTime: openingTimeSchema} = require('../models/Location')
const auth = require('../middleware/auth.middleware')


// /api/locations Создание нового местоположения необходим auth (проверяем токен в опциях запроса из миддлвеера))
router.post('/', auth, async(req, res) => {
    try{


        const {name, address, facilities, rating, reviews, openingTimes, coords} = req.body;

        const newlocation = new locationSchema({
            name, address, facilities, rating, reviews, openingTimes, coords : coords.reverse()
        })





        await newlocation.save();
        res.status(201).json({ message: 'Create new location' })

    }

    catch (e) {
        res.status(500).json({message: 'Internal server error -- create location'})
    }
})

// /api/locations Чтение списка местоположений
router.get('/', async(req, res) => {
    try{

        // если в запросе были были переданы параметры координат где находится сейчас устройство, то передаем только ближайшие локации
        // Иначе находим все локации и передаем
        const querry = req.query
        if (querry.hasOwnProperty('latitude') && querry.hasOwnProperty('longitude')) {
            const latitude = querry.latitude;
            const longitude = querry.longitude;
            console.log('lon: ', longitude, 'lat: ', latitude )

            const locationsGeo = await locationSchema.aggregate([
                {
                    $geoNear: {
                        near: {type:'Point', coordinates:[parseFloat(latitude), parseFloat(longitude), ]},
                        distanceField: 'dist',
                        maxDistance: 30000,
                    },
                }
            ])

            locationsGeo.forEach(elem => {
                elem.coords = elem.coords.reverse()
            })

            return  res.json(locationsGeo);

        } else {

            const locations = await locationSchema.find()

            locations.forEach(elem => {
                elem.coords = elem.coords.reverse()
            })

            res.status(200).json(locations);
        }


        const locations = await Loc.find(err => {
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
            return res.status(404).json({message: 'location not found'})

        }

        location.coords.reverse();
        return res.status(200).json(location)


    } catch (e) {
        res.status(500).json({message: 'Internal server error -- get location id'})
    }
})
//api/locations Создание нового отзыва
router.post('/:id/reviews', auth, async (req, res) => {
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
