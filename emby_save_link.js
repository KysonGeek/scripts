// 获取当前请求的 Range
let range = $request.headers["Range"] || $request.headers["range"];
let status = $response.status;
let location = $response.headers["Location"] || $response.headers["location"];

// 只有当是第一轮请求且 VPS 返回了 302 重定向时才记录
if (range === "bytes=0-" && (status == 302 || status == 301) && location) {
    // 将该视频 ID 对应的直链存入缓存 (以 URL 路径作为唯一标识)
    let videoId = $request.url.split('?')[0]; 
    $prefs.setValueForKey(location, videoId);
    console.log("已存储 115 直链: " + location);
}
$done({});
