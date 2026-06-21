"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CursorState = {
  active: boolean;
  text: string;
};

type CursorContextType = {
  cursor: CursorState;
  setCursor: (cursor: CursorState) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorState>({ active: false, text: "" });

  const resetCursor = () => setCursor({ active: false, text: "" });

  return (
    <CursorContext.Provider value={{ cursor, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
