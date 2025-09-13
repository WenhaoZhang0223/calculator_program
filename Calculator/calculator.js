const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  //e.target指向实际被点击的元素
  if (e.target.matches("button")) {
    //检擦被点击的元素是否为按钮
    const key = e.target;
    const action = key.dataset.action;
    const KeyContent = key.textContent;
    const displayedNum = display.textContent; //??
    const previousKeyType = calculator.dataset.previousKeyType;

    //To release the pressed state,remove 'is-depressed' class
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    ); //???

    //如果没有data action属性，那么他就是一个number key
    if (!action) {
      console.log("number key!");
      //替换0， 替换第一个值，显示第二个数字
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
      calculator.dataset.previousKeyType = "number"; //需要重置一下key的类型
    }

    //如果这个key有data-action的属性，且它的值是add, substract, multiply or dive的话
    //那么这个建就是个operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator key!");

      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum; //第二个值始终是显示在计算器上的，第一个值始终是被更新的或是被计算的

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" && //防止多次点击operator后，计算器继续计算
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        //更新被计算的值为第一个数字
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      //加一个class, 表明operator被按下highlighted
      key.classList.add("is-depressed");
      //Add a custom attribute(需要update的时候，我们需要知道前一个键是不是一个operator）
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    //按下小数点，1.已经有小数的情况 2.再按下operator key 之后再按下小数点的情况
    if (action === "decimal") {
      if (!displayedNum.includes(".") && previousKeyType !== "operator") {
        //这要小心哦，逻辑我的天呐
        //若为false 表示计算器上显示的数字没有小数点
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

      //这的类型得定义let,后面还得用，如果在后面再定义的话，会发生冲突
      let firstValue = calculator.dataset.firstValue;
      let secondValue = displayedNum; //记录看下operator key之后的第二个值
      const operator = calculator.dataset.operator;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue; //当我们知道，上一个key type还是equal的时候，就可以用modified value
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
      display.textContent = 0; //CE 清除当前值并显示0，AE清除所有值并显示0

      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
  }
});

const calculate = (n1, operator, n2) => {
  //注意，现在的n1， n2还是string
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
