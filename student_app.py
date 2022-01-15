from data import * 
from modules_student.db import staticData
from modules_student.examHelper import ExamHelper
from modules_student.localStorage import LocalStorage
from modules_student.loginStudent import *
from modules_student.questionPannel import QuestionPannel
import eel
import eel.browsers



studentAuth = StudentAuth()
exam = ExamHelper()
localStorage = LocalStorage()
questionPannel = QuestionPannel()


eel.init("static")  

@eel.expose
def setTimer():
	return month,day,year,time


eel.start('templates/splashscreen.html', suppress_error=True, port=3000,host='localhost',disable_cache=True, )

# eel.start( 'templates/student_dashboard.html?question=1',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)
# eel.start( 'templates/ExamPortal/student_dashboard.html',jinja_templates='templates',block=False)

while staticData.AppRunning:
	eel.sleep(1.0)
