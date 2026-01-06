let url = $request.url;
let videoId = url.split('?')[0];
let range = $request.headers["Range"] || $request.headers["range"];

// 如果不是第一轮请求，且我们缓存里已经有这个视频的直链了
if (range && range !== "bytes=0-") {
    let savedLocation = $prefs.valueForKey(videoId);
    
    if (savedLocation) {
        console.log("触发后续重定向，Range: " + range);
        $done({
            status: "HTTP/1.1 302 Found",
            headers: {
                "Location": savedLocation,
                "Access-Control-Allow-Origin": "*"
            },
            body: ""
        });
    } else {
        // 如果缓存没命中，放行让它去 VPS 拿（预防万一）
        $done({});
    }
} else {
    // Range 为 0- 的第一轮请求，放行去 VPS 握手
    $done({});
}
