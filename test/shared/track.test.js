import { track } from '../../src/track';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { stub } = sinon;
const { expect } = chai;

describe('track', () => {
  let state;
  let fn;
  let now;

  beforeEach(() => {
    now = stub().returns(1);
    state = { p: { now }, r: {}, triggers: [] };
    fn = track.bind(state);
  });

  it('should return a function', () => {
    const ret = fn();

    expect(ret).to.be.a('function');
  });

  it('to default name to "$"', () => {
    fn()();

    expect(state.r).to.be.a('object');
    expect(state.r.$).to.be.a('object');
  });

  it('done to return metric status', () => {
    const ret = fn()();

    expect(ret.calls).to.equal(1);
    expect(ret.ms).to.equal(0);
  });

  it('name to be overridable', () => {
    fn('test')();

    expect(state.r).to.be.a('object');
    expect(state.r.test).to.be.a('object');
  });

  it('supports triggers', () => {
    const s = stub();
    state.triggers.push(s);
    const done = fn();
    done();

    expect(s).to.have.been.called;
  });

  it('track metric as 1 call & 1ms', () => {
    state.p.now.returns(1);
    const done = fn();

    state.p.now.returns(2);

    const ret = done();

    expect(ret.calls).to.equal(1, 'calls to equal 1');
    expect(ret.ms).to.equal(1, 'ms to equal 1');
  });

  it('allow done to be called multiple times safely', () => {
    state.p.now.returns(1);
    const done = fn();
    state.p.now.returns(2);
    done(); // 2-1=1
    state.p.now.returns(4);
    const ret = done(); // 4-1=3

    expect(ret.calls).to.equal(2, 'calls to equal 2');
    expect(ret.ms).to.equal(4, 'ms to equal 4');
  });

  it('track 2 calls for same metric', () => {
    state.p.now.returns(1);
    let done = fn();

    state.p.now.returns(2); // 2-1=1

    done();
    done = fn(); // 2nd call

    state.p.now.returns(4); // 4-2=2

    const ret = done(); // 2+1=3

    expect(ret.calls).to.equal(2, 'calls to equal 2');
    expect(ret.ms).to.equal(3, 'ms to equal 3');
  });

  it('track 2 calls for same metric out of order to simulate concurrency', () => {
    state.p.now.returns(1);
    const done1 = fn();
    state.p.now.returns(2);
    const done2 = fn();
    state.p.now.returns(4);
    done2(); // 4-2=2
    state.p.now.returns(6);
    const ret = done1(); // 6-1=5

    expect(ret.calls).to.equal(2, 'calls to equal 2');
    expect(ret.ms).to.equal(7, 'ms to equal 7');
  });
});
