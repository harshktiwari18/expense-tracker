const loginForm = document.getElementById('login-form');

// Check if already logged in - if so, redirect immediately
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'dashboard.html';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() !== '' && password.trim() !== '') {
        // Simulate a successful login 
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        window.location.href = 'dashboard.html'; // redirect to dashboard
    } else {
        alert('Please enter both username and password.');
    }
});
