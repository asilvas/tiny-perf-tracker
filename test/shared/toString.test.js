import { toString } from '../../src/toString';
import { fmt } from '../../src/fmt';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

describe('toString', () => {
  let state;
  let fn;

  beforeEach(() => {
    state = { r: {}, fmt };
    fn = toString.bind(state);
  });

  it('should return an empty string if no results', () => {
    const ret = fn();

    expect(ret).to.be.equal('');
  });

  it('should return a single item', () => {
    state.r.$ = { calls: 1, ms: 10 };
    const ret = fn();

    expect(ret).to.be.equal(fmt('$', state.r.$));
  });

  it('should return two items', () => {
    state.r.$ = { calls: 1, ms: 10 };
    state.r.test = { calls: 2, ms: 5 };
    const ret = fn();

    expect(ret).to.be.equal(fmt('$', state.r.$) + '\n' + fmt('test', state.r.test));
  });
});
