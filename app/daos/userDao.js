const $sql = require( '../sqls/userSqlMapping' )
const unitl = require( '../../config/until' )
const errcode = require( '../../config/errcode' )
const _util = require( 'util' )


const $sqlEx = unitl.sqlExecute
const $sqlInfo = unitl.sqlInfo
const $jsonWrite = unitl.jsonWrite

module.exports = {
    //查询站点
    queryWebsite: function () {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '查询站点', {}, './userDao.js/queryWebsite' )
            $sqlEx( $sql.queryWebsite, [], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //通过编号查询站点
    queryWebsiteByNo: function (no) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '通过编号查询站点', {
                no: no
            }, './userDao.js/queryWebsiteByNo' )
            $sqlEx( $sql.queryWebsiteByNo, [no], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //查询历史数据
    queryHistory: function ( no ) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '查询历史数据', {
                no: no
            }, './userDao.js/queryHistory' )
            $sqlEx( $sql.queryHistory, [no], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //添加任务
    insertWebsite: function ( no, name, url ) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '添加任务', {
                no: no,
                name: name,
                url: url
            }, './userDao.js/insertWebsite' )
            $sqlEx( $sql.insertWebsite, [no, name, url, 1], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //是否可用
    updateWebsite: function ( is_use, id ) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '是否可用', {
                id: id,
                is_use: is_use
            }, './userDao.js/insertWebsite' )
            $sqlEx( $sql.updateWebsite, [is_use, id], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //插入历史数据
    insertHistory: function ( data ) {
        return new Promise( function ( resolve, reject ) {
            var ds = [];
            // id: ret[i].c_id,
            //     zjObj3: zjObj3,
            //     zjObj1: zjObj1,
            //     zjObj0: zjObj0,
            //     zsObj3: zsObj3,
            //     zsObj1: zsObj1,
            //     zsObj0: zsObj0,
            //     EuropeOdds3: EuropeOdds3,
            //     EuropeOdds1: EuropeOdds1,
            //     EuropeOdds0: EuropeOdds0,
            //     volume3: volume3,
            //     volume1: volume1,
            //     volume0: volume0
            for ( var i = 0; i < data.length; i++ ) {
                ds.push( '("' + data[i].id + '","' + data[i].zjObj3 + '","' + data[i].zjObj1 + '","' +
                    data[i].zjObj0 + '","' + data[i].zsObj3 + '","' + data[i].zsObj1 + '","' + data[i].zsObj0 + '","' +
                    data[i].EuropeOdds3 + '","' + data[i].EuropeOdds1 + '","' + data[i].EuropeOdds0 + '","' +
                    data[i].volume3 + '","' + data[i].volume1 + '","' + data[i].volume0 + '")' )
            }
            const sqlInfo = $sqlInfo( '插入历史数据', {}, './userDao.js/insertHistory' )
            $sqlEx( _util.format( $sql.insertHistory, ds.join( ',' ) ), [], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    }
}