import { type ReactNode, createContext, useContext } from "react";

const ApiKeyContext = createContext<{ hasKey: boolean }>({ hasKey: true });

export const useApiKey = () => useContext(ApiKeyContext);

const ApiKeyGate = ({ children }: { children: ReactNode }) => {
  return (
    <ApiKeyContext.Provider value={{ hasKey: true }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export default ApiKeyGate;
