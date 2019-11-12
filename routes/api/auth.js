const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const config = require('config')
const bcrypt = require('bcryptjs')

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        // Delete the password
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//! @route   post api/auth
//! @desc    Authenticate user & get token
//! @access  Public

router.post(
    '/',
    [
        check('phone', 'please enter a phone number').matches(
            // /^((\+|00)86)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
        ),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { phone, password } = req.body

        try {
            let user = await User.findOne({ phone })
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: 'noSuchUser' }],
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'WrongPassword' }],
                })
            }

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
