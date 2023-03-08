/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { FixTypeLater } from '../../types/FixTypeLater'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AdminSetting } from '../../types/AdminSetting'
import { plainToInstance } from 'class-transformer'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import EditableStringField from '../DisplayHelpers/Interface/EditableFields/EditableStringField'

import RefreshStatusButton from './RefreshStatusButton'
import ScheduledLoadAndUpdateButton from './ScheduledLoadAndUpdateButton'
import LoadPsaApiButton from './LoadPsaApiButton'
import AdminInterfaceHelp from './AdminInterfaceHelp'

const AdminInterface = (): JSX.Element => {
  const [adminSettings, setAdminSettings] = React.useState<AdminSetting[]>([])

  React.useEffect((): void => {
    requestJSONWithErrorHandler(
      `api/adminSettings`,
      'get',
      null,
      'ADMIN_SETTINGS_NOT_FOUND',
      (responseJSON: FixTypeLater[]): void => {
        setAdminSettings(
          responseJSON.map((s) => plainToInstance(AdminSetting, s))
        )
      }
    )
  }, [])

  return (
    <div className="Centered AdminInterface row">
      <div className="col-md-12 col-lg-10 offset-lg-1">
        <h1>Admin interface</h1>
        {adminSettings.length > 0 && (
          <div className="row">
            <div className="col-6">
              <div className="row">
                {adminSettings.map((as) => (
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
                      modelDatabaseId={as.id!}
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
                              responseJSON.map((s) =>
                                plainToInstance(AdminSetting, s)
                              )
                            )
                          }
                        )
                      }}
                    />
                  </ColumnarLabelledText>
                ))}
              </div>
              <RefreshStatusButton />
              <ScheduledLoadAndUpdateButton />
              <LoadPsaApiButton />
            </div>
            <div className="col-6">
              <AdminInterfaceHelp />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminInterface
