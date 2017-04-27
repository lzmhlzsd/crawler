const electron = require( "electron" );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const EventEmitter = require( 'events' );
const childprocess = require( 'child_process' );
let n;
let mainWindow;



function createWindow() {
    //创建一个 800x600 的浏览器窗口
    mainWindow = new BrowserWindow( { width: 1366, height: 768 } );

    //加载应用的界面文件
    mainWindow.loadURL( `file://${__dirname}/electron/views/index.html` );

    //打开开发者工具，方便调试
    mainWindow.webContents.openDevTools();

    mainWindow.on( 'closed', function () {
        mainWindow = null;
    } )
    //启动服务进程
    n = childprocess.fork( './bin/www' );
    n.on( 'message', function ( m ) {
        console.log( 'Main Listen: ', m );
        mainWindow.webContents.send( 'ping', m )
    } );
}
app.on( 'ready', createWindow );

app.on( 'window-all-closed', function () {
    if ( process.platform !== 'darwin' ) {
        app.quit();
    }
    //退出关闭进程
    n.kill( 'SIGHUP' )
} );

app.on( 'before-quit', function () {
    //退出关闭进程
    n.kill( 'SIGHUP' )
} )

app.on( 'activate', function () {
    if ( mainWindow === null ) {
        createWindow();
    }
} );

