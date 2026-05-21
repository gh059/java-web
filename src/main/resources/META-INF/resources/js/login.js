function validateAndLogin() {
submitLogin(); // 유효성 검사(지난 주 문제)
}
async function submitLogin() {
const password = document.getElementById('passwordInput').value;
const hashed = await hashPassword(password);
document.getElementById('password').value = hashed;
document.getElementById('loginForm').submit();
}