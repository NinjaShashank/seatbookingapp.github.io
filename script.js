// Movie list array
const movieList = [
    { name: "Flash", price: 7 },
    { name: "Batman", price: 10 },
    { name: "Superman", price: 8 },
    { name: "Wonder Woman", price: 9 },
];

// References to DOM elements
const selectMovie = document.getElementById("selectMovie");
const movieName = document.getElementById("movieName");
const moviePrice = document.getElementById("moviePrice");
const totalPrice = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeat = document.getElementById("numberOfSeat");
const cancelBtn = document.getElementById("cancelBtn");
const proceedBtn = document.getElementById("proceedBtn");

// Initialize selected movie
let selectedMoviePrice = 7;
let selectedSeats = [];

// Populate dropdown
function populateMovies() {
    movieList.forEach((movie, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${movie.name} ($${movie.price})`;
        selectMovie.appendChild(option);
    });
}

// Update movie info on selection
function updateMovieInfo(index) {
    const movie = movieList[index];
    movieName.textContent = movie.name;
    moviePrice.textContent = `$ ${movie.price}`;
    selectedMoviePrice = movie.price;
    updateTotalPrice();
}

// Initial movie setup
populateMovies();
updateMovieInfo(0);

// Event listener for movie selection
selectMovie.addEventListener("change", (event) => {
    const selectedIndex = event.target.value;
    updateMovieInfo(selectedIndex);
});
// Get all seat elements
const seats = document.querySelectorAll("#seatCont .seat:not(.occupied)");

// Update total price and selected seats display
function updateTotalPrice() {
    const seatCount = selectedSeats.length;
    const total = seatCount * selectedMoviePrice;
    totalPrice.textContent = `$ ${total}`;
    numberOfSeat.textContent = seatCount;
}

function updateSelectedSeatsHolder() {
    selectedSeatsHolder.innerHTML = selectedSeats.length === 0 
        ? '<span class="noSelected">No Seat Selected</span>' 
        : selectedSeats.map(seat => `<div class="selectedSeat">${seat}</div>`).join('');
}

// Event listener for seat selection
seats.forEach((seat, index) => {
    seat.addEventListener("click", () => {
        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            selectedSeats = selectedSeats.filter(selectedSeat => selectedSeat !== index + 1);
        } else {
            seat.classList.add("selected");
            selectedSeats.push(index + 1);
        }
        updateTotalPrice();
        updateSelectedSeatsHolder();
    });
});
// Handle Continue button click
proceedBtn.addEventListener("click", () => {
    if (selectedSeats.length === 0) {
        alert("Oops no seat Selected");
    } else {
        alert("Yayy! Your Seats have been booked");
        seats.forEach(seat => {
            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                seat.classList.add("occupied");
            }
        });
        selectedSeats = [];
        updateTotalPrice();
        updateSelectedSeatsHolder();
    }
});

// Handle Cancel button click
cancelBtn.addEventListener("click", () => {
    seats.forEach(seat => {
        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
        }
    });
    selectedSeats = [];
    updateTotalPrice();
    updateSelectedSeatsHolder();
});