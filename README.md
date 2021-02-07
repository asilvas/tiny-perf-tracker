# tiny-perf-tracker

![License](https://badgen.net/github/license/asilvas/tiny-perf-tracker)
![circleci](https://badgen.net/circleci/github/asilvas/tiny-perf-tracker/main)
![coverage](https://badgen.net/codecov/c/github/asilvas/tiny-perf-tracker/main)

(Tiny) performance tracker for node.js and browser.

This package includes:

* `tiny-perf-tracker` ![Size](https://badgen.net/badgesize/normal/https/unpkg.com/tiny-perf-tracker/dist/browser.js) - Core performance tracker
* `tiny-perf-tracker/logger` ![Size](https://badgen.net/badgesize/normal/https/unpkg.com/tiny-perf-tracker/dist/logger.js) - Debounced logger for client or server


## Basic usage

```
import perf from 'tiny-perf-tracker';

const somethingDone = perf.track('something');
for (let i = 0; i < 10000000; i++);
somethingDone();
console.log(perf.toString());
```

This signature allows for concurrency without collision since the callback is tied to the original tracker, and not the metric name.


## Detached Loggers

By default, no logger is attached. You can do simple things like:

```
console.log(perf.toString());
```

or write the results to your own custom logger:

```
myLogger.write('perf', perf.toJSON());
```


## Attached Loggers

Optionally you can attach a logger which will automatically be invoked on after 1000ms of log inactivity, like so:

```
import perfLogger from 'tiny-perf-tracker/logger';

perfLogger(perf, {
  logger: console.log // this can be omitted since it is the default
}); // invoked once per metric
// or dump the raw data instead of one string per metric
perfLogger(perf, {
  logger: data => myLogger.write('perf', data),
  raw: true
});
```

You can change the debounce time like so:

```
perfLogger(perf, { ms: 500 });
// or disable debounce entirely
perfLogger(perf, { ms: false });
```


## Node.js File Logger

For node.js there's an additional option for debounced writing of stats to disk:

```
import { perf, logger, fileLogger } from 'tiny-perf-tracker';

logger(perf, fileLogger('./stats.json'));

perf.track('something')();
```


## Custom Format

Yes we know, you hate the current output format. That's OK, we've got your OCD covered!

```
perf.fmt = (key, r) => `* perf:${key}> calls:${r.calls}, ms:${r.ms}`;
```


## New Tracker

If you need to maintain more than one tracker, you can do so via:

```
const newPerf = perf.create();
```
