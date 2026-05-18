// 다크/라이트 모드 토글
function toggleTheme() {

    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    const navbar = document.querySelector('.navbar');

    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {

        btn.textContent = '☀️ LIGHT';

        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');

    } else {

        btn.textContent = '🌙 DARK';

        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
    }
}


// 리스너 방식 연결
document.addEventListener('DOMContentLoaded', function () {

    const themeBtn = document.getElementById('themeToggleBtn');

    themeBtn.addEventListener('click', function () {
        toggleTheme();
    });

});