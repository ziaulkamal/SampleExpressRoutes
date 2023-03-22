const express = require('express')
const router = express.Router()
const upload = require('../lib/lib.protect.js')
const uuid = require('uuid')

const { createCategory } = require('../models/category')
const { createPost, readPost, updatePost, deletePost } = require('../models/post');

router.use(express.static('src/admin/'))

// Middleware example
router.use((req, res, next) => {
  // Do something before each route
  res.locals.basePath = '/admin/'
  res.locals.capFirst = function(string) {
    const str = string.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
}
  next()
})

// GET /admin
router.get('/', (req, res) => {
  res.redirect('/admin/dashboard')
})

router.route('/dashboard')
  .get( async(req, res) => {
    res.render('backend', {
      title: 'Dashboard',
      page : 'page/home'
    })
  })

router.route('/post')
  .get( async (req, res) => {
    try {
      const posts = await readPost()
      res.render('backend', {
        title: 'Post List',
        page : 'page/posts/index',
        data : posts,
        no   : 1
      })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })


router.route('/post/create')
  .get((req, res) => {
    res.render('backend', {
      title: 'Post List',
      page : 'page/posts/add',
    })
  })
  .post(upload.single('file_image'), async (req, res) => {
    const month = new Date().getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : month;

    try {
      let slug = req.body.slugs.toLowerCase().trim()
      if (!slug) {
        slug = req.body.title.toLowerCase().trim().replace(/ /g, '-')
      }

      let dates = req.body.date
      if (!dates) {
        dates = Date.now()
      }

      const slugExits = await readPost({slugs:slug})
      if (slugExits) {
        return res.redirect('/admin/post/create')
      }

      const data = {
        title : req.body.title,
        slugs : slug,
        file_image : `${monthString}/${req.file.filename}`,
        content: req.body.content,
        category: req.body.category,
        tags : req.body.tags,
        date : dates
      }
      console.table(data);
      await createPost(data)
      res.redirect('/admin/post')
    } catch (error) {
      console.error(error)
      res.send(error)
    }

  })



router.route('/category')
  .get( async(req, res) =>{
    res.render('backend', {
      title: 'Category List',
      page : 'page/category/index',
      no   : 1
    })
  })
  .post( async(req, res) => {
    try {

      let slug = req.body.slugs.toLowerCase().trim()
      if (!slug) {
        slug = req.body.title.toLowerCase().trim().replace(/ /g, '-')
      }

      const slugExits = await readCategory({slugs:slug})
      if (slugExits) {
        return res.redirect('admin/category')
      }
      const data = {
        title : req.body.title.trim(),
        slugs : slug,
        description : req.body.description,
        uniqueId : uuid.v4(),
        date : Date.now()
      }
      console.table(data);
      await createCategory(data)
      res.redirect('/admin/category')
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  })

router.route('/tag')
  .get( async(req, res) => {
    res.render('backend', {
      title: 'Tag List',
      page : 'page/tags/index',
      no   : 1
    })
  })
  .post( async(req, res) => {
    try {

      let slug = req.body.slugs.toLowerCase()
      if (!slug) {
        slug = req.body.title.toLowerCase().replace(/ /g, '-')
      }

      const data = {
        title : req.body.title,
        slugs : slug,
        description : req.body.content,
        uniqueId : uuid.v4(),
        date : Date.now()
      }
      console.table(data);
      await createCategory(data)
      res.redirect('/admin/category')
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  })


module.exports = router
