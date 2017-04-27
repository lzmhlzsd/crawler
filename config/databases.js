const genericPool = require( 'generic-pool' );
const DbDriver = require( 'mysql' );
const mysql_config = require( './configs' ).mysql;

const factory = {
    create: function () {
        return new Promise( function ( resolve, reject ) {
            var client = DbDriver.createConnection( {
                host: mysql_config.host,
                user: mysql_config.user,
                password: mysql_config.password,
                database: mysql_config.database
            } )
            client.connect( function ( err ) {
                if ( err ) {
                    console.log( 'Database connection error' );
                } else {
                    resolve( client );
                    console.log( 'Database connection successful' );
                }
            } )
        } )
    },
    destroy: function ( client ) {
        return new Promise( function ( resolve ) {
            console.log( 'pool destroy' )
            client.end( function () {
                console.log( 'pool destroy end' )
                resolve()
            } )
            client.disconnect()
        } )
    }
}

var opts = {
    max: 10,
    min: 2
}

var myPool = genericPool.createPool( factory, opts );

// myPool.drain().then( function () {
//     console.log( 'clear pool' )
//     myPool.clear();
// } );

module.exports = myPool;