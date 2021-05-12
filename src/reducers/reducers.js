

export const initialState = {
  quizData: null,
  rightAnswers: 0,
  currentQuestion: 0,
  difficultySelected: false
};

export const updateState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUIZ_QUESTIONS':
      return { ...state,
        quizData:action.quizData
      }
    
        
    case 'INCREMENT_RIGHT_ANSWERS':
      return { ...state,
        rightAnswers: state.rightAnswers + 1
      }
    case 'UPDATE_CURRENT_QUESTION':
      return { ...state,
        currentQuestion: state.currentQuestion + 1
      }
    case 'MARK_DIFFICULTY_SELECTED':
      return { ...state,
        difficultySelected: true
      }
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};
