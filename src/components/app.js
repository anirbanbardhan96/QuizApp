import React from 'react';
import Button from './button';
import Card from './card';
import { getQuiz } from '../utils/getQuiz';
import Score from './score';

const quizzes = [
  { id: 'easy', title: 'Easy' },
  { id: 'medium', title: 'Medium' },
  { id: 'hard', title: 'Hard' },
  
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

 
  fetchDifficulty(difficultyId) {
    return () => {
      const { setQuizData, markDifficultySelected } = this.props;
      getQuiz(difficultyId)
        .then(quizData => setQuizData(quizData.results))
        .then(() => markDifficultySelected());
    };
  }

  restartGame() {
    const { resetGame } = this.props;
    resetGame();
  }

  checkAnswer(answer, correctAnswer) {
    const {
      incrementRightAnswers,
      updateCurrentQuestion,
      currentQuestion
    } = this.props;
    return () => {
      if (answer === correctAnswer) {
        incrementRightAnswers();
      }
      updateCurrentQuestion(currentQuestion);
    };
  }

  populateQuizCard = (record, index) => {
    const { correct_answer, incorrect_answers, difficulty, question } = record;
    return (
      <Card
        key={index}
        checkAnswerFn={this.checkAnswer}
        question={question}
        duration={10}
        difficulty={difficulty}
        correctAnswer={correct_answer}
        wrongAnswers={incorrect_answers}
      />
    );
  };

  render() {
    const {
      quizData,
      difficultySelected,
      rightAnswers,
      currentQuestion
    } = this.props;
    return (
      <div className="app">
        {!difficultySelected && <React.Fragment><h1>Welcome to Computer Quiz</h1>
        <h3>Pick a Difficulty</h3></React.Fragment>}
        {!difficultySelected &&
          quizzes.map((item, i) => {
            return (
              <Button
                onClick={this.fetchDifficulty(item.id)}
                id={item.id}
              >
                {item.title}
              </Button>
            );
          })}
        {quizData && currentQuestion < 10
          ? this.populateQuizCard(quizData[currentQuestion], currentQuestion)
          : ''}
        {quizData && currentQuestion === 10 ? (
          <Score score={rightAnswers} refresh={this.restartGame} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
