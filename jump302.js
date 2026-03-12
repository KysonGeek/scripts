// Quantumult X Rewrite Script
// 文件名：jump302.js

let url = $request.url;
let toParam = url.match(/\?to=(.+)/)?.[1];
if (toParam) {
  let decoded = decodeURIComponent(toParam);
  $done({
    status: "HTTP/1.1 302 Found",
    headers: {
      Location: decoded
    },
    body: ""
  });
} else {
  $done({});
}
