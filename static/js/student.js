/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/*----------------------------|Initializing html body with dynamic data|--------------------------------------------------------*/
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function initializeBody() {
  initQuestions();
  // setTimer();
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//----------------------------|Setting questions,options & qustion pannel |----------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function initQuestions() {
  //get exam question from backend service

  eel.getExamQuestions()(function (ret) {
    // fetch student's response that is already saved

    eel.getMcqResponse()(function (response) {
      // console.log(response);

      /* 👉🏻 QUESTION PANNEL SETTINGS STARTS HERE 👈🏻 */

      number_of_question = ret["no_of_questions"];
      let savedMcqResponse = response["mcqResponse"];
      let revisit = response["revisited"];
      let list_of_done = response["list_of_done"];
      console.log(list_of_done);
      let col = response["max_col"];
      let row = response["max_rows"];
      let dones = list_of_done;
      let question = 1;
      let i = 1;

      while (question <= number_of_question && row > 0) {
        // console.log("initiating question pannel");

        var newRow = document.createElement("div");

        var question_cols = document.getElementById("question_cols");

        for (i = 1; i <= col && question <= number_of_question; i++) {
          var div = document.createElement("a");
          div.innerHTML = question;
          div.href =
            "/templates/student_dashboard.html" + "?question=" + question;

          /* 🔵 QUESTION PANNEL COLOR SETTING CLASSES 🔵 */

          if (question === getQuestionNumber()) {
            if (dones.includes(question))
              div.className = "question__active__block__done";
            else if (revisit.includes(question))
              div.className = "question__active__block__revisit";
            else div.className = "question__active__block__pending";
          } else {
            if (dones.includes(question.toString()))
              div.className = "question__block__done";
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

      // setting questions

      questions = ret["questions"];

      question_number = getQuestionNumber();
      console.log(question_number);

      var thisQuestion;

      questions.forEach(function (question) {
        if (parseInt(question["question_no"]) === question_number) {
          thisQuestion = question;
        }
      });

      // console.log(thisQuestion);

      /* 🔵 SETTING QUESTION TEXT ON QUESTION SECTION  🔵 */

      var questionText = document.getElementById("question_text");
      questionText.innerHTML = thisQuestion["question_text"];

      /* 🔵 SETTING QUESTION NUMBER ON QUESTION SECTION'S HEAD 🔵 */

      var question_head = document.getElementById("question__number");
      question_head.innerHTML = "Question " + parseInt(question_number);

      /* 🔵 SETTING OPTIONS AND OPTIONS IDs DYNAMICALLY 🔵 */

      var option1 = document.getElementsByClassName("option_1")[0];
      var option2 = document.getElementsByClassName("option_2")[0];
      var option3 = document.getElementsByClassName("option_3")[0];
      var option4 = document.getElementsByClassName("option_4")[0];

      /* 🔵 MARKING ALREADY SAVED RESPONSE OPTION CHECKED 🔵 */

      savedMcqResponse.forEach(function (ans) {
        if (parseInt(ans["question_no"]) === question_number) {
          let option = ans["chosen_option"];
          document.getElementById("option-" + option).checked = true;
        }
      });

      /* 👉🏻 REVISIT ITEM SETTING STARTS HERE 👈🏻 */

      option1.innerHTML = thisQuestion["option1"];
      option2.innerHTML = thisQuestion["option2"];
      option3.innerHTML = thisQuestion["option3"];
      option4.innerHTML = thisQuestion["option4"];

      option1.id = "option_1_" + question_number;
      option2.id = "option_2_" + question_number;
      option3.id = "option_3_" + question_number;
      option4.id = "option_4_" + question_number;

      /* 🔵 SETTING REVISIT AND DONE COLOR CSS CLASSES  🔵 */

      var revisit_head = document.getElementById("revisit");
      if (revisit.includes(question_number)) {
        revisit_head.innerHTML = "Unmark Revisit";
        revisit_head.addEventListener("click", unRevisit);
      } else {
        revisit_head.innerHTML = "Revisit";
        revisit_head.addEventListener("click", setRevisit);
      }

      /* 🔵 HIDING SAVE AND NEXT BUTTON FOR LAST QUESTION 🔵 */

      if (parseInt(number_of_question) === parseInt(question_number)) {
        document.getElementById("next").style.display = "none";
        document.getElementById("finish").style.display = "block";
      }
    });

    //set saved answers
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------| Saving answers that are saved by save btn |----------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function saveAnswers() {
  console.log("saving answer");
  question_number = getQuestionNumber();
  var ans = document.getElementById("answer_text").value;
  console.log(ans);
  eel.saveAnswers(parseInt(question_number), ans);
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------| Setting question as revisit onclick of revisite btn |----------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function setRevisit() {
  console.log("revisit");
  var question_number = getQuestionNumber();
  document.getElementById("question_" + question_number).className =
    "question__block__revisit";
  var revisit_head = document.getElementById("revisit");

  revisit_head.innerHTML = "Unmark Revisit";
  revisit_head.addEventListener("click", unRevisit);

  eel.setRevisit(question_number);
  location.reload();
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------| Unsetting question as revisit on click of unrevisit btn |---------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function unRevisit() {
  var question_number = getQuestionNumber();

  eel.getDoneList()(function (doneList) {
    console.log("unrevisit");
    if (doneList.includes(question_number)) {
      document.getElementById("question_" + question_number).className =
        "question__block__done";
    } else document.getElementById("question_" + question_number).className = "question__block__pending";

    var revisit_head = document.getElementById("revisit");
    if (revisit.includes(question_number + 1))
      revisit_head.innerHTML = "Revisit";

    revisit_head.addEventListener("click", setRevisit);

    location.reload();
  });

  eel.unSetRevisit(question_number);
  location.reload();
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------|🔥  UTILITY FUNCTIONS - HANDLE WITH CARE 🔥  |----------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------|🔥  get question number from url string parameters 🔥 |-------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function getQuestionNumber() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const question_number = urlParams.get("question") - 0;

  if (question_number == undefined) question_number = 0;
  return question_number;
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------|⏰ Timer settings and initialization ⏰ |--------------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------|✖️  Calculator settings   ➕ |--------------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------|💬 open chat section - FOR FUTURE USE 💬 |--------------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/
//----------------------------|⏰ Timer settings and initialization ⏰ |--------------------------------------------------------//
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
  eel.getNoOfQuestions()(function (no_of_questions) {
    currenQuestion = getQuestionNumber();
    saveResponse(currenQuestion);

    next = currenQuestion + 1;

    if (next <= parseInt(no_of_questions) && next >= 1) {
      let url = "/templates/student_dashboard.html" + "?question=" + next;
      console.log(url);
      location.replace(url);
    } else {
      document.getElementById("next").style.display = "none";
      // diable next button and show finish test button
    }
  });
}

function saveResponse(question_no) {
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
    console.log("sending response : ");
    console.log(ans);

    eel.saveMcqResponse(question_no, ans["option"]);
  }
}

// function setRowColValue() {
//   eel.clientResponse();
//   eel.getQuestionPannelInfo()(function (ret) {
//     col = ret["max_com"];
//     row = ret["max_row"];
//     number_of_question = ret["no_of_questions"];
//     let dones = ret["list_of_done"];
//     let revisit = ret["revisit"];

//     console.log(dones);
//     console.log(number_of_question);

//     let question = 1;
//     let i = 1;
//     while (question <= number_of_question && row > 0) {
//       var newRow = document.createElement("div");
//       // newRow.className = 'row';
//       var question_cols = document.getElementById("question_cols");
//       for (i = 1; i <= col && question <= number_of_question; i++) {
//         var div = document.createElement("a");
//         div.innerHTML = question;
//         div.href =
//           "/templates/student_dashboard.html" + "?question=" + question;
//         // div.onclick = "changeQuestion(question)";
//         // div.addEventListener("click", questionHandler.bind(question), false);
//         if (question === getQuestionNumber()) {
//           if (dones.includes(question))
//             div.className = "question__active__block__done";
//           else if (revisit.includes(question))
//             div.className = "question__active__block__revisit";
//           else div.className = "question__active__block__pending";
//         } else {
//           if (dones.includes(question)) div.className = "question__block__done";
//           else if (revisit.includes(question))
//             div.className = "question__block__revisit";
//           else div.className = "question__block__pending";
//         }

//         div.id = "question_" + question;
//         newRow.appendChild(div);
//         question += 1;
//       }

//       question_cols.appendChild(newRow);
//       row -= 1;
//     }
//   });
// }
