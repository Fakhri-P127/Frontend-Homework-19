const header = document.querySelector("header");
const categories = document.querySelector(".third-header  #categories");
const btnHamburger = document.querySelector("#btnHamburger");
const btnClose = document.querySelector("#btnClose");

btnHamburger.addEventListener("click", () => {
  categories.classList.add("hamburger-showup");
  categories.style.display = "flex";
  categories.style.transition = "1s all";
  btnClose.classList.remove("hidden");
  btnClose.style.zIndex = "1";
  btnClose.classList.add("close-btn-place");
});

btnClose.addEventListener("click", () => {
  categories.classList.remove("hamburger-showup");
  categories.style.display = "none";
  btnClose.classList.add("hidden");
  btnClose.classList.remove("close-btn-place");
});

let latestScroll = 0;
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  if (scroll > latestScroll && window.scrollY > 100) {
    header.style.transform = "translateY(-200px)";
    header.style.transition = "0.3s all";
  } else {
    header.style.transform = "translateY(0px)";
    header.style.transition = "0.3s all";
  }
  latestScroll = scroll;
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 70,
  responsive: {
    0: {
      items: 1.5,
    },
    600: {
      items: 2.5,
    },
    1000: {
      items: 4.5,
    },
  },
});

// document.cookie = "user=fakhri";

const basketCount = document.querySelector("#basket-count");
const heartIcons = document.querySelectorAll(".fa-heart");
let items = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
const span = document.createElement("span");
heartIcons.forEach((heartIcon) => {
  heartIcon.addEventListener("click", (e) => {
    // if (heartIcon.classList.contains("fa-regular")) {
    //   heartIcon.classList.remove("fa-regular");
    //   heartIcon.classList.add("fa-solid");
    //   heartIcon.style.color = "crimson";
    // } else if (heartIcon.classList.contains("fa-solid")) {
    //   heartIcon.classList.remove("fa-solid");
    //   heartIcon.classList.add("fa-regular");
    //   heartIcon.style.color = "black";
    // }

    // This is needed for total in basket.html
    const prices = heartIcon.nextElementSibling;
    const img = heartIcon.previousElementSibling;

    heartIcon.classList.toggle("fa-regular");
    heartIcon.classList.toggle("fa-solid");
    heartIcon.style.color = "crimson";
    if (items.length > 0) {
      if (items.some((item) => item.id === e.target.id)) {
        items = items.filter((item) => item.id !== e.target.id);
      } else {
        items.push({
          id: `${heartIcon.id}`,
          count: 1,
          price: `${prices.textContent}`,
          imgSrc: `${img.src}`,
        });
      }
    } else {
      items.push({
        id: `${heartIcon.id}`,
        count: 1,
        price: `${prices.textContent}`,
        imgSrc: `${img.src}`,
      });
    }
    localStorage.setItem("items", JSON.stringify(items));

    span.innerHTML = items.length;

    basketCount.appendChild(span);
  });
});

function checkBasketItems() {
  if (items.length > 0) {
    items.forEach((item) => {
      const icons = document.querySelectorAll(`#${item.id}`);

      icons.forEach((icon) => {
        icon.classList.add("fa-solid");
        icon.classList.remove("fa-regular");
      });
    });
  }
}
checkBasketItems();
