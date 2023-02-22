/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** AdminSetting ***REMOVED*** from '../../types/AdminSetting'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import EditableStringField from '../Employees/EditableStringField'

import RefreshStatusButton from './RefreshStatusButton'
import ScheduledLoadAndUpdateButton from './ScheduledLoadAndUpdateButton'
import LoadPsaApiButton from './LoadPsaApiButton'

const AdminInterface = (): JSX.Element => ***REMOVED***
  const [adminSettings, setAdminSettings] = React.useState<AdminSetting[]>([])

  React.useEffect((): void => ***REMOVED***
    requestJSONWithErrorHandler(
      `api/adminSettings`,
      'get',
      null,
      'ADMIN_SETTINGS_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => ***REMOVED***
        setAdminSettings(responseJSON.map(s => plainToClass(AdminSetting, s)))
    ***REMOVED***
    )
***REMOVED*** [])

  return (
    <div className="Centered AdminInterface row">
      <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
        <h1>Admin interface</h1>
        ***REMOVED***adminSettings.length > 0 && (
          <div className="row">
            ***REMOVED***adminSettings.map(as => (
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
                  employeeDatabaseId=***REMOVED***as.id!***REMOVED***
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
                          responseJSON.map(s => plainToClass(AdminSetting, s))
                        )
                    ***REMOVED***
                    )
                ***REMOVED******REMOVED***
                />
              </ColumnarLabelledText>
            ))***REMOVED***
            <RefreshStatusButton />
            <ScheduledLoadAndUpdateButton />
            <LoadPsaApiButton />
          </div>
        )***REMOVED***
      </div>
    </div>
  )
***REMOVED***

export default AdminInterface
