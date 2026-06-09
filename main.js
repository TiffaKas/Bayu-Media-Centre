const PUBLIC_KEY = 'BAnLsOod5JFccYk31HZOzBAOtkuE_-kLt0hptAy_rJTQH3bBTPOjYVFRevKfDhaKzoduHc6ZsRMJOkZnjwTxu9g=';

async function subscribe() {
    const reg = await navigator.serviceWorker.register('sw.js');
    const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_KEY
    });
    console.log("复制下面这段 JSON 到 Python 代码中:");
    console.log(JSON.stringify(sub));
}

document.getElementById('btn').onclick = subscribe;
