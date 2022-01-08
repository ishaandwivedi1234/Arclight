import eel
from static.modules.db import db,staticData


class ExamHelper:

    staticData = staticData
    database = db
   

    @staticmethod
    @eel.expose

    def getExamInfo():
        student = ExamHelper.staticData.student
        return ExamHelper.database.getExamInfo(student)
    
    
    @staticmethod
    @eel.expose

    def getExamQuestions():
      return ExamHelper.database.getMcqQuestions()

    @staticmethod
    @eel.expose
    def getMcqResponse():
        return ExamHelper.database.getMcqResponse()
        