import { createContext, ReactNode, useEffect, useState } from "react";

interface Props {
    children?: ReactNode
    // any props that come into the component
}

interface FormContextInterface {
    formIsOpen: any[];
    // setFormIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>
    openForm: (i: number) => void;
    closeForm: () => void;
}

export const FormContext = createContext<FormContextInterface | null>(null);

function FormProvider({ children }: Props) {
    const [formIsOpen, setFormIsOpen] = useState([[false], 0]);
    const openForm = (i: number) => {
        setFormIsOpen((o: any[]) => {
            //Never open first form
            if (i == 0) {
                return o;
            }
            let open = [...o];
            // Check if not defined then open, otherwise close
            if (open[0][i] != null) {
                open[0][i] = !open[0][i];
            } else {
                open[0][i] = true;
            }

            // Closing any other open form tabs
            open[0].forEach((val: boolean, index: number) => {
                if (index != i && val) {
                    open[0][index] = false;
                }
            });

            open[1] = i;
            return open;
        });
    }

    const closeForm = () => {
        setFormIsOpen((open: any[]) => {
            let close = [...open].map((arr, index) => {
                if (index == 0) {
                    return arr = arr.map(() => false)
                } else {
                    return arr
                }
            });

            return close;
        })
    }

    const value = {
        formIsOpen: formIsOpen,
        openForm: openForm,
        closeForm: closeForm
    }

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider;