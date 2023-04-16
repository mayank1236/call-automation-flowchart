import React from 'react'
import FormContent from './formContent'
import FormHeader from './formHeader'

const FormWrapper = ({ closeForm }: { closeForm: any }) => {
  return (
    <>
      <FormHeader closeForm={closeForm} />
      <FormContent />
    </>
  )
}

export default FormWrapper