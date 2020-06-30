/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AdminSetting } from '../../types/AdminSetting'
import { plainToClass } from 'class-transformer'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import EditableStringField from '../Employees/EditableStringField'
import SuccessMessage from '../Employees/SuccessMessage'

interface IProps {}

const AdminInterface = (props: IProps): JSX.Element => {
  const [adminSettings, setAdminSettings] = React.useState<AdminSetting[]>([])
  const [successTime, setSuccessTime] = React.useState(0)
  const [refreshButtonActive, setRefreshButtonActive] = React.useState(false)

  React.useEffect((): void => {
    requestJSONWithErrorHandler(
      `api/adminSettings`,
      'get',
      null,
      'ADMIN_SETTINGS_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => {
        setAdminSettings(responseJSON.map(s => plainToClass(AdminSetting, s)))
      }
    )
  }, [])

  const reconcileEmployees = React.useCallback(() => {
    setRefreshButtonActive(true)
    requestJSONWithErrorHandler(
      `api/CSVExtract/EmployeesFromCSV`,
      'post',
      null,
      'RECONCILIATION_FAILED',
      (): void => {
        setRefreshButtonActive(false)
        setSuccessTime(Date.now())
      }
    )
  }, [])

  return (
    <div className="Centered AdminInterface row">
      <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
        <h1>Admin interface</h1>
        {adminSettings.length > 0 && (
          <div className="row">
            {adminSettings.map(as => (
              <ColumnarLabelledText
                key={as.id}
                label={as.displayName!}
                columnClass="col-12"
              >
                <EditableStringField
                  modelPath={'adminSettings'}
                  validator={(value: string): boolean => {
                    return !isNaN(+value) && +value > 0
                  }}
                  employeeDatabaseId={as.id!}
                  fieldName={'Value'}
                  fieldValue={as.value!}
                  ignoreAdminUserName
                  refreshDataCallback={(): void => {
                    requestJSONWithErrorHandler(
                      `api/adminSettings`,
                      'get',
                      null,
                      'ADMIN_SETTINGS_NOT_FOUND',
                      (responseJSON: FixTypeLater[]): void => {
                        setAdminSettings(
                          responseJSON.map(s => plainToClass(AdminSetting, s))
                        )
                      }
                    )
                  }}
                />
              </ColumnarLabelledText>
            ))}
            <ColumnarLabelledText
              helperText="This will immediately refresh all employee statuses and reconcile employees with CallWeb."
              label="Run reconciliation process"
              columnClass="col-12 mt-3"
            >
              <button
                className="btn btn-primary mt-2"
                onClick={reconcileEmployees}
                disabled={refreshButtonActive}
              >
                {refreshButtonActive
                  ? 'Reconciling...'
                  : 'Run reconciliation process'}
              </button>
              <SuccessMessage className="mt-2" successTime={successTime} />
            </ColumnarLabelledText>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminInterface
