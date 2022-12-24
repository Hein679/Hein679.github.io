async function getQuote() {
  const response = await fetch(
    "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
    // https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en (This API generating CORS error)
  );
  const data = await response.json();
  console.log(data);
  return data;
}

const quoteElement = document.getElementById("quote");

async function displayQuote() {
  const quote = await getQuote();
  quoteElement.innerText = `"${quote.q}" - ${quote.a}`;
}

displayQuote();
