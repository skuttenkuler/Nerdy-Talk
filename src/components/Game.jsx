import React, { Component } from 'react';
import Trivia from './Trivia/Trivia';
import TriviaForm from './TriviaForm/TriviaForm';
import { firebaseApp } from '../firebase';
//import './Game.css'



export default class Game extends Component {

  constructor(props){
    super(props);
    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);

    this.app = firebaseApp;
    this.database = this.app.database().ref().child('answers');

    // We're going to setup the React state of our component
    this.state = {
      answers: [],
    }
  }

  componentWillMount(){
    const previousAnswers = this.state.answers;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousAnswers.push({
        id: snap.key,
        answerContent: snap.val().answerContent,
      })

      this.setState({
        answers: previousAnswers
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousAnswers.length; i++){
        if(previousAnswers[i].id === snap.key){
          previousAnswers.splice(i, 1);
        }
      }

      this.setState({
        answers: previousAnswers
      })
    })
  }

  addAnswer(answer){
    this.database.push().set({ answerContent: answer});
  }

  removeAnswer(answerId){
    console.log("from the parent: " + answerId);
    this.database.child(answerId).remove();
  }

  render() {
    const fields = [{ name: 'input1' }, { name: 'input2' }, { name: 'input3' }];

    return (
      <div className="answersWrapper">
        <div className="answersHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="answersBody">
          {
            this.state.answers.map((answer) => {
              return (
                <Trivia answerContent={answer.answerContent}
                answerId={answer.id}
                key={answer.id}
                removeAnswer ={this.removeAnswer}/>
              )
            })
          }
        </div>
        <div className="answersFooter">
          <TriviaForm addAnswer={this.addAnswer} fields={fields} />
        </div>
      </div>
    );
  }
}
