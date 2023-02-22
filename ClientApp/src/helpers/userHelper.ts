import ***REMOVED*** FixTypeLater ***REMOVED*** from '../types/FixTypeLater'
import store from '../store/store'

export const mapUserToPropsFromState = (
  state: FixTypeLater
): ***REMOVED*** user: FixTypeLater ***REMOVED*** => ***REMOVED***
  if (state && state.oidc && state.oidc.user) ***REMOVED***
    return ***REMOVED*** user: state.oidc.user ***REMOVED***
***REMOVED*** else ***REMOVED***
    return ***REMOVED*** user: undefined ***REMOVED***
***REMOVED***
***REMOVED***

export const userNameFromState = (): string | null => ***REMOVED***
  const state = store.getState() as FixTypeLater
  if (state && state.oidc && state.oidc.user) ***REMOVED***
    const user = state.oidc.user
    if (user && user.profile && user.profile.name) ***REMOVED***
      return user.profile.name
  ***REMOVED***
***REMOVED***
  return null
***REMOVED***
