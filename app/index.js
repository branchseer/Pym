const { app, BrowserWindow, dialog, messageNode, systemPreferences, MenuItem, shell } = require('deskgap');
const fs = require('fs');

if (process.platform === 'darwin') {
    const viewMenu = app.getMenu().items.find(item => item.label === 'View').submenu;
    const helpMenu = app.getMenu().items.find(item => item.label === 'Help').submenu;

    viewMenu.items.splice(0, 3); // Removes 'Reload' And 'Toggle Developer Tools
    helpMenu.items.splice(0, 2); // Removes DeskGap links

    helpMenu.append(new MenuItem({
        label: 'Website',
        click() {
            shell.openExternal('https://github.com/patr0nus/Pym');
        }
    }));
}

let win = null;

messageNode.on('save-file', (e, fileName, fileContentBase64) => {
    dialog.showSaveDialog(win, { defaultPath: fileName }, (path) => {
        if (path == null) return;
        fs.writeFileSync(path, Buffer.from(fileContentBase64, 'base64'));
    });
});

function onIsEditingChanged(isEditing) {
    if (process.platform === 'darwin') {
        win.setTitleBarStyle(isEditing ? 'default': 'hidden');
        win.setVibrancy(isEditing ? null : 'under-window-background');
    }

    win.setMinimumSize(...(isEditing ? [800, 600] : [0, 0]));
    if (isEditing) {
        let [width, height] = win.getSize();
        win.setSize(Math.max(width, 800), Math.max(height, 600))
    }
};

messageNode.on('is-editing-changed', (e, isEditing) => onIsEditingChanged(isEditing));

app.once('ready', () => {
    win = new BrowserWindow({
        menu: null,
        show: false,
        width: 600,
        height: 370
    }).once('ready-to-show', function() {
        this.show();
    });

    onIsEditingChanged(false);

    systemPreferences.on('dark-mode-toggled', () => {
        win.webContents.send('dark-mode-toggled', systemPreferences.isDarkMode());
    });

    win.loadFile("./build/index.html");
});
