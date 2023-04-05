const { app, BrowserWindow } = require("electron");
const cors = require("cors");
var express = require("express");

var expressApp = express();
expressApp.use(cors());

let win;
const distPath = `dist/angular-electron`;

expressApp.get("/test", (req, res) => {
  console.log("Hit");
  res.send({ response: "Here is a response" });
});

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: "#ffffff",
    icon: `file://${__dirname}/${distPath}/assets/logo.png`,
  });

  win.loadURL(`file://${__dirname}/${distPath}/index.html`);

  win.webContents.openDevTools();

  win.on("closed", function () {
    win = null;
  });

  expressApp.listen(3000, () => {
    console.log("App is listening");
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
