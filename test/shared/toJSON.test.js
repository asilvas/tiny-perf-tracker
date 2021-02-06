import { toJSON } from '../../src/toJSON';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const { expect } = chai;

describe('toJSON', () => {
  let state;
  let fn;

  beforeEach(() => {
    state = { r: {} };
    fn = toJSON.bind(state);
  });

  it('should return state response', () => {
    const ret = fn();

    expect(ret).to.be.equal(state.r);
  });
});
