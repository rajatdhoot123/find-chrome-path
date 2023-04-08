const os = require("os");
const fs = require("fs");

function findChromePath() {
  let chromePath = null;

  if (os.platform() === "win32") {
    // Windows
    const prefixes = [
      process.env.LOCALAPPDATA,
      process.env.PROGRAMFILES,
      process.env["PROGRAMFILES(X86)"],
      process.env.APPDATA,
    ];

    for (const prefix of prefixes) {
      if (prefix) {
        const pathsToTry = [
          `${prefix}\\Google\\Chrome\\Application\\chrome.exe`,
          `${prefix}\\Google\\Chrome SxS\\Application\\chrome.exe`,
        ];

        for (const path of pathsToTry) {
          if (fs.existsSync(path)) {
            chromePath = path;
            break;
          }
        }

        if (chromePath) {
          break;
        }
      }
    }
  } else if (os.platform() === "darwin") {
    // Mac
    const pathsToTry = [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ];

    for (const path of pathsToTry) {
      if (fs.existsSync(path)) {
        chromePath = path;
        break;
      }
    }
  } else if (os.platform() === "linux") {
    // Linux
    const pathsToTry = [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/google-chrome-beta",
      "/usr/bin/google-chrome-unstable",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
      "/snap/bin/chromium",
    ];

    for (const path of pathsToTry) {
      if (fs.existsSync(path)) {
        chromePath = path;
        break;
      }
    }
  }

  return chromePath;
}
