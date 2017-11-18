import React from 'react';
import {Row, Col, Label} from 'react-bootstrap';
import Script_layout from './script_layout.js'
import Tips_and_tricks from './tips_and_tricks.js'




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
	},
	padding_left:{paddingLeft:'20px'},
	padding_right:{paddingRight:'20px'}

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
			current_objection:'',
			current_rebuttals:[],
			step:'Intro',
			script_data_index:0

		}
		this.set_objection_rebuttals = this.set_objection_rebuttals.bind(this)
		this.handle_step_text_box_input = this.handle_step_text_box_input.bind(this);
		this.set_step = this.set_step.bind(this);


	}

	componentWillMount() {

	}


	hackey_rebuttle_list_clear(){
		let rebuttle_list = document.getElementById('rebuttle_list');
		// if(!rebuttle_list){
		// 	console.log(rebuttle_list)
		// 	return
		// } else{
		// 	console.log(rebuttle_list)
		// 	return
		// }
		rebuttle_list.innerHTML=''

	}

	set_step(e){
		// this.hackey_rebuttle_list_clear()
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
	      current_objection:'',
	      current_rebuttals:[],
	      script_data_index:index
	    })



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

	  handle_step_text_box_input(event) {
	    let data = event.target.value
	    console.log(data)
	    let current_step = this.state.step
	    this.props.handle_step_text_box_input(data, current_step)

	  }



	  set_objection_rebuttals(btn_details){
	  	console.log(btn_details)
	  	this.setState({
	  	  current_objection:btn_details.key,
	  	  current_rebuttals:btn_details.next_step,
	  	  current_objection_message:btn_details.message
	  	})
	  }


	render(){
		return(

			<div>
				<h2>This is where you can create cold call script</h2>
					<Row>
						<Col style={styles.padding_right} xs={6}>
							<Script_layout
								set_step={this.set_step}
								step={this.state.step}
								script_data={this.props.script_data}
								handle_step_text_box_input={this.handle_step_text_box_input}
							/>
							</Col>
							<Col style={styles.padding_left} xs={6}>
								<Tips_and_tricks
									current_objection_message={this.state.current_objection_message}
									current_objection={this.state.current_objection}
									current_rebuttals={this.state.current_rebuttals}
									set_objection_rebuttals={this.set_objection_rebuttals}									add_new_rebuttle={this.props.add_new_rebuttle}
									script_data_index={this.state.script_data_index}
									add_client_response={this.props.add_client_response}
									step={this.state.step}
									script_data={this.props.script_data}
								/>
							</Col>
						</Row>
			</div>
		)
	}
}

export default Make_new_question_answer_chain


