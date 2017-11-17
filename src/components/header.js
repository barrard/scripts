import React from 'react';
import {Glyphicon, Button, Modal, Row, Col} from 'react-bootstrap';
import Events from './event_emitter.js'
import CreateScriptModal from './make_script_modal.js'
// import Clients_manager from './clients_manager.js'
// import Client_response_options from './client_response_options.js'

let styles = {
  header_container:{
    border:'green solid 1px',
    position:'relative',
    minHeight:'9em'
  },
  scripts_container:{
    border:'solid 1px blue',
    position:'absolute',
    right:'0',
    height:'5em',
    width:'10em',
    fontSize:'2em',
    overflow:'scroll'
  },
  create_script_btn:{
    position:'absolute',
    bottom:'0',

  }
}

class Header extends React.Component{
	constructor(props) {
		super(props);
		this.state={
      scripts_array:[],
      new_script_name:'',
		}
    // this.handle_new_script_change = this.handle_new_script_change.bind(this)
	}

	componentWillMount() {
		// fetch('/get_script_list').then((resp)=> resp.json())
  //     .then((data)=>{
  //     console.log('got script list?')
  //     console.log(data)
  //     })
  //     .catch((ex)=>{
  //       console.log('err?')
  //       console.log(ex)
  //     })
	}

  // add_new_script(){
  //   let new_script_name = document.getElementById('new_script_name').value
  //   console.log(new_script_name)
  //   let payload = {script_name:new_script_name}
    //for demo only
    // Events.emit('add_new_script', {name:new_script_name, dbid:'1234-abcd'})

    // fetch('/add_script',{
    //   method: "POST",
    //   body: JSON.stringify( payload ),
    //   headers: { "Content-Type": "application/json" }

    // }).then((data)=>{
    //   console.log('can i get the id please')
    //   return data.json()
    // }).then((data)=>{
    //     //add error handle
    //     if(data.success){
    //       //get teh last added scrpipt dom element
    //       Events.emit('add_new_script', {name:new_script_name, dbid:data.success})

    //     }

    // })
  // }


  // emit_clicked_script_item(e){
  //   let val = e.target.getAttribute('data-val')
  //   console.log(val)
  //   Events.emit('set_current_script', val)
  // }

  // delete_script(e){
  //   let dbid = e.target.getAttribute('data-dbid')
  //   let val = e.target.getAttribute('data-val')
  //   let confirm = window.confirm('Are you sure you want to delete script: '+val)
  //   if(confirm){
  //     let scripts_array = this.props.scripts_array
  //     console.log(scripts_array)
  //     Events.emit('delete_script', dbid)


  //   }
  // }

  scripts_container(){
    let create_scripts_list = () => {
      if(this.props.scripts_array===undefined || this.props.scripts_array.length ===0) {
        console.log('OH NO UNDEFINED!')
        return
      }
      let items = []
    console.log('lets make some script contianer things')
    console.log(this.props.scripts_array)
      this.props.scripts_array.forEach((item, key)=>{
        // console.log(item)
        items.push(

          <li
            onClick={(e)=> this.props.script_select(e.target.getAttribute('data-val'))}
            className='script_list_item'
            count={key}
            key={key}
            data-val={item.name}
            data-dbid={item.dbid}>
            <Button 
              className="details_script_item" 
              bsStyle="info"
              onClick={()=>console.log('hi')}
              data-dbid={item.dbid}>
              <Glyphicon 
                data-dbid={item.dbid}
                glyph="list">
              </Glyphicon>
            </Button>

            {item.name}
            <Button 
              className="delete_script_item" 
              bsStyle="danger"
              onClick={(e)=> this.props.delete_script(e)}
              data-dbid={item.dbid}
              data-val={item.name}>
              <Glyphicon 
                data-dbid={item.dbid}
                glyph="remove"
                data-val={item.name}>
              </Glyphicon>
            </Button>

          </li>)
      })
      return items
    }

    return(
      <div style = {styles.scripts_container}>
        scripts
        <ul className='script_list_container'>
          {create_scripts_list()}
        </ul>
      </div>
    )
  }





  render(){
    let Scripts_container = ()=> this.scripts_container()
    console.log('RENDERING HEADER  LETS CHECK THE SCRIPTS')
    console.log(this.props.current_script)

    return(
      <div style = {styles.header_container}>
      <Row>
        <Col xs={4}>      
          <CreateScriptModal
            add_script={this.props.add_script}
          />
        </Col>

        <Col xs={4}>
          <h1 className="center_text">Sale script creater<span className="blinker"></span></h1>
          <h2 className="center_text">{this.props.current_script}</h2>
        </Col>
        <Col xs={4} className="position-relative">
          <Scripts_container />

        </Col>        
      </Row>
      </div>
    )
  }
}
export default Header