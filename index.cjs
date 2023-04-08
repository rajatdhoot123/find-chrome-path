const os = require("os");
const fs = require("fs").promises;
const path = require("path");

async function findBrowserPath() {
  const fs = require("fs");
  const path = require("path");

  // Get the home directory of the current user
  const homedir = os.homedir();

  // Define the browser names and their executables
  const browsers = {
    chrome: {
      name: "Google Chrome",
      linux: "google-chrome",
      mac: "Google Chrome",
      win: "Google\\Chrome\\Application\\chrome.exe",
    },
    brave: {
      name: "Brave",
      linux: "brave-browser",
      mac: "Brave Browser",
      win: "BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    },
    firefox: {
      name: "Firefox",
      linux: "firefox",
      mac: "Firefox",
      win: "Mozilla Firefox\\firefox.exe",
    },
  };

  // Find the browser path for the given operating system and browser name
  function findBrowserPath(browserName) {
    const browser = browsers[browserName];
    if (!browser) {
      console.error(`Unsupported browser: ${browserName}`);
      return null;
    }
    const platform = os.platform();
    let browserPath;
    switch (platform) {
      case "linux":
        browserPath = path.join("/usr", "bin", browser.linux);
        break;
      case "darwin":
        browserPath = path.join(
          "/Applications",
          `${browser.mac}.app`,
          "Contents",
          "MacOS",
          `${browser.mac}`
        );
        break;
      case "win32":
        browserPath = path.join("C:", "Program Files (x86)", browser.win);
        break;
      default:
        console.error(`Unsupported platform: ${platform}`);
        return null;
    }
    if (!fs.existsSync(browserPath)) {
      console.error(`Browser not found: ${browser.name} (${browserPath})`);
      return null;
    }
    return browserPath;
  }

  // Find the paths of all supported browsers
  const browserPaths = {};
  for (const browserName in browsers) {
    // eslint-disable-next-line no-prototype-builtins
    if (browsers.hasOwnProperty(browserName)) {
      const browserPath = findBrowserPath(browserName);
      if (browserPath) {
        browserPaths[browserName] = browserPath;
      }
    }
  }

  // Log the browser paths to the console
  return browserPaths;
}

module.exports = findBrowserPath;
