const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   post api/posts
// @desc    Test route
// @access  Public

router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            })

            const post = await newPost.save()
            res.json(post)
        } catch (err) {
            console.error(err)
            res.status(500).send('Server Error')
        }
    },
)

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

// @route   GET api/posts/:postId
// @desc    Get post by id
// @access  Private

router.get('/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) {
            return res.status(404).json({ msg: 'Post not found2' })
        }
        res.json(post)
    } catch (err) {
        console.error(err)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found1' })
        }
        res.status(500).send('Server Error')
    }
})

//! @route   GET api/posts/:postId
//! @desc    Get post by postId
//! @access  Private
router.delete('/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) return res.status(404).json({ msg: 'Post not found' })

        if (post.user.toString() !== req.user.id)
            return res.status(401).json({ msg: 'login user is not author' })

        await post.remove()
        res.json({ msg: 'Post removed' })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found1' })
        }

        res.status(500).json({ msg: 'Server Error' })
    }
})

//! @route   PUT api/like/:postId
//! @desc    Like a post
//! @access  Private

router.put('/like/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)

        if (post.likes.find(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'post already liked' })
        }
        post.likes.unshift({ user: req.user.id })
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

//! @route   PUT api/unlike/:postId
//! @desc    Like a post
//! @access  Private

router.put('/unlike/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)

        if (post.likes.find(like => like.user.toString() === req.user.id)) {
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)

            await post.save()
            res.json(post.likes)
        }
        return res.status(400).json({ msg: 'Post has yet been liked' })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})
//! @route   POST api/post/comment/:postId
//! @desc    Comment on post
//! @access  Private

router.post(
    '/comment/:postId',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
           
            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.postId)
            const newComment = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            })
            if (!post) return res.status(404).json({ msg: 'Post not found' })
           
            post.comments.unshift(newComment)
            await post.save()
            res.json(post.comments)

        } catch (err) {
            console.error(err)
            res.status(500).send('Server Error')
        }
    },
)

//! @route   DELETE api/post/comment/:postId/:commentId
//! @desc    Comment on post
//! @access  Private

router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        //pull out the comment
        const comment = post.comments.find(comment => comment.id === req.params.commentId)
        //make sure comment exits
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' })
        }
        if (req.user.id !== comment.user.toString()) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

      

        if (post.comments.find(comment => comment.user.toString() === req.user.id)) {
            const removeIndex = post.comments
                .map(comment => comment.user.toString())
                .indexOf(req.user.id)
            post.comments.splice(removeIndex, 1)

            await post.save()
            res.json(post.comments)
        }
        return res.status(400).json({ msg: 'Post has yet been commented' })
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
module.exports = router
