import logger from '../../src/logger';
import { track } from '../../src/track';
import { fmt } from '../../src/fmt';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { stub, useFakeTimers } = sinon;
const { expect } = chai;

describe('logger', () => {
  let clock;
  let state;
  let fn;
  let now;
  const consoleLog = console.log;

  before(() => {
    clock = useFakeTimers();
  });

  after(() => {
    clock.restore();
    console.log = consoleLog;
  });

  beforeEach(() => {
    now = stub().returns(1);
    state = { p: { now }, r: {}, triggers: [], fmt };
    fn = logger;
    console.log = stub();
  });

  it('should log to console by default', () => {
    fn(state);
    track.apply(state)(); // track & resolve

    clock.runAll();
    expect(console.log).to.have.been.calledOnce;
  });

  it('can disable debounce', () => {
    fn(state, { ms: 0 });
    track.apply(state)(); // track & resolve
    track.apply(state)(); // track & resolve

    clock.runAll();
    expect(console.log).to.have.been.calledOnce;
  });

  it('should only log diffs by default', () => {
    fn(state);
    track.call(state, 'test1')(); // track & resolve
    track.call(state, 'test2')(); // track & resolve
    clock.runAll();
    track.call(state, 'test1')(); // track & resolve
    clock.runAll();

    expect(console.log).to.have.been.callCount(3);
  });

  it('can disable diffsOnly', () => {
    fn(state, { diffsOnly: false });
    track.call(state, 'test1')(); // track & resolve
    track.call(state, 'test2')(); // track & resolve
    clock.runAll();
    track.call(state, 'test1')(); // track & resolve
    clock.runAll();

    expect(console.log).to.have.been.callCount(4);
  });

  it('should log only once even if multiple events fire in same event loop', () => {
    fn(state);
    track.apply(state)(); // track & resolve
    track.apply(state)(); // track & resolve

    clock.runAll();
    expect(console.log).to.have.been.calledOnce;
  });

  it('support custom logger', () => {
    const logger = stub();
    fn(state, { logger });
    track.apply(state)(); // track & resolve

    clock.runAll();
    expect(logger).to.have.been.calledOnce;
  });

  it('support custom logger with raw output', () => {
    const logger = stub();
    state.fmt = stub();
    fn(state, { logger, raw: true });
    track.apply(state)(); // track & resolve

    clock.runAll();
    expect(logger).to.have.been.calledOnce;
    expect(logger).to.have.been.calledWith({ $: { calls: 1, ms: 0 } });
  });
});
