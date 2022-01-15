import eel
from modules_student.db import staticData
class LocalStorage:
    staticData = staticData
    def __init__(self) -> None:
        pass
    
    @staticmethod
    @eel.expose
    def getStudentFromLocalStorage():
        try:
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
        except Exception as e:
            print(e)

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
            'end_time':savedExam.end_time,
            'batch':savedExam.batch,
            'course_code':savedExam.course_code,
            'duration':savedExam.duration
        }
        # print(exam)
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


