import { create } from "./create";
import { performance as p } from "perf_hooks";

export const perf = create("$", { p });
export { default as logger } from "./logger";
export { fileLogger } from "./fileLogger";
