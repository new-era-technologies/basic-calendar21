'use strict';

const buts = document.querySelectorAll('.dropdown-item'); //get all dropdown items
const form = document.getElementById('create-event-form'); //get form
const submit = document.getElementById('submit'); //get submit button
const alMesBlock = document.getElementById('alertMes'); //get alert block
const trs = document.querySelectorAll('.main-tr'); //get every row of calendar
const evName = document.getElementById('ev-name'); //get empty span in modal
const remEv = document.getElementById('rem-event'); //get button to remove event

let arrEVs = []; //create empty array for events data

//get data from localStorage after load page
self.onload = function () {
    getFromStore();
    // localStorage.clear();
    checkMember('All members');
}

//submit form by clicking submit button
submit ? submit.addEventListener('click', function (e) {
    e.preventDefault();
    addToStore();
}) : null;

// add to localStorage and store data
function addToStore() {
    let ev = {
        id: Date.now(),
        name: form.elements.item(0).value,
        parts: [],
        days: form.elements.item(2).value,
        time: form.elements.item(3).value
    };
    for (let f = 0; f < form.elements.item(1).options.length; f++) {
        if (form.elements.item(1).options[f].selected) {
            ev['parts'].push(form.elements.item(1).options[f].value);
        }
    }
    if (arrEVs.length) {
        arrEVs.map(l => {
            if (l.days === form.elements.item(2).value) {
                if (l.time === form.elements.item(3).value) {
                    alMesBlock.style.display = 'block';
                    throw new Error(); //end script
                }
            }
        })
    }
    // for (let i = 0; i < form.elements.length - 1; i++) {
    //     let it = form.elements.item(i);
    //     ev[it.name] = it.value;
    // }
    arrEVs.push(ev);
    self.localStorage.setItem(ev.id, JSON.stringify(ev));
    window.location.replace("./calendar.html");
}

//get from localStorage, but actually from server
function getFromStore() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        arrEVs.push(JSON.parse(value));
    }
}

//draw the event
function drawEvent(arr) {
    arr.forEach(obj => {
        const trId = document.getElementById(obj.time);
        if (obj.days === 'Monday') {
            trId.children[1].innerHTML = obj.name + `<span class="text-light fw-bold" style="cursor: pointer; float: right;" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})"> &times;</span>`;
            trId.children[1].classList.add('bg-success');
        } else if (obj.days === 'Tuesday') {
            trId.children[2].innerHTML = obj.name + `<span class="text-light fw-bold" style="cursor: pointer; float: right;" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})"> &times;</span>`;
            trId.children[2].classList.add('bg-success');
        } else if (obj.days === 'Wednesday') {
            trId.children[3].innerHTML = obj.name + `<span class="text-light fw-bold" style="cursor: pointer; float: right;" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})"> &times;</span>`;
            trId.children[3].classList.add('bg-success');
        } else if (obj.days === 'Thursday') {
            trId.children[4].innerHTML = obj.name + `<span class="text-light fw-bold" style="cursor: pointer; float: right;" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})"> &times;</span>`;
            trId.children[4].classList.add('bg-success');
        } else if (obj.days === 'Friday') {
            trId.children[5].innerHTML = obj.name + `<span class="text-light fw-bold" style="cursor: pointer; float: right;" data-bs-toggle="modal" data-bs-target="#modal" onClick="showModal(${obj.id})"> &times;</span>`;
            trId.children[5].classList.add('bg-success');
        }
    })
}

//check member name to display events
function checkMember(name) {
    let newArr = [];

    name !== 'All members' ?
        arrEVs.map((w) => {
            if (w.parts.includes(name)) {
                newArr.push(w);
            }
        }) : newArr = [...arrEVs];
    clearEvents();
    trs.length ? drawEvent(newArr) : null;
}

//change text in dropdown main button by choosing some inner item
buts.forEach((item) => {
    item.addEventListener('click', function () {
        this.closest('div').firstElementChild.innerText = this.innerText;
        checkMember(this.innerText);
    })
});

//clear every tr before draw new html events
function clearEvents() {
    for (let h = 0; h < trs.length; h++) {
        for (let g = 1; g < trs[h].children.length; g++) {
            trs[h].children[g].innerText = '';
            trs[h].children[g].classList.remove('bg-success');
        }
    }
}

//show modal to remove event from calendar
function showModal(id) {
    let remObj = JSON.parse(localStorage.getItem(id));
    if (!!remObj.name) { //check if event has no name
        evName.innerHTML = '"' + remObj.name + '"';
    } else {
        evName.innerHTML = 'unnamed';
    }

    //remove event by clicking yes in modal
    remEv.addEventListener('click', function () {
        self.localStorage.removeItem(id);
        location.reload();
    })
}