document.addEventListener('DOMContentLoaded', () => {
    displayReviews();

    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', handleFormSubmit);

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
});

function displayReviews() {
    const reviewList = document.getElementById('reviewList');

    axios.get('http://localhost:8080/reviews')
        .then(response => {
            reviewList.innerHTML = '';
            response.data.forEach(review => {
                const listItem = document.createElement('li');
                listItem.textContent = `Company Name: ${review.companyName}, Pros: ${review.pros}, Cons: ${review.cons}, Rating: ${review.rating}`;

                reviewList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching reviews:', error));
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const reviewDetails = {
        companyName: form.companyName.value,
        pros: form.pros.value,
        cons: form.cons.value,
        rating: form.rating.value,
    };

    axios.post('http://localhost:8080/reviews', reviewDetails)
        .then(response => {
            alert(response.data);
            form.reset();
            displayReviews();
        })
        .catch(error => console.error('Error adding review:', error));
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    const reviewItems = document.querySelectorAll('#reviewList li');
    reviewItems.forEach(item => {
        const textContent = item.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

//check comment