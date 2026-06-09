const PUBLIC_KEY = 'BK0unyUeErpZ_Pd2fXqAdrblVoKxRl8nKK_VR1-gNHUpgmTjmVGXB5tg0ltehyrxoTQK3XC5ZKbAeRkBS21J8Pw';

// 必须：将 Base64 字符串转换为浏览器要求的 Uint8Array 二进制格式
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function subscribe() {
    // 1. 注册并确保 Service Worker 真正激活
    const reg = await navigator.serviceWorker.register('sw.js');
    await navigator.serviceWorker.ready;

    // 2. 将公钥转换为二进制格式
    const applicationServerKey = urlBase64ToUint8Array(PUBLIC_KEY);

    // 3. 执行订阅
    try {
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        });
        
        console.log("成功！请复制下方 JSON 字符串到 Python 代码的 SUBSCRIPTION_JSON 中：");
        console.log(JSON.stringify(sub));
    } catch (e) {
        console.error("订阅出错：", e);
    }
}

document.getElementById('btn').onclick = subscribe;
