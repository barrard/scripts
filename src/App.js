import React, { Component } from 'react';
import Q_and_A from './components/make_question_answers.js'
import Header from './components/header.js'
import PleaseChooseScript from './components/please_choose_script.js'
import './App.css';
import $ from './helper_funcs/dom_helpers.js'
import {Grid, Row, Col} from 'react-bootstrap';


class App extends Component {
	constructor(props) {
		super(props);
		this.state={
			current_objection:'',
			current_rebuttals:[],
			mode:'build',
			current_script:'Demo',
			script_names_array:[
{name: "Demo", dbid: "5a03ee413270977ff1e4bdd9"}
				],
			script_data:[
        {title:'Intro',
          text:`Hi, my name is Dave, can i'd like to tell you about this great new tool that will help triain your sales guys and gals, and increase your revenue!
          Did i catch you at a good time?`,
          objections:{
          	'Yes, dont call me back':{
              style:'danger',
              'message':'If client says no here, the call os over',
              "next_step":[
                'Thank you very much, good-bye',
                'Can we schedule a chat for later?',
                'Do you realize the value on my product?',
                'you risk missing the boat!, act now!'
                ],
                action:'',
            },
            "I'd like to head more":{
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
          text:`This product helped comapny-X's sales shoot to the moon!
        We were featured in business weekly as top tool for 2017!
        You know famous rch guy? He uses our product and sold billions of products with it
         With our product you could expect to gain %15 more sales revenue
          `,
          objections:{
            'No thanks':{
              style:'danger',
              'next_step':[
                'you dont want to go to the moon?',
                'The moon isnt far enough?',
                'how do you doo it?'
              ]
            },
            'No Time':{
              style:'danger',
              'next_step':[
                '',
              ]
            },
            'Too Expensive':{
              style:'danger',
              'next_step':[
                'Let me explain the value of this product and you will realize it far out weighs the expense',
                'This product will pay for itself many times over',
                'This will help you save time and time = $'
              ]
            },
            'Can yo lower your price?':{
              style:'danger',
              'next_step':[
                'This is the best deal we can offer you',
                'Explain again the value',
                'stand by the value of your procduct',
              ]
            },
            'Yes, this sounds good tell me more':{
              style:'success',
              'next_step':[
                'Disqualify Statement',
                'Qualifying Questions',
                'Common Pain Examples',
                'Build Interest'
              ]
            },
          },
          types:['Name Drop', 'Product Value'],
          color:'yellow'},
        {title:'Disqualify Statement',
          text:`you cannot handle the %15 anticipated growth
Can you tell me exactly what problem that feature would solve for you?
Who on your team would that help most?`,
          objections:{},
          types:[],
          color:'yellow'},
        {title:'Qualifying Questions',
          text:`do you do this process and experience this pain, we cna help you!
Ask the right questions`,
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
          objections:{
          	'I need other features':{
          	  style:'danger',
          	  'next_step':[
          	    '“If I had asked people what they wanted, they would have said faster horses.”—Henry Ford',
          	    ''
          	  ]
          	},
          },
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
		this.save_script = this.save_script.bind(this)
	
	
	}

	componentWillMount() {
		console.log('Main App.js will be mounted')
		this.fetch_Script_list()

	}

	add_new_rebuttle(rebuttle_data){
	  console.log(rebuttle_data)
	  this.get_text_via_mode(this.state.script_data, rebuttle_data.step, (obj, index)=>{
	    console.log(obj)
	    console.log(index)
	    let objections = obj.objections
	    console.log(objections)
	    console.log(objections[rebuttle_data.client_objection])
	    if(objections[rebuttle_data.client_objection] === undefined) {
	      console.log('make array?')
	      objections[rebuttle_data.client_objection] = {}
	      objections[rebuttle_data.client_objection].next_step=[]
	    }
	    let specific_objection = objections[rebuttle_data.client_objection]
	    console.log(specific_objection)
	    // console.log(specific_objection.next_step)

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


		fetch('/delete_script/'+dbid)
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
		// this.fetch_script(script)

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
				console.log(data)
				//grab each script name and save in script_names_array
				let script_names_array = []
				data.data.forEach((i, key)=>{
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

	save_script(){
		console.log('Save The Script!!!')
		let script_data=this.state.script_data
		let script_name=this.state.current_script
		let script_model = {
			name:script_name,
			script_data:script_data
		}

		console.log(script_model)
		fetch('/save_script',{
		  method: "POST",
		  body: JSON.stringify( script_model ),
		  headers: { "Content-Type": "application/json" }

		}).then((data)=>{
		  console.log('can i get the id please')
		  return data.json()
		}).then((data)=>{
		    //note error handle bellow is not soing anything
		    if(data.success){
		    	console.log('successful save_script '+data.success)
		    }

		}).catch((ex)=>{
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

  				add_new_rebuttle={this.add_new_rebuttle}
  				add_client_response = {this.add_client_response}
  				script_data={this.state.script_data}
  				current_script={this.state.current_script}
  				handle_step_text_box_input={this.handle_step_text_box_input}
  			/>
  			</div>
  		)
  	}
    return (
				<Grid>
					<Row>
						<Col xs={16}>
							<Header 
								add_script={this.handle_new_script}
								current_script={this.state.current_script}
								scripts_array={this.state.script_names_array}
								script_select={this.set_current_script}
								delete_script={this.delete_script}
								save_script={this.save_script}
							/>
								{render_if_current_script}							
						</Col>
					</Row>
				</Grid>
    );
  }
}

export default App;
