export function track(name = "$") {
  const start = this.p.now();
  return () => {
    const elapsed = this.p.now() - start;
    let result = this.r[name];
    if (!result) {
      this.r[name] = result = { calls: 0, ms: 0 };
    }
    result.calls++;
    result.ms += elapsed;

    this.triggers.forEach((t) => t());

    return result;
  };
}
