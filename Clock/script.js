const time = document.querySelector(".hours");
const secHand = document.querySelector(".second");
const minHand = document.querySelector(".minute");
const hourHand = document.querySelector(".hour");

// 12 hour format
// for (let i = 1; i <= 60; i++) {
//   if (i % 5 == 0) {
//     time.innerHTML += "<div class='hour-number'><div>" + i / 5 + "</div></div>";
//     let hours = document.getElementsByClassName("hour-number");
//     hours[hours.length - 1].style.transform = `translateX(-50%) rotate(${
//       i * 6
//     }deg)`;
//     hours[hours.length - 1].firstChild.style.transform = `rotate(${i * -6}deg)`;
//   } else {
//     time.innerHTML += "<div class='minute-bar'></div>";
//     let bars = document.getElementsByClassName("minute-bar");
//     bars[bars.length - 1].style.transform = `translateX(-50%) rotate(${
//       i * 6
//     }deg)`;
//   }
// }

// 24 hour format
for (let i = 1; i <= 48; i++) {
  if (i % 2 == 0) {
    time.innerHTML += "<div class='hour-number'><div>" + i / 2 + "</div></div>";
    let hours = document.getElementsByClassName("hour-number");
    hours[hours.length - 1].style.transform = `translateX(-50%) rotate(${
      i * 7.5
    }deg)`;
    hours[hours.length - 1].firstChild.style.transform = `rotate(${
      i * -7.5
    }deg)`;
  } else {
    time.innerHTML += "<div class='minute-bar'></div>";
    let bars = document.getElementsByClassName("minute-bar");
    bars[bars.length - 1].style.transform = `translateX(-50%) rotate(${
      i * 7.5
    }deg)`;
  }
}

function startClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  let secDeg = seconds * (360 / 60) + minutes * 360;
  let minDeg = minutes * (360 / 60) + seconds / 12;
  let hourDeg = hours * (360 / 24) + (minutes / 24) * (360 / 60);
  secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
  minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}
setInterval(startClock, 1000);
startClock();
