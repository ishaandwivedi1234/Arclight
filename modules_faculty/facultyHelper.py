import eel
from models_faculty.examInfo import ExamInfo
from modules_faculty.db import db,staticData
from utility.dayTime import formatToTime,tweleveToTwentyfour

class FacultyHepler:
    database = db
    staticData = staticData
    def __init__(self) -> None:
        pass
    @staticmethod
    @eel.expose
    def loginFaculty(email,password):
        # print(email,password)
        return FacultyHepler.database.authFaculty(email,password)

    @staticmethod
    @eel.expose
    def getFacultyExams():
        # print('getting faculty exams')
        return FacultyHepler.database.getFaclutyExams()
    
    
    
    @staticmethod
    @eel.expose
    def getFacultyExamInfo():
        facultyExamList= FacultyHepler.staticData.facultyExams
        exams = FacultyHepler.staticData.facultyExamsObjectList
        max_col = 4
        info = {
            'no_of_exams':len(facultyExamList),
            'exams':exams,
            'col': max_col
        }
        return info



    @staticmethod
    @eel.expose
    def getExamById(exam_id):
        print('👉🏻 getting exam id: ',exam_id,' 🟡')
        allExams = FacultyHepler.database.getFaclutyExams()
        
        for exam in allExams:
            # print(exam)
            if  exam['id'] == str(exam_id):
                exam['time'] = tweleveToTwentyfour(exam['time'])
                exam['end_time'] = tweleveToTwentyfour(exam['end_time'])
                return exam
                
        return False

    @staticmethod
    @eel.expose
    def getFacultyInfo():
         return FacultyHepler.staticData.facultyObject




    @staticmethod
    @eel.expose
    def addExamInfo(examInfo):
        # print(examInfo)
        _examInfo = ExamInfo(
            id=None,
            examName=examInfo['exam_name'],
            date=examInfo['exam_date'],
            startTime=examInfo['start_time'],
            endTime=examInfo['end_time'],
            year=examInfo['year'],
            batches=examInfo['batches'],
            subjectCode=examInfo['subject_code']
        )
        FacultyHepler.staticData.addExamInfo(examInfo=_examInfo,examInfoObejct=examInfo)
        
    @staticmethod
    @eel.expose

    def createExam():
       return FacultyHepler.database.createExam()
    @staticmethod
    @eel.expose
    def getExamQuestions(exam_id):
        return FacultyHepler.database.getExamQuestions(exam_id=exam_id)
        
    @staticmethod
    @eel.expose
    def addNewQuestion(examId,questionInfo):
        return FacultyHepler.database.addQuestion(examId,questionInfo)

    @staticmethod
    @eel.expose
    def addNewSubQuestion(exam_Id,questionInfo):
        return FacultyHepler.database.addSubjectiveQuestion(exam_Id,questionInfo)

    @staticmethod
    @eel.expose
    def deleteQuestion(exam_id,question_id):
        return FacultyHepler.database.deleteQuestion(exam_id,question_id)

    @staticmethod
    @eel.expose
    def deleteExam(exam_id):
        return FacultyHepler.database.deleteExam(exam_id=exam_id)

    @staticmethod
    @eel.expose
    def getAllStudentResult(exam_id):
        return FacultyHepler.database.getAllStudentResult(exam_id=exam_id)


        