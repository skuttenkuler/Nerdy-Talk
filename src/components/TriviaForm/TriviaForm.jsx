import React, { Component } from 'react';
import './TriviaForm.css';

export default class TriviaForm extends Component {
    constructor(props){
        super(props);

        this.state = {}

        props.fields.forEach((field) => this.state[field.name] = '');

        console.log(this.state);

        // this.state = {
        //     newAnswerContent1: '',
        //     newAnswerContent2: '',
        //     newAnswerContent3: '',
        // };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeAnswer = this.writeAnswer.bind(this);
    }


    handleUserInput(e, fieldName){

        this.setState({
            [fieldName]: e.target.value, 
        })
    }

    writeAnswer(){
        
        this.props.addAnswer(this.state.newAnswerContent);

        this.setState({
            newAnswerContent: '',
        })
    }

    render(){
        return(
            <div className="formWrapper">
              <form>
                {this.props.fields.map((field) => (
                    <div>
                        <input className="answerInput"
                            placeholder={`Write answer for ${field.name}`}
                            value={this.state[field.name]}
                            onChange={(e) => this.handleUserInput(e, field.name)}
                        />
                    </div>
                ))}
                {/* <div>
                    <input className="answerInput"
                        placeholder="Write Your Answer Here..."
                        value={this.state.newAnswerContent1}
                        onChange={(e) => this.handleUserInput(e, 'newAnswerContent1')}
                    />
                </div>
                <div>
                    <input className="answerInput"
                        placeholder="Write Your Answer Here..."
                        value={this.state.newAnswerContent2}
                        onChange={(e) => this.handleUserInput(e, 'newAnswerContent2')}
                    />
                </div>
                <div>
                    <input className="answerInput"
                        placeholder="Write Your Answer Here..."
                        value={this.state.newAnswerContent3}
                        onChange={(e) => this.handleUserInput(e, 'newAnswerContent3')}
                    />
                </div> */}
                <button className="answerButton"
                onClick={this.writeAnswer}>Submit Answers</button>
                </form>
            </div>

        )
    }
}
