'use strict';

const buts = document.querySelectorAll('.dropdown-item'); //get all dropdown items
const form = document.getElementById('create-event-form'); //get form
const submit = document.getElementById('submit'); //get submit button

//get data from localStorage after load page
self.onload = function () {
    getFromStore();
    // localStorage.clear();
}

//change text in dropdown main button by choosing some inner item
buts.forEach((item) => {
    item.addEventListener('click', function () {
        this.closest('div').firstElementChild.innerText = this.innerText;
    })
});

//submit form by clicking submit button
submit.addEventListener('click', function (e) {
    e.preventDefault()
    window.location.replace("../../build/index.html");
    addToStore();
});

// add to localStorage
function addToStore() {
    let ev = {
        id: localStorage.length + 1
    };
    for (let i = 0; i < form.elements.length - 1; i++) {
        let it = form.elements.item(i);
        ev[it.name] = it.value;
    }
    if (typeof (Storage) !== "undefined") {
        self.localStorage.setItem(ev.id, JSON.stringify(ev));
        console.log(ev)
    } else {
        alert('Sorry no storage support');
    }
}

//get from localStorage
function getFromStore() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(JSON.parse(value));
    }
}