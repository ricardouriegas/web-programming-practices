// user agent and print name part
const btnAction = document.querySelector("#button");
const txtName = document.querySelector("#name");
const sUserAgent = document.getElementById("s-user-agent");

sUserAgent.textContent = navigator.userAgent;

function btnActionClick (e) {
    const name = txtName.value.trim();

    if (!name) {
        txtName.focus();
        return;
    }

    // grettings
    alert("Hi my little fella " + name);

    txtName.value ="";
    txtName.focus();
}

btnAction.addEventListener('click', btnActionClick);
txtName.addEventListener('keypress', function(e){
    console.log(txtName.value);
})

// list adding part
const btnList = document.querySelector('#add-button');
const list = document.querySelector('#ul-list');
const txtList = document.querySelector('#txt-name-item');

btnList.addEventListener('click', e => {
    const itemName = txtList.value.trim();
    if (!itemName) {
        txtList.focus();
        return;
    }

    const li = document.createElement('li');
    li.textContent = itemName;
    list.appendChild(li);

    txtList.value = '';
    txtList.focus();
});