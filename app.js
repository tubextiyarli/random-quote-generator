const quoteText = document.querySelector(".quote");
const authorText = document.querySelector(".author");
const button = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

async function getQuote() {
  try {
    quoteText.textContent = "";
    authorText.textContent = "";
    button.disabled = true;
    loader.style.display = "inline-block";

    const response = await fetch("https://dummyjson.com/quotes/random");

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    quoteText.style.opacity = 0;
    setTimeout(() => {
      quoteText.textContent = data.quote;
      quoteText.style.opacity = 1;
    }, 300);

    authorText.style.opacity = 0;
    setTimeout(() => {
      authorText.textContent = "-" + data.author;
      authorText.style.opacity = 1;
    }, 300);

    loader.style.display = "none";

    navigator.clipboard.writeText(quoteText.textContent);
    


    button.disabled = false;

  } catch (error) {
    quoteText.textContent = "Error! Please try again";
    authorText.textContent = "";
    button.disabled = false;
    console.error(error);
  }
}

button.addEventListener("click", getQuote);
getQuote();

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getQuote();
  }
});