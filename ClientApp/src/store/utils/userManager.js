import { createUserManager } from 'redux-oidc'
import { getUserManagerConfig } from '../../helpers/envHelper'

const userManagerConfig = getUserManagerConfig()

const userManager = createUserManager(userManagerConfig)

export default userManager
