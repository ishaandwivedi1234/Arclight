console.log(getExamId());

function initializeBody() {
  getExamQuestion();
  getExamInfo();
}

function getExamQuestion() {
  exam_id = getExamId();
  console.log("exam id  is ->");
  console.log(exam_id);
  eel.getExamQuestions(exam_id)(function (question) {
    if (question["questions"].length === 0) {
      console.log("no questions");
      console.log(question);
    } else {
      var question_col = document.getElementById("question_col");

      question["questions"].forEach((element, question_index) => {
        console.log(element);
        var question_div = buildAllQuestion(
          question_index + 1,
          element["question_text"],
          element["option1"],
          element["option2"],
          element["option3"],
          element["option4"],
          element["correct_option"].toString(),
          element["question_id"]
        );

        question_col.appendChild(question_div);
        console.log(question_col);
      });
    }
  });
}
function getExamId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const exam_id = urlParams.get("exam_id");

  if (exam_id == undefined) exam_id = 0;
  return exam_id;
}

function buildAllQuestion(
  question_number,
  question_pText,
  option1Text,
  option2Text,
  option3Text,
  option4Text,
  correct_opt,
  question_id
) {
  //    <div class="card-question">

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

  sideOption.appendChild(deleteOpt);
  sideOption.appendChild(editOpt);

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
  var color = "#00FA9A";
  if (correct_opt === "1") option1.style.color = color;
  else if (correct_opt === "2") option2.style.color = color;
  else if (correct_opt === "3") option3.style.color = color;
  else if (correct_opt === "4") option4.style.color = color;

  rightOptions.appendChild(option3);
  rightOptions.appendChild(option4);
  optionIdDiv.appendChild(leftOptions);
  optionIdDiv.appendChild(rightOptions);
  card_question.appendChild(optionIdDiv);
  return card_question;
}

function getExamInfo() {
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
      document.getElementById("exam_name").value = exam_name;
      document.getElementById("course_code").value = course_code;
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

function addQuestion() {
  location.href = "question_form.html?exam_id=" + getExamId();
}

function deleteQuestion(id) {
  console.log("deleteing question id : " + id);
  var block_id = document.getElementById("block_id");
  block_id.innerHTML = id;
  var notification_blur_bg = document.getElementById("notificaion_modal");
  notification_blur_bg.style.display = "block";
  var nortifier = document.getElementsByClassName("notification_body_small")[0];
  var notifier_text = document.getElementsByClassName("notification_text")[0];
  notifier_text.innerHTML = "Are you sure ? You can't undo this action";
  nortifier.style.display = "block";
}

function cancelDeteleOption() {
  document.getElementById("notificaion_modal").style.display = "none";
}
function confirmDelete() {
  console.log("examm");
  var block_id = document.getElementById("block_id");
  var question_id = block_id.innerHTML;
  var exam_id = getExamId();
  eel.deleteQuestion(
    exam_id,
    question_id
  )(function (response) {
    console.log(response);
    cancelDeteleOption();
    location.reload();
  });
}

function deleteExamConfirm() {
  document.getElementById("delete_exam").style.display = "block";
  document.getElementById("confirm").style.display = "none";
  var notification_blur_bg = document.getElementById("notificaion_modal");
  notification_blur_bg.style.display = "block";
  var nortifier = document.getElementsByClassName("notification_body_small")[0];
  var notifier_text = document.getElementsByClassName("notification_text")[0];
  notifier_text.innerHTML =
    "Are you sure ? Deleting exam will also delete saved questions and responses of students";
  nortifier.style.display = "block";
}
function deleteExam() {
  var exam_id = getExamId();
  console.log("deleting exam");
  eel.deleteExam(exam_id)((response) => {
    if (response === true) {
      location.replace("/faculty_templates/faculty_dashboard.html");
    }
  });
}

function goToEdit(question_id) {}

function gotToDashboard() {
  location.replace("/faculty_templates/faculty_dashboard.html");
}
