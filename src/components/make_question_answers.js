import React from 'react';
import Question_list from './question_list.js';
import { Button, Grid, Row, Col, Label} from 'react-bootstrap';
import InputRange from 'react-input-range';

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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.set_Question_weight = this.set_Question_weight.bind(this);
		this.type_change = this.type_change.bind(this);
		this.add_tag = this.add_tag.bind(this);
		this.add_client_response = this.add_client_response.bind(this);


	}

	componentWillMount() {
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
	  this.setState({question_value: event.target.value});
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

	handleSubmit(event) {
		console.log(this.state.question_value)
		let opt = this.state.options

		let data = {
			script_name:this.props.current_script,
			val:this.state.question_value,
			type:opt.question_type,
			tags:opt.tags,
			weight:opt.question_weight,

		}
		console.log(data)
		Events.emit('new_question', data);
		fetch('/add_question', {
			method:'post', 
			body:JSON.stringify(data),
			headers: { "Content-Type": "application/json" }
		})
			.then((resp)=>{
				console.log(resp)
				return resp.json()
			})
			.then((data)=>{
				console.log('Handle submite question')
				console.log(data)
			})
			.catch((ex)=>{
				console.log('err?')
				console.log(ex)
			})
	  	event.preventDefault();
	  	this.setState({
	  	question_value:''
	  })
	}

	get_client_response_array(){
		return this.state.client_responses
	}

	render(){
		let Q = this.props.Q
		let tags = []
		this.state.options.tags.forEach((i, key)=>{
			tags.push(<Label key={key}style={styles.tags}>{i}</Label>)
		})
		// console.log('mkae_quetion andwer render what is Q?')
		// console.log(this.props.Q)
		return(
			<Grid>
				<h2>This is where you can create new question&Answer chains</h2>
				
				<div style={styles.text_edit_div}>
					<h4>Question</h4>
					<Row>
						<Col xs={6} className='border-blue'>
							<textarea 
								onChange={this.handleChange} 
								value={this.state.question_value}
								id='main_text' 
								placeholder="Question...?">hi</textarea>

						</Col>
						<Col xs={6} className='border-red'>
							<Question_options
								type_change={this.type_change}
								type_val={this.state.options.question_type}
								tags={tags}
								add_tag={this.add_tag}
								weight={this.state.options.question_weight}
								set_weight={this.set_Question_weight}
							/>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
						<h3>Client Response options</h3>
							<div>
								<input 
									onChange={this.client_response_change}
									style={styles.nice_input}
									type='text' 
									name='client_response' 
									value={this.state.client_response}
									placeholder='add a possible client response ot this question'
								/>
								<Button 
									style={styles.wide_button}
									active
									bsStyle="success" bsSize="large" 
									onClick={this.add_client_response}>Add Response/Answer
								</Button>
							</div>
						</Col>
					</Row>
					<Create_question_btn 
						onClick={this.handleSubmit}
					/>
					<Question_list
						Q={Q}
						delete_question={this.props.delete_question}
						
					/>
				</div>

			</Grid>
		)
	}
}

export default Make_new_question_answer_chain
let handleKeyPress = (event) => {
  if(event.key == 'Enter'){
    console.log('enter press here! ')
    Events.emit('add_tag')
  }
}
let Question_options = (props) => {
	return(
		<div style={styles.question_options}>
			<div>
				<label 
					className="labels" 
					htmlFor="question_type">
					Question Type
				</label>
				<input 
					onChange={props.type_change}
					style={styles.nice_input}
					type='text' 
					name='question_type' 
					value={props.type_val}
				/>

			</div>
			<div>
				<label 
					className="labels"
					htmlFor="question_tags">
					Question Tags
				</label>
				<input 
					onKeyPress={handleKeyPress}
					style={styles.nice_input}
					type='text' 
					name='question_tags' 
					value={props.type_tags}
				/>
				<button onClick={props.add_tag}>add tag</button>
				<div style={styles.tag_div}>{props.tags}</div>
			</div>
			<div>
				<label 
					className="labels"
					htmlFor="question_weight">
					Question Weighted value
				</label>
				<span style={styles.span_weight}>{props.weight}</span>
				<input
					min='0'
					max='10'
					type='range'
					name='question_weight'
					value={props.weight}
					onChange={props.set_weight}
				/>
			</div>

		</div>
	)
}
let Create_question_btn = (props) =>{
	return (
		<Button style={styles.wide_button}bsStyle="primary" bsSize="large" active onClick={props.onClick}>Add Question</Button>

		// <button onClick={props.onClick}>butt</button>
	)
}

