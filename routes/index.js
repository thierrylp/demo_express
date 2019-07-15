var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "btynqm6xaoikm4l8eix4-mysql.services.clever-cloud.com",
  user: "uulhz2pqtzq43cz5",
  password: "TtttrS8HsgbIROoJblTM",
  database: "btynqm6xaoikm4l8eix4"
});
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM employe where num_service = 30", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM employe where num_service = 30", function (err, result, fields) {
      if (err) throw err;
    });
  });*/

  res.render('index', { title: 'TpMYSQL' });
});


router.get('/salarie', function(req,res,next){
  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM employe where num_service = 20", function (err, result, fields) {
      if (err) throw err;
    });
    res.render('salarie', { title: 'TpMYSQL' });
})*/
});

module.exports = router
