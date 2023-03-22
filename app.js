const express = require('express')
const app = express()
const port = 8000

const adminRouter = require('./routers/route.admin')
// Set view engine to EJS
app.set('view engine', 'ejs')

// Atur untuk menentukan target dari views render 
app.set('views', 'views')

// Atur Static File Di Public 
app.use(express.static('public'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/admin/', adminRouter)




app.listen(port, () => console.log(`Server berjalan di port : ${port}!`))