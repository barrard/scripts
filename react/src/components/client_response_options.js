import React from 'react';
import { Button, Row, Col, Glyphicon} from 'react-bootstrap';
import Events from './event_emitter.js'
import Rebuttle_box from './rebuttle_box.js'

let styles = {
  nice_input:{
    fontSize:'15px',
    margin:'0 5px'
  },

}
// props
// add_client_response={this.props.add_client_response}
// step={this.props.step}
// objections={this.props.objections}
// script_data_index={this.props.script_data_index}

class Client_response_options extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      current_objection:'',
      rebuttle_list_message:'',
      rebuttles:'',
      add_response:'',
      // step_objections : {

        // },
    }
    console.log('client response constructor')
    console.log(this.props)
    this.handle_enter_key = this.handle_enter_key.bind(this)
    this.add_response_change = this.add_response_change.bind(this)
    this.add_client_response = this.add_client_response.bind(this)
    // this.render_button_row = this.render_button_row.bind(this)
  }

  componentWillMount(){
    console.log('client responses? will mount now? wonder what the props are')
    console.log(this.props)
    // Events.on('set_step', (data)=>{
    //   // document.getElementById('text_area').focus()
    //   console.log(data)
    //   this.setState({
    //     step:data.mode,
    //     step_objections:data.obj.objections,
    //     current_objection:'',
    //     rebuttles:''
    //   })
    // })

  }


  add_response_change(e){
    let val = (e.target.value)
    this.setState({
      add_response:val

    })
  }

  handle_enter_key(e){
    console.log(e.key)
    if(e.key == "Enter"){
      console.log("ENTER")
      this.add_client_response()
    }
  }

  add_client_response(){
    let test = this.state.add_response
    if(test === '' || test === undefined || test === null) return
      this.props.add_client_response(this.state.add_response, this.props.step)
    // console.log('addit')
    // let add_response = this.state.add_response
    // let tmp = {...this.state.step_objections}
    // console.log(tmp)
    // tmp[add_response] = {
    //   style:'info',
    //   next_step:[]
    // }
    // console.log(tmp)
    // Events.emit('add_client_response', tmp)
    this.setState({
      add_response:'',
      // step_objections:tmp
    })
  }

  // get_rebuttles(key){
  //   console.log(key)
  //   let rebuttles = this.state.step_objections[key]
  //   let rebuttle_list=[];
  //   let rebuttle_list_message=''
  //   console.log(rebuttles)
  //   for(let key in rebuttles){
  //     console.log(key)
  //     if(key === 'next_step'){
  //         console.log(rebuttles[key])
  //       rebuttle_list.push(rebuttles[key])
  //     }
  //     if(key === 'message'){
  //         console.log(rebuttles[key])
  //       rebuttle_list_message = rebuttles[key]
  //     }


  //   }
  //   console.log(rebuttle_list)
  //   this.setState({
  //     rebuttle_list_message:rebuttle_list_message,
  //     current_objection:key,
  //     rebuttles:rebuttle_list
  //   })
  // }

  render(){
    //get objections form teh script data passed in props
    console.log(this.props)
    let index = this.props.script_data_index
    let objections = this.props.script_data[index].objections
    console.log('rendering client repsponses')
    console.log(objections)
    console.log(this.props)
    
    // let objections = this.props.objections
    let Actions_box = []
    let Response_butons = ()=>{
      let button_row = []
      console.log(objections)
      for (let key in objections){
        console.log(key)
        let btn_details = objections[key]
        btn_details.key=key
        Actions_box.push(<p key={key}>{key}</p>)

        console.log(btn_details)
        let button = (
         <Button
         key={key}
         className='objection_btn'
          bsStyle={btn_details.style}
          onClick={()=>{Events.emit('objection_rebuttles', btn_details)}}
 
          data-dbid='intro'
          >
          {key}
        </Button>

        )
        button_row.push(button)
      }
      return button_row
    }
    return(
      <div>
        <Row>

          <Col>
            <h3>Client Response to {this.props.step}</h3>
            <input
              onKeyPress={this.handle_enter_key}
              className='nice_input'
              id='add_response'
              onChange={this.add_response_change}
              type='text' 
              name='client_response' 
              value={this.state.add_response}
              placeholder='add a possible client response ot this question'
            />
            <Button 
              active
              bsStyle="success" bsSize="large" 
              onClick={this.add_client_response}>Add Response/Answer
            </Button>
          </Col>
       </Row>
       <Row>
        <Response_butons/>
       </Row>
       <Row>
         <Rebuttle_box 
          current_objection={this.state.current_objection}
          rebuttles={this.state.rebuttles}
         />
       </Row>
       <Row>
         <h3>Action to take from this point</h3>

         {Actions_box}
       </Row>
      </div>
    )
  }
}
export default Client_response_options



