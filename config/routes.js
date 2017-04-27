const user_routes = require( './../app/routes/user' )
const system_routes = require( './../app/routes/system' )




// module.exports = function(app){
// 	user_routes(app)
// }

const express = require( 'express' );
const router = express.Router();
console.log( './../app/routes/user' )
user_routes( router );
system_routes( router );


// router.get('/', function(req,res){
// 	res.render('index');
// });

//router.get('*', function(req, res){
//res.render('index');
//});

module.exports = router;