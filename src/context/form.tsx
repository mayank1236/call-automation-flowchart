import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { NodeContext } from "./node";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";

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

function FormProvider({ children }: Props) {
    const [forms, setForms] = useState<{ [key: string]: any }>({})
    const [formIsOpen, setFormIsOpen] = useState<string>('');

    const openForm = (i: string) => {
        // Initialize Forms
        if (forms[i] == null) {
            setForms(prev => {
                const newForm = { ...prev }
                newForm[i] = {}
                return newForm;
            });
        }

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