import eel
from static.models.mcq import ExamQuestions
from static.modules.db import staticData
class LocalStorage:
    staticData = staticData
    def __init__(self) -> None:
        pass
    
    @staticmethod
    @eel.expose
    def getStudentFromLocalStorage():
        savedStudent =LocalStorage.staticData.student
        student  = {
            'name': savedStudent.name,
            'batch':savedStudent.batch,
            'branch':savedStudent.branch,
            'email':savedStudent.email,
            'semester':savedStudent.semester,
            'en':savedStudent.en,
            'id':savedStudent.id
        }
        return student

    @staticmethod
    @eel.expose
    def getExamFromLocalStorage():
        savedExam = LocalStorage.staticData.exam
        exam = {
            'id':savedExam.id,
            'branch':savedExam.branch,
            'exam_name':savedExam.exam_name,
            'date':savedExam.date,
            'time':savedExam.time,
            'batch':savedExam.batch,
            'course_code':savedExam.course_code,
            'duration':savedExam.duration
        }
        return exam

    @staticmethod
   
    def getExamQuestionsFromLocalStorage():
        savedExamQuestion = LocalStorage.staticData.examQuestion
        allExamQuestions = []

        for question in savedExamQuestion:
            examQuestions = question.getExamJson()
            allExamQuestions.append(examQuestions)

        return allExamQuestions

################# Static final data ##########################


