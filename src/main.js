const { app, BrowserWindow, Tray, Menu } = require('electron')

var iconpath = "icon.png";
let isQuiting = false;

function createWindow() {
    let win = new BrowserWindow({ width: 600, height: 600, icon: iconpath })

    win.loadFile('index.html')

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