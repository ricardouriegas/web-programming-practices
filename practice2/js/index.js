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

    li.addEventListener('click', li_click);
    
    txtList.value = '';
    txtList.focus();
});

function li_click (e) {
    alert('elemento de la lista presionado');
}

function Person(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;

    this.sayHello = function() {
        console.log(`Hello, my name is ${this.name} ${this.lastName} and im ${this.age} years old`);
    }
    
}

const person1 = new Person('Juan', 'Perez', 25);
person1.sayHello();
const person2 = new Person('Maria', 'Gomez', 30);