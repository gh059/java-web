function showToast(message, type = 'success') {
// type : 'success' (초록) / 'danger' (빨강) / 'warning' (노랑)
const toastEl = document.getElementById('liveToast');
const toastBody = document.getElementById('toastBody');
if (!toastEl || !toastBody) return;
// 색상 클래스 변경
toastEl.className =
`toast align-items-center text-white bg-${type} border-0`;
toastBody.textContent = message;
// Bootstrap Toast 실행
const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
toast.show();
}

console.log("===== 1. 스코프 차이 =====");
if (true) {
var a = "var 변수";
let b = "let 변수";
const c = "const 변수";
}
console.log("var a:", a); // 접근 가능
console.log("let b:", b); // ref 에러
console.log("const c:", c); // ref 에러 

console.log("===== 2. 재선언 & 재할당 =====");
var x = 10;
var x = 20; // 가능
console.log("var 재선언:", x);
let y = 30;
// let y = 40; // 에러 (재선언 불가)
y = 40; // 재할당 가능
console.log("let 재할당:", y);
const z = 50;
// z = 60; // 에러 (재할당 불가)
console.log("const 값:", z);

console.log("===== 3. 호이스팅 =====");
console.log(testVar); // undefined
var testVar = 100;
console.log(testLet); // ReferenceError
let testLet = 200;
console.log(testConst); // ReferenceError
const testConst = 300;