const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count');
const price = document.getElementById('price');
const showSelector = document.getElementById('movie')
let selectedSeats = document.querySelectorAll('.row .seat.selected');

populateUI();

function populateUI(){
    price.innerHTML = JSON.parse(localStorage.getItem('price'));
    const selectedIndexes = JSON.parse(localStorage.getItem('selectedIndexes'))
    seats.forEach((seat, seatIndex) => {
        if (selectedIndexes != null && selectedIndexes.indexOf(seatIndex) > -1 ) {
            seat.classList.add('selected');
    }
    count.innerText = selectedIndexes.length;
    price.innerText = +showSelector.value * selectedIndexes.length;
})
}

function updatePrice(){
    selectedSeats = document.querySelectorAll('.row .seat.selected');
    count.innerHTML = selectedSeats.length;
    price.innerHTML = +showSelector.value * selectedSeats.length;
    localStorage.setItem('price', JSON.stringify(price.innerHTML));
}

showSelector.addEventListener('change', e => {
    updatePrice();
})

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        selectedSeats = document.querySelectorAll('.row .seat.selected');
        const selectedIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));
        localStorage.setItem('selectedIndexes', JSON.stringify(selectedIndexes));
        updatePrice();
    }
})