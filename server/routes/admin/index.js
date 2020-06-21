module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')

  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.get('/', async (req, res, next) => {
    // 校验用户是否登录
    const token = String(req.headers.authorization || '').split(' ').pop()
    console.log('token', token)
    // 提取token数据
    const { id } = jwt.verify(token, app.get('secret'))
    req.user = await AdminUser.findById(id)
    console.log(req.user)
    await next()
  }, async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    res.send(await req.Model.find().setOptions(queryOptions).limit(10))
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res, next) => {
    const { username, password } = req.body

    // 根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')

    // 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode).send({ message: err.message })
  })

}
