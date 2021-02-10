'use strict';

const buts = document.querySelectorAll('.dropdown-item'); //get all dropdown items

//change text in dropdown main button by choosing some inner item
buts.forEach((item) => {
    item.addEventListener('click', function () {
        this.closest('div').firstElementChild.innerText = this.innerText;
    })
});