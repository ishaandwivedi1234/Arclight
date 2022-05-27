function initializeResultBody() {
  getStudentsResult();
}

function getStudentsResult() {
  var exam_id = getExamId();
  eel.getAllStudentResult(exam_id)(function (results) {
    var table = document.getElementById("result_table");

    results.forEach((result, index) => {
      console.log(result["response_cout"]);
      var row = buildTableRow(result, index);
      table.appendChild(row);
    });
  });
}

function buildTableRow(result, index) {
  var row = document.createElement("tr");
  var sNo = document.createElement("th");
  sNo.scope = "col";
  sNo.innerHTML = index + 1;
  row.appendChild(sNo);

  var name = document.createElement("td");
  name.innerHTML = result["student_name"];
  row.appendChild(name);

  //   calculating score

  var scoreCount = 0;
  var totalQustion = result["question_response"].length;
  var totalConfidenceQuestion = 0;
  var totalResponseCount = 0;
  result["question_response"].forEach(function (res) {
    if (res["is_correct"] === true) {
      scoreCount += 1;
      totalConfidenceQuestion += 1;
    }
    totalResponseCount += res["response_count"];
  });

  var score = document.createElement("td");
  var score_txt = scoreCount.toString() + " / " + totalQustion.toString();
  score.innerHTML = score_txt;
  row.appendChild(score);
  console.log(totalConfidenceQuestion, totalResponseCount);
  console.log(result);
  var confidence = document.createElement("td");
  var confidence_text;
  if (totalResponseCount === totalConfidenceQuestion)
    confidence_text = "Full confident";
  else if (totalResponseCount <= totalConfidenceQuestion * 2)
    confidence_text = "Confident";
  else confidence_text = "Not Confident";

  confidence.innerHTML = confidence_text;
  row.appendChild(confidence);
  var option = document.createElement("td");

  var detail = document.createElement("a");
  detail.href =
    "/faculty_templates/result_detail.html?exam_id=" +
    result["exam_id"] +
    "&student_id=" +
    result["student_id"];

  var download = document.createElement("a");
  download.href =
    "/faculty_templates/download.html?exam_id=" +
    result["exam_id"] +
    "&student_id=" +
    result["student_id"];
  detail.innerHTML = "Details";
  download.innerHTML = "Download";
  download.classList.add("download_student_res");

  option.appendChild(detail);
  option.appendChild(download);
  row.appendChild(option);
  //
  return row;
}

function getExamId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const exam_id = urlParams.get("exam_id");

  if (exam_id == undefined) exam_id = 0;
  return exam_id;
}

function getStudentId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const exam_id = urlParams.get("student_id");

  if (exam_id == undefined) exam_id = 0;
  return exam_id;
}
