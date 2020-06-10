import { createUserManager } from 'redux-oidc'
import { userManagerConfig } from '../../helpers/envHelper'

const userManager = createUserManager(userManagerConfig)

userManager.clearStaleState()

export default userManager
