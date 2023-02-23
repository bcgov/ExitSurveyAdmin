import { FixTypeLater } from '../types/FixTypeLater'
import store from '../store/store'

export const mapUserToPropsFromState = (
  state: FixTypeLater
): { user: FixTypeLater } => {
  if (state && state.oidc && state.oidc.user) {
    return { user: state.oidc.user }
  } else {
    return { user: undefined }
  }
}

export const userNameFromState = (): string | null => {
  const state = store.getState() as FixTypeLater
  if (state && state.oidc && state.oidc.user) {
    const user = state.oidc.user
    if (user && user.profile && user.profile.name) {
      return user.profile.name
    }
  }
  return null
}
