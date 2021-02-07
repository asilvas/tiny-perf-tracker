import { fmt } from "./fmt";
import { toString } from "./toString";
import { toJSON } from "./toJSON";
import { track } from "./track";

export function create(opts = {}) {
  return {
    r: {}, // results
    triggers: [],
    track,
    fmt,
    create,
    toString,
    toJSON,
    ...opts,
  };
}
