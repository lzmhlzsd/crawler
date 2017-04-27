const $sql = require( '../sqls/sysSqlMapping' )
const unitl = require( '../../config/until' )
const errcode = require( '../../config/errcode' )


const $sqlEx = unitl.sqlExecute
const $sqlInfo = unitl.sqlInfo
const $jsonWrite = unitl.jsonWrite

module.exports = {
    //添加部门
    addDepart: function ( name, no, desc, pid, orgId, type ) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '添加部门', {
                name: name,
                no: no,
                desc: desc,
                pid: pid,
                orgId: orgId,
                type: type
            }, './userDao.js/addDepart' )
            $sqlEx( $sql.insertDepart, [name, no, desc, pid, orgId, type], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //删除部门
    deleteDepart: function ( id ) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '删除部门', {
                id: id.toString()
            }, './userDao.js/deleteDepart' )
            $sqlEx( $sql.deleteDepart, [id], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //修改部门
    updateDepart: function ( no, name, id ) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '修改部门', {
                name: name,
                no: no,
                id: id
            }, './userDao.js/updateDepart' )
            $sqlEx( $sql.updateDepart, [name, no, id], sqlInfo, function ( err, ret ) {
                if ( err ) {
                    reject( err )
                }
                else {
                    resolve( ret );
                }
            } )
        } )
    },
    //获取部门
    getDepart: function ( orgId ) {
        return new Promise( function ( resolve, reject ) {
            const sqlInfo = $sqlInfo( '获取部门', {
                orgId: orgId
            }, './userDao.js/getDepart' )
            $sqlEx( $sql.queryDepartByOrgId, [orgId], sqlInfo, function ( err, ret ) {
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