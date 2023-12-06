// signup.js

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    Swal.fire({
        icon: 'success',
        title: 'Daftar Berhasil',
        text: 'Silahkan lakukan login',
        showConfirmButton: false,
        timer: 3000
    });

    setTimeout(() => {
        window.location.href = '../views/login.html';
    }, 4000);
});
