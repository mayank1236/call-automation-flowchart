import { useState } from "react";
import { parse, stringify } from "flatted";
import { DefaultNodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";

export default function useLocalStorage(key: string, initialValue: any) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            let newItem;
            if (item) {
                newItem = Object.keys(parse(item)).map((it: any, index: number) => {
                    return converToNode(parse(item)[it])
                })
            }
            return item ? newItem : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: any) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}

function converToNode(obj: any) {
    const node = new DefaultNodeModel(obj);
    // obj.options.type, obj.options.id
    // node.setPosition(obj.position);
    // node.setWidth(obj.width);
    // node.setHeight(obj.height);
    // // set listeners
    // Object.keys(obj.listeners).forEach((key) => {
    // const listener = obj.listeners[key];
    // node.registerListener({
    //     ...listener,
    //     element: null // remove reference to the DOM element
    // });
    // });
    // // set ports
    // Object.keys(obj.ports).forEach((key) => {
    // const port = obj.ports[key];
    // // create a new port instance
    // const newPort = node.addPort(
    //     new DefaultPortModel(
    //         port.isIn,
    //         port.name,
    //         port.label || port.name
    //     )
    // );
    // // set properties of the new port instance
    // newPort.setPosition(port.position);
    // newPort.setMaximumLinks(port.maximumLinks);
    // });
    return node;
}