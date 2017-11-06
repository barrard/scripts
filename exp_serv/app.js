var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var colors = require('colors');
var logger = require('tracer').colorConsole({
	format : "<{{title}}>".yellow+" {{message}}".white+ "(in {{file}}".blue+":{{line}}".red+")",

});



var Question_model = require('./mongoose_models/question_model')

mongoose.connect("mongodb://localhost/Q_A")

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

function err_handle(err){
	if(!err) logger.log('no err')
		else logger.log('err'+err)
}

app.get('/delete_script/:id', (req, res)=>{
	let id = req.params.id
	Question_model.Scripts.find({_id:id})
		.remove(err_handle)
})

app.get('/delete_question/:id', (req, res)=>{
	logger.log(req.params)
	var question = Question_model.Question
	question.find({_id:req.params.id},(err, question)=>{
		if(err){
			logger.log(err)
			res.send({err:err})
		}else if (question){
			logger.log('found the question, try and delete it'.red)
		}else{
			logger.log('Something is terrely wrong')
			res.send({err:err})
		}
	}).remove((err)=>{
		if(err){
			logger.log(err)
			res.send({err:err})
		}else{
			logger.log('success deleted the item with id '+req.params.id)
			res.send({seccess:'success deleted the item with id '+req.params.id})
		}
	})
})

app.post('/add_question', (req, res)=>{
	logger.log('add quest?')
	// logger.log(req)
	logger.log(req.body)

	var answers=[]
	var question = new Question_model.Question()
	question.script_name=req.body.script_name
	question.type=req.body.type
	question.question_value=req.body.val
	question.tags = req.body.tags
	question.weight = req.body.weight
	// question.answers=[]

	question.save(function(err){
		if(err){
			logger.log(err)
			return false
		}else{
			logger.log('question was save')
			res.send({ok:'ok'})
		}
	})

	



	// var Answers = ['yes', 'no','maybe','FA-SHOW']

	// var question = new Question_model.Question()
	// 	question.type='basic info'
	// 	Answers.forEach((i)=>{
	// 		var answer = new Question_model.Answer()
	// 		answer.type='basic'
	// 		answer.answer_value=i
	// 		answer.tags=['basic','safe']
	// 		answer.weight_value=1
	// 		question.answers.push(answer)
	// 		answer.save((err)=>{
	// 			if(err) logger.log(err)
	// 				else logger.log('answer saved')
	// 		})
	// 	})
	// 	question.question_value='Will you show me your tits'


	// question.save(function(err){
	// 	logger.log(err)
	// 	logger.log('questionable actons herer')
	// })

})


app.get('/get_script_list', (req, res)=>{
  // logger.log(req.params)
  Question_model.Scripts.find((err, scripts)=>{
    if(err){
      logger.log(err)
    }else{
      logger.log('scripts')
      logger.log(scripts)
      res.json(scripts)

    }
  })
})

app.post('/add_script', (req, res)=>{
	logger.log('we got a new script?')
	logger.log(req.body)
	var script = new Question_model.Scripts()
	script.name=req.body.script_name

	script.save(function(err, script){
		if(err){
			logger.log(err)
			return false
		}else{
			logger.log('script was save')
			res.send({success:script.id})
		}
	})

})

app.get('/get_QA_list/:script', function(req, res){
	let script = req.params.script
	logger.log('get_QA_list/:script route')
	logger.log(script)
	Question_model.Question.find({script_name:script}, (err, questions)=>{
		if(err){
			logger.log('err')
			logger.log(err)
		}else{
			logger.log(questions)
			res.json(questions)

		}
	})

	// Question_model.Question.find((err, questions)=>{
	// 	if(err){
	// 		logger.log(err)
	// 	}else{
	// 		logger.log(questions)
	// 	}
	// })


	// res.send({msg:'hi from server'})

})



var port = 33333
app.listen(port)