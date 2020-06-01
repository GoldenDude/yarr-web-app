import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import StudyReducer from './StudyReducer'
import ExperimentReducer from './ExperimentReducer'
import BreadcrumbsReducer from './BreadcrumbsReducer'
import { USER_LOGOUT } from '../ActionsTypes/UserActionTypes'

const appReducer = combineReducers({
  user: UserReducer,
  study: StudyReducer,
  experiment: ExperimentReducer,
  breadcrumbs: BreadcrumbsReducer
})

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer 
