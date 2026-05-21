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

async function updateVisitorCount() {

  const visitorCount = document.getElementById("visitorCount");

  try {

    const isLiveSite =
      window.location.hostname === "tarunjagrit.github.io";

    const alreadyCounted =
      localStorage.getItem(VISITOR_KEY);

    if (isLiveSite && !alreadyCounted) {

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

    if (visitorCount) {
      visitorCount.innerText =
        data.value ?? data.count ?? "0";
    }

  }
  catch(error){

    if (visitorCount) {
      visitorCount.innerText =
        "Unavailable";
    }

    console.error(error);

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

});


// Score Helpers

function getScoreDetails(score){

  let title = "";
  let message = "";

  if(score >= 45){
    title = "Pure Soul 😇";
    message = "You still have innocence left.";
  }
  else if(score >= 35){
    title = "Innocent-ish 🙂";
    message = "A little chaotic, but manageable.";
  }
  else if(score >= 25){
    title = "MUJ Survivor 💀";
    message = "You’ve definitely lived some stories.";
  }
  else if(score >= 15){
    title = "Certified Menace 😭";
    message = "Your friends probably fear you.";
  }
  else if(score >= 5){
    title = "Campus Legend 🔥";
    message = "You are part of MUJ history.";
  }
  else{
    title = "Threat to Society ☠️";
    message = "There is no saving you anymore.";
  }

  return {
    title: title,
    message: message
  };

}

function getScoreLink(score){

  return `${SITE_URL}?score=${score}`;

}

function showResult(score, fromSharedLink = false){

  const details =
    getScoreDetails(score);

  latestScore = score;
  latestTitle = details.title;
  latestMessage = details.message;

  document.getElementById("result").innerHTML = `
    <h2>${fromSharedLink ? "Score Card" : "Your Score"}: ${score}/50</h2>
    <h3>${latestTitle}</h3>
    <p>${latestMessage}</p>

    <div class="score-bar">
      <div
        class="score-fill"
        style="width:${(score / 50) * 100}%">
      </div>
    </div>

    <button id="shareBtn">
      Share My Score Card
    </button>

    <button id="shareTestBtn">
      Share The Test
    </button>

    <button id="restartBtn">
      ${fromSharedLink ? "Take Test" : "Retake Test"}
    </button>
  `;

  document.getElementById("result")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// Calculate Score

const submitBtn =
  document.getElementById("submitBtn");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {

    const checkedBoxes =
      document.querySelectorAll(
        "input[type='checkbox']:checked"
      );

    let score =
      Math.max(0, 50 - checkedBoxes.length);

    showResult(score);

  });
}


// Share Score Link

document.addEventListener("click", async (e) => {

  if(e.target.id === "shareBtn"){

    const shareUrl =
      getScoreLink(latestScore);

    const text =
`${latestScore}/50 on the MUJ Purity Test 😭

Try it here:
${shareUrl}`;

    if(navigator.share){

      await navigator.share({
        title: "MUJ Purity Test",
        text: text,
        url: shareUrl
      });

    }
    else{

      navigator.clipboard.writeText(text);

      alert("Score card link copied!");

    }

  }

});



// Share Test

document.addEventListener("click", async (e) => {

  if(e.target.id === "shareTestBtn"){

    const text =
`Think you are innocent? 😭

Take the MUJ Purity Test:
${SITE_URL}`;

    if(navigator.share){

      await navigator.share({
        title: "MUJ Purity Test",
        text: text
      });

    }
    else{

      await navigator.clipboard.writeText(SITE_URL);

      e.target.innerText =
        "Test Link Copied!";

      setTimeout(() => {

        e.target.innerText =
          "Share Test";

      }, 1500);

    }

  }

});


// Restart Test

document.addEventListener("click", (e) => {

  if(e.target.id === "restartBtn"){

    if(window.location.search){
      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );
    }

    document
      .querySelectorAll(
        "input[type='checkbox']"
      )
      .forEach(box => {
        box.checked = false;
      });

    document
      .querySelectorAll(".question")
      .forEach(question => {
        question.classList.remove("selected");
      });

    document.getElementById("result")
      .innerHTML = "";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

});


// Open Shared Score Card Link

const scoreParam =
  new URLSearchParams(window.location.search)
    .get("score");

const sharedScore =
  scoreParam === null
    ? NaN
    : Number(scoreParam);

if(Number.isInteger(sharedScore) &&
  sharedScore >= 0 &&
  sharedScore <= 50){

  showResult(sharedScore, true);

}
