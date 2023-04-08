const os = require("os");
const fs = require("fs").promises;
const path = require("path");

export async function findBrowserPath() {
  let browserPath = null;
  const browserList = ["Google Chrome", "Brave Browser", "firefox", "edge"];
  let i = 0;

  while (i < browserList.length && !browserPath) {
    const browser = browserList[i];
    i++;

    switch (os.platform()) {
      case "win32":
        {
          // Windows
          const prefixes = [
            process.env.LOCALAPPDATA,
            process.env.PROGRAMFILES,
            process.env["PROGRAMFILES(X86)"],
            process.env.APPDATA,
          ];

          for (const prefix of prefixes) {
            if (prefix) {
              const pathToTry = path.join(
                prefix,
                browser,
                "Application",
                `${browser}.exe`
              );
              try {
                await fs.access(pathToTry);
                browserPath = pathToTry;
                break;
              } catch (error) {}
            }
          }
        }
        break;

      case "darwin":
        {
          // Mac
          const pathsToTry = [
            path.join(
              "/Applications",
              `${browser}.app`,
              "Contents",
              "MacOS",
              browser
            ),
            path.join(
              os.homedir(),
              "Applications",
              `${browser}.app`,
              "Contents",
              "MacOS",
              browser
            ),
            path.join(
              os.homedir(),
              "Applications",
              `${browser}.app`,
              "Contents",
              "MacOS",
              `${browser}_bin`
            ),
          ];

          for (const path of pathsToTry) {
            try {
              await fs.access(path);
              browserPath = path;
              break;
            } catch (error) {}
          }
        }
        break;

      case "linux": {
        // Linux
        const pathsToTry = [
          path.join("/usr", "bin", browser),
          path.join("/usr", "local", "bin", browser),
          path.join(os.homedir(), ".local", "bin", browser),
        ];

        for (const path of pathsToTry) {
          try {
            await fs.access(path);
            browserPath = path;
            break;
          } catch (error) {}
        }
        break;
      }
      default:
        throw new Error(`Unsupported platform: ${os.platform()}`);
    }
  }

  return browserPath;
}
