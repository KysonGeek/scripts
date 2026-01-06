let url = $request.url;
let headers = $request.headers;
let respHeaders = $response.headers;
let status = $response.statusCode;

// 获取请求时的 Range
let range = headers["Range"] || headers["range"] || "";
// 获取响应中的 Location (115 直链)
let location = respHeaders["Location"] || respHeaders["location"];

let videoIdMatch = url.match(/\/videos\/(\d+)\/stream/);
let videoKey = videoIdMatch ? videoIdMatch[1] : null;

// 只有在 Range 是 0- 且 VPS 成功返回 307 时才记录
console.log(`ID: ${videoKey} range:${range} status:${status} location:${location}`);
if (videoKey && range === "bytes=0-" && (status == 307) && location) {
    $prefs.setValueForKey(location, "emby_115_" + videoKey);
    console.log(`[Emby优化] 成功捕获直链 ID: ${videoKey}, Location: ${location}`);
}

$done({});
