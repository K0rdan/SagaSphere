import { API } from "./api";
import { Assets } from "./assets";
import { Config } from "./config";
import { Date } from "./date";
import { Lang } from "./lang";

export * from "./api";
export * from "./assets";
export * from "./date";
export * from "./config";
export * from "./lang";

export const Utils = {
    API,
    Assets,
    Date,
    Config,
    Lang
};

export default Utils;
