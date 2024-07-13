document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('logout').addEventListener('click', function (e) {
        e.preventDefault();
        // Clear any stored user data (e.g., cookies, local storage)
        localStorage.removeItem('userType');
        // Redirect to login page
        window.location.href = 'index.html';
    });
});
