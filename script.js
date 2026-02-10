const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyzCgHtzeQq8NYVqImyOSgXqbICStWj3ti6sVQ1COWl2jfAF-7T7ya87e1TyhBybKY/exec"; // Google Sheet link

const WHATSAPP_NUMBER = "919022797055";

function openWhatsApp(message){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Called when user clicks "Order on WhatsApp"
function orderProduct(name, price){
  const msg =
`Hi Artisan Homemade Chocolate, I want to order: ${name} (₹${price}). Delivery in Nanded. Please confirm availability and delivery time.`;
  openWhatsApp(msg);
}

// Search filter on products page
document.addEventListener("DOMContentLoaded", function(){
  const input = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".product-card");

  if(!input) return; // if not products page, do nothing

  input.addEventListener("keyup", function(){
    const value = input.value.toLowerCase();

    cards.forEach(card => {
      const name = card.getAttribute("data-name").toLowerCase();
      card.style.display = name.includes(value) ? "block" : "none";
    });
  });
});
// Contact form handling
document.addEventListener("DOMContentLoaded", function(){
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("successBox");

  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("cName").value;
    const phone = document.getElementById("cPhone").value;
    const address = document.getElementById("cAddress").value;
    const message = document.getElementById("cMessage").value;

    successBox.innerText = "Opening WhatsApp…";

    const waMsg =
`Hi Artisan Homemade Chocolate,
Name: ${name}
Phone: ${phone}
Address: ${address}
Message: ${message}
Please confirm delivery in 1–2 days.`;

    openWhatsApp(waMsg);
    form.reset();
  });
});

async function saveToSheet(payload){
  try{
    const formData = new URLSearchParams(payload);

    await fetch(SHEET_API_URL, {
      method: "POST",
      body: formData
    });

    return true;
  }catch(err){
    console.log(err);
    return false;
  }
}

