const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const {check, validationResult } = require('express-validator')
const User = require('../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')



// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6}),
        check('password', 'Максимальная длина пароля 20 символов').isLength({max: 20}),
        check('name', 'Минимальная длина 4 символа').isLength({min: 4})

    ],
    async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password, name} = req.body

        const candidate = await User.findOne({email})



        if (candidate) {
           return res.status(400).json({message: "Такой пользователь уже существует !"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ email, password: hashedPassword, name })

        await user.save();

        res.status(201).json({ message: "Пользователь создан" })

    } catch (e) {
        //Внутренняя ошибка сервера
        res.status(500).json({message: 'Internal server error'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email','Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {

            //Для обработки валидации express-валидатором
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password, name} = req.body;
            //ищем пользователя по email

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({message: "Пользователь не найден"});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            //Пароли не совпадают
            if(!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'});
            }
            //Формироуем токен
            const token = jwt.sign(
                { userId: user.id},
                config.get('jwtSecret'),
                { expiresIn: '1h'}
            )

            res.json({ token, userId: user.id, userName: user.name})

        } catch (e) {
            //Внутренняя ошибка сервера
            res.status(500).json({message: 'Internal server error !!'})
        }
    })




module.exports = router
