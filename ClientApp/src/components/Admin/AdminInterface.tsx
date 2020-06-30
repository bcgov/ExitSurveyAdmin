/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ***REMOVED*** FixTypeLater ***REMOVED*** from '../../types/FixTypeLater'
import ***REMOVED*** requestJSONWithErrorHandler ***REMOVED*** from '../../helpers/requestHelpers'
import ***REMOVED*** AdminSetting ***REMOVED*** from '../../types/AdminSetting'
import ***REMOVED*** plainToClass ***REMOVED*** from 'class-transformer'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import EditableStringField from '../Employees/EditableStringField'
import SuccessMessage from '../Employees/SuccessMessage'

interface IProps ***REMOVED******REMOVED***

const AdminInterface = (props: IProps): JSX.Element => ***REMOVED***
  const [adminSettings, setAdminSettings] = React.useState<AdminSetting[]>([])
  const [successTime, setSuccessTime] = React.useState(0)
  const [refreshButtonActive, setRefreshButtonActive] = React.useState(false)

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

  const reconcileEmployees = React.useCallback(() => ***REMOVED***
    setRefreshButtonActive(true)
    requestJSONWithErrorHandler(
      `api/CSVExtract/EmployeesFromCSV`,
      'post',
      null,
      'RECONCILIATION_FAILED',
      (): void => ***REMOVED***
        setRefreshButtonActive(false)
        setSuccessTime(Date.now())
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
            <ColumnarLabelledText
              helperText="This will immediately refresh all employee statuses and reconcile employees with CallWeb."
              label="Run reconciliation process"
              columnClass="col-12 mt-3"
            >
              <button
                className="btn btn-primary mt-2"
                onClick=***REMOVED***reconcileEmployees***REMOVED***
                disabled=***REMOVED***refreshButtonActive***REMOVED***
              >
                ***REMOVED***refreshButtonActive
                  ? 'Reconciling...'
                  : 'Run reconciliation process'***REMOVED***
              </button>
              <SuccessMessage className="mt-2" successTime=***REMOVED***successTime***REMOVED*** />
            </ColumnarLabelledText>
          </div>
        )***REMOVED***
      </div>
    </div>
  )
***REMOVED***

export default AdminInterface
