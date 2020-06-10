const { app, BrowserWindow, Tray, Menu } = require('electron')
const { spawn } = require('child_process');

let isQuiting = false;
let backend = null;

const iconpath = "icon.png";

function createBackend() {
    backend = spawn('python', ['backend/main.py'])
}


function createWindow() {
    createBackend()

    let win = new BrowserWindow({ 
        width: 600, 
        height: 600, 
        icon: iconpath, 
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()

    var appIcon = new Tray(iconpath)
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                win.show()
            }
        },
        {
            label: 'Quit', click: function () {
                isQuiting = true
                app.quit()
            }
        }
    ])

    appIcon.setContextMenu(contextMenu)

    win.on('close', function (event) {
        if (!isQuiting) {
            event.preventDefault();
            win.hide();
            event.returnValue = false;
        }
    })

    win.on('minimize', function (event) {
        event.preventDefault()
        win.hide()
    })
}

app.on('ready', createWindow)

app.on('before-quit', function () {
    isQuiting = true;
});