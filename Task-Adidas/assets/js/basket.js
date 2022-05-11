const basketTitle = document.querySelector(".left-side .texts h2");
const basketCost = document.querySelector(".left-side .texts p");
const divTexts = document.querySelector(".left-side .texts");
const customCard = document.querySelector(".custom-card");
const row = document.querySelector("#customCard");
const darkBtn = document.querySelector(".left-side .custom-btn .dark--btn");

function checkBasket() {
  if (items.length > 0) {
    //Basketde nese varsa icine burdan yaziriq
    basketCost.textContent = "";
    basketTitle.textContent = "YOUR BAG";
    darkBtn.innerHTML = `CHECKOUT <i class="fa-solid fa-arrow-right-long"></i>`;
    for (let i = 0; i < items.length; i++) {
      const price = `${items[i].price.replace("$", "+")}`;
      basketCost.textContent += price;
    }
    basketCost.innerHTML = `Total: (${items.length} items)   <strong>$${eval(
      basketCost.textContent.slice(1)
    ).toFixed(2)}</strong>`;

    const p = document.createElement("p");
    p.textContent =
      "Items in your bag are not reserved — check out now to make them yours.";
    divTexts.appendChild(p);
    for (let i = 0; i < items.length; i++) {
      const div1 = document.createElement("div");
      div1.classList.add("col-6", "custom-card");

      row.appendChild(div1);
      const div2 = document.createElement("div");
      div2.classList.add("row");
      div1.appendChild(div2);
      const div3 = document.createElement("div");
      div3.classList.add("col-3");
      div2.appendChild(div3);
      const productPhoto = document.createElement("img");
      productPhoto.setAttribute("src", `${items[i].imgSrc}`);
      productPhoto.style.width = "100px";
      div3.appendChild(productPhoto);
      const div4 = document.createElement("div");
      div4.classList.add("col-9");
      div4.innerHTML = `Price: ${items[i].price}`;
      div2.appendChild(div4);
      const count = document.createElement("span");
      count.style.margin = "0 20px";
      count.innerHTML = `${items[i].count}`;
      const btnPlus = document.createElement("button");
      btnPlus.innerHTML = `<i class="fa-solid fa-plus"></i>`;
      btnPlus.classList.add("btn", "btn-outline-dark");
      const btnMinus = document.createElement("button");
      btnMinus.innerHTML = `<i class="fa-solid fa-minus"></i>`;
      btnMinus.classList.add("btn", "btn-outline-dark");
      div4.appendChild(btnMinus);
      div4.appendChild(count);
      div4.appendChild(btnPlus);
      btnMinus.addEventListener("click", (e) => {
        items[i].count--;
        count.innerHTML = items[i].count;
        btnPlus.classList.remove("disabled");

        if (items.some((item) => item.count == 0)) {
          items = items.filter((item) => item.count != 0);
          //   btnMinus.classList.add("disabled");
        } else {
        }

        localStorage.setItem("items", JSON.stringify(items));
      });
      btnPlus.addEventListener("click", () => {
        if (items[i].count < 10) {
          items[i].count++;
          count.innerHTML = items[i].count;
          btnMinus.classList.remove("disabled");
        } else {
          btnPlus.classList.add("disabled");
        }

        localStorage.setItem("items", JSON.stringify(items));
      });
    }
  } else {
    basketTitle.textContent = "YOUR BAG IS EMPTY";
  }
}

checkBasket();
