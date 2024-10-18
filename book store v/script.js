const orders = [];
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, image: "gatspy.jpg" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99, image: "mock.jpg" },
    { id: 3, title: "1984", author: "George Orwell", price: 15.99, image: "1984.jpg" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: 9.99, image: "pride.jpg" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: 13.50, image: "catch.jpg" },
    { id: 6, title: "Moby Dick", author: "Herman Melville", price: 14.99, image: "moby.jpg" },
    { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", price: 11.99, image: "hobbit.jpg" },
    { id: 8, title: "Fahrenheit 451", author: "Ray Bradbury", price: 10.50, image: "far.jpg" },
    { id: 9, title: "Brave New World", author: "Aldous Huxley", price: 12.49, image: "brave.jpg" },
    { id: 10, title: "The Picture of Dorian Gray", author: "Oscar Wilde", price: 11.25, image: "gray.jpg" }
];

// Function to display books
function displayBooks() {
    const bookContainer = document.getElementById('books');
    bookContainer.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Price: $${book.price.toFixed(2)}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
        bookContainer.appendChild(bookDiv);
    });
}

// Cart management
let cart = [];
function addToCart(id) {
    const book = books.find(b => b.id === id);
    cart.push(book);
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((book, index) => {
        total += book.price;
        const li = document.createElement('li');
        li.innerHTML = `${book.title} - $${book.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        orders.push({ books: [...cart], total: cart.reduce((sum, book) => sum + book.price, 0) });
        alert('Thank you for your purchase!');
        cart = [];
        displayCart();
    } else {
        alert('Your cart is empty!');
    }
});

document.getElementById('loginButton').addEventListener('click', () => {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('loggedInContent').style.display = 'flex';
    displayBooks();
});

// Navigation functionality
document.getElementById('listBtn').addEventListener('click', () => {
    document.getElementById('bookList').style.display = 'block';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('orderHistory').style.display = 'none';
});

document.getElementById('purchaseBtn').addEventListener('click', () => {
    document.getElementById('bookList').style.display = 'none';
    document.getElementById('cartSection').style.display = 'block';
    document.getElementById('orderHistory').style.display = 'none';
    displayCart();
});

document.getElementById('orderHistoryBtn').addEventListener('click', () => {
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';
    orders.forEach((order, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Order ${index + 1}: Total - $${order.total.toFixed(2)}`;
        ordersList.appendChild(li);
    });
    document.getElementById('bookList').style.display = 'none';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('orderHistory').style.display = 'block';
});

// Initialize the bookstore
displayBooks();