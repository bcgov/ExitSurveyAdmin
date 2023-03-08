/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** AdminSetting ***REMOVED*** from '../../types/AdminSetting'
import ***REMOVED*** plainToInstance ***REMOVED*** from 'class-transformer'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import EditableStringField from '../DisplayHelpers/Interface/EditableFields/EditableStringField'

import RefreshStatusButton from './RefreshStatusButton'
import ScheduledLoadAndUpdateButton from './ScheduledLoadAndUpdateButton'
import LoadPsaApiButton from './LoadPsaApiButton'
import AdminInterfaceHelp from './AdminInterfaceHelp'

const AdminInterface = (): JSX.Element => ***REMOVED***
  const [adminSettings, setAdminSettings] = React.useState<AdminSetting[]>([])

  React.useEffect((): void => ***REMOVED***
    requestJSONWithErrorHandler(
      `api/adminSettings`,
      'get',
      null,
      'ADMIN_SETTINGS_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => ***REMOVED***
        setAdminSettings(
          responseJSON.map((s) => plainToInstance(AdminSetting, s))
        )
    ***REMOVED***
    )
***REMOVED*** [])

  return (
    <div className="Centered AdminInterface row">
      <div className="col-md-12 col-lg-10 offset-lg-1">
        <h1>Admin interface</h1>
        ***REMOVED***adminSettings.length > 0 && (
          <div className="row">
            <div className="col-6">
              <div className="row">
                ***REMOVED***adminSettings.map((as) => (
                  <ColumnarLabelledText
                    key=***REMOVED***as.id***REMOVED***
                    label=***REMOVED***as.displayName!***REMOVED***
                    columnClass="col-12"
                  >
                    <EditableStringField
                      modelPath=***REMOVED***'adminSettings'***REMOVED***
                      validator=***REMOVED***(value: string): boolean => ***REMOVED***
                        return !isNaN(+value) && +value > 0
                    ***REMOVED******REMOVED***
                      modelDatabaseId=***REMOVED***as.id!***REMOVED***
                      fieldName=***REMOVED***'Value'***REMOVED***
                      fieldValue=***REMOVED***as.value!***REMOVED***
                      ignoreAdminUserName
                      refreshDataCallback=***REMOVED***(): void => ***REMOVED***
                        requestJSONWithErrorHandler(
                          `api/adminSettings`,
                          'get',
                          null,
                          'ADMIN_SETTINGS_NOT_FOUND',
                          (responseJSON: FixTypeLater[]): void => ***REMOVED***
                            setAdminSettings(
                              responseJSON.map((s) =>
                                plainToInstance(AdminSetting, s)
                              )
                            )
                        ***REMOVED***
                        )
                    ***REMOVED******REMOVED***
                    />
                  </ColumnarLabelledText>
                ))***REMOVED***
              </div>
              <RefreshStatusButton />
              <ScheduledLoadAndUpdateButton />
              <LoadPsaApiButton />
            </div>
            <div className="col-6">
              <AdminInterfaceHelp />
            </div>
          </div>
        )***REMOVED***
      </div>
    </div>
  )
***REMOVED***

export default AdminInterface
