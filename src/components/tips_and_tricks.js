import React from 'react';

class Tips_and_tricks extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      'Intro':{
        text:'hi'
      },
      'Grab Attention':{
        text:'attention grabbing'
      },
      'Qualifying Questions':{
        text:'do you do this process and experience this pain, we cna help you!'

      },
      'Disqualify Statement':{
        text:'you cannot handle the %15 anticipated growth'

      },
      'Common Pain Examples':{
        text:'growing a company is hard! my product can help'
      },
      'Build Interest':{
        text:'name drop, examples of other companies winning with your solutions'
      },
      'Close':{
        text:'Buy now, or you will be sorry'        
      }

    }
  }

  render(){
    console.log(this.props.step)
    let current_tips = this.state[this.props.step]
    console.log(current_tips)
    console.log(current_tips['text'])
    let data = current_tips['text']

    return(
      <div>
        tips and tricks for 
        <h2>{this.props.step}</h2>
        {data}
      </div>
    )
  }
}
export default Tips_and_tricks