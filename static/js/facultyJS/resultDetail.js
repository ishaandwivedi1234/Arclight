function initializeResultBody() {
  getStudentResponse();
  getExamResultInfo();
}

function getStudentResponse() {
  var exam_id = getExamId();

  eel.getAllStudentResult(exam_id)(function (results) {
    var thisResult = undefined;

    results.forEach(function (result) {
      if (result["student_id"] === getStudentId()) {
        thisResult = result;
      }
    });
    console.log(thisResult);
    if (thisResult !== undefined) {
      var student_name = document.getElementById("student_name");
      var student_en = document.getElementById("en_no");
      student_en.value = thisResult["en_no"];
      student_name.value = thisResult["student_name"];
      var question_col = document.getElementById("question_col_result");

      thisResult["question_response"].forEach(function (
        element,
        question_index
      ) {
        var question_div = buildAllQuestionResponse(
          question_index + 1,
          element["question_text"],
          element["option1"],
          element["option2"],
          element["option3"],
          element["option4"],
          element["correct_option"].toString(),
          element["question_id"],
          element["chosen_option"],
          element["is_correct"]
        );
        question_col.appendChild(question_div);
        console.log(question_col);
      });

      //
    }
  });
}

function getStudentId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const exam_id = urlParams.get("student_id");

  if (exam_id == undefined) exam_id = 0;
  return exam_id;
}
function getExamId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const exam_id = urlParams.get("exam_id");

  if (exam_id == undefined) exam_id = 0;
  return exam_id;
}

function buildAllQuestionResponse(
  question_number,
  question_pText,
  option1Text,
  option2Text,
  option3Text,
  option4Text,
  correct_opt,
  question_id,
  chosen_option,
  is_correct
) {
  //    <div class="card-question">

  console.log(chosen_option, is_correct);
  console.log("question id is" + question_id);
  var card_question = document.createElement("div");
  card_question.className = "card-question";
  card_question.classList.add("mb-3", "mr-3");

  var heading = document.createElement("div");
  heading.id = "heading";

  card_question.appendChild(heading);

  var question_no = document.createElement("div");
  question_no.className = "question_no";
  var question_text = document.createElement("span");
  question_text.className = "question_text";
  question_text.innerHTML = "Question " + question_number;
  question_no.appendChild(question_text);
  var sideOption = document.createElement("div");
  sideOption.className = "side_options";
  var deleteOpt = document.createElement("span");
  deleteOpt.className = "delete_opt";
  var imgdelete = document.createElement("img");
  imgdelete.src = "https://img.icons8.com/color/18/000000/delete-sign--v1.png";
  deleteOpt.appendChild(imgdelete);

  var deleteText = document.createElement("span");
  deleteText.innerHTML = "Delete";
  deleteOpt.appendChild(deleteText);

  var editOpt = document.createElement("span");
  deleteOpt.addEventListener("click", () => {
    deleteQuestion(question_id);
  });
  editOpt.className = "edit_opt";
  var editImg = document.createElement("img");
  editImg.src = "https://img.icons8.com/color/18/000000/google-docs--v1.png";
  var editText = document.createElement("span");
  editText.className = "edit_text";
  editText.innerHTML = "Edit";

  editOpt.appendChild(editImg);
  editOpt.appendChild(editText);

  //   sideOption.appendChild(deleteOpt);
  //   sideOption.appendChild(editOpt);

  question_no.appendChild(sideOption);
  heading.appendChild(question_no);

  var questionIDiv = document.createElement("div");
  questionIDiv.id = "question";

  var questionText = document.createElement("p");
  questionText.className = "question";
  questionText.innerHTML = question_pText;
  console.log(question_pText);
  questionIDiv.appendChild(questionText);
  card_question.appendChild(questionIDiv);
  var optionIdDiv = document.createElement("div");
  optionIdDiv.id = "options";

  var leftOptions = document.createElement("div");
  leftOptions.className = "options";
  leftOptions.style.display = "flex";

  var option1 = document.createElement("div");
  option1.className = "option";
  option1.id = "option_1";
  option1.innerHTML = option1Text;

  var option2 = document.createElement("div");
  option2.className = "option";
  option2.id = "option_2";
  option2.innerHTML = option2Text;

  leftOptions.appendChild(option1);
  leftOptions.appendChild(option2);

  var rightOptions = document.createElement("div");
  rightOptions.className = "034";
  rightOptions.style.display = "flex";
  var option3 = document.createElement("div");
  option3.className = "option";
  option3.id = "option_3";
  option3.innerHTML = option3Text;
  var option4 = document.createElement("div");
  option4.className = "option";
  option4.id = "option_4";
  option4.innerHTML = option4Text;
  var correct_color = "#00FA9A";
  var incorrect_color = "red";
  if (chosen_option !== "") {
    chosen_option = parseInt(chosen_option);
    if (correct_opt === "1" && chosen_option === 1)
      option1.style.color = correct_color;
    else if (correct_opt === "2" && chosen_option === 2)
      option2.style.color = correct_color;
    else if (correct_opt === "3" && chosen_option === 3)
      option3.style.color = correct_color;
    else if (correct_opt === "4" && chosen_option === 4)
      option4.style.color = correct_color;
    else {
      if (chosen_option === 1) option1.style.color = incorrect_color;
      else if (chosen_option === 2) option2.style.color = incorrect_color;
      else if (chosen_option === 3) option3.style.color = incorrect_color;
      else if (chosen_option === 4) option4.style.color = incorrect_color;

      if (correct_opt === "1") option1.style.color = correct_color;
      else if (correct_opt === "2") option2.style.color = correct_color;
      else if (correct_opt === "3") option3.style.color = correct_color;
      else if (correct_opt === "4") option4.style.color = correct_color;
    }
  }

  rightOptions.appendChild(option3);
  rightOptions.appendChild(option4);
  optionIdDiv.appendChild(leftOptions);
  optionIdDiv.appendChild(rightOptions);
  card_question.appendChild(optionIdDiv);
  return card_question;
}

function getExamResultInfo() {
  var id = getExamId();
  console.log("getting exam info");
  eel.getExamById(id)(function (exam_info) {
    console.log(exam_info);
    console.log("exam info is above");
    if (exam_info !== false) {
      var exam_name = exam_info["exam_name"];
      var course_code = exam_info["course_code"];
      var year = exam_info["year"];
      var branch = exam_info["branch"];
      var date = exam_info["date"];
      var start_time = exam_info["time"];
      var end_time = exam_info["end_time"];
      var batches = exam_info["batch"];

      document.getElementById("year").value = year;
      document.getElementById("date").value = date;
      document.getElementById("branch").value = branch;
      document.getElementById("start_time").value = start_time;
      document.getElementById("end_time").value = end_time;

      batches.forEach(function (batch) {
        var checkId = "btncheck" + batch;
        document.getElementById(checkId).checked = true;
      });
    }
  });
}

function downloadSingleResponse() {
  var exam_id = getExamId();

  eel.getAllStudentResult(exam_id)(function (results) {
    var thisResult = undefined;

    results.forEach(function (result) {
      if (result["student_id"] === getStudentId()) {
        thisResult = result;
      }
    });
    var divContents = document.getElementById("question_col_result").innerHTML;
    var a = window.open("", "", "height=500, width=500");
    a.document.write("<html>");
    a.document.write(
      "<body > <h1>Student Result : " + thisResult["student_name"] + " <br>"
    );
    a.document.write(divContents);
    a.document.write("</body></html>");
    a.document.close();

    a.print();
  });
}

function getSidePannelExam() {
  var id = getExamId();
  console.log("getting exam info");
  eel.getExamById(id)(function (exam_info) {
    console.log(exam_info);
    console.log("exam info is above");
    if (exam_info !== false) {
    }
  });
}
