const express = require('express')

const app = express()

app.set('secret', 'HJF_MOBA_DEMO')

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(require('cors')())
app.use(express.json())

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
