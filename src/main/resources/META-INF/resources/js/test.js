// ===== 0. 토스트 알림 함수 =====
function showToast(message, type = 'success') {
    // type : 'success' (초록) / 'danger' (빨강) / 'warning' (노랑)
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toastBody');
    
    if (!toastEl || !toastBody) return;

    // 테마 색상 클래스 변경 및 메시지 주입
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastBody.textContent = message;

    // Bootstrap Toast 인스턴스 생성 및 실행 (3초 뒤 자동 닫힘)
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
}


// ===== 1. 스코프(Scope) 차이 =====
console.log("===== 1. 스코프 차이 =====");
if (true) {
    var a = "var 변수";      // 함수 스코프 (블록 무시)
    let b = "let 변수";      // 블록 스코프
    const c = "const 변수";  // 블록 스코프
}

console.log("var a:", a);       // 출력: "var 변수" (접근 가능)
// console.log("let b:", b);    // ❌ ReferenceError (블록 밖이라 에러)
// console.log("const c:", c);  // ❌ ReferenceError (블록 밖이라 에러)


// ===== 2. 재선언 & 재할당 =====
console.log("===== 2. 재선언 & 재할당 =====");
var x = 10;
var x = 20;                     // 가능 (재선언 가능)
console.log("var 재선언:", x);

let y = 30;
// let y = 40;                  // ❌ SyntaxError (재선언 불가)
y = 40;                         // 가능 (재할당 가능)
console.log("let 재할당:", y);

const z = 50;
// z = 60;                      // ❌ TypeError (재할당 불가, 상수)
console.log("const 값:", z);


// ===== 3. 호이스팅(Hoisting) =====
console.log("===== 3. 호이스팅 =====");
console.log(testVar);           // 출력: undefined (선언만 위로 끌어올려짐)
var testVar = 100;

// 아래 let과 const는 TDZ(Temporal Dead Zone) 제약으로 인해 선언 전 접근 시 에러가 발생합니다.
// 테스트 시 스크립트 중단을 막으려면 콘솔 로그를 주석 처리하세요.
// console.log(testLet);        // ❌ ReferenceError
let testLet = 200;

// console.log(testConst);      // ❌ ReferenceError
const testConst = 300;