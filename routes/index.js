var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = {
  host     : process.env.MYSQL_ADDON_HOST,
  database : process.env.MYSQL_ADDON_DB,
  user     : process.env.MYSQL_ADDON_USER,
  password : process.env.MYSQL_ADDON_PASSWORD
};

var connection;
function handleDisconnect() {
    connection = mysql.createConnection(dbConfig);  // Recreate the connection, since the old one cannot be reused.
    connection.connect( function onConnect(err) {   // The server is either down
        if (err) {                                  // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 10000);    // We introduce a delay before attempting to reconnect,
        }                                           // to avoid a hot loop, and to allow our node script to
    });                                             // process asynchronous requests in the meantime.
                                                    // If you're also serving http, display a 503 error.
    connection.on('error', function onError(err) {
        console.log('db error', err);
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {   // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                        // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}
handleDisconnect();

connection.connect(function(err) {
  if (err) 
  {
    console.log("!!!!!!!!!!!!!!premiere erreur");
    handleDisconnect();
  }
  connection.query("SELECT * FROM employe where num_service = 30", function (err, result, fields) {
    if (err) 
    {
      console.log("!!!!!!!!!!!!!!deuxième erreur");
      handleDisconnect();
    }
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!premier accès");
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.connect(function(err) {
    if (err) 
    {
      console.log("!!!!!!!!!!!!!!troisième erreur");
      handleDisconnect();
    }
    connection.query("SELECT * FROM employe where num_service = 30", function (err, result, fields) {
      if (err) 
      {
        console.log("!!!!!!!!!!!!!!quatrième erreur");
        handleDisconnect();
      }
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!second accès");
    });
  });

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
