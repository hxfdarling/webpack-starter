
import Calculator from '../../../src/Calculator.js'
describe('Calculator', () => {
  it('加法运算', () => {
    const calculator = new Calculator();
    const sum = calculator.add(5, 2);
    expect(sum).to.equal(7)
  });

  it('减法运算', () => {
    const calculator = new Calculator();
    const sub = calculator.sub(5, 2);
    expect(sub).to.equal(3);
  });
  it("乘法运算", () => {
    const calculator = new Calculator();
    const sub = calculator.mul(5, 2);
    expect(sub).to.equal(10);
  })
  it("除法运算", () => {
    const calculator = new Calculator();
    const sub = calculator.div(10, 2);
    expect(sub).to.equal(5);
  })
});
