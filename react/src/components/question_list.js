import React from 'react';
import Events from './event_emitter.js'
import {Table, Glyphicon, Button} from 'react-bootstrap';


let styles={
	btn_text:{
		fontSize:'25px',
	},
	list_question:{
		fontSize:'20px',
	}, 
	btn_margin:{
		margin:'15px',
		float:'right'
	}
}


class Question_list extends React.Component{
	constructor(props) {
		super(props);
		console.log('question list constructor')
		console.log(props)
		this.state={
		}
	}

	componentWillMount() {
		console.log(this.state)
		console.log('question_list_will_mount')

	}

	add_tag(event){
		Events.emit('add_tag', event.target.getAttribute('data-count'))
	}
	add_answer(event){
		Events.emit('add_answer', event.target.getAttribute('data-count'))
	}



	create_question_list(){
		let items = []
		// console.log('Makig question items list?')
		// console.log(this.props)
		// console.log(this.state)
		this.props.Q.forEach((item, key)=>{
			console.log(item)
			items.push(
				<Row_question_item
				add_answer={this.add_answer}
				add_tag={this.add_tag}
					delete_btn={this.props.delete_question}
					count={key}
					key={key}
					val={item.val}
					dbid={item.dbid}
				/>)
		})
		return items
	}

	render(){
		return(
		  <Table striped bordered condensed hover>
		    <thead className='center-content'>
		      <tr onClick={()=>Events.emit('question_row_clicked')}>
		        <th width="1%">#</th>
		        <th width="50%">Question </th>
		        <th width="40%">Possible Response(s)</th>
	        	<th width="1%">Tags</th>
		      	<th width="1%"> x </th>
		      </tr>
		    </thead>
		    <tbody className='center-content'>

			    {this.create_question_list()}

		    </tbody>
		  </Table>

		)
	}
}
export default Question_list


let Row_question_item = (props)=>{
	return(
		<tr onClick={(e)=>Events.emit('question_row_clicked', props)}>		  
		  <td>{props.count}</td>
		  <td>{props.val}</td>
		  <td></td>
		  <td></td>
		  <td>
		  	<Button 
			  	style={styles.btn_margin} 
			  	bsStyle="danger"
			  	onClick={props.delete_btn}
			  	data-dbid={props.dbid}
			  	data-count={props.count}>
			  		<Glyphicon 
			  			data-count={props.count}
			  			data-dbid={props.dbid}
			  			glyph="remove">
			  		</Glyphicon>
			  </Button>
			 </td>
		
		</tr>
	)
}