const logger = require( '../../config/logger' ).logger
const uuid = require( 'node-uuid' )
const until = require( '../../config/until' )
const errcode = require( '../../config/errcode' )
const sysDao = require( '../daos/sysDao' )
const _ = require( 'underscore' )
const md5 = require( 'md5' )


const $jsonWrite = until.jsonWrite
const $createId = until.createId
const $sqlInfo = until.sqlInfo

module.exports = {
    //添加部门
    addDepart: function ( req, res, next ) {
        sysDao.addDepart( req.body.name, req.body.no, '', req.body.pid, req.body.orgId, 1 )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
    //删除部门
    deleteDepart: function ( req, res, next ) {
        sysDao.deleteDepart( req.body.ids )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
    //更新部门
    updateDepart: function ( req, res, next ) {
        sysDao.updateDepart( req.body.no, req.body.name, req.body.id )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
    //获取部门
    getDepart: function ( req, res, next ) {
        sysDao.getDepart( req.body.orgId )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
}