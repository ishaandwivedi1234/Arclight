
import eel
from static.modules.db import db as DB
class StudentAuth:
    database = DB

    def __init__(self) -> None:
        pass
    @staticmethod 
    @eel.expose
    def loginStudent(enrollment,password):
        return StudentAuth.database.authStudent(enrollment,password)



    
    

        