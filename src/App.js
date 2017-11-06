import React, { Component } from 'react';
import Q_and_A from './components/make_question_answers.js'
import Header from './components/header.js'
import Please_choose_script from './components/please_choose_script.js'
import logo from './logo.svg';
import './App.css';
import Events from './components/event_emitter.js'
import $ from './helper_funcs/dom_helpers.js'


class App extends Component {
	constructor(props) {
		super(props);
		this.state={
			current_script:'',
			script_names_array:[],
			questions: [], 
			answers:{}
		}
		this.parse_Q_A_data = this.parse_Q_A_data.bind(this);
		this.delete_question= this.delete_question.bind(this)
	}

	componentWillMount() {
		$.init_current_script(this.state.current_script)
		console.log('Main App.js will be mounted')
		Events.on('new_question', (data)=>{
			console.log('new question added to the list:  \n')
			console.log(data)
			let question_list = this.state.questions
			question_list.push(data)
			this.setState({
				questions:question_list
			})
		})

		Events.on('add_new_script', (data)=>{this.add_new_script(data)})
		Events.on('update_tag', (data)=>{this.handle_add_tag})
		Events.on('update_answer', (data)=>{this.handle_add_answer})
		Events.on('set_current_script', (data)=>{this.set_current_script(data)})
		Events.on('delete_script', (data)=>{this.delete_script(data)})

	}

	delete_script(data){
		console.log('deleted_script')
		let scripts_array = this.state.script_names_array
		console.log(scripts_array)
		this.setState({
			script_names_array:scripts_array.filter((obj)=>{
				return obj.dbid !== data
			})
		})

		fetch('/delete_script/'+data)
		  .then((data)=>{
		    console.log(data)
		  })
		  .catch((err)=>{
		    console.log(err)
		  })
	}

	add_new_script(data){
		console.log('add the scrpt to the list '+data)
		let temp = this.state.script_names_array
		console.log(temp)
		temp.push(data)
		this.setState({
			script_names_array:temp
		})

	}

	set_current_script(data){
		if(this.state.current_script === data) return

		console.log('lets set the current script to ')
		console.log(data)
		this.setState({
			current_script:data
		})
		this.fetch_QA_list(data)

	}

	handle_update_tag(data){
		console.log(data)
	}

	handle_update_answer(data){
		console.log(data)
	}

	parse_Q_A_data(data){
		console.log('parsibg the fetched Q_A data')
		let q_array = []
		let a_array = []
		console.log(data)
		data.forEach((i)=>{
			let a = []
			let q = {
				tags:[],
				dbid:i._id,
				type:i.type,
				val:i.question_value,
				is_active:i.is_active,
				answers:a
			}
			q_array.push(q)
		})
		// let questions = this.state.questions
		// console.log('initial state?')
		// console.log(questions)
		// questions = questions.concat(q_array)
			this.setState({
				questions:q_array
			})
			// console.log('Is the data fuking set')
			// console.log(this.state)
	}
	componentDidMount() {
		console.log('Main App.js did be mounted')
		this.fetch_Script_list()
	}	

	fetch_QA_list(script){
		if(!script)return
		fetch('/get_QA_list/'+script)
			.then((resp)=>{
				console.log('DAta has been recived')
				return resp.json()
			})
			.then((data)=>{
				console.log(data)
				this.parse_Q_A_data(data)
			})
			.catch((ex)=>{
				console.log('err?')
				console.log(ex)
			})
	}

	fetch_Script_list(){
		fetch('/get_script_list')
			.then((resp)=>{
				console.log('DAta has been recived')
				return resp.json()
			})
			.then((data)=>{
				console.log('got scripts??')
				console.log(data)
				//grab each script name and save in script_names_array
				let script_names_array = []
				data.forEach((i, key)=>{
					let script = {}
					console.log('script name is')
					console.log(i.name)
					script.name = i.name
					script.dbid = i._id
					script_names_array.push(script)
				})
				let tmp = this.state.script_names_array
				tmp = tmp.concat(script_names_array)
				console.log('tmp')
				console.log(tmp)
				this.setState({
					script_names_array:tmp
				})
			})
			.catch((ex)=>{
				console.log('err?')
				console.log(ex)
			})
	}
	delete_question(e){
		let count = e.target.getAttribute('data-count')
		let dbid = e.target.getAttribute('data-dbid')
		console.log(count)
		let confirm = window.confirm('Are you sure you want to delete route# '+count)
		if(confirm){
			let questions = this.state.questions
			let deleted_question = questions.splice(count, 1)
			console.log('deleted_question')
			console.log(deleted_question)
			this.setState({
				questions:questions
			})
			fetch('/delete_question/'+dbid)
				.then((data)=>{
					console.log(data)
				})
				.catch((err)=>{
					console.log(err)
				})
		}

	}
  render() {
  	console.log('App.js is rendering')
  	console.log(this.state.current_script)
  	let Q = this.state.questions
  	console.log('scripts list form app.js')
  	console.log(this.state.script_names_array)
  	let render_if_current_script;
  	// console.log($.init_current_script(this.state.current_script))

  	if(!$.init_current_script(this.state.current_script)){
  		render_if_current_script = (
  			<Please_choose_script
  				name='Your name?'
  			/>
  		)
  	}else{
  		render_if_current_script = (
  			<div>

  			<Q_and_A 
  				Q={Q}
  				delete_question={this.delete_question}
  				current_script={this.state.current_script}
  			/>
  			</div>
  		)
  	}
    return (
      <div>
      <Header 
      	current_script={this.state.current_script}
      	scripts_array={this.state.script_names_array}
      />
      	{render_if_current_script}
      </div>
    );
  }
}

export default App;
