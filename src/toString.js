export function toString() {
  const ret = [];
  Object.keys(this.r).forEach((k) => {
    ret.push(this.fmt(k, this.r[k]));
  });
  return ret.join("\n");
}
