export default function logger(perf, opts = {}) {
  const {
    logger: l = console.log,
    raw = false,
    ms = 1000,
    diffsOnly = true,
  } = opts;

  let timer;
  perf.l = perf.l || {}; // auto-init log calls
  perf.triggers.push(function () {
    if (timer) {
      if (!ms) return; // debounce disabled, always next event loop
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;

      if (raw) {
        l(perf.r);
      } else {
        Object.keys(perf.r).forEach((k) => {
          const res = perf.r[k];
          if (diffsOnly) {
            const prev = perf.l[k];
            if (prev === res.calls) return; // only log diffs
            perf.l[k] = res.calls;
          }
          l(perf.fmt(k, perf.r[k]));
        });
      }
    }, ms);
    timer.unref && timer.unref();
  });
}
