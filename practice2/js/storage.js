// localStorage
if (!window.localStorage) {
    alert('localStorage does not exist in this browser');
    // conclude execution
    // window.close();
}

for (let ix = 0; ix < localStorage.length; ix++) {
    let k = localStorage.key(ix);
    let v = localStorage.getItem(k);
    console.log('Key:' + k + 'Item' + v);
}

localStorage.setItem('name', 'Juan');
localStorage.setItem('lastName', 'Perez');
localStorage.setItem('age', 25);

console.log('----------------');

for (let ix = 0; ix < localStorage.length; ix++) {
    let k = localStorage.key(ix);
    let v = localStorage.getItem(k);
    console.log('Key:' + k + 'Item' + v);
}
