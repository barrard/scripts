import React from 'react';
import Events from './event_emitter.js'
import { Button, Row, Col, Glyphicon} from 'react-bootstrap';


let styles = {
  current_objection:{
    textDecoration:'underline'
  },
  new_rebuttle_text_box:{
    height:'2em'
  }
}

class Rebuttle_box extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      client_objection:'',
      step:'Intro',
      new_rebuttle:'',
      objection_rebuttles:[''],
      message:''
    }

    this.handle_rebuttle_text_box_change = this.handle_rebuttle_text_box_change.bind(this)
    this.add_new_rebuttle = this.add_new_rebuttle.bind(this)
    
  }

  componentWillMount(){
    Events.on('set_step', (data)=>{
      console.log('what we got here?')
      console.log(data.obj.objections)
      this.setState({
        objection_rebuttles:[],
        client_objection:''
      })
    })
    Events.on('objection_rebuttles', (data)=>{
      console.log(data)
      this.setState({
        objection_rebuttles:data.next_step,
        message:data.message,
        client_objection:data.key
      })
    })
  }


  handle_rebuttle_text_box_change(e){
    let val = e.target.value
    this.setState({
      new_rebuttle:val
    })
  }

  add_new_rebuttle(){

    let text = this.state.new_rebuttle
    if(!text) return
    let new_rebuttle = {}
    let client_objection = this.state.client_objection
    new_rebuttle.text=text
    new_rebuttle.client_objection=client_objection
    console.log(new_rebuttle)
    Events.emit('add_new_rebuttle', new_rebuttle)
    this.setState({
      new_rebuttle:''
    })
  }

  render(){
    if(!this.state.client_objection)return (<p>select a client response to see the next phase of the script</p>)
    let items = []
    console.log(this.props)
    console.log(this.state)
    let rebuttles_array = this.state.objection_rebuttles
    let message = this.props.message
    console.log(rebuttles_array)
    if(Array.isArray(rebuttles_array)){
      rebuttles_array.forEach((i, key)=>{
        if(i==='' |  i===null || i===undefined) return
          console.log(i)
          let item;
            item = (
              <li
                key={key}
              >
                {i}
              </li>
            )

        items.push(item)

      })
      console.log(items)

    }


    return (
      <div>
        <h4>Rebuttles for the objection: <span style={styles.current_objection}>{this.props.current_objection}</span></h4>
{/*        <input
          onKeyPress={this.handle_enter_key}
          className='nice_input'
          id='add_rebuttle'
          onChange={this.new_rebuttle_value_change}
          type='text' 
          name='objection_rebutle' 
          value={this.state.new_rebuttle}
          placeholder='add a rebuttle to current objection'
        />*/}
        <textarea 
          style={styles.new_rebuttle_text_box}
          autoFocus
          onChange={this.handle_rebuttle_text_box_change} 
          value={this.state.new_rebuttle}
          id='new_objection_rebuttle_textarea' 
          placeholder={'respons to: '+this.state.client_objection}>
        </textarea>
        <Button
          onClick={this.add_new_rebuttle}
          bsStyle="info">
          Add Rebuttle
        </Button>
        <strong>{this.state.message}</strong>
        <ul>
          {items}
        </ul>
      </div>
    )
  }

}

export default Rebuttle_box