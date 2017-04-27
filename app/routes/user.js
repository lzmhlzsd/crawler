const userCtrl = require( './../controllers/userCtrl' );
const $checkSession = require( '../../config/until' ).checkSession
const multer = require( 'multer' )
const upload = multer( { dest: 'tpm/uploads/' } )
console.log( 'user_router' )
module.exports = function ( router ) {
    router.get( '/', function ( req, res, next ) {
        console.log('123')
        res.render('index');
    })
    router.post( '/queryHistory', userCtrl.queryHistory );
    router.post( '/insertWebsite', userCtrl.insertWebsite );
    router.post( '/queryWebsiteByNo', userCtrl.queryWebsiteByNo );
    router.post( '/updateWebsite', userCtrl.updateWebsite );
    router.get( '/queryWebsite', userCtrl.queryWebsite );
}
