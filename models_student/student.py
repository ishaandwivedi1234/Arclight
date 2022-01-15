
class Student:
    
    def __init__(self,name,batch,branch,en,id,semester,email):
        self.name = name
        self.batch = batch
        self.branch= branch
        self.email = email
        self.semester = semester
        self.en = en
        self.id = id

    
    def getStudent(self):
        return Student(name=self,batch=self.batch,branch=self.branch,en=self.en,id=self.id)

       

