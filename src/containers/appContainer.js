
import App from '../components/app';
import { connect } from 'react-redux';
import {
  setQuizQuestions,
  markDifficultySelected,
  resetGame,
  incrementRightAnswers,
  updateCurrentQuestion} from '../actions/actions';

const mapStateToProps = state => {
  return {
    quizData: state.quizData,
    difficultySelected: state.difficultySelected,
    currentQuestion: state.currentQuestion,
    rightAnswers: state.rightAnswers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setQuizData: (quizData) => dispatch(setQuizQuestions(quizData)),
    markDifficultySelected: () => dispatch(markDifficultySelected()),
    resetGame: () => dispatch(resetGame()),
    incrementRightAnswers: () => dispatch(incrementRightAnswers()),
    updateCurrentQuestion: (currentQuestion) =>
      dispatch(updateCurrentQuestion(currentQuestion))
  };
};
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
