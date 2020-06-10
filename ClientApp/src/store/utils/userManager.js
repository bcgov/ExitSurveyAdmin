import ***REMOVED*** createUserManager ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** userManagerConfig ***REMOVED*** from '../../helpers/envHelper'

const userManager = createUserManager(userManagerConfig)

userManager.clearStaleState()

export default userManager
