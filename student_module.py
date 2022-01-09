from data import * 
from static.modules.db import db
from static.modules.examHelper import ExamHelper
from static.modules.localStorage import LocalStorage
from static.modules.loginStudent import *
from static.modules.questionPannel import QuestionPannel



studentAuth = StudentAuth()
exam = ExamHelper()
localStorage = LocalStorage()
questionPannel = QuestionPannel()



def initProject():
	db.getMcqQuestions()


eel.init("static")  

@eel.expose
def setTimer():
	return month,day,year,time

eel.start( 'templates/login.html')

# eel.start( 'templates/student_dashboard.html?question=1',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)

while True:
	eel.sleep(1.0)
