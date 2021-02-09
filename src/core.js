import { create } from "./create";

export default create({ p: globalThis.performance||require('perf_hooks').performance });
