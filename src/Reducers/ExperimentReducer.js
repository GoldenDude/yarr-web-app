import {
  SET_EXPERIMENTS,
  RESET_EXPERIMENTS,
  UPDATE_EXPERIMENT,
  DELETE_EXPERIMENT,
  SELECT_EXPERIMENT,
  TOGGLE_BUILD_EXPERIMENT,
  CHANGE_EXPERIMENT_STATUS
} from "../ActionsTypes/ExperimentActionTypes"

const initialState = {
  experimentList: [],
  experiment: null,
  buildExperiment: false,
  experimentsLoaded: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_EXPERIMENTS: {
      action.data.sort((a, b) => parseInt(b.ExperimentId) - parseInt(a.ExperimentId))
      return {
        ...state,
        experimentList: action.data,
        experimentsLoaded: true
      }
    }
    
    case UPDATE_EXPERIMENT: {
      let newList = state.experimentList.filter(i => i.ExperimentId !== action.data.experimentId)
      let toUpdate = state.experimentList.find(i => i.ExperimentId === action.data.experimentId)
      toUpdate.Title = action.data.title
      toUpdate.Details = action.data.details
      toUpdate.Disability = action.data.disability
      toUpdate.CharacterType = action.data.characterType
      toUpdate.ColorSettings = action.data.colorSettings
      newList.push(toUpdate)
      newList.sort((a, b) => parseInt(b.ExperimentId) - parseInt(a.ExperimentId))
      return {
        ...state,
        experimentList: newList
      }
    }

    case DELETE_EXPERIMENT: {
      const newList = state.experimentList.filter(i => parseInt(i.ExperimentId) !== parseInt(action.data))
      newList.sort((a, b) => parseInt(b.ExperimentId) - parseInt(a.ExperimentId))
      return {
        ...state,
        experimentList: newList
      }
    }

    case TOGGLE_BUILD_EXPERIMENT: {
      return {
        ...state,
        buildExperiment: !state.buildExperiment
      }
    }

    case CHANGE_EXPERIMENT_STATUS: {
      const newList = state.experimentList.filter(i => parseInt(i.ExperimentId) !== action.data.experimentId)
      let toUpdate = state.experimentList.find(i => parseInt(i.ExperimentId) === action.data.experimentId)
      toUpdate.Status = action.data.data.status
      toUpdate.GameCode = action.data.data.gameCode
      newList.push(toUpdate)
      newList.sort((a, b) => parseInt(b.ExperimentId) - parseInt(a.ExperimentId))
      return {
        ...state,
        experimentList: newList
      }
    }

    case SELECT_EXPERIMENT: {
      return {
        ...state,
        experiment: action.data
      }
    }

    case RESET_EXPERIMENTS: {
      return {
        ...state,
        experimentList: [],
        experimentsLoaded: false
      }
    }

    default: {
      return state
    }
  }
}
