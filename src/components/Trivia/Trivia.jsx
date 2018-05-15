import React, { Component } from 'react';
import './Trivia.css';
import PropTypes from 'prop-types';

export default class Trivia extends Component {

    constructor(props){
        super(props);
        this.answerContent = props.answerContent;
        this.answerId = props.answerId;
        this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this);
    }

    handleRemoveAnswer(id){
        this.props.removeAnswer(id);
    }

    render(){
        return(
            <div className="answer fade-in">
                <span className="closebtn"
                      onClick={() => this.handleRemoveAnswer(this.answerId)}>
                      &times;
                </span>
                <p className="answerContent">{ this.answerContent }</p>
            </div>
        )
    }
}

Trivia.propTypes = {
    answerContent: PropTypes.string
}
