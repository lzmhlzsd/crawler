var express = require( 'express' ),
    path = require( 'path' ),
    favicon = require( 'serve-favicon' ),
    logger = require( 'morgan' ),
    cookieParser = require( 'cookie-parser' ),
    bodyParser = require( 'body-parser' ),
    session = require( 'express-session' ),
    app = express(),
    ejs = require( 'ejs' ),
    logger = require( './logger' ).use,
    routes = require( './routes' ),
    http = require( 'http' ),
    cheerio = require( 'cheerio' );

var dao = require( '../app/daos/userDao' )

// view engine setup
app.set( 'views', path.join( __dirname, '../app/views' ) );
app.set( 'view engine', 'html' );
app.engine( 'html', ejs.__express );
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
 app.use(express.static(path.join(__dirname, '../public')));

app.use( session( {
    cookieName: 'session',
    secret: 'someRandomSecret!',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
    resave: false,
    saveUninitialized: true
} ) );

app.use( '/', routes );
console.log( '路由加载成功' )
logger( app );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );



// error handler
app.use( function ( err, req, res, next ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};
    console.dir( err );
    // render the error page
    res.status( err.status || 500 );
    res.render( 'error' );
} );

//var url = 'http://vip.win007.com/betfa/single.aspx?id=1355804'
function fetchPage( url, i, ret, dd ) {
    //采用http模块向服务器发起一次get请求     
   
    http.get( url, function ( res ) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding( 'utf-8' ); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on( 'data', function ( chunk ) {
            html += chunk;
        } );
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on( 'end', function () {

            var $ = cheerio.load( html ); //采用cheerio模块解析html

            var time = $( '.article-info a:first-child' ).next().text().trim();

            var zjObj = $( "#tbResult" ).find( '.zjObj' )
            var zsObj = $( "#tbResult" ).find( '.zsObj' )

            var allS, winS, tieS, defeatS, winP, tieP, defeatP, win, tie, defeat;
            winS = parseInt( $( '#tbOdds' ).find( '.jyObj' ).eq( 0 ).html() ); //主
            tieS = parseInt( $( '#tbOdds' ).find( '.jyObj' ).eq( 1 ).html() ); //和
            defeatS = parseInt( $( '#tbOdds' ).find( '.jyObj' ).eq( 2 ).html() ); //客
            winP = parseFloat( $( '#tbOdds' ).find( '.plObj' ).eq( 0 ).html() );
            tieP = parseFloat( $( '#tbOdds' ).find( '.plObj' ).eq( 1 ).html() );
            defeatP = parseFloat( $( '#tbOdds' ).find( '.plObj' ).eq( 2 ).html() );
            allS = winS + tieS + defeatS;
            win = allS - winS * winP;
            tie = allS - tieS * tieP;
            defeat = allS - defeatS * defeatP;
            zjObj3 = ( Math.round( win * 100 ) / 100 ).toFixed( 0 );
            zjObj1 = ( Math.round( tie * 100 ) / 100 ).toFixed( 0 );
            zjObj0 = ( Math.round( defeat * 100 ) / 100 ).toFixed( 0 );
            zsObj3 = ( ( allS > 0 ? Math.round( win / allS * 100 ) : 0 ) ).toFixed( 0 );
            zsObj1 = ( ( allS > 0 ? Math.round( tie / allS * 100 ) : 0 ) ).toFixed( 0 );
            zsObj0 = ( ( allS > 0 ? Math.round( defeat / allS * 100 ) : 0 ) ).toFixed( 0 );

            var dataList = $( '#dataList' ).find( 'tr' )
            var EuropeOdds3 = $( '#dataList' ).find( 'tr' ).eq( 2 ).children().eq( 1 ).html()
            var EuropeOdds1 = $( '#dataList' ).find( 'tr' ).eq( 3 ).children().eq( 1 ).html()
            var EuropeOdds0 = $( '#dataList' ).find( 'tr' ).eq( 4 ).children().eq( 1 ).html()

            var volume3 = $( '#dataList' ).find( 'tr' ).eq( 2 ).children().eq( 7 ).html()
            var volume1 = $( '#dataList' ).find( 'tr' ).eq( 3 ).children().eq( 5 ).html()
            var volume0 = $( '#dataList' ).find( 'tr' ).eq( 4 ).children().eq( 5 ).html()

            dd.push( {
                id: ret[i].c_id,
                zjObj3: zjObj3,
                zjObj1: zjObj1,
                zjObj0: zjObj0,
                zsObj3: zsObj3,
                zsObj1: zsObj1,
                zsObj0: zsObj0,
                EuropeOdds3: EuropeOdds3,
                EuropeOdds1: EuropeOdds1,
                EuropeOdds0: EuropeOdds0,
                volume3: volume3,
                volume1: volume1,
                volume0: volume0
            } )
            i = i + 1
            if ( i > ret.length - 1 ) {
                console.log( dd )
                //入库
                dao.insertHistory(dd)
                return;
            } else {
                fetchPage( ret[i].c_url, i, ret, dd )
            }     
        } );

    } ).on( 'error', function ( err ) {
        console.log( err );
    } );
}

var scheduler = require( 'node-schedule' );
var montlyJob = scheduler.scheduleJob( '*/20 * * * *', function () {
    dao.queryWebsite()
    .then( ret => {
        if ( ret ) {
            var i = 0;
            var dd = []
            fetchPage( ret[i].c_url, i, ret, dd )
        }
    } ).catch( err => {
        console.log( err )
    } )
} );


module.exports = app;
