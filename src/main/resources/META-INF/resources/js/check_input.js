    function validateAndShowModal() {
        let valid = true;
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        // ① 아이디 : 4~20자 영문/숫자
        const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
        if (!usernameRegex.test(username)) {
            showError('username', '아이디는 4~20자 영문/숫자만 가능합니다.');
            valid = false;
        } else {
            clearError('username');
        }
    
        // ② 패스워드 : 8자 이상, 영문+숫자+특수문자
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            if (!passwordRegex.test(password)) {
                showError('password', '8자 이상, 영문+숫자+특수문자를 포함 필요.');
                valid = false;
            } else {
                clearError('password');
        }
        
        // ③ 패스워드 확인
            if (password !== passwordConfirm) {
                showError('passwordConfirm', '패스워드가 일치하지 않습니다.');
                valid = false;
            } else {
                clearError('passwordConfirm');
        }
        // ④ 이메일 형식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', '올바른 이메일 형식이 아닙니다.');
            valid = false;
        } else {
            clearError('email');
        }
    
        // ⑤ 연락처 형식 : 010-0000-0000
        const phoneRegex = /^010-\d{4}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone', '010-0000-0000 형식으로 입력해주세요.');
            valid = false;
        } else {
            clearError('phone');
        }
    
        // 전체 통과 시 확인 모달 출력
            if (valid) showConfirmModal();
        }

        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            field.classList.add('is-invalid');
            const msg = document.getElementById(fieldId + 'Msg');
            if (msg) msg.textContent = message;
        }

        function clearError(fieldId) {
            const field = document.getElementById(fieldId);
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }

        window.onload = function() {
            const params = new URLSearchParams(window.location.search);
            const error = params.get('error');
        
            if (error === 'duplicate_username') {
                showError('username', '이미 사용 중인 아이디입니다.');
            } else if (error === 'duplicate_email') {
                showError('email', '이미 사용 중인 이메일입니다.');
            }
}
