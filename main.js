const PUBLIC_KEY = 'BAnLsOod5JFccYk31HZOzBAOtkuE_-kLt0hptAy_rJTQH3bBTPOjYVFRevKfDhaKzoduHc6ZsRMJOkZnjwTxu9g='; // 保持不变

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function subscribe() {
    // 1. 确保等待 Service Worker 注册完成
    const reg = await navigator.serviceWorker.register('sw.js');
    await navigator.serviceWorker.ready; 

    // 2. 转换密钥格式
    const applicationServerKey = urlBase64ToUint8Array(PUBLIC_KEY);

    // 3. 开始订阅
    const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    });

    console.log("成功！复制下面这段 JSON 到 Python 代码中:");
    console.log(JSON.stringify(sub));
}

document.getElementById('btn').onclick = subscribe;
