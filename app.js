const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/index');
const session = require('express-session');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(session({
  secret : 'rahasiaa', //untuk keamanan rahasia dan harus ada
  resave : false, //ada perubahan atau ngga ttp mau di save pasang true, ngesave saat ada perubahan di data session maka pasang falsy
  saveUninitialized : false, // kalo dipasang true walaupun ga ngeset apapun di request session ttp ngesave user2 yg masuk ke browser walaupun belom login 
  cookie: {
    secure : false, //untuk https biar lebih secure
    sameSite : true // untuk security dari csrf attack
  } 
}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})