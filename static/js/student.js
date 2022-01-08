function showHideSidebar() {
  var sideBar = document.getElementById("side__menu");
  if (sideBar.style.display === "none") {
    sideBar.style.display = "block";
  } else {
    sideBar.style.display = "none";
  }
}

function initializeBody() {
  initQuestions();
  // setRowColValue();

  // setTimer();
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
  eel.getQuestionPannelInfo()(function (ret) {
    col = ret["max_com"];
    row = ret["max_row"];
    number_of_question = ret["no_of_questions"];
    let dones = ret["list_of_done"];
    let revisit = ret["revisit"];

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
        if (question === getQuestionNumber()) {
          if (dones.includes(question))
            div.className = "question__active__block__done";
          else if (revisit.includes(question))
            div.className = "question__active__block__revisit";
          else div.className = "question__active__block__pending";
        } else {
          if (dones.includes(question)) div.className = "question__block__done";
          else if (revisit.includes(question))
            div.className = "question__block__revisit";
          else div.className = "question__block__pending";
        }

        div.id = "question_" + question;
        newRow.appendChild(div);
        question += 1;
      }

      question_cols.appendChild(newRow);
      row -= 1;
    }
  });
}

function initQuestions() {
  console.log("initing question again");
  eel.getExamQuestions()(function (ret) {
    eel.getMcqResponse()(function (response) {
      console.log(response);

      questions = ret["questions"];
      revisit = ret[3];
      mcq_answers = ret[2];

      question_number = getQuestionNumber();
      console.log(question_number);

      var thisQuestion;

      questions.forEach(function (question) {
        if (parseInt(question["question_no"]) === question_number) {
          thisQuestion = question;
        }
      });

      console.log(thisQuestion);
      var questionText = document.getElementById("question_text");
      questionText.innerHTML = thisQuestion["question_text"];

      var question_head = document.getElementById("question__number");
      question_head.innerHTML = "Question " + parseInt(question_number);
      // option_1 is class for span containing option text

      var option1 = document.getElementsByClassName("option_1")[0];
      var option2 = document.getElementsByClassName("option_2")[0];
      var option3 = document.getElementsByClassName("option_3")[0];
      var option4 = document.getElementsByClassName("option_4")[0];

      response.forEach(function (ans) {
        if (parseInt(ans["question_no"]) === question_number) {
          let option = ans["chosen_option"];
          document.getElementById("option-" + option).checked = true;
        }
      });

      option1.innerHTML = thisQuestion["option1"];
      option2.innerHTML = thisQuestion["option2"];
      option3.innerHTML = thisQuestion["option3"];
      option4.innerHTML = thisQuestion["option4"];

      option1.id = "option_1_" + question_number;
      option2.id = "option_2_" + question_number;
      option3.id = "option_3_" + question_number;
      option4.id = "option_4_" + question_number;

      var revisit_head = document.getElementById("revisit");
      if (revisit.includes(question_number)) {
        revisit_head.innerHTML = "Unmark Revisit";
        revisit_head.addEventListener("click", unRevisit);
      } else {
        revisit_head.innerHTML = "Revisit";
        revisit_head.addEventListener("click", setRevisit);
      }
    });

    //set saved answers
  });
}

function saveAnswers() {
  console.log("saving answer");
  question_number = getQuestionNumber();
  var ans = document.getElementById("answer_text").value;
  console.log(ans);
  eel.saveAnswers(question_number, ans);
}

function setRevisit() {
  console.log("revisit");
  question_number = getQuestionNumber() + 1;
  document.getElementById("question_" + question_number).className =
    "question__block__revisit";
  var revisit_head = document.getElementById("revisit");

  revisit_head.innerHTML = "Unmark Revisit";
  revisit_head.addEventListener("click", setRevisit);

  eel.setRevisit(question_number);
  location.reload();
}
function unRevisit() {
  question_number = getQuestionNumber();

  eel.getDoneList()(function (doneList) {
    console.log("unrevisit");
    if (doneList.includes(question_number)) {
      document.getElementById("question_" + question_number).className =
        "question__block__done";
    } else document.getElementById("question_" + question_number).className = "question__block__pending";

    var revisit_head = document.getElementById("revisit");
    if (revisit.includes(question_number + 1))
      revisit_head.innerHTML = "Revisit";
    revisit_head.onclick = "setRevisit()";
    location.reload();
  });

  eel.setUnRevisit(question_number);
  location.reload();
}
function setOption() {
  eel.initMcqOptions(function (res) {
    var options = res;
    options.forEach((element) => {});
  });
}

function getQuestionNumber() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question_number = urlParams.get("question") - 0;

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

function nextQuestion() {
  console.log("next");
  eel.getQuestionList()(function (questions) {
    currenQuestion = getQuestionNumber();
    saveQuestion(currenQuestion);

    next = currenQuestion + 1;
    if (next <= questions.length && next >= 1) {
      let url = "/templates/student_dashboard.html" + "?question=" + next;
      console.log(url);
      location.replace(url);
    } else alert("you have visited end !");
  });
}

function saveQuestion(question_no) {
  let option1 = document.getElementById("option-1");
  let option2 = document.getElementById("option-2");
  let option3 = document.getElementById("option-3");
  let option4 = document.getElementById("option-4");

  let option_text1 = document.getElementById("option_1_" + question_no);
  let option_text2 = document.getElementById("option_2_" + question_no);
  let option_text3 = document.getElementById("option_3_" + question_no);
  let option_text4 = document.getElementById("option_4_" + question_no);

  var ans = null;
  if (option1.checked) {
    ans = {
      question_no: question_no,
      option: 1,
      value: option_text1.innerHTML,
    };
  } else if (option2.checked) {
    ans = {
      question_no: question_no,
      option: 2,
      value: option_text2.innerHTML,
    };
  } else if (option3.checked) {
    ans = {
      question_no: question_no,
      option: 3,
      value: option_text3.innerHTML,
    };
  } else if (option4.checked) {
    ans = {
      question_no: question_no,
      option: 4,
      value: option_text4.innerHTML,
    };
  }

  if (ans !== null) {
    eel.saveMcqResponse(ans);
  }
}
