export function fmt(k, r) {
  return `* perf:${k}> calls:${r.calls}, ms:${r.ms.toFixed(2)}`;
}
