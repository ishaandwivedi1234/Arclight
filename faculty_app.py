import eel
from modules_faculty.facultyHelper import FacultyHepler
eel.init("static")  
facultyHelper = FacultyHepler()

eel.start( 'faculty_templates/faculty_login.html')


while True:
	eel.sleep(1.0)
