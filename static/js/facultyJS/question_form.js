console.log("loaded");


/* 
  For Navigating between questions type(mcq, sub)___________________________
*/
function openForm(quesType) {
  console.log(quesType)
  var mcqTabButton = document.getElementById("mcq-tab-button");
  var subTabButton = document.getElementById("sub-tab-button");
  var mcqForm = document.getElementById("mcq-form");
  var subForm = document.getElementById("subjective-form");

  if(quesType === 'mcq-form'){   
    mcqTabButton.style.background = "#2c2f33";
    subTabButton.style.background = "#23272a";
    subForm.style.display = "none"
    mcqForm.style.display = "block";
    
  } else if(quesType === 'subjective-form'){
    subTabButton.style.background = "#2c2f33";
    mcqTabButton.style.background = "#23272a";
    subForm.style.display = "block"
    mcqForm.style.display = "none";
  }
}
/* 
  For Navigating between questions type(mcq, sub)___________________________
*/


/*
  For adding mcq question__________________________________________________
*/
function addQuestion() {
  var exam_id = getExamId();
  var question_text = document.getElementById("question").value;
  var option1 = document.getElementById("option1").value;
  var option2 = document.getElementById("option2").value;
  var option3 = document.getElementById("option3").value;
  var option4 = document.getElementById("option4").value;
  var correct_option;
  var selectOption1 = document.getElementById("op1");
  var selectOption2 = document.getElementById("op2");
  var selectOption3 = document.getElementById("op3");
  var selectOption4 = document.getElementById("op4");

  if (question_text.length === 0) {
    showError("Please provide question to continue");
    return;
  } else if (option1.length === 0) {
    showError("Question must contain all options. Enter option 1 to contunue");
    return;
  } else if (option2.length === 0) {
    showError("Question must contain all options. Enter option 2 to contunue");
    return;
  } else if (option3.length === 0) {
    showError("Question must contain all options. Enter option 3 to contunue");
    return;
  } else if (option4.length === 0) {
    showError("Question must contain all options. Enter option 4 to contunue");
    return;
  }

  /*~~~~~~~~~~*/

  if (selectOption1.selected) {
    correct_option = "1";
  } else if (selectOption2.selected) {
    correct_option = "2";
  } else if (selectOption3.selected) {
    correct_option = "3";
  } else if (selectOption4.selected) {
    correct_option = "4";
  } else {
    //notify
    showError("Please select a correct option");
    return;
  }

  question_info = {
    question_text: question_text,
    option1: option1,
    option2: option2,
    option3: option3,
    option4: option4,
    correct_option: correct_option,
  };
  console.log(question_info);
  var addBtn = document.getElementById("addQuestion");
  addBtn.style.display = "none";
  var loader = document.getElementById("loader");
  loader.style.display = "block";

  eel.addNewQuestion(
    exam_id,
    question_info
  )(function (response) {
    var success = response["success"];
    var msg = response["msg"];
    if (success == true) {
      document.getElementById("question").value = "";
      document.getElementById("option1").value = "";
      document.getElementById("option2").value = "";
      document.getElementById("option3").value = "";
      document.getElementById("option4").value = "";
      document.getElementById("push_nort").style.display = "block";
      document.getElementById("nort_text").innerHTML =
        msg + ". You can now add another question on this page only";
    } else {
      document.getElementById("push_nort").style.display = "block";
      document.getElementById("nort_text").innerHTML = msg;
    }
    loader.style.display = "none";
    addBtn.style.display = "block";
  });
}
/*
  For adding mcq question__________________________________________________
*/

/*
  For adding subjective question__________________________________________________
*/
function addSubjectiveQuestion() {
  var exam_id = getExamId();
  var subjective_question_text = document.getElementById("subjective-question").value;
  var sample_answer_text = document.getElementById("sample-answer").value;
  
  if (subjective_question_text.length === 0) {
    showError("Please provide question to continue");
    return;
  } else if (sample_answer_text.length === 0) {
    showError("Please provide a sample answer");
    return;
  }

  question_info = {
    subjective_question_text: subjective_question_text,
    sample_answer_text: sample_answer_text,
  };
  console.log(question_info);
  var addBtn = document.getElementById("addSubjectiveQuestion");
  addBtn.style.display = "none";
  var loader = document.getElementById("loader");
  loader.style.display = "block";

  eel.addNewSubQuestion(
    exam_id,
    question_info
  )(function (response) {
    var success = response["success"];
    var msg = response["msg"];
    if (success == true) {
      document.getElementById("subjective-question").value = "";
      document.getElementById("sample-answer").value = "";
      document.getElementById("push_nort").style.display = "block";
      document.getElementById("nort_text").innerHTML =
        msg + ". You can now add another question on this page only";
    } else {
      document.getElementById("push_nort").style.display = "block";
      document.getElementById("nort_text").innerHTML = msg;
    }
    loader.style.display = "none";
    addBtn.style.display = "block";
  });
}
/*
  For adding subjective question__________________________________________________
*/




function getExamId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const exam_id = urlParams.get("exam_id");

  if (exam_id == undefined) exam_id = 0;
  return exam_id;
}

function closeNort() {
  var push_nort = document.getElementsByClassName("push_bg")[0];
  push_nort.style.display = "none";
}

function showError(msg) {
  var push_nort = document.getElementsByClassName("push_bg")[0];
  push_nort.style.display = "block";
  var nort_text = document.getElementById("nort_text");
  nort_text.innerHTML = msg;
}

function back() {
  history.back();
}
