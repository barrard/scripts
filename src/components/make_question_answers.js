import React from 'react';
// import Question_list from './question_list.js';
import {Grid, Row, Col, Label} from 'react-bootstrap';
import Client_response_options from './client_response_options.js';
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
		// padding:'1px',
		// marginLeft:'10px',
		// border:'1px solid red',
		// position:'absolute',
		// dispaly:'flex'

	},
	nice_input:{
		fontSize:'15px'
	}
	
}

class Make_new_question_answer_chain extends React.Component{
	constructor(props) {
		console.log('MAKE Q_A cain compnent constuructor')
		console.log(props)
		super(props);
		this.state={
			step:'Intro',
			steps:props.steps,
			question_value:'',
			options:{
				question_type:'Basic',
				tags:['tags'],
				question_weight:1
			},
			client_response:'',
			client_responses:[]
		}
		this.client_response_change = this.client_response_change.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.set_Question_weight = this.set_Question_weight.bind(this);
		this.type_change = this.type_change.bind(this);
		this.add_tag = this.add_tag.bind(this);
		this.add_client_response = this.add_client_response.bind(this);


	}

	componentWillMount() {
		Events.on('set_step', (data)=>{
			console.log(data)
			this.setState({
				step:data.mode,
				question_value:data.obj.text
			})
		})
		Events.on('add_tag', ()=>{
			this.add_tag()
		})
		Events.on('question_row_clicked', (e)=>{
			this.handle_list_item_clicked(e)
		})
	}

	

	add_client_response(e){
		let client_response_array = this.state.client_responses;
		client_response_array.push(this.state.client_response)
		let arr = this.get_client_response_array()
		console.log(arr)
		this.setState({
			client_responses:client_response_array,
			client_response:''
		})
	}

	client_response_change(e){
		this.setState({
			client_response:e.target.value
		})
	}

	handle_list_item_clicked(e){
		if(!e){
			console.log('error handler.... :)')
			return
		}
		console.log(e)
	}

	handleChange(event) {
		let data = event.target.value
	  this.setState({question_value: data});
	  Events.emit('step_input_change', data)
	}

	add_tag(event){
		// let val = event.target
		let tags = document.querySelectorAll('[name=question_tags]')[0]
		var val = tags.value

		if(val===null||val==="") return false
		let options = {...this.state.options}
		console.log(options.tags)
		options.tags = options.tags.concat(val.split(','))
		this.setState({options})
		tags.value=''
	}

	type_change(event){
		// console.log(event)
		let options = {...this.state.options}
		let type = event.target.value
		options.question_type = type
		this.setState({
			options:options
		})

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

	render(){
		let tags = []
		this.state.options.tags.forEach((i, key)=>{
			tags.push(<Label key={key}style={styles.tags}>{i}</Label>)
		})
		console.log(this.state.step)

		return(
			<div>
				<h2>This is where you can create cold call script</h2>
				<div style={styles.text_edit_div}>
					<Row>
						<Col xs={5} className='border-blue'>
						<h4>{this.state.step}</h4>
							<textarea 
								onChange={this.handleChange} 
								value={this.state.question_value}
								id='main_text' 
								placeholder={this.state.step}>hi</textarea>

						</Col>
						<Col xs ={5}>
							<Client_response_options
								step={this.state.step}
							/>
						</Col>
					</Row>
					<Row>		
					</Row>
				</div>
				<Grid>
					<Row>
						<Col xs={6}>
							<Script_layout
								step={this.state.step}
							/>
							</Col>
							<Col xs={6}>
								<Tips_and_tricks
								step={this.state.step}
								/>
							</Col>
						</Row>
					</Grid>
			</div>
		)
	}
}

export default Make_new_question_answer_chain
// let handleKeyPress = (event) => {
//   if(event.key == 'Enter'){
//     console.log('enter press here! ')
//     Events.emit('add_tag')
//   }
// }


