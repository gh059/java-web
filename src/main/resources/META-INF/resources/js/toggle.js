/**
 * 다크/라이트 모드 토글 및 상태 유지 스크립트
 */
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    const navbar = document.querySelector('.navbar');

    // 라이트 모드 클래스 토글
    body.classList.toggle('light-mode');

    // 현재 상태에 따른 UI 업데이트 및 로컬 스토리지 저장
    if (body.classList.contains('light-mode')) {
        btn.textContent = '☀️ LIGHT';
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
        localStorage.setItem('theme', 'light'); // 상태 저장
    } else {
        btn.textContent = '🌙 DARK';
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
        localStorage.setItem('theme', 'dark'); // 상태 저장
    }
}

/**
 * 페이지 로드 시 저장된 테마 적용
 */
document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    // 저장된 테마가 라이트 모드인 경우 초기화
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeBtn) themeBtn.textContent = '☀️ LIGHT';
        if (navbar) {
            navbar.classList.remove('navbar-dark', 'bg-dark');
            navbar.classList.add('navbar-light', 'bg-light');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});