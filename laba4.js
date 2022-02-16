// условие задачи смотреть в файле task.docx
// для сравнения результатов вывода программы с результатами, посчитанными
// в excel используйте файл results.xlsx

var RightDerivativeY=[]; 
var CentralDerivativeY =[];
var LeftDerivativeY=[]; 
var SecondDerivativeY=[];
var FirstDerivativeYexact=[];
var SecondDerivativeYexact=[]; 
var x = []; 
var y = [];


//  исходные данные
const h=0.2; 
const a = -1; b=0;

function RoundFunc(number,N){ //функция для усечения
    number=Math.floor(number*N)/N;
    return number;
}

for(let x_i=a*10; x_i<=b; x_i+=h*10){    
    x.push(x_i/10);
}

// function f(x) { return Math.E**x + x*x; }
const f = x=>Math.exp(x)+x*x;
const f_1st_derivative = x=> Math.exp(x)+2*x;
// function f_1st_derivative(x) { return Math.E**x + 2*x; }
const f_2nd_derivative= x=> Math.exp(x)+2;
// function f_2nd_derivative(x) { return Math.E**x + 2; }
//              EXP**x+x**2;
for(let i=0;i<=5;++i){  // подставление конкретных х в функцию y=f(x) и заполнение массива у
    y.push(RoundFunc(f(x[i]),100000000000000));
}  

                        
//  вычисление левой производной, где  LeftDerivativeY - массив с левыми производными
// y - массив значений функции, h - шаг

function f_derivative_approximation(y1,y2,h) { return (y1-y2)/h; }
for(let i=1;i<=y.length-1;++i){
    LeftDerivativeY.push(RoundFunc(f_derivative_approximation(y[i],y[i-1],h),100000));
}

//вычисление правой производной
// y - массив значений функции, h - шаг


for(let i=0;i<=y.length-2;++i){ // n-1=y.length-1-1      
    RightDerivativeY.push(RoundFunc(f_derivative_approximation(y[i+1],y[i],h),100000));
}

// вычисление центральной производной
// y - массив значений функции, h - шаг

for(let i=1;i<=y.length-2;++i){ // n-1=y.length-1-1
    CentralDerivativeY.push(RoundFunc(f_derivative_approximation(y[i+1],y[i-1],2*h), 1000000));
}


// вычисление второй приближенной производной
// y - массив значений функции, h - шаг


function f_2nd_derivative_approximation(y1,y2,y3,h){
    return (y1-2*y2+y3)/h;
}
for(let i=1;i<=y.length-2;++i){ // n-1=y.length-1-1         
    SecondDerivativeY.push(RoundFunc(f_2nd_derivative_approximation(y[i+1],y[i],y[i-1],h*h),1000000));
}
//  f'(x)=exp(x)+2x // вычисление точное значение 1й производной
// y - массив значений функции



for(let i=0;i<=x.length-1;++i){ // n = y.length-1 = 5        
    FirstDerivativeYexact.push(RoundFunc(f_1st_derivative(x[i]),1000000));
}

// f''(x)=exp(x)+2 // вычисление точное значение 2й производной
// y - массив значений функции

for(let i=0;i<=x.length-1;++i){ // n = y.length-1 = 5
    SecondDerivativeYexact.push(RoundFunc(f_2nd_derivative(x[i]),1000000));
}


//вывод результатов подсчетов,
// обозначение |//////////| означает, что тут пусто
console.log('x |',x.join("    |"));  
console.log("y |",y.join("| "));

console.log('\nx         |',x.join("    |"));  
console.log("лев.пр.   |//////////|",LeftDerivativeY.join(" | "));
console.log("прав. пр. |",RightDerivativeY.join(" | "),"|//////////|");
console.log("центр. пр.|//////////|", CentralDerivativeY.join(" | "),"|//////////|");
console.log("f'(x)     |", FirstDerivativeYexact.join(" | "));
console.log('y" прибл. |//////////|',SecondDerivativeY.join(" | "),"|//////////|");
console.log('f"(x)     |',SecondDerivativeYexact.join(" | "));