const questionsContainer =
  document.getElementById("questions");

const SITE_URL =
  "https://tarunjagrit.github.io/mujPurityTest/";

const VISITOR_API =
  "https://api.counterapi.dev/v1/muj-purity-test/visitors/";

const VISITOR_KEY =
  "mujPurityTestVisitorCounted";

let latestScore = 50;
let latestTitle = "";
let latestMessage = "";


// Visitor Count

async function updateVisitorCount(){

  try{

    const visitorCount =
      document.getElementById("visitorCount");

    const isLiveSite =
      window.location.hostname === "tarunjagrit.github.io";

    const alreadyCounted =
      localStorage.getItem(VISITOR_KEY);

    if(isLiveSite && !alreadyCounted){

      await fetch(`${VISITOR_API}up`, {
        mode: "no-cors",
        cache: "no-store"
      });

      localStorage.setItem(VISITOR_KEY, "true");

    }

    const response =
      await fetch(`${VISITOR_API}?t=${Date.now()}`, {
        cache: "no-store"
      });

    const data =
      await response.json();

    visitorCount.innerText =
      data.value ?? data.count ?? "0";

  }
  catch(error){

    visitorCount.innerText =
      "Unavailable";

  }

}

updateVisitorCount();


// Render Questions

questions.forEach((question, index) => {

  const div = document.createElement("div");

  div.classList.add("question");

  div.innerHTML = `
    <label>
      <input type="checkbox" value="${index}">
      <span>${index + 1}. ${question}</span>
    </label>
  `;

  questionsContainer.appendChild(div);

});


// Highlight Selected Questions

document.addEventListener("change", (e) => {

  if(e.target.type === "checkbox"){

    const questionBox =
      e.target.closest(".question");

    if(e.target.checked){
      questionBox.classList.add("selected");
    }
    else{
