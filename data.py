questions = ['''The number of edges from the root to the node is called __________ of the tree.''','''  A small lantern of mass 100 gm is hanged from the pole of a bullock cart using a massless string. What is the tension in the string, (Assume that cart moves smoothly).

(a) when the bullock cart is at rest,
(b) moves with uniform velocity of 3 m/s
(c) moves with an acceleration of 2 m/s2 ''',''' X-ray of wavelength 0.5Ao are scattered by the electron in a block of carbon through 90o . (i) Find the wavelength of scattered Photon (ii) the maximum wavelength present in scattered radiation and (iii) the maximum kinetic energy of recoil electron.''','''According to the India Meteorological Department (IMD), fairly widespread to widespread rains with isolated heavy falls are very likely to continue over Northeast India until Tuesday, August 24.

Thereafter, the intensity of the rainfall is set to increase, with isolated very heavy falls expected to lash Arunachal Pradesh, Assam and Meghalaya between Tuesday to Friday, August 24-27.

Furthermore, isolated extremely heavy falls may also bombard Assam and Meghalaya on Wednesday, August 25.

''','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']

answers = ["","answer 2","","asnwer 4"]

mcq_answers=[
	# {
	# 	"student_id":1,
	# 	"question_no":1,
	# 	"option":2,
	# 	"value":"x"

	# }
]

options=[
	[
		'4 cm ',
		'2 cm',
		'1 cm',
		'9 cm '
	],
	[
		'is',
		'are',
		'the',
		'none'
	],
	[
		'is',
		'are',
		'the',
		'none'
	],
	
	[
		'is',
		'are',
		'the',
		'none'
	],
	[
		'is',
		'are',
		'the',
		'none'
	],
	

]


mcq_questions = [
	{
		'question_no':1,
		'question_text':'What is the question',
		'option_1':'height is ok',
		'option_2':'everything is ok',
		'option_3':'not everything is ok',
		'option_4':'all of the above'
	},
		{
		'question_no':2,
		'question_text':'What is the question2',
		'option_1':'height is ok',
		'option_2':'everything is ok',
		'option_3':'not everything is ok',
		'option_4':'all of the above'
	},
		{
		'question_no':3,
		'question_text':'What is the question3',
		'option_1':'height is ok',
		'option_2':'everything is ok',
		'option_3':'not everything is ok',
		'option_4':'all of the above'
	},
		{
		'question_no':4,
		'question_text':'What is the question4',
		'option_1':'height is ok',
		'option_2':'everything is ok',
		'option_3':'not everything is ok',
		'option_4':'all of the above'
	}
]

time_of_exam = "23:15:00"
student_name = "Ishaan Dwivedi"
en_no = "191b130"
number_of_questions=len(mcq_questions)
max_col = 15
max_row = number_of_questions // max_col
if (number_of_questions % max_col) > 0 :
	max_row = max_row + 1

list_of_done = []
revisited= []



current_question  = 0

# timer data
month = 'Dec'
day = '4'
year = '2021'
time = '2:00:00'


