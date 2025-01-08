const userRouter = require('./user')
const productRouter = require('./products')

function route(app) {
  app.use('/api/user', userRouter)
  app.use('/api/products', productRouter)
}

module.exports = route