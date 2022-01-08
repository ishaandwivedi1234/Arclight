from static.modules.db import db,staticData
import eel
class QuestionPannel :
    def __init__(self) -> None:
        pass

    @staticmethod
    @eel.expose

    def getQuestionPannelInfo():

        revisit = []
        list_of_done=[]
        examQuestions = staticData.examQuestion
        no_of_questions = examQuestions.list_of_questions.length
        max_col = 15
        max_row = no_of_questions // max_col

        if (no_of_questions % max_col)  > 0 :
            max_col = max_row + 1
            
        pannleData = {
            'max_col':max_col,
            'max_row':max_row,
            'no_of_questions':no_of_questions,
            'list_of_done':list_of_done,
            'revisit':revisit
        }
	   
        return pannleData

  