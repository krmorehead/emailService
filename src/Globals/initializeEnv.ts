import fs from "fs";

export class InitializeEnv {
  public static initializeEnv(path: string) {
    try {
      var raw = fs.readFileSync(path);
      // @ts-ignore
      var env = JSON.parse(raw)
      Object.keys(env).forEach(function(key) {
        if (!process.env.hasOwnProperty(key)) {
          process.env[key] = env[key]
        }
      })
    } catch (err) {}
  }
}
