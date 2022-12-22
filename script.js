async function getQuote() {
  const response = await fetch(
    "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
  );
  const data = await response.json();
  return data;
}

const quoteElement = document.getElementById("quote");

async function displayQuote() {
  const quote = await getQuote();
  quoteElement.innerText = `"${quote.quoteText}" - ${quote.quoteAuthor}`;
}

displayQuote();
