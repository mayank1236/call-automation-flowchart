import React from 'react'
import FormContent from './formContent'
import FormHeader from './formHeader'

const FormWrapper = ({ closeForm, formObj, nodeObj }: { closeForm: any, formObj: any, nodeObj: any }) => {
  return (
    <>
      <FormHeader formObj={formObj} nodeObj={nodeObj} closeForm={closeForm} />
      <FormContent formObj={formObj} nodeObj={nodeObj} />
    </>
  )
}

export default FormWrapper