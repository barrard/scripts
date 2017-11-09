import React, { Component } from 'react';
import Q_and_A from './components/make_question_answers.js'
import Header from './components/header.js'
import PleaseChooseScript from './components/please_choose_script.js'
import './App.css';
import Events from './components/event_emitter.js'
import $ from './helper_funcs/dom_helpers.js'


class App extends Component {
	constructor(props) {
		super(props);
		this.state={
			mode:'build',
			current_script:'Demo',
			script_names_array:[],
			script_data: {}, 
		}
		this.parse_script_data = this.parse_script_data.bind(this);
		// this.delete_question= this.delete_question.bind(this)
	}

	componentWillMount() {
		// $.init_current_script(this.state.current_script)
		console.log('Main App.js will be mounted')
		this.fetch_Script_list()
		// Events.on('new_question', (data)=>{
		// 	console.log('new question added to the list:  \n')
		// 	console.log(data)
		// 	let question_list = this.state.questions
		// 	question_list.push(data)
		// 	this.setState({
		// 		questions:question_list
		// 	})
		// })

		Events.on('add_new_script', (data)=>{this.add_new_script(data)})
		// Events.on('update_tag', (data)=>{this.handle_add_tag})
		// Events.on('update_answer', (data)=>{this.handle_add_answer})
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
			}),
			current_script:''
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
		this.set_current_script(data.name)
		this.setState({
			script_names_array:temp
		})

	}

	set_current_script(script){
		if(this.state.current_script === script) return

		console.log('lets set the current script to ')
		console.log(script)
		this.setState({
			current_script:script
		})
		this.fetch_script(script)

	}

	handle_update_tag(data){
		console.log(data)
	}

	handle_update_answer(data){
		console.log(data)
	}

	parse_script_data(data){
		console.log('parsibg the fetched Q_A data')
	
	}
	componentDidMount() {
		console.log('Main App.js did be mounted')
		
	}	

	fetch_script(script){
		if(!script)return
		fetch('/get_QA_list/'+script)
			.then((resp)=>{
				console.log('DAta has been recived')
				return resp.json()
			})
			.then((data)=>{
				console.log(data)
				this.parse_script_data(data)
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
				// console.log(resp.json())
				return resp.json()
			})
			.then((data)=>{
				//grab each script name and save in script_names_array
				let script_names_array = []
				data.forEach((i, key)=>{
					let script = {}
					script.name = i.name
					script.dbid = i._id
					script_names_array.push(script)
				})
				let tmp = this.state.script_names_array
				tmp = tmp.concat(script_names_array)
				this.setState({
					script_names_array:tmp
				})
			})
			.catch((ex)=>{
				console.log('err?')
				console.log(ex)
			})
	}

  render() {
  	console.log('App.js is rendering script?')
  	console.log(this.state.current_script)
  	console.log('scripts list app.js')
  	console.log(this.state.script_names_array)
  	let render_if_current_script;
  	// console.log($.init_current_script(this.state.current_script))

  	if(!$.init_current_script(this.state.current_script)){
  		render_if_current_script = (
  			<PleaseChooseScript
  				name='Your name?'
  			/>
  		)
  	}else{
  		render_if_current_script = (
  			<div>
  			<Q_and_A 
  				script_data={this.state.script_data}
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
