const display = document.querySelector('.productDisplay');

const products = [
    { id: 1, name: 'Amanzi Amnyama', price: 115, image: './images/AMANZI AMNYAMA-ecommerce.png' },
    { id: 2, name: 'Cacisa amaphupha', price: 115, image: './images/CACISA AMAPHUPHO-ecommerce.png' },
    { id: 3, name: 'Cisha intshaba', price: 115, image: './images/CISHA INTSHABA-ecommerce.png' },
    { id: 4, name: 'Dabula amafu', price: 115, image: './images/DABULA AMAFU-ecommerce.png' },
    { id: 5, name: 'Gilindoda', price: 115, image: './images/GILINDODA-ecommerce.png' },
    { id: 6, name: 'Ibekelo', price: 115, image: './images/IBEKELO-ecommerce.png' },
    { id: 7, name: 'Intlambuluko', price: 115, image: './images/INTLAMBULUKO-ecommerce.png' },
    { id: 8, name: 'Isikhundla', price: 115, image: './images/ISIKHUNDLA-ecommerce.png' },
    { id: 9, name: 'Isilwane', price: 115, image: './images/ISILWANE-ecommerce.png' },
    { id: 10, name: 'Mkhanya kude', price: 115, image: './images/MKHANYA KUDE-ecommerce.png' },
    { id: 11, name: 'Pepper steak', price: 115, image: './images/PEPPER STEAK-ecommerce.png' },
    { id: 12, name: 'Phindisa isichitho', price: 115, image: './images/PHINDISA ISICHITHO-ecommerce.png' },
    { id: 13, name: 'Qhaqha amaqhina', price: 115, image: './images/QHAQHA AMAQHINA-ecommerce.png' },
    { id: 14, name: 'Shukumisa ibhedi', price: 115, image: './images/SHUKUMISA IBHEDI-ecommerce.png' },
    { id: 15, name: 'Sweet talker', price: 115, image: './images/SWEET TALKER-ecommerce.png' },
    { id: 16, name: 'Thandeka ebantwini', price: 115, image: './images/THANDEKA EBANTWINI-ecommerce.png' },
    { id: 17, name: 'Thethisa abathakathi', price: 115, image: './images/THETHISA ABATHAKATHI-ecommerce.png' },
    { id: 18, name: 'Amacelebrity', price: 115, image: './images/UMACELEBRATE-ecommerce.png' },
    { id: 19, name: 'Umagudluza', price: 115, image: './images/UMAGUDLUZA-ecommerce.png' },
    { id: 20, name: 'Umthi wemali', price: 115, image: './images/UMTHI WEMALI-ecommerce.png' },
    { id: 21, name: 'Umthi wochela', price: 115, image: './images/UMTHI WOCHELA EKHAYA-ecommerce.png' },
    { id: 22, name: 'Umusa wocela', price: 115, image: './images/UMUSA WOCELA-ecommerce.png' },
    { id: 23, name: 'Vula intlahla', price: 115, image: './images/VULA INTLAHLA ZAKHO-ecommerce.png' },
    { id: 24, name: 'XABANA BODWA', price: 115, image: './images/XABANA BODWA-ecommerce.png' }
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];

products.forEach(product => {
    let divElement = document.createElement('div');
    divElement.classList.add('card');

    divElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="card-image">
        <div class="card-title">
            ${product.name} <br>
            <span class="price">R${product.price}</span>
        </div>
        <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
    `;

    display.append(divElement);
});


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
        let productId = e.target.dataset.id;
        let productName = e.target.dataset.name;
        let productPrice = parseFloat(e.target.dataset.price);

        let existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} added to cart!`);
    }
});
