const { app, BrowserWindow, Tray, Menu } = require('electron')

var iconpath = "icon.png"

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
                app.isQuiting = true
                app.quit()
            }
        }
    ])

    appIcon.setContextMenu(contextMenu)
    win.on('close', function (event) {
        win = null
    })

    win.on('minimize', function (event) {
        event.preventDefault()
        win.hide()
    })
}

app.on('ready', createWindow)