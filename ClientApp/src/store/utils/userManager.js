import ***REMOVED*** createUserManager ***REMOVED*** from 'redux-oidc'
import ***REMOVED*** getUserManagerConfig ***REMOVED*** from '../../helpers/envHelper'

const userManagerConfig = getUserManagerConfig()

const userManager = createUserManager(userManagerConfig)

export default userManager
