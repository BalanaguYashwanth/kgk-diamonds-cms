"use client";
import { createContext, useContext, useMemo } from "react";
import { PluginSystem } from "../PluginSystem";
import VideoEmbedPlugin from "../plugins/videoEmbed";

export const PluginContext = createContext();

export const usePluginContext = () => useContext(PluginContext);

export const PluginProvider = ({ children }) => {
  const pluginSystem = useMemo(() => {
    const ps = new PluginSystem();
    ps.registerPlugin(VideoEmbedPlugin);
    ps.bootPlugins();
    return ps;
  }, []);

  return (
    <PluginContext.Provider value={{ pluginSystem }}>
      {children}
    </PluginContext.Provider>
  );
};
