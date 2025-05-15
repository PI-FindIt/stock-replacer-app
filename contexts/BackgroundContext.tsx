import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import Background from "@/components/Background";

interface BackgroundContextType {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  toggleState: () => void;
}

export const BackgroundContext = createContext<
  BackgroundContextType | undefined
>(undefined);

interface BackgroundProviderProps {
  children: ReactNode;
}

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  const [state, setState] = useState(false);
  const toggleState = () => setState((prev) => !prev);
  const obj = useMemo(() => ({ state, setState, toggleState }), [state]);

  return (
    <BackgroundContext.Provider value={obj}>
      <Background full={state} />
      {children}
    </BackgroundContext.Provider>
  );
};
