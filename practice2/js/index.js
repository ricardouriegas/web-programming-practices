// user agent and print name part
const btnAction = document.querySelector("#button");
const txtName = document.querySelector("#name");
const sUserAgent = document.getElementById("s-user-agent");

sUserAgent.textContent = navigator.userAgent;

if (!localStorage.getItem('elementList')) {
    localStorage.setItem('elementList', JSON.stringify([]));
}

const listing = JSON.parse(localStorage.getItem('elementList'));

for (let item of listing) {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', li_click);
    list.appendChild(li);
}

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
    const li = this;
    alert('elemento de la lista presionado: ' + li.textContent);
}

function Person(name, lastName, age) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;

    this.sayHello = function() {
        console.log(`whatsup, my name is ${this.name} ${this.lastName} and im ${this.age} years old`);
    }
    
}

//! creating a new object
const person1 = new Person('Juan', 'Perez', 25);
person1.sayHello(); // calling the function inside the object

// adding properties to the object
person1.anotherPerson = 'person something';
person1.sayAge = function() {
    console.log(`my age is ${this.age}`);
}
console.log(person1.anotherPerson);
person1.sayAge();

//! creating a new object
const person2 = new Person('Maria', 'Gomez', 30);
person2.sayHello();

// adding a function to the prototype
Person.prototype.sayCompleteName = function() {
    console.log(`my complete name is ${this.name} ${this.lastName}`);
}

person1.sayCompleteName();
person2.sayCompleteName();


if (person2.sayAge) {
    person2.sayAge();
} else {
    console.log('sayAge function not found');
}

const obj1 = {
    name: 'Juan',
    lastName: 'Perez',
}

const arr01= [];
arr01.push(person1);
arr01.push(person2);

const arr2 = [1, 2,3 ,4, 5, 6,7 ,8];
let arrT = arr2.filter(function(i, ix, arr) {return i % 2 == 0});
console.log("Valores [ares");
console.log(arrT);
arrT = arr2.filter((i, ix, arr) => i % 2 == 0);
console.log(arrT);

// is the same 
let arrT2 = [];
for (let ix = 0; ix < arr2.length; ix++) {
    if (arr2[ix] % 2 != 0){
        arrT2.push(arr2[ix]);
    }    
}


// map function
console.log("Using map to multiply by 2");
arrT = arr2.map((i, ix, arr) => i * 2);
console.log(arrT);