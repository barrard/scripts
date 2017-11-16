import React from 'react';
import {Grid, Row, Col, Label} from 'react-bootstrap';
import Script_layout from './script_layout.js'
import Tips_and_tricks from './tips_and_tricks.js'

import Events from './event_emitter.js'



const styles = {
	tags:{
		margin:'5px',
		fontSize:'20px'
	},
	text_edit_div:{
		border:'1px solid black',
		position:'relative'
	},
	span_weight:{
		fontSize:'20px'
	},
	tag_div:{
		display:'flex',
		flexWrap:'wrap',
		border:'1px solid green'
	},
	wide_button:{
		padding:'10px 30px 10px 30px',
		fontSize:'30px'
	},
	question_options:{


	},
	nice_input:{
		fontSize:'15px'
	}
	
}


//props
//current_script
//script_data
class Make_new_question_answer_chain extends React.Component{
	constructor(props) {
		console.log('MAKE Q_A cain compnent constuructor')
		console.log(props)
		super(props);
		this.state={
			step:'Intro',
			script_data_index:0

		}

		this.handle_step_text_box_input = this.handle_step_text_box_input.bind(this);
		this.set_step = this.set_step.bind(this);


	}

	componentWillMount() {
		//this is hackey
		// this.get_objections()
	}



	handle_list_item_clicked(e){
		if(!e){
			console.log('error handler.... :)')
			return
		}
		console.log(e)
	}

	

	set_Question_weight(event){
		let val = event.target.value
		let options = {...this.state.options}
		options.question_weight=val
		this.setState({options})
		console.log(event.target.value)
	}


	get_client_response_array(){
		return this.state.client_responses
	}

	set_step(e){
	  console.log(e.target)
	  let target = e.target
	  let isSelected = target.getAttribute('data-isSelected')
	  console.log(isSelected)
	  //check if the setp is already selected
	  if(isSelected) return
	  let script_length = this.props.script_data.length
	  if(target.getAttribute('data-key')){
	    let key = parseInt(target.getAttribute('data-key'))
	    console.log(key)
	    console.log(script_length)
	    console.log('HAS KEY!! '+key)
	    key +=1
	    console.log(key)
	    //error catch
	    if (key===script_length) return

	    let next_step = document.querySelector('[data-step-key="'+key+'"]')
	    console.log(next_step)
	    next_step.click()

	    
	    return
	  } 
	  let step = target.getAttribute('data-step')
	  if(step === this.state.step) return
	  console.log(e.target)

	  this.get_text_via_mode(this.props.script_data, step, (obj, index)=>{
	    console.log(obj)
	    console.log('emitting set_step')
	    // Events.emit('set_step', data)
	    this.setState({
	      step:obj.title,
	      current_objections:obj.objections,
	      script_data_index:index
	    })
	    //this is hackey
	    // this.get_objections()


	  })

	}


	  get_text_via_mode(obj_array, mode, callback){
	    console.log('obj_array')
	    console.log(obj_array)
	    console.log('mode')
	    console.log(mode)
	    obj_array.filter((obj)=>{
	      if(obj.title === mode){
	        // console.log(obj)
	        // console.log(obj.text)
	        let index = obj_array.indexOf(obj)
	        callback(obj, index)
	      }
	      // // console.log(obj.title === mode)
	      // return obj.title == mode
	    })
	  }

	  handle_step_text_box_input(event) {
	    let data = event.target.value
	    console.log(data)
	    let current_step = this.state.step
	    this.props.handle_step_text_box_input(data, current_step)

	  }

	  get_objections(){
	  	this.get_text_via_mode(this.props.script_data, this.state.step, (obj)=>{
	  		console.log(obj)
	  		this.setState({
	  		   current_objections:obj.objections
	  		 })
	  	})
	  }


	render(){
	// this.get_objections()
		return(

			<div>
				<h2>This is where you can create cold call script</h2>
				<Grid>
					<Row>
						<Col xs={6}>
							<Script_layout
								set_step={this.set_step}
								step={this.state.step}
								script_data={this.props.script_data}
								handle_step_text_box_input={this.handle_step_text_box_input}
							/>
							</Col>
							<Col xs={6}>
								<Tips_and_tricks
									script_data_index={this.state.script_data_index}
									add_client_response={this.props.add_client_response}
									step={this.state.step}
									script_data={this.props.script_data}
								/>
							</Col>
						</Row>
					</Grid>
			</div>
		)
	}
}

export default Make_new_question_answer_chain


