import React, { type JSX } from 'react'

interface Props {
  title: string
  children: React.ReactNode
}

const AdminInterfaceHelpTopic = ({ title, children }: Props): JSX.Element => {
  return (
    <div className="AdminInterfaceHelpTopic">
      <h3 className="mt-4 mb-2">{title}</h3>
      {children}
    </div>
  )
}

export default AdminInterfaceHelpTopic
