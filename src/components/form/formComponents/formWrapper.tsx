import React from 'react'
import FormContent from './formContent'
import FormHeader from './formHeader'

const FormWrapper = ({formId, closeForm}: {formId: number, closeForm: any}) => {
  return (
    <>
        <FormHeader closeForm={closeForm} formId={formId} />
        <FormContent formId={formId} />
    </>
  )
}

export default FormWrapper