/* =========================*/
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
nav.classList.toggle("active");
});

// CLOSE MENU WHEN LINK CLICKED
const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
link.addEventListener("click", () => {
nav.classList.remove("active");
});
});

document.addEventListener("click", (e) => {

    if(!nav.contains(e.target) && !toggle.contains(e.target)){
    
    nav.classList.remove("active");
    
    }
    
    });

/*========================= */

const cartIcon = document.getElementById("cartIcon")
const cartDrawer = document.getElementById("cartDrawer")
const closeCart = document.getElementById("closeCart")

const cartItemsEl = document.querySelector(".cart-items")
const totalEl = document.getElementById("total")
const cartCount = document.getElementById("cartCount")

const mainProduct = document.getElementById("mainProduct")

/* =========================
   CART DATA
========================= */

let cart = []

/* =========================
   RENDER CART
========================= */

function renderCart(){
  cartItemsEl.innerHTML = ""
  let total = 0

  cart.forEach((item,index)=>{

    total += item.price * item.qty

    cartItemsEl.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
          <p>Size: ${item.size}</p>
          <p>Color: ${item.color}</p>

          <div class="cart-qty">
            <button onclick="decrease(${index})">-</button>
            <span>${item.qty}</span>
            <button onclick="increase(${index})">+</button>
          </div>

          <span class="remove" onclick="removeItem(${index})">Remove</span>
        </div>
      </div>
    `
  })

  totalEl.textContent = total
  cartCount.textContent = cart.length
}

/* =========================
   SIZE & COLOR SELECTION
========================= */

document.querySelectorAll(".product-card").forEach(card=>{

  const sizes = card.querySelectorAll(".sizes span")
  const colors = card.querySelectorAll(".colors .color")

  sizes.forEach(size=>{
    size.addEventListener("click",()=>{
      sizes.forEach(s=>s.classList.remove("selected"))
      size.classList.add("selected")
    })
  })

  colors.forEach(color=>{
    color.addEventListener("click",()=>{
      colors.forEach(c=>c.classList.remove("selected"))
      color.classList.add("selected")
    })
  })

})

/* =========================
   ADD TO CART
========================= */

document.querySelectorAll(".add-cart").forEach(btn=>{

  btn.addEventListener("click",(e)=>{

    const card = e.target.closest(".product-card")

    const name = card.dataset.name
    const price = parseFloat(card.dataset.price)
    const img = card.dataset.img

    const size = card.querySelector(".sizes .selected")?.dataset.size || "N/A"
    const color = card.querySelector(".colors .selected")?.dataset.color || "Default"

    const existing = cart.find(item =>
      item.name===name &&
      item.size===size &&
      item.color===color
    )

    if(existing){
      existing.qty++
    }else{
      cart.push({name,price,img,size,color,qty:1})
    }

    renderCart()

    cartDrawer.classList.add("open")

    /* flying animation */

    const imgFly = card.querySelector("img").cloneNode(true)
    const rect = card.getBoundingClientRect()

    imgFly.style.position="fixed"
    imgFly.style.top=rect.top+"px"
    imgFly.style.left=rect.left+"px"
    imgFly.style.width=rect.width+"px"
    imgFly.style.height=rect.height+"px"
    imgFly.style.transition="all 0.8s ease"
    imgFly.style.zIndex=1000

    document.body.appendChild(imgFly)

    const cartRect = cartIcon.getBoundingClientRect()

    setTimeout(()=>{
      imgFly.style.top = cartRect.top+"px"
      imgFly.style.left = cartRect.left+"px"
      imgFly.style.width="40px"
      imgFly.style.height="40px"
      imgFly.style.opacity="0.5"
    },50)

    setTimeout(()=>{
      document.body.removeChild(imgFly)
    },800)

  })

})

/* =========================
   CART CONTROLS
========================= */

function increase(i){
  cart[i].qty++
  renderCart()
}

function decrease(i){
  if(cart[i].qty>1){
    cart[i].qty--
  }else{
    cart.splice(i,1)
  }
  renderCart()
}

function removeItem(i){
  cart.splice(i,1)
  renderCart()
}

/* =========================
   CART OPEN/CLOSE
========================= */

cartIcon.addEventListener("click",()=>{
  cartDrawer.classList.add("open")
})

closeCart.addEventListener("click",()=>{
  cartDrawer.classList.remove("open")
})


// =========================
// SCROLL ANIMATION SYSTEM
// =========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
    
    if(entry.isIntersecting){
    
    entry.target.classList.add("active");
    
    }
    
    });
    
    },{
    threshold:0.2
    });
    
    
    const elements = document.querySelectorAll(
    ".scroll-reveal, .scroll-left, .scroll-right, .scroll-zoom"
    );
    
    elements.forEach(el => observer.observe(el));



// SEARCH

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup",function(){

let value = this.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

let name = card.dataset.name.toLowerCase();

card.style.display = name.includes(value) ? "block" : "none";

});

});



// CATEGORY FILTER

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change",function(){

let category = this.value;

document.querySelectorAll(".product-card").forEach(card=>{

if(category === "all"){

card.style.display="block";

}else{

card.style.display = card.dataset.category === category
? "block"
: "none";

}

});

});