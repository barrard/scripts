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
			script_names_array:[
{name: "Demo", dbid: "5a03ee413270977ff1e4bdd9"}
				],
			script_data:[
        {title:'Intro',
          text:'test test etst',
          objections:{
            'No':{
              style:'danger',
              'message':'If client says no here, the call os over',
              "next_step":[
                'Thank you very much, good-bye',
                'Can we schedule a chat for later?',
                'you risk missing the boat!, act now!'
                ],
                action:'',
            },
            'Yes':{
              style:'success',
              'message':'Continue to next step of your script?, this could be a list of something?',
              'next_step':[
                'Grab Attention',
                'Qualifying Questions',
                'Disqualify Statement',

              ],
              action:'',
            },
          },
          types:['Gate Keeper', 'Target Prospect'],
          color:'blue'},
        {title:'Grab Attention',
          text:'This product helped nasa achive the mission to the moon!',
          objections:{
            'No':{
              style:'danger',
              'next_step':[
                'you dont want to go to the moon?',
                'The moon isnt far enough?',
                'how do you doo it?'
              ]
            },
            'Yes':{
              style:'success',
              'next_step':[
                'Continue!'
              ]
            },
          },
          types:['Name Drop', 'Product Value'],
          color:'yellow'},
        {title:'Disqualify Statement',
          text:'',
          objections:{},
          types:[],
          color:'yellow'},
        {title:'Qualifying Questions',
          text:'',
          objections:{},
          types:[],
          color:'yellow'},
        {title:'Common Pain Examples',
          text:'',
          objections:{},
          types:[],
          color:'yellow'},
        {title:'Build Interest',
          text:'',
          objections:{},
          types:['Details','ROI','Name drop', 'Treats of non-action'],
          color:'yellow'},
        {title:'Close',
          text:'',
          objections:{},
          types:[],
          color:'red'},
          {title:'Good-bye',
            text:'',
            objections:{},
            types:[],
            color:'red'}], 
		}
		this.parse_script_data = this.parse_script_data.bind(this);
		this.set_current_script = this.set_current_script.bind(this)
		this.delete_script = this.delete_script.bind(this)
		this.handle_new_script= this.handle_new_script.bind(this)
		this.handle_step_text_box_input = this.handle_step_text_box_input.bind(this)
		this.filter_script_data = this.filter_script_data.bind(this)
		this.add_new_rebuttle = this.add_new_rebuttle.bind(this)
		this.add_client_response = this.add_client_response.bind(this)
		// this.add_client_response = this.add_client_response.bind(this)
	
	
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

		// Events.on('add_new_script', (data)=>{this.add_new_script(data)})
		// Events.on('update_tag', (data)=>{this.handle_add_tag})
		// Events.on('update_answer', (data)=>{this.handle_add_answer})
		// Events.on('set_current_script', (data)=>{this.set_current_script(data)})
		// Events.on('delete_script', (data)=>{this.delete_script(data)})

	}

	add_new_rebuttle(rebuttle_data){
	  console.log(rebuttle_data)
	  this.get_text_via_mode(this.state.script_data, this.state.step, (obj, index)=>{
	    console.log(obj)
	    console.log(index)
	    let objections = obj.objections
	    console.log(objections[rebuttle_data.client_objection])
	    let specific_objection = objections[rebuttle_data.client_objection]
	    console.log(specific_objection)
	    console.log(specific_objection.next_step)
	    if(specific_objection.next_step === undefined) {
	      console.log('make array?')
	      specific_objection.next_step = []
	    }
	    specific_objection.next_step.push(rebuttle_data.text)
	    // console.log(specific_objection.next_step)
	    obj.objections[rebuttle_data.client_objection] = specific_objection
	  })
	}

	get_text_via_mode(obj_array, mode, callback){
	  console.log('obj_array')
	  console.log(obj_array)
	  console.log('mode')
	  console.log(mode)
	  obj_array.filter((obj)=>{
	    if(obj.title === mode){

	      let index = obj_array.indexOf(obj)
	      callback(obj, index)
	    }
	  })
	}

	add_client_response(data, step){
	  console.log(data)
	  console.log(step)
	  this.get_text_via_mode(this.state.script_data, step, (obj, index)=>{
	    // let tmp = this.state.
	    console.log(obj)
	    console.log(index)
	    let new_objection = {
	    	style:'info',
	    	next_step:[]
	    }
	    let tmp = {...obj.objections}
	    tmp[data] = new_objection

	    console.log(obj.objections)
	    let script_data = this.state.script_data
	    script_data[index].objections=tmp
	    // Really not sure why i dont have ot setState() here but it works..
	    this.setState({
	      script_data:script_data
	    })
	    // obj.objections=tmp
	    console.log(obj.objections)

	    })
	  }

	delete_script(data){
		console.log(data.target)
	  let dbid = data.target.getAttribute('data-dbid')
	  let val = data.target.getAttribute('data-val')
		console.log('deleted_script: ' +val)
		console.log('deleted_script_dbid: ' +dbid)
	  let confirm = window.confirm('Are you sure you want to delete script: '+val)
	  if(confirm){
	  	let scripts_array = this.state.script_names_array
	  	console.log(scripts_array)
	  	let new_scripts_array = scripts_array.filter((obj)=>{
	  		return obj.dbid != dbid
	  	})
	  	console.log(new_scripts_array)
	  	this.setState({
	  		script_names_array:new_scripts_array,
	  		current_script:''
	  	})
	  }


		fetch('/delete_script/'+data)
		  .then((data)=>{
		    console.log(data)
		  })
		  .catch((err)=>{
		    console.log(err)
		  })
	}

	// add_new_script(data){
	// 	console.log('add the scrpt to the list '+data)
	// 	let temp = this.state.script_names_array
	// 	console.log(temp)
	// 	temp.push(data)
	// 	this.set_current_script(data.name)
	// 	this.setState({
	// 		script_names_array:temp
	// 	})

	// }

	set_current_script(script){
		console.log(script)
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

	handle_new_script(data){
		console.log(data)
		//add to scripts_name_array name: dbid:
		let tmp = this.state.script_names_array
		tmp.push({name:data, dbid:12345})
		this.setState({
		  script_names_array:tmp
		})
	}

	filter_script_data(step, callback){
		console.log(step)
		let script_array = this.state.script_data
		script_array.filter((obj)=>{
			if(obj.title === step){
				let index = script_array.indexOf(obj)
				callback(obj, index)
			}
		})
	}

	handle_step_text_box_input(text, current_step){
		console.log(text)
		console.log(current_step)
		let current_state = this.state.script_data
		this.filter_script_data(current_step, (obj, index)=>{

			console.log(index)
			let new_state = this.state.script_data
			new_state[index].text = text
			this.setState({
			  script_data:new_state
			})
		})
		// current_state[current_step].text = text
		// this.setState({
		//   script_data:current_state
		// })
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
  				add_client_response = {this.add_client_response}
  				script_data={this.state.script_data}
  				current_script={this.state.current_script}
  				handle_step_text_box_input={this.handle_step_text_box_input}
  			/>
  			</div>
  		)
  	}
    return (
      <div>
      <Header 
      	add_script={this.handle_new_script}
      	current_script={this.state.current_script}
      	scripts_array={this.state.script_names_array}
      	script_select={this.set_current_script}
      	delete_script={this.delete_script}
      />
      	{render_if_current_script}
      </div>
    );
  }
}

export default App;
