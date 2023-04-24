import { createContext, ReactNode, useEffect, useState } from "react";

// any props that come into the component
interface Props {
    children?: ReactNode
}

interface FormContextInterface {
    formIsOpen: string;
    openForm: (i: string) => void;
    closeForm: () => void;
    updateForm: React.Dispatch<React.SetStateAction<{}>>;
    forms: {};
}

export const FormContext = createContext<FormContextInterface | null>(null);

const draftForm = localStorage.getItem('formState');

let initState = {};
if (draftForm) {
    initState = JSON.parse(draftForm)
}

function FormProvider({ children }: Props) {
    const [forms, setForms] = useState<{ [key: string]: any }>(initState)
    const [formIsOpen, setFormIsOpen] = useState<string>('');

    useEffect(() => {
        console.log(forms);
    }, [forms])

    const openForm = (i: string) => {
        // Initialize && updating Forms
        setForms(prev => {
            const exists = Object.keys(prev).includes(i);
            const newForm = { ...prev }
            if (!exists) {
                newForm[i] = {};
            }
            return newForm;
        });

        setFormIsOpen((prev: string) => {
            if (prev == i) {
                return '';
            }
            return i;
        });
    }

    const closeForm = () => {
        setFormIsOpen('');
    }

    const value = {
        formIsOpen: formIsOpen,
        openForm: openForm,
        closeForm: closeForm,
        updateForm: setForms,
        forms: forms
    }

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider;