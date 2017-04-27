const pool = require( './databases' )
const logger = require( './logger' ).logger
const _ = require( 'underscore' )
const moment = require( 'moment' )
const errcode = require( './errcode' )
const xlsx = require( 'node-xlsx' )
const config = require('./configs')

module.exports = {
    sqlExecute: function ( sql, params, errinfo, callback ) {
        var resourcePromise = pool.acquire();
        resourcePromise.then( function ( client ) {
            //console.log( 'in ' );
            //logger.info( sql );
            //logger.info( params );
            client.query( sql, params, function ( err, result ) {
                //console.log( err );
                if ( err ) {
                    let einfo = _.extend( errinfo, { err: err } );
                    logger.info( '*********\n时间:%s\n方法名:%s\n参数:%s\n路径:%s\n错误信息:%s\nSQL:%s\n',
                        moment().format( 'YYYY-MM-DD HH:mm:ss.SSS' ),
                        einfo.method, JSON.stringify( einfo.params ), einfo.path, einfo.err.toString(),
                        sql
                    )
                }
                let einfo = _.extend( errinfo, { err: '' } );
                logger.debug( '*********\n时间:%s\n方法名:%s\n参数:%s\n路径:%s\n错误信息:%s\nSQL:%s\n',
                        moment().format( 'YYYY-MM-DD HH:mm:ss.SSS' ),
                        einfo.method, JSON.stringify( einfo.params ), einfo.path, einfo.err.toString(),
                        sql
                    )
                //console.log( result )
                callback( err, result );
                // return object back to pool
                pool.release( client );
            } );
        } )
            .catch( function ( err ) {
                // handle error - this is generally a timeout or maxWaitingClients
                // error
                logger.info( err.toString() )
            } );
    },
    sqlInfo: function ( method, params, path ) {
        return {
            method: method,
            params: params,
            path: path
        }
    },
    jsonWrite: function ( res, code, ret ) {
        if ( code == 0 ) {
            res.json( {
                code: 1000,
                msg: errcode[1000],
                data: ret
            } );
        }
        else {
            if ( typeof ( ret ) == 'object' ) {
                res.json( {
                    code: 9000,   //系统错误
                    msg: errcode[9000],
                    err: ret.toString()
                } );
            }
            else {
                res.json( {   //错误信息
                    code: ret,
                    msg: errcode[ret]
                } );
            }
        }
    },
    createId: function ( id ) {
        return id.replace( /-/g, "" ).substring( 0, 10 )
    },
    checkSession: function ( req, res, next ) {
        console.log( '进入session验证:' + JSON.stringify( req.session.user ) );
        if ( typeof ( req.session.user ) != 'undefined' ) {
            next();
        }
        else {
            res.json( {
                code: 9001,   //session过期
                msg: errcode[9001],
                err: ''
            } );
        }
    },
    handleFilter: function ( filters ) {
        var arr = [], sfilters = '';
        if ( typeof filters != 'undefined' ) {
            _.each( filters.filter, function ( item, index ) {
                var ops;
                switch ( item.operator ) {
                    case 'eq':
                        ops = item.filed + ' = "' + item.value + '"';
                        break;
                    case 'like':
                        ops = item.filed + ' LIKE "%' + item.value + '%"';
                }
                arr.push( ops )
            } )
            if ( arr.length > 0 ) {
                sfilters = 'AND (' + arr.join( ' ' + filters.logic + ' ' ) + ')'
            }
        }
        return sfilters
    },
    handleExcel: function ( config, ret, res ) {
        var options = {
            name: 'sheet',
            data: []
        }
        var title = []
        _.each( config, function ( value, key ) {
            title.push( value )
        } )
        options.data.push( title )
        _.each( ret, function ( item, index ) {
            var tdata = []
            _.each( config, function ( value, key ) {
                tdata.push( item[key] )
            } )
            options.data.push( tdata )
        } )
        var buffer = xlsx.build( [options] )
        var filename = moment().format( 'YYYYMMDDHHmmssSSS' )
        res.set( {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + filename + '.xlsx',
            'Content-Length': buffer.length
        } )
        res.send( buffer )
    },
    //校验模版是否正确
    checkTemplate: function ( config, data ) {
        var index = 0, validate = true;
        _.each( config, function ( value, key ) {
            if ( value != data[index] ) {
                validate = validate && false;
            }
            index++
        } )
        return validate
    },
    //查找数据中重复元素
    duplicate: function ( arr ) {
        var tmp = [];
        arr.sort( function ( a, b ) {
            if ( a == b && tmp.indexOf( a ) === -1 ) tmp.push( a );
        } );
        return tmp;
    }
}