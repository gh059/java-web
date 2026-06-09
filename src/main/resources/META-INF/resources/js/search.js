// document.getElementById('searchForm').addEventListener('submit', function(e) {
// e.preventDefault(); // 폼 기본 동작 차단(새로고침)
// const query = document.getElementById('searchInput').value.trim();
// if (!query) return;
// window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
// });
/**
 * 챔피언 및 뉴스 검색 필터링 스크립트
 */
// ── 챔피언 데이터 ──────────────────────────────────────────────
const CHAMPIONS = [
    { name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: 'image/a1.jpeg', difficulty: '상', modalId: 'modalAatrox' },
    { name: '멜', engName: 'Mel', role: '마법사', lane: '미드', img: 'image/a3.jpeg', difficulty: '중', modalId: 'modalMel' },
    { name: '유나라', engName: 'Yunara', role: '서포터', lane: '바텀', img: 'image/a4.jpeg', difficulty: '하', modalId: 'modalYunara' },
    { name: '자헨', engName: 'Jahen', role: '전사', lane: '탑', img: 'image/a5.jpeg', difficulty: '상', modalId: 'modalJahen' }
];

// ── 뉴스 데이터 ──────────────────────────────────────────────
const NEWS = [
    { title: '새로운 챔피언 출시', desc: '2026 루나 레벨 이벤트! 신규 챔피언과 함께하는 특별한 시즌.', category: '게임 업데이트' },
    { title: '패치 노트 16.4', desc: '챔피언 밸런스 및 아이템 업데이트 내용을 확인하세요.', category: '패치 노트' },
];

// ── 검색 실행 ────────────────────────────────────────────────
function performSearch(query) {
    const q = query.trim().toLowerCase(); 
    if (!q) {
        showMainScreen();
        return;
    }
    
    // 검색어 헤더 업데이트
    document.getElementById('searchKeywordDisplay').textContent = `"${query}"`;

    // 챔피언 필터링
    const champResults = CHAMPIONS.filter(c =>
        c.name.includes(q) || c.engName.toLowerCase().includes(q) ||
        c.role.includes(q) || c.lane.includes(q)
);
// 뉴스 데이터에서 제목, 설명, 카테고리 중 하나라도 검색어에 포함되면
    const newsResults = NEWS.filter(n =>
        n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
);

    // 결과 개수 표시
    document.getElementById('champCount').textContent = `(${champResults.length})`; // 검색 결과 개수를 카운트 영역에 표시
    document.getElementById('newsCount').textContent = `(${newsResults.length})`;
    
    const champList = document.getElementById('championResultList');
    if (champResults.length === 0) {
        champList.innerHTML = `<div class="no-result"><h4>검색 결과 없음</h4><p>"${query}"에 해당하는 챔피언이 없습니다.</p></div>`;
    } else {
        champList.innerHTML = champResults.map(c => `
        <div class="search-result-card d-flex align-items-center p-0 overflow-hidden"
        onclick="showMainScreen()" style="cursor:pointer;" data-bs-toggle="modal"
        data-bs-target="#${c.modalId}">
        <img src="${c.img}" alt="${c.name}">
        <div class="p-3">
            <div class="result-title">${c.name} <span class="result-eng">(${c.engName})</span></div>
            <div class="result-info">역할: ${c.role} &nbsp;|&nbsp; 라인: ${c.lane} &nbsp;|&nbsp; 난이도: ${c.difficulty}</div>
        </div>
        </div>
    `).join('');
    }

    const newsList = document.getElementById('newsResultList');
    if (newsResults.length === 0) {
        newsList.innerHTML = `<div class="no-result"><h4>검색 결과 없음</h4><p>"${query}"에 해당하는 뉴스가 없습니다.</p></div>`;
    } else {
        newsList.innerHTML = newsResults.map(n => `
            <div class="search-result-card p-3" onclick="showMainScreen('newsSection')" style="cursor:pointer;">
        <span style="font-size:0.75rem; background:#c8253a; color:#fff; padding:2px 8px; border-radius:3px;">
            ${n.category}
        </span>

        <div class="result-title mt-2">
            ${n.title}
        </div>

        <div class="result-info">
            ${n.desc}
        </div>
    </div>
`).join('');
    }
    
    // 챔피언 탭 기본 활성화
    switchCategory('champion', document.querySelector('.search-category-item'));
    
    document.querySelectorAll('section').forEach(s => {
        if (s.id !== 'searchResults') {
            s.classList.add('d-none');
        }
    });
    document.getElementById('searchResults').classList.remove('d-none'); 
    document.getElementById('searchResults').style.display = 'block';
}

// ── 카테고리 전환 ────────────────────────────────────────────
function switchCategory(type, el) {
    document.querySelectorAll('.search-category-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('resultChampion').style.display = type === 'champion' ? 'block' : 'none';
    document.getElementById('resultNews').style.display = type === 'news' ? 'block' : 'none';
}

// ── 폼 이벤트 ────────────────────────────────────────────────
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value;
    performSearch(query);
});
    
function showMainScreen(targetId) {
    // 1. 검색 입력창 초기화
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    // 검색 결과 숨기기
    document.getElementById('searchResults').classList.add('d-none');
    document.getElementById('searchResults').style.display = 'none';

    // 메인 화면 다시 보이기
    document.querySelectorAll('section').forEach(s => {
        if (s.id !== 'searchResults') {
            s.classList.remove('d-none');
        }
    });

    // 2. 스크롤 이동 처리
    if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            // 해당 섹션으로 부드럽게 이동
            target.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // 인자가 없으면 페이지 상단으로 이동
        window.scrollTo(0, 0);
    }
}