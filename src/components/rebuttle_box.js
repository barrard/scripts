import React from 'react';
import { Button, Row, Col, Glyphicon} from 'react-bootstrap';


let styles = {
  current_objection:{
    textDecoration:'underline'
  },
  new_rebuttle_text_box:{
    height:'2em'
  }
}


// current_objection_details={this.state.current_objection_details}
class Rebuttle_box extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      new_rebuttle:'',
      message:''
    }

    this.handle_rebuttle_text_box_change = this.handle_rebuttle_text_box_change.bind(this)
    this.add_new_rebuttle = this.add_new_rebuttle.bind(this)
    
  }

  componentWillMount(){
  }


  objection_rebuttles(data){
    console.log(data)
    this.setState({
      objection_rebuttles:data.next_step,
      message:data.message,
      client_objection:data.key
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
    let client_objection = this.props.current_objection
    new_rebuttle.text=text
    new_rebuttle.client_objection=client_objection
    new_rebuttle.step = this.props.step
    console.log(new_rebuttle)
    this.props.add_new_rebuttle(new_rebuttle)
    this.setState({
      new_rebuttle:''
    })
  }

  render(){
    console.log(this.props)
    console.log(this.state)
    let rebuttle_list = document.getElementById('rebuttle_list');
    let main;
    main = (
      <div>
      <h4>Rebuttles for the objection: <span style={styles.current_objection}>{this.props.current_objection}</span></h4>
      <textarea 
        style={styles.new_rebuttle_text_box}
        autoFocus
        onChange={this.handle_rebuttle_text_box_change} 
        value={this.state.new_rebuttle}
        id='new_objection_rebuttle_textarea' 
        placeholder={'respons to: '+this.props.current_objection}>
      </textarea>
      <Button
        onClick={this.add_new_rebuttle}
        bsStyle="info">
        Add Rebuttle
      </Button>
      <strong>{this.props.current_objection_details.message}</strong>
      </div>

      )
    if(this.props.current_objection === '' || this.props.current_objection === undefined || this.props.current_objection === null){
      main =  (<p>select a client response to see the next phase of the script</p>)
      // return main
    }

    let items = []
    let rebuttles_array = this.props.current_rebuttals
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
          {main}
        <ul id="rebuttle_list">
          {items}
        </ul>
      </div>
    )
  }

}

export default Rebuttle_box