"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { PublicMosque } from "@/types/public";

const defaultPublicMosque: PublicMosque = {
  mosqueName: "",
  description: "",
  logoURL: "",
  heroImageURL: "",

  address: "",
  latitude: undefined,
  longitude: undefined,

  phone: "",
  email: "",
  mapURL: "",

  shortHistory: "",
  vision: "",
  mission: "",
  operationalHours: "",
};

const PublicContext = createContext<PublicMosque>(defaultPublicMosque);

interface PublicProviderProps {
  value: PublicMosque;
  children: ReactNode;
}

export function PublicProvider({
  value,
  children,
}: PublicProviderProps) {
  return (
    <PublicContext.Provider value={value}>
      {children}
    </PublicContext.Provider>
  );
}

export function usePublicData() {
  return useContext(PublicContext);
}