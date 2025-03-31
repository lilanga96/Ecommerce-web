const display = document.querySelector('.productDisplay');

const products = [
{
    name: 'Amanzi Amnyama',
    price: 115,
    image: './images/AMANZI AMNYAMA-ecommerce.png'
},
{
    name: 'Cacisa amaphupha',
    price: 115,
    image: './images/CACISA AMAPHUPHO-ecommerce.png'
},
{
    name: 'Cisha intshaba',
    price: 115,
    image: './images/CISHA INTSHABA-ecommerce.png'
},
{
    name: 'Dabula amafu',
    price: 115,
    image: './images/DABULA AMAFU-ecommerce.png'
},
{
    name: 'Gilindoda',
    price: 115,
    image: './images/GILINDODA-ecommerce.png'
},
{
    name: 'Ibekelo',
    price: 115,
    image: './images/IBEKELO-ecommerce.png'
},
{
    name: 'Intlambuluko',
    price: 115,
    image: './images/INTLAMBULUKO-ecommerce.png'
},
{
    name: 'Gilindoda',
    price: 115,
    image: './images/GILINDODA-ecommerce.png'
},
{
    name: 'Gilindoda',
    price: 115,
    image: './images/GILINDODA-ecommerce.png'
},
{
    name: 'Isikhundla',
    price: 115,
    image: './images/ISIKHUNDLA-ecommerce.png'
},
{
    name: 'Isilwane',
    price: 115,
    image: './images/ISILWANE-ecommerce.png'
},
{
    name: 'Mkhanya kude',
    price: 115,
    image: './images/MKHANYA KUDE-ecommerce.png'
},
{
    name: 'Pepper steak',
    price: 115,
    image: './images/PEPPER STEAK-ecommerce.png'
},
{
    name: 'Gilindoda',
    price: 115,
    image: './images/GILINDODA-ecommerce.png'
},
{
    name: 'Phindisa isichitho',
    price: 115,
    image: './images/PHINDISA ISICHITHO-ecommerce.png'
},
{
    name: 'Qhaqha amaqhina',
    price: 115,
    image: './images/QHAQHA AMAQHINA-ecommerce.png'
},
{
    name: 'Shukumisa ibhedi',
    price: 115,
    image: './images/SHUKUMISA IBHEDI-ecommerce.png'
},
{
    name: 'Sweet talker',
    price: 115,
    image: './images/SWEET TALKER-ecommerce.png'
},
{
    name: 'Thandeka ebantwini',
    price: 115,
    image: './images/THANDEKA EBANTWINI-ecommerce.png'
},
{
    name: 'Thethisa abathakathi',
    price: 115,
    image: './images/THETHISA ABATHAKATHI-ecommerce.png'
},
{
    name: 'Gilindoda',
    price: 115,
    image: './images/GILINDODA-ecommerce.png'
},
{
    name: 'Amacelebrity',
    price: 115,
    image: './images/UMACELEBRATE-ecommerce.png'
},
{
    name: 'Gilindoda',
    price: 115,
    image: './images/GILINDODA-ecommerce.png'
},
{
    name: 'Umagudluza',
    price: 115,
    image: './images/UMAGUDLUZA-ecommerce.png'
},
{
    name: 'Umthi wemali',
    price: 115,
    image: './images/UMTHI WEMALI-ecommerce.png'
},
{
    name: 'Umthi wochela',
    price: 115,
    image: './images/UMTHI WOCHELA EKHAYA-ecommerce.png'
},
{
    name: 'Umusa wocela',
    price: 115,
    image: './images/UMUSA WOCELA-ecommerce.png'
},
{
    name: 'Vula intlahla',
    price: 115,
    image: './images/VULA INTLAHLA ZAKHO-ecommerce.png'
},
{
    name: 'XABANA BODWA',
    price: 115,
    image: './images/XABANA BODWA-ecommerce.png'
},
]


products.forEach(product => {
    let divElement = document.createElement('div');
    divElement.classList.add('card');

    divElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="card-image">
        <div class="card-title">
            ${product.name} <br>
            <span class="price">R${product.price}</span>
        </div>
    `;

    display.append(divElement);
});
