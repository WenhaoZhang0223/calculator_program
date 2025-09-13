# 步骤

1. html, css 计算机样式先搞出来
2. 给 keys 加监听
   1. number key
   2. operator(+ - × ÷)
   3. decimal key
   4. equals key
   5. clear key
3. 确定点击的 key 的类型
4. 计算器上的显示
   1. 0 替换
   2. 其他数字就 append，还有小数点
   3. 按下 operator keys 的是时候，新的数字代替以前的,判断是否是 operator key
   4. 当按下 equal key 的时候，计算结果（需记录： 1.first number 2.operator 3.second number）注意：calculaye 的时候是 string,所以要转换一下
5. 考虑有人随便按的情况
   1. operator 后再按小数点
   2. 是否已经有小数点了
   3. 再按等号键之前，输入了很多的运算
6. 防止计算器在多次点击 operator 后继续运算
   1. 保证有 firstValue, secondValue, 且 previousKeyType !== 'calculate' &&
      previousKeyType !== 'opaerator
   2. 更新 firstValue
7. 点击key--equal的时候需注意
   1. 没有firstValue 和 secondValue 时候，点击key--equal时候，什么都不应该发生
   2. 连续点击key--equal进行计算
   3. 更新第一个，和第二个值   以及他们的类型
   4. 点击calculator key之后，再点decimal key或者 number key需要显示 “0.”或者number
   5. 在计算后点击operator key, 计算器不应该计算
8. AC 清除
   1. AC 清除所有，将计算器重置到最初的状态
   2. CE 保存previous number， 清除current numbers
   3. 再点击其他键之前：  
      1. AC -> CE 