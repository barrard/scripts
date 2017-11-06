var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongoose.connect('mongodb://localhost/Q_A12');")

var answer_schema = new Schema({
	question_id:Schema.Types.ObjectId,
	type:{type:String},
	answer_value:String,
	tags:[String],
	weight_value:Number,
	question_id:Number
})

var question_schema = new Schema({
	script_name:String,
	script_id:Schema.Types.ObjectId,
	tags:[String],
	type:{type: String},
	question_value:String,
	created_on:{type:Date, default:Date.now},
	is_active:{type:Boolean, default:false}
})

var script_schema = new Schema({
	tags:[String],
	type:{type:String},
	name:String,
	created_on:{type:Date, default:Date.now},
	is_active:{type:Boolean, default:false}

})


module.exports = {
	Question:mongoose.model('Question', question_schema),
  Answer:mongoose.model('Answer', answer_schema),
  Scripts:mongoose.model('Scripts', script_schema)
}