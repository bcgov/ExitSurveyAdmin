/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AdminSetting } from '../../types/AdminSetting'
import { plainToClass } from 'class-transformer'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import EditableStringField from '../Employees/EditableStringField'

import RefreshStatusButton from './RefreshStatusButton'

const AdminInterface = (): JSX.Element => {
  const [adminSettings, setAdminSettings] = React.useState<AdminSetting[]>([])

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
            <RefreshStatusButton />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminInterface
