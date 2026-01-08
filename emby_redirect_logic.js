let url = $request.url;
let headers = $request.headers;
let range = headers["Range"] || headers["range"] || "";

// 提取视频 ID (例如 4464) 作为缓存键
let videoIdMatch = url.match(/\/videos\/(\d+)\/stream/);
let videoKey = videoIdMatch ? videoIdMatch[1] : null;

// 逻辑：如果 Range 不是 0- 且缓存中有直链，则直接 302
if (videoKey && range && range !== "bytes=0-") {
    let savedLocation = $prefs.valueForKey("emby_115_" + videoKey);
    if (savedLocation) {
        console.log(`[Emby优化] 命中缓存，ID: ${videoKey}, Range: ${range}, 转发至直链`);
        $done({
            status: "HTTP/1.1 302 Found",
            headers: {
                "Location": savedLocation,
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache"
            },
            body: ""
        });
    } else {
        console.log(`[Emby优化] 未命中缓存，放行由VPS处理`);
        $done({});
    }
} else {
    // 第一轮 0- 或者无 Range 请求，直接放行给 VPS
    $done({});
}
