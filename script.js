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

  const visitorCount =
    document.getElementById("visitorCount");

  const isLiveSite =
    window.location.hostname === "tarunjagrit.github.io";

  const alreadyCounted =
    localStorage.getItem(VISITOR_KEY);

  const apiUrl =
    isLiveSite && !alreadyCounted
      ? `${VISITOR_API}up`
      : VISITOR_API;

  try{

    const response =
      await fetch(apiUrl);

    const data =
      await response.json();

    if(isLiveSite && !alreadyCounted){
      localStorage.setItem(VISITOR_KEY, "true");
    }

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
      questionBox.classList.remove("selected");
    }

  }
