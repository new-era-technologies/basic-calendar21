'use strict';

const buts = document.querySelectorAll('.dropdown-item'); //get all dropdown items
const form = document.getElementById('create-event-form'); //get form
const submit = document.getElementById('submit'); //get submit button
const evName = document.getElementById('ev-name'); //get empty span in modal
const remEv = document.getElementById('rem-event'); //get button to remove event

//get data from localStorage after load page
self.onload = function () {
    getFromStore();
    // localStorage.clear();
    console.log(JSON.parse(JSON.stringify(localStorage)))
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
    // if (!slot) {

    // } else {
        addToStore();
    // }
});

// add to localStorage
function addToStore() {
    let ev = {
        id: Date.now()
    };
    for (let i = 0; i < form.elements.length - 1; i++) {
        let it = form.elements.item(i);
        ev[it.name] = it.value;
    }
    if (typeof (Storage) !== "undefined") {
        self.localStorage.setItem(ev.id, JSON.stringify(ev));
    } else {
        alert('Sorry no storage support');
    }
}

//get from localStorage
function getFromStore() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        drawEvent(JSON.parse(value));
    }
}

//draw the event
function drawEvent(obj) {
    const trId = document.getElementById(obj.time);
    if (obj.days === 'Monday') {
        trId.children[1].innerHTML = obj.name + `<button type="button" class="btn btn-outline-light border-0" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})">x</button>`;
        trId.children[1].classList.add('bg-success');
    } else if (obj.days === 'Tuesday') {
        trId.children[2].innerHTML = obj.name + `<button type="button" class="btn btn-outline-light border-0" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})">x</button>`;
        trId.children[2].classList.add('bg-success');
    } else if (obj.days === 'Wednesday') {
        trId.children[3].innerHTML = obj.name + `<button type="button" class="btn btn-outline-light border-0" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})">x</button>`;
        trId.children[3].classList.add('bg-success');
    } else if (obj.days === 'Thursday') {
        trId.children[4].innerHTML = obj.name + `<button type="button" class="btn btn-outline-light border-0" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})">x</button>`;
        trId.children[4].classList.add('bg-success');
    } else if (obj.days === 'Friday') {
        trId.children[5].innerHTML = obj.name + `<button type="button" class="btn btn-outline-light border-0" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})">x</button>`;
        trId.children[5].classList.add('bg-success');
    }
}

//show modal to remove event from calendar
function showModal(id) {
    let remObj = JSON.parse(localStorage.getItem(id));
    evName.innerHTML = '"' + remObj.name + '"';

    //remove event by clicking yes in modal
    remEv.addEventListener('click', function () {
        self.localStorage.removeItem(id);
        location.reload();
    })
}