import React, { createContext, FC, useMemo, useState } from "react";
import Background from "@/components/Background";

interface BackgroundContextType {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleState: () => void;
}

export const BackgroundContext = createContext<
  BackgroundContextType | undefined
>(undefined);

export const BackgroundProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
