const btn = document.querySelector('#btn');
const statusText = document.querySelector('#status');

btn.addEventListener('click', btnEject);

async function btnEject (e) {
    btn.disabled = true;

    statusText.textContent = 'Processing...';
    const result = await processing(8, 'the message');
    statusText.textContent = 'Doing the result...';
    await doSomething(result);
    statusText.textContent = 'Done';
    
    btn.disabled = false;
}

function processing (time, msg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(msg);
        }, time * 1000);
    });
}

function doSomething (msg) {
    console.log(msg);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}