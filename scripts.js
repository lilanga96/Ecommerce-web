const display = document.querySelector('.productDisplay');

const products = [
    { id: 1, name: 'Amanzi Amnyama', price: 10, image: './images/amanzi-amnyama2.jpg' },
    { id: 2, name: 'Amacelebrity', price: 115, image: './images/amacelebrity2.jpg' },
    { id: 3, name: 'Badudule', price: 115, image: './images/badudule2.jpg' },
    { id: 4, name: 'Cacisa Amaphupha', price: 115, image: './images/cacisa-amaphupha2.jpg' },
    { id: 5, name: 'Cisha Intshaba', price: 115, image: './images/cisha-intshaba2.jpg' },
    { id: 6, name: 'Dabula Amafu', price: 115, image: './images/dabula-amafu2.jpg' },
    { id: 7, name: 'Gilindoda', price: 115, image: './images/gilindoda2.jpg' },
    { id: 8, name: 'Intlambuluko', price: 115, image: './images/intlambuluko2.jpg' },
    { id: 9, name: 'Isibunge', price: 115, image: './images/isibunge2.jpg' },
    { id: 10, name: 'Isiqhumiso', price: 115, image: './images/isiqhumiso2.jpg' },
    { id: 11, name: 'Iyeza Lebekelo', price: 115, image: './images/iyeza lebekelo2.jpg' },
    { id: 12, name: 'Iyeza Ledliso', price: 115, image: './images/iyeza ledliso2.jpg' },
    { id: 13, name: 'Modules', price: 115, image: './images/modules2.jpg' },
    { id: 14, name: 'Navigator', price: 115, image: './images/navigator2.jpg' },
    { id: 15, name: 'Pepper Steak', price: 115, image: './images/pepper-steak2.jpg' },
    { id: 16, name: 'Phindisa izinto Zabaloyi', price: 115, image: './images/phindisa izinto zabaloyi2.jpg' },
    { id: 17, name: 'Phindisa Isichitho', price: 115, image: './images/phindisa-isichitho2.jpg' },
    { id: 18, name: 'Qhaqha Amaqhina', price: 115, image: './images/qhaqha-amaqhina2.jpg' },
    { id: 19, name: 'Shukumisa Ibhedi', price: 115, image: './images/shukumisa ibhedi2.jpg' },
    { id: 20, name: 'Sweet Talker', price: 115, image: './images/sweet-talker2.jpg' },
    { id: 21, name: 'Thandeka Ebantwini', price: 115, image: './images/thandeka ebantwini2.jpg' },
    { id: 22, name: 'Thethisa Abathakathi', price: 115, image: './images/thethisa-abathakathi2.jpg' },
    { id: 23, name: 'Umthi Wokuchela', price: 115, image: './images/umthi-wokuchela2.jpg' },
    { id: 24, name: 'Umthi Wokuhlamba', price: 115, image: './images/umthi-wokuhlamba2.jpg' }
];



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


import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://mhkcavrzuobyovapylxv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oa2NhdnJ6dW9ieW92YXB5bHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjMwMTQsImV4cCI6MjA1ODczOTAxNH0.VP7wJN9q5yLeC9grWZ2rWkJBd3le4JFenOa-oPKSyzc';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;


async function checkAuth() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
        console.error("Error checking auth:", error);
        return;
    }

    const authButton = document.getElementById("authButton");

    if (user) {
        currentUser = user;
        authButton.textContent = "Logout";
    } else {
        currentUser = null;
        authButton.textContent = "Sign In / Sign Up";
    }
}

document.addEventListener("DOMContentLoaded", checkAuth);

supabase.auth.onAuthStateChange((event, session) => {
    checkAuth();  
});



document.getElementById("authButton").addEventListener("click", async () => {
    if (currentUser) {
        await supabase.auth.signOut();
        currentUser = null;
        alert("You have been logged out.");
        location.reload();
    } else {
        new bootstrap.Modal(document.getElementById("authModal")).show();
    }
});


supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        currentUser = session.user;
        console.log("Auth state changed: User signed in", currentUser);
    } else {
        currentUser = null;
        console.log("Auth state changed: User signed out");
    }
});


document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        if (!currentUser) {
            alert("Please sign in to add items to your cart.");
            return;
        }

        const productId = e.target.dataset.id;
        const productName = e.target.dataset.name;
        const productPrice = parseFloat(e.target.dataset.price);

        const { data: existingCart, error } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", currentUser.id)
            .eq("product_id", productId)
            .single();

        if (existingCart) {
           
            const { error } = await supabase
                .from("cart")
                .update({ quantity: existingCart.quantity + 1 })
                .eq("id", existingCart.id);

                if (error) {
                    alert("Failed to add item to cart. Please try again.");
                } else {
                    alert(`${productName} added to cart!`);
                    loadCart(); 
                }
                
        } else {
           
            const { error } = await supabase
                .from("cart")
                .insert([
                    {
                        user_id: currentUser.id,
                        product_id: productId,
                        product_name: productName,
                        price: productPrice,
                        quantity: 1
                    }
                ]);

            if (error) {
                alert("Failed to add item to cart. Please try again.");
            } else {
                alert(`${productName} added to cart!`);
            }
        }
    }
});


async function loadCart() {
    if (!currentUser) return;

    const { data: cartItems, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", currentUser.id);

    if (error) {
        console.error("Error loading cart:", error);
        return;
    }

    let cartDisplay = document.getElementById("cart-items");
    if (!cartDisplay) {
        console.error("Cart display element not found.");
        return;
    }

    cartDisplay.innerHTML = "";
    let total = 0;

    cartItems.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let itemDiv = document.createElement("div");
        itemDiv.innerHTML = `${item.product_name} (x${item.quantity}) - R${itemTotal.toFixed(2)}`;
        cartDisplay.appendChild(itemDiv);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}
