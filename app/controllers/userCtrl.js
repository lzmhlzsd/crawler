const logger = require( '../../config/logger' ).logger
const uuid = require( 'node-uuid' )
const until = require( '../../config/until' )
const excelConfig = require( '../../config/reportConfig' )
const errcode = require( '../../config/errcode' )
const userDao = require( '../daos/userDao' )
const sysDao = require( '../daos/sysDao' )
const _ = require( 'underscore' )
const xlsx = require( 'node-xlsx' )
const moment = require( 'moment' )
const md5 = require( 'md5' )
const fs = require( 'fs' )


const $jsonWrite = until.jsonWrite
const $createId = until.createId
const $sqlInfo = until.sqlInfo

module.exports = {
    //查询历史数据
    queryHistory: function ( req, res, next ) {
        userDao.queryHistory( req.body.no )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
    queryWebsiteByNo: function ( req, res, next ) {
        userDao.queryWebsiteByNo( req.body.no )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
    queryWebsite: function ( req, res, next ) {
        userDao.queryWebsite( )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
    insertWebsite: function ( req, res, next ) {
        userDao.insertWebsite( req.body.no, req.body.name, req.body.url )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    },
    updateWebsite: function ( req, res, next ) {
        userDao.updateWebsite( req.body.c_is_use, req.body.id )
            .then( ret => {
                if ( ret ) {
                    $jsonWrite( res, 0, ret )
                }
            } ).catch( err => {
                $jsonWrite( res, -1, err )
            } )
    }
}
