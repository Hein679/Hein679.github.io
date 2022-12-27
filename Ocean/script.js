const trashContainer = document.querySelector(".trash-container");
const moneyElement = document.querySelector(".money");

const trashCollected = document.querySelector(".trash-collected");
let counter = 0;
let totalTrashCounter = 0;

const currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const trashFormatter = new Intl.NumberFormat("en-us", {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false,
});

const MAX_MONEY_RAISED = 50000000;

async function setupTrash() {
  const amountRaised = await fetch("https://tscache.com/donation_total.json")
    .then((res) => res.json())
    .then((data) => data.count);

  moneyElement.innerText = currencyFormatter.format(amountRaised);

  const amountLeftToRaise = Math.max(MAX_MONEY_RAISED - amountRaised, 0);
  const stringifiedAmount = trashFormatter.format(amountLeftToRaise);
  const trashAmount = {
    xxl: {
      amount: `${stringifiedAmount[0]}${stringifiedAmount[1]}`,
      icon: "bag",
    },
    xl: {
      amount: parseInt(`${stringifiedAmount[2]}`),
      icon: "takeout",
    },
    l: {
      amount: parseInt(`${stringifiedAmount[3]}`),
      icon: "headphones",
    },
    m: {
      amount: parseInt(`${stringifiedAmount[4]}`),
      icon: "phone",
    },
    s: {
      amount: parseInt(`${stringifiedAmount[5]}`),
      icon: "toy-car",
    },
    xs: {
      amount: parseInt(`${stringifiedAmount[6]}`),
      icon: "bottle",
    },
  };

  Object.values(trashAmount).forEach(({ amount, icon }) => {
    for (let i = 0; i < amount; i++) {
      createTrash(amount, icon);
      totalTrashCounter += 1;
    }
  });
  console.log(`Total Amount of Trash: ${totalTrashCounter}`);
}

function createTrash(amount, icon) {
  const img = document.createElement("img");
  img.classList.add("trash");
  img.setAttribute("draggable", true);
  const top = randomNumberBetween(0, 40);
  const size = top / 5 + 1;
  img.src = `imgs/${icon}.svg`;
  img.style.width = `${size}vmin`;
  img.style.height = `${size}vmin`;
  img.style.top = `${top}vh`;
  img.style.left = `${randomNumberBetween(0, 100)}vw`;
  img.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`);
  trashContainer.appendChild(img);

  img.addEventListener("click", (event) => {
    if (event.button === 0) {
      counter += 1;
      trashCollected.innerHTML = `Trash Collected: ${counter}`;
      img.remove();
      if (document.querySelectorAll("img").length === 0) {
        trashCollected.innerHTML = `Congratulations!\nThere is no trash.`;
        trashCollected.classList.add("fadeOut");
        trashCollected.style.opacity = 0;
      }
    }
  });
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

window.addEventListener("load", function () {
  on();
});

setupTrash();
