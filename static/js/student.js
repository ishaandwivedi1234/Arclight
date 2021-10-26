function showHideSidebar() {
  var sideBar = document.getElementById("side__menu");
  if (sideBar.style.display === "none") {
    sideBar.style.display = "block";
  } else {
    sideBar.style.display = "none";
  }
}

function initializeBody() {
  // set question's row col value
  setRowColValue();
  initQuestions();
  setTimer();

  var sideBar = document.getElementById("side__menu");
  if (sideBar.style.display === "none") {
    sideBar.style.display = "block";
  } else {
    sideBar.style.display = "none";
  }
}

// timer logic
function setTimer() {
  eel.setTimer()(function (ret) {
    month = ret[0];
    day = ret[1];
    year = ret[2];
    time = ret[3];

    var countDownDate = new Date(`${month} ${day},${year} ${time}`).getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("timer").innerHTML =
        hours + "h " + minutes + "m " + seconds + "s ";
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "TIME IS UP";
      }
    }, 1000);
  });
}

function setRowColValue() {
  eel.clientResponse();
  eel.setRowCol()(function (ret) {
    col = ret[0];
    row = ret[1];
    number_of_question = ret[2];
    let dones = ret[3];
    let revisit = ret[4];

    console.log(dones);
    console.log(number_of_question);

    let question = 1;
    let i = 1;
    while (question <= number_of_question && row > 0) {
      var newRow = document.createElement("div");
      // newRow.className = 'row';
      var question_cols = document.getElementById("question_cols");
      for (i = 1; i <= col && question <= number_of_question; i++) {
        var div = document.createElement("a");
        div.innerHTML = question;
        div.href =
          "/templates/student_dashboard.html" + "?question=" + question;
        // div.onclick = "changeQuestion(question)";
        // div.addEventListener("click", questionHandler.bind(question), false);
        if (dones.includes(question)) div.className = "question__block__done";
        else if (revisit.includes(question))
          div.className = "question__block__revisit";
        else div.className = "question__block__pending";

        newRow.appendChild(div);
        question += 1;
      }

      question_cols.appendChild(newRow);
      row -= 1;
    }
  });
}

function initQuestions() {
  eel.initQuestions()(function (ret) {
    questions = ret[0];
    question_number = getQuestionNumber();
    var questionText = document.getElementById("question_text");
    questionText.innerHTML = questions[question_number];

    var question_head = document.getElementById("question__number");
    question_head.innerHTML = "Question " + parseInt(question_number + 1);
    answers = ret[2];
    var answerText = document.getElementById("answer_text");
    answerText.value = answers[question_number];
  });
}

function saveAnswers() {
  console.log("saving answer");
  question_number = getQuestionNumber();
  var ans = document.getElementById("answer_text").value;
  console.log(ans);
  eel.saveAnswers(question_number, ans);
}

function getQuestionNumber() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question_number = urlParams.get("question") - 1;
  if (question_number == undefined) question_number = 0;
  return question_number;
}

function openCalculator() {
  var drawerTab = document.getElementById("drawer_tab_calc");
  var drawerTabInstructions = document.getElementById(
    "drawer_tab_instructions"
  );
  var drawerTabChat = document.getElementById("drawer_tab_chat");
  drawerTabChat.style.display = "none";
  drawerTabInstructions.style.display = "none";

  if (drawerTab.style.display == "none") drawerTab.style.display = "block";
  else drawerTab.style.display = "none";
}
function openChat() {
  var drawerTabCalc = document.getElementById("drawer_tab_calc");
  var drawerTabInstructions = document.getElementById(
    "drawer_tab_instructions"
  );

  drawerTabCalc.style.display = "none";
  drawerTabInstructions.style.display = "none";
  var drawerTab = document.getElementById("drawer_tab_chat");
  if (drawerTab.style.display == "none") drawerTab.style.display = "block";
  else drawerTab.style.display = "none";
}
function openInstructions() {
  var drawerTabChat = document.getElementById("drawer_tab_chat");
  var drawerTabCalc = document.getElementById("drawer_tab_calc");
  drawerTabChat.style.display = "none";
  drawerTabCalc.style.display = "none";
  var drawerTab = document.getElementById("drawer_tab_instructions");
  if (drawerTab.style.display == "none") drawerTab.style.display = "block";
  else drawerTab.style.display = "none";
}

// calculator functionality
