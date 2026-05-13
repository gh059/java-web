// 성능 측정을 위한 대량의 데이터 생성
const iteration = 1000000;
const simpleArray = [];
const objectArray = [];

console.log("데이터 생성 중...");
for (let i = 0; i < iteration; i++) {
    simpleArray.push(`Item_${i}`);
    objectArray.push({ id: i, title: `Item_${i}`, category: 'General' });
}

// ── 1. 탐색(Search) 성능 테스트 ────────────────────
console.log("\n--- 탐색 성능 테스트 (마지막 요소 찾기) ---");

// 일반 배열 탐색
console.time("Simple Array Search");
const result1 = simpleArray.indexOf("Item_999999");
console.timeEnd("Simple Array Search");

// 객체 배열 탐색 (find 메서드)
console.time("Object Array Search");
const result2 = objectArray.find(item => item.title === "Item_999999");
console.timeEnd("Object Array Search");

// ── 2. 가공(Map) 성능 테스트 ────────────────────
console.log("\n--- 데이터 가공 성능 테스트 (전체 순회) ---");

console.time("Simple Array Map");
simpleArray.map(item => item + "_Updated");
console.timeEnd("Simple Array Map");

console.time("Object Array Map");
objectArray.map(item => ({ ...item, updated: true }));
console.timeEnd("Object Array Map");