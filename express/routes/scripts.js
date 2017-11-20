
app.post('/save_script', (req, res)=>{
	logger.log(req.body)
	MongoClient.connect(url, function(err, db) {
	  if (!err) {
	  	logger.log('got connected')
	  	var collection = db.collection('script_data');
	  	collection.insert(req.body)
	  	// res.send({success:'script_data saved'})
	  }else{
	  	logger.log('error db connection')
	  	logger.log(err)
	  }
	})
})

app.get('/delete_script/:id', (req, res)=>{
	let id = req.params.id
	logger.log(id)

	MongoClient.connect(url, function(err, db) {
	  if (!err) {
	  	var collection = db.collection('script_data');
	  	collection.remove({"_id":ObjectId(id)}, {justOne:true}, function(err, item){
	  		if(err) console.log('err')
	  		if(item){
	  			console.log('item')
	  		}
	  	})
	  }else{
	  	logger.log('error db connection')
	  	logger.log(err)
	  	res.send({err:'script_data was not saved!', message:err})
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
  MongoClient.connect(url, function(err, db) {
    if (!err) {
    	logger.log('got connected')
    	var collection = db.collection('script_data');

    	collection.find().toArray(function(err, db_data){
    		if(err) {
    			logger.log(err)
    			return
    		}
    		// logger.log(db_data)
    		// logger.log(db_data)
    		res.send({success:'script_data was delivered from Mongo', data:db_data})
    		logger.log('Succes')
    	})

    }else{
    	logger.log('error db connection')
    	logger.log(err)
    	res.send({err:'script_data was not saved!', message:err})
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
	// Question_model.Question.find((err, questions)=>{
	// 	if(err){
	// 		logger.log(err)
	// 	}else{
	// 		logger.log(questions)
	// 	}
	// })
	// res.send({msg:'hi from server'})
})

