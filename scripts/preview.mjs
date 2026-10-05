import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
if (!existsSync(root)) throw new Error("Run npm run build before preview.");
http
  .createServer((request, response) => {
    let path;
    try {
      path = resolve(
        root,
        "." +
          decodeURIComponent(new URL(request.url, "http://localhost").pathname),
      );
    } catch {
      response.writeHead(400).end();
      return;
    }
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if (existsSync(path) && statSync(path).isDirectory())
      path = resolve(path, "index.html");
    const found = existsSync(path) && statSync(path).isFile();
    if (!found) path = resolve(root, "404.html");
    response.writeHead(found ? 200 : 404, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
    });
    createReadStream(path)
      .on("error", () => response.end())
      .pipe(response);
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Local: http://127.0.0.1:${port}`),
  );
