import { instance } from "./instance";
import { performance as p } from "perf_hooks";

export const perf = instance("$", { p });
export { default as logger } from "./logger";
export { fileLogger } from "./fileLogger";
