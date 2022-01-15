function initializeDashboard() {
  fetchExams();
  setExamCards();
  setNavBarOption();
}

function fetchExams() {
  eel.getFacultyExams()(function (res) {});
}

function setExamCards() {
  eel.getFacultyExamInfo()(function (info) {
    no_of_exams = parseInt(info["no_of_exams"]);
    console.log(no_of_exams);
    if (no_of_exams === 0)
      document.getElementById("no_exam").style.display = "block";

    exams = info["exams"];
    console.log(exams);
    max_col = parseInt(info["col"]);
    var exam_section = document.getElementById("exam_section");
    var images = ["i1", "i2", "i3", "i4", "i5", "i6"];

    if (no_of_exams !== 0) {
      let n = no_of_exams;
      while (n > 0) {
        let c = 0;
        var row = document.createElement("div");
        row.classList.add("row", "card_row");
        for (c = 0; c < max_col && n > 0; c++) {
          var col = createCard(
            exams[n - 1]["exam_name"],
            exams[n - 1]["year"],
            exams[n - 1]["date"],
            exams[n - 1]["time"],
            images[n % 5]
          );

          col.style.cursor = "pointer";
          // anchor = document.createElement("a");
          // anchor.style.all = "unset";
          const loc = "exam.html?exam_id=" + exams[n - 1]["id"].toString();
          console.log(loc);
          // anchor.href = loc;

          // anchor.appendChild(col);
          col.addEventListener("click", () => {
            location.href = loc;
          });
          row.appendChild(col);

          n -= 1;
        }
        exam_section.appendChild(row);
      }
    } else {
    }
  });
}

function setNavBarOption() {
  eel.getFacultyInfo()(function (facultyInfo) {
    var name = facultyInfo["name"];
    var email = facultyInfo["email"];
    document.getElementById("navbarDropdown").innerHTML = name;
    document.getElementById("letter").innerHTML = name[0];
  });
}

function createCard(subjectNameText, yearText, dateText, timeText, imgName) {
  //  <div class="col-lg-3 col-md-4 col-sm-12 exam-card-container">
  var col = document.createElement("div");
  col.classList.add("col-lg-3", "col-md-4", "col-sm-12", "exam-card-container");

  // <div class="exam-card">
  var examCard = document.createElement("div");
  examCard.classList.add("exam-card");

  col.appendChild(examCard);
  //   <div class="card-img">
  var cardImg = document.createElement("div");
  cardImg.classList.add("card-img");
  cardImg.style.backgroundImage =
    "linear-gradient(to bottom, rgba(54, 69, 79, 0.2), rgba(54, 69, 79, 0.73)),url(../assets/card_images/" +
    imgName +
    ".png" +
    ")";
  //   cardImg.style.background = "";
  examCard.appendChild(cardImg);
  // <div class="row subject-name-menu">
  var subjectNameRow = document.createElement("div");
  subjectNameRow.classList.add("row", "subject-name-menu");
  cardImg.appendChild(subjectNameRow);

  //<div class="col-lg-10 col-md-10 col-sm-10 subject-name">
  var subjectNameDiv = document.createElement("div");
  subjectNameDiv.classList.add(
    "col-lg-10",
    "col-md-10",
    "col-sm-10",
    "subject-name"
  );
  subjectNameRow.appendChild(subjectNameDiv);
  subjectNameDiv.innerHTML = subjectNameText;

  //    <div class="col-lg-10 col-md-10 col-sm-10 subject-name">
  //      Computer Networks
  //    </div>;

  subjectNameRow.appendChild(subjectNameDiv);
  //        <div class="year">2nd Year</div>
  //        <div class="exam-date">3-2-2022</div>
  //        <div class="exam-time">12:30 PM</div>
  var year = document.createElement("div");
  var examDate = document.createElement("div");
  var examTime = document.createElement("div");
  year.classList.add("year");
  examDate.classList.add("exam-date");
  examTime.classList.add("exam-time");

  cardImg.appendChild(year);
  cardImg.appendChild(examDate);
  cardImg.appendChild(examTime);

  year.innerHTML = yearText;
  examDate.innerHTML = dateText;
  examTime.innerHTML = timeText;
  //      <div class="card-buttons">
  //        <button class="result-button">Result</button>
  //      </div>
  var btnDiv = document.createElement("div");
  btnDiv.classList.add("card-buttons");
  var btn = document.createElement("button");
  btn.classList.add("result-button");
  btn.innerHTML = "Result";
  btnDiv.appendChild(btn);
  examCard.appendChild(btnDiv);

  return col;
}

function openExamInfoCard() {
  document.getElementById("push_nort").style.display = "none";

  document.getElementById("notificaion_modal").style.display = "block";
}

function showError(msg) {
  var push_nort = document.getElementsByClassName("push_bg")[0];
  push_nort.style.display = "block";
  var nort_text = document.getElementById("nort_text");
  nort_text.innerHTML = msg;
}
function closeExamInfoCard() {
  document.getElementById("notificaion_modal").style.display = "none";
}
function closeNort() {
  var push_nort = document.getElementsByClassName("push_bg")[0];
  push_nort.style.display = "none";
}

function createNewExam() {
  try {
    var exam_name = document.getElementById("exam_name").value;
    var exam_date = document.getElementById("exam_date").value;
    var start_time = document.getElementById("start_time").value;
    var end_time = document.getElementById("end_time").value;
    var year = parseInt(document.getElementById("year").value);
    var subjectCode = document.getElementById("course_code").value;
    var batches = [];
    let no_of_batches = 10;
    for (var i = 1; i <= no_of_batches; i++) {
      let id = "btncheck" + i.toString();
      var checkBox = document.getElementById(id);
      if (checkBox.checked === true) {
        batches.push(checkBox.value);
      }
    }

    if (exam_name === "") {
      showError("Exam name is required to create exam");
      return false;
    } else if (exam_date === "") {
      showError("Exam date is required to create exam");
      return false;
    } else if (start_time === "") {
      showError("Exam start time is required to create exam");
      return false;
    } else if (end_time === "") {
      showError("Exam end time is required to create exam");
      return false;
    } else if (year === "") {
      showError("Exam year is required to create exam");
      return false;
    } else if (subjectCode === "") {
      showError("Exam course code is required to create exam");
      return false;
    } else if (batches.length === 0) {
      showError("Aleast one batch is required for conducting exam");
      return false;
    }

    var examInfo = {
      exam_name: exam_name,
      exam_date: exam_date,
      start_time: start_time,
      end_time: end_time,
      year: year,
      batches: batches,
      subject_code: subjectCode,
    };
    eel.addExamInfo(examInfo)(() => {
      eel.createExam()(function (data) {
        console.log(data);
        if (data["exam_id"] !== undefined) {
          location.href = "exam.html?exam_id=" + data["exam_id"].toString();
        }
      });
    });
  } catch (e) {
    alert("all feilds required");
    console.log(e);

    return false;
  }
}
async function gotoExamQuestion() {
  var result = await createNewExam();
  console.log(result);
  if (result != undefined && result["success"] === true) {
  }
}

function getExamId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const exam_id = urlParams.get("exam_id");

  if (question_number == undefined) exam_id = 0;
  return exam_id;
}
