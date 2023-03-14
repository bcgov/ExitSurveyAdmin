/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'

import { AdminSetting } from '../../types/AdminSetting'
import { FixTypeLater } from '../../types/FixTypeLater'
import { plainToInstance } from 'class-transformer'
import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import AdminInterfaceHelp from './AdminInterfaceHelp'
import ColumnarLabelledText from '../DisplayHelpers/Interface/LabelledItems/ColumnarLabelledText'
import EditableStringField from '../DisplayHelpers/Interface/EditableFields/EditableStringField'
import RefreshStatusButton from './RefreshStatusButton'
import ScheduledLoadAndUpdateButton from './ScheduledLoadAndUpdateButton'
import LoadPsaApiButton from './LoadPsaApiButton'

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
      <div className="ol-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
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
                <RefreshStatusButton />
                <ScheduledLoadAndUpdateButton />
                {/* <LoadPsaApiButton /> */}
              </div>
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
