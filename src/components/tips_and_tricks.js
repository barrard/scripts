import React from 'react';
import ClientResponseRptions from './client_response_options.js';
import {Glyphicon, Button} from 'react-bootstrap';
import Font_size_btn from './font_size_btn.js'

let styles={
  edit_tips_btn:{
    position:'absolute',
    top:'5px',
    right:'5px'
  },
  pre_wrap:{
    whiteSpace: 'pre-wrap'
  },
  relative_div:{
    position:'relative'
  }
}

//props
// step
class Tips_and_tricks extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      edit_state:false,
      'Intro':{
        text:`Usually you write
"Hello my name is ________.  BLABH BLAH BHAL....
 Im selling shit,  "
 and end with:
 "Have i caught you at a bad time??`
      },
      'Grab Attention':{
        text:`Name drop?,   Give examples of other companies winning like you with your product
This product is so valueable, it will pay back your initial cost very quickly.  If not quickly, then for sure in the long run!`
      },
      'Qualifying Questions':{
        text:`
"By asking great questions, salespeople create great value in the eyes of their prospects."—Marc Wayshak,
 best-selling author and sales strategist
The feature request only gives you a superficial idea of what the customer
wants your product to do. You need to dig beneath the surface by asking 
questions that uncover the real, pressing need behind this feature.
That’s the best way to refocus the conversation on your product’s value. `

      },
      'Disqualify Statement':{
        text:`
In the big picture, how would solving that problem help your company?
Can any of our current workarounds do that for you?
Is this a make or break issue? Why?`

      },
      'Common Pain Examples':{
        text:'growing a company is hard! my product can help'
      },
      'Build Interest':{
        text:`name drop, examples of other companies winning with your solutions
        What pain does the customer wish my product could relieve?”
        Put yourself in the customer’s shoes. They’re trying to envision
         exactly how your product will make them more successful on a 
         day-to-day basis. When they ask about a missing feature, it 
         means that in their mind, there’s a gap between what your product
          can do and what they need it to do—some burning issue they don’t 
          think it can solve. `
      },
      'Close':{
        text:'Buy now, or you will be sorry'        
      },
      'Good-bye':{
        text:'Ok ill call ya back next year!'
    }

  }
  this.edit_tips = this.edit_tips.bind(this)
  this.handle_tips_and_triks_edit_textbox = this.handle_tips_and_triks_edit_textbox.bind(this)
}

  componentWillMount(){

  }

  handle_tips_and_triks_edit_textbox(e){
    let tmp = {}
    let step = this.props.step
    let val = e.target.value
    console.log(this.state[step].text)
    tmp[step] = {}
    tmp[step].text=val
    this.setState(tmp)

  }

  edit_tips(){
    console.log('edit')
    console.log(this.state.step)
    console.log(this.state[this.state.step])
    let edit_state = !this.state.edit_state
    this.setState({
      edit_state:edit_state
    })
  }

  render(){
    // console.log(this.props)
    // console.log('objections = '+this.props.objections)
    // console.log(this.state)
    let step = this.props.step
    let current_tips = this.state[step]
    // console.log(current_tips)
    // console.log(current_tips['text'])
    let data;
    // console.log('what is edit state?')
    // console.log(this.state.edit_state)
    if(!this.state.edit_state){
      // console.log('what is edit state?')
      // console.log(this.state.edit_state)
      data = <div style={styles.pre_wrap}>{current_tips['text']}</div>
    }else{
      // console.log('what is edit state?')
      // console.log(this.state.edit_state)
      data = (
        <div style={styles.relative_div}>
        <textarea 
          autoFocus
          onChange={this.handle_tips_and_triks_edit_textbox} 
          value={current_tips['text']}
          id='tips_and_triks_edit_textbox' 
          placeholder='edit tips and tricks'>
        </textarea>
        <Font_size_btn
          textarea_id='tips_and_triks_edit_textbox'>
          
        </Font_size_btn>
        </div>
      )
    }
    // console.log(data)
    // console.log(current_tips['text'])

    return(
      <div>
        tips and tricks for 
        <h2>{this.props.step}</h2>
        <Button 
          style={styles.edit_tips_btn}
          onClick={this.edit_tips}>
          
          <Glyphicon
            glyph='edit'>
          </Glyphicon>
        </Button>
        {data}
        <br/><hr/>
        <ClientResponseRptions
          current_objection_message={this.props.current_objection_message}
          current_objection={this.props.current_objection}
          current_rebuttals={this.props.current_rebuttals}
          set_objection_rebuttals={this.props.set_objection_rebuttals}
          add_new_rebuttle={this.props.add_new_rebuttle}
          script_data_index={this.props.script_data_index}
          add_client_response={this.props.add_client_response}
          step={this.props.step}
          script_data={this.props.script_data}
        />
      </div>
    )
  }
}
export default Tips_and_tricks