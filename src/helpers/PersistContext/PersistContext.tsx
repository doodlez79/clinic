import React from 'react';
import { Persistor } from 'redux-persist/es/types';

const PersistContext = React.createContext<Persistor | null>(null);
export const PersistProvider = PersistContext.Provider;
export default PersistContext;
