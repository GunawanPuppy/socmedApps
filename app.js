const express = require('express');
const app = express();
const session = require('express-session')
const port = 3000;
const router = require('./index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.use(session({
  secret: 'hanya developer yang tau', //harus ada
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true //untuk security dari csrf attack 
  }
}))
app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})