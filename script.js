const products = [
    {
        name: 'Salted Caramel Brownie',
        description: 'Rich chocolate brownie with a buttery salted caramel swirl and crunchy sea salt.',
        price: '$8.50',
        tag: 'Best Seller',
        imageUrl: 'https://via.placeholder.com/500x320/ffd3df/8b3f53?text=Brownie'
    },
    {
        name: 'Raspberry Cheesecake Bite',
        description: 'Creamy cheesecake topped with fresh raspberry sauce and a crisp graham crust.',
        price: '$7.90',
        tag: 'Top Pick',
        imageUrl: 'https://via.placeholder.com/500x320/f9dbec/8b3f53?text=Cheesecake'
    },
    {
        name: 'Hazelnut Dream Bar',
        description: 'Layered hazelnut praline with milk chocolate, almond crunch and nutty glaze.',
        price: '$9.25',
        tag: 'New',
        imageUrl: 'https://via.placeholder.com/500x320/f4d0dd/8b3f53?text=Hazelnut'
    }
];

const productGrid = document.getElementById('productGrid');
const reviewContent = document.getElementById('reviewContent');
const prevReview = document.getElementById('prevReview');
const nextReview = document.getElementById('nextReview');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const tickerContent = document.querySelector('.ticker-content');

const reviews = [
    {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod, urna vitae gravida egestas, tortor purus fermentum justo, eu ultricies lectus est in mauris.',
        author: '— Ava, Brownie Lover'
    },
    {
        text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris non tortor vitae felis placerat hendrerit.',
        author: '— Malik, Sweet Tooth'
    },
    {
        text: 'Nulla facilisi. Cras ac turpis suscipit, ultricies nibh at, blandit mauris. Sed sit amet velit non lectus faucibus pellentesque.',
        author: '— Nina, Dessert Fan'
    }
];

let currentReview = 0;

function createProductCard(product, index) {
    const card = document.createElement('article');
    card.className = 'product-card';
    if (index === 0) {
        card.classList.add('selected');
    }

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imageUrl}" alt="${product.name}" />
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-meta">
            <span class="product-price">${product.price}</span>
            <span class="product-tag">${product.tag}</span>
        </div>
        <button class="product-button" type="button">Add to cart</button>
    `;

    return card;
}

function renderProducts() {
    if (!productGrid) return;
    products.forEach((product, index) => {
        const card = createProductCard(product, index);
        productGrid.appendChild(card);
    });
}

function displayReview(index) {
    if (!reviewContent) return;
    const review = reviews[index];
    reviewContent.innerHTML = `
        <p class="review-text">${review.text}</p>
        <p class="review-author">${review.author}</p>
    `;
}

function changeReview(direction) {
    currentReview = (currentReview + direction + reviews.length) % reviews.length;
    displayReview(currentReview);
}

function setupTicker() {
    if (!tickerContent) return;

    const baseHTML = tickerContent.innerHTML;
    const baseWidth = tickerContent.scrollWidth;
    if (baseWidth === 0) return;

    let html = baseHTML;
    let width = baseWidth;
    const targetWidth = window.innerWidth * 1.5;

    while (width < targetWidth) {
        html += baseHTML;
        width += baseWidth;
    }

    tickerContent.innerHTML = html + html;
}

window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    displayReview(currentReview);
    setupTicker();

    if (prevReview) {
        prevReview.addEventListener('click', () => changeReview(-1));
    }

    if (nextReview) {
        nextReview.addEventListener('click', () => changeReview(1));
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});