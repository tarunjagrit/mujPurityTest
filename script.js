const questionsContainer =
  document.getElementById("questions");


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


// Calculate Score

const submitBtn =
  document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {

  const checkedBoxes =
    document.querySelectorAll(
      "input[type='checkbox']:checked"
    );

  let score =
    Math.max(0, 50 - checkedBoxes.length);

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

  document.getElementById("result").innerHTML = `
    <h2>Your Score: ${score}/50</h2>
    <h3>${title}</h3>
    <p>${message}</p>

    <div class="score-bar">
      <div
        class="score-fill"
        style="width:${(score / 50) * 100}%">
      </div>
    </div>

    <button id="shareBtn">
      Share My Score
    </button>

    <button id="restartBtn">
      Retake Test
    </button>
  `;

  document.getElementById("result")
    .scrollIntoView({
      behavior: "smooth"
    });

});


// Share Score

document.addEventListener("click", async (e) => {

  if(e.target.id === "shareBtn"){

    const scoreText =
      document.querySelector("#result h2")
      .innerText;

    const text =
`${scoreText} on the MUJ Purity Test 😭

Try it here:
${window.location.href}`;

    if(navigator.share){

      navigator.share({
        title: "MUJ Purity Test",
        text: text,
        url: window.location.href
      });

    }
    else{

      navigator.clipboard.writeText(text);

      alert("Score copied to clipboard!");

    }

  }

});


// Restart Test

document.addEventListener("click", (e) => {

  if(e.target.id === "restartBtn"){

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
