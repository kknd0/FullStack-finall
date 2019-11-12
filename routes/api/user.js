const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const config = require('config')

//! @route   post api/users
//! @desc    Register User
//! @access  Public

router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        // check('name','Name is at least 3 word long').isLength({ min: 3 }),
        check('phone', 'please enter a phone number').matches(
            // /^((\+|00)86)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
        ),
        check(
            'password',
            'Please enter a password with 6 or more characters',
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, phone, password } = req.body

        try {
            let user = await User.findOne({ phone })
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists' }],
                })
            }
            user = await User.findOne({ name })
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'name already exists, pick another' }],
                })
            }

            const avatar = gravatar.url(phone, {
                s: '200',
                r: 'pg',
                d: 'mm',
            })

            user = new User({
                name,
                phone,
                avatar,
                password,
            })

            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id,
                },
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                },
            )
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server error')
        }
    },
)

module.exports = router
