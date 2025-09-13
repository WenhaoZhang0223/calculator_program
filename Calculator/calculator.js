const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  //e.targetָ��ʵ�ʱ������Ԫ��
  if (e.target.matches("button")) {
    //����������Ԫ���Ƿ�Ϊ��ť
    const key = e.target;
    const action = key.dataset.action;
    const KeyContent = key.textContent;
    const displayedNum = display.textContent; //??
    const previousKeyType = calculator.dataset.previousKeyType;

    //To release the pressed state,remove 'is-depressed' class
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    ); //???

    //���û��data action���ԣ���ô������һ��number key
    if (!action) {
      console.log("number key!");
      //�滻0�� �滻��һ��ֵ����ʾ�ڶ�������
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = KeyContent;
      } else {
        //To append a number, we concatenate a string
        display.textContent = displayedNum + KeyContent;
      }
      calculator.dataset.previousKeyType = "number"; //��Ҫ����һ��key������
    }

    //������key��data-action�����ԣ�������ֵ��add, substract, multiply or dive�Ļ�
    //��ô��������Ǹ�operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator key!");

      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum; //�ڶ���ֵʼ������ʾ�ڼ������ϵģ���һ��ֵʼ���Ǳ����µĻ��Ǳ������

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" && //��ֹ��ε��operator�󣬼�������������
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        //���±������ֵΪ��һ������
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      //��һ��class, ����operator������highlighted
      key.classList.add("is-depressed");
      //Add a custom attribute(��Ҫupdate��ʱ��������Ҫ֪��ǰһ�����ǲ���һ��operator��
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    //����С���㣬1.�Ѿ���С������� 2.�ٰ���operator key ֮���ٰ���С��������
    if (action === "decimal") {
      if (!displayedNum.includes(".") && previousKeyType !== "operator") {
        //��ҪС��Ŷ���߼��ҵ�����
        //��Ϊfalse ��ʾ����������ʾ������û��С����
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "calculate") {
      console.log("equal key");

      //������͵ö���let,���滹���ã�����ں����ٶ���Ļ����ᷢ����ͻ
      let firstValue = calculator.dataset.firstValue;
      let secondValue = displayedNum; //��¼����operator key֮��ĵڶ���ֵ
      const operator = calculator.dataset.operator;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue; //������֪������һ��key type����equal��ʱ�򣬾Ϳ�����modified value
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }

    if (action === "clear") {
      console.log("clear key");

      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.secondValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.previousKeyType = "";
      } else {
        //CE
        const clearButton = calculator.querySelector("[data-action = clear]");
        clearButton.textContent = "AC";
      }
      display.textContent = 0; //CE �����ǰֵ����ʾ0��AE�������ֵ����ʾ0

      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
  }
});

const calculate = (n1, operator, n2) => {
  //ע�⣬���ڵ�n1�� n2����string
  let result;

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2); //convert string into float first
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};
