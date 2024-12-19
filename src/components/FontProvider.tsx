import { createContext } from "react";

export const FontContext = createContext({ fontClassName: "font-sans" });

export const FontContextProvider = FontContext.Provider;
