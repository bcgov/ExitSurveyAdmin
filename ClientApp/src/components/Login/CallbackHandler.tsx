import React from 'react'

interface IProps {}

export default class CallbackHandler extends React.Component<IProps> {
  public render(): JSX.Element {
    console.log('Arrived here')
    return <div className="CallbackHandler"></div>
  }
}
