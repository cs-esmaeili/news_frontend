import { createContext } from 'react';

export const cModalContext = createContext({
    propValue: '',
    updatePropValue: () => { },
});