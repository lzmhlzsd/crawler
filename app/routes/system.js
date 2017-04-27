const sysCtrl = require( './../controllers/sysCtrl' );
const $checkSession = require( '../../config/until' ).checkSession

module.exports = function ( router ) {
    router.post( '/addDepart', $checkSession, sysCtrl.addDepart )
    router.post( '/deleteDepart', $checkSession, sysCtrl.deleteDepart )
    router.post( '/updateDepart', $checkSession, sysCtrl.updateDepart )
    router.post( '/getDepart', $checkSession, sysCtrl.getDepart )
}
