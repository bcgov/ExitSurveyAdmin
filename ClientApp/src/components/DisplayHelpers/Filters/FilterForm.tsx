import React from 'react'

import LabelledInput from '../Interface/LabelledItems/LabelledInput'
import LabelledItem from '../Interface/LabelledItems/LabelledItem'
import IconButton from '../Interface/Buttons/IconButton'
import StudyDesignSelect from '../Interface/Selects/StudyDesignSelect'
import CountrySelect from '../Interface/Selects/CountrySelect'
import TreatmentSelect from '../Interface/Selects/TreatmentSelect'
import NHLSubtypeSelect from '../Interface/Selects/NHLSubtypeSelect'

interface IProps {}

export default class FilterForm extends React.Component<IProps> {
  public render(): JSX.Element {
    return (
      <div className="FilterForm">
        {/* <LabelledInput title="Abstract ID" placeholder="12345" />
        <LabelledInput title="First author" placeholder="Smith" />
        <LabelledInput title="Title" placeholder="Multicohort phase study" />
        <hr /> */}
        <div className="row">
          <div className="col">
            <LabelledItem>
              <CountrySelect />
            </LabelledItem>
            <LabelledItem>
              <TreatmentSelect />
            </LabelledItem>
          </div>
          <div className="col">
            <LabelledItem>
              <StudyDesignSelect />
            </LabelledItem>
            <LabelledItem>
              <NHLSubtypeSelect />
            </LabelledItem>
          </div>
          <div className="col">
            {/* <div className="LabelledItem">
              <label style={{ lineHeight: '100%' }}>Publication between</label>
            </div> */}
            <div className="row">
              <div className="col">
                <LabelledInput title="Pub. start year" placeholder="2005" />
              </div>
              <div className="col">
                <LabelledInput title="End year" placeholder="2020" />
              </div>
              <div className="col-12 form-group LabelledItem">
                <label>&nbsp;</label>
                <div className="text-right">
                  <IconButton
                    label="Add filters"
                    iconName="check"
                    marginClasses="mr-3"
                    iconMarginClasses="mr-2"
                  />
                  <IconButton
                    label="Reset all filters"
                    iconName="undo"
                    colorType="secondary"
                    iconMarginClasses="mr-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="mt-0" /> */}
      </div>
    )
  }
}
