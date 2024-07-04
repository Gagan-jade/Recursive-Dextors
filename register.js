document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.login__form');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.querySelector('input[placeholder="Name"]').value;
        const phone = document.querySelector('input[placeholder="Phone Number"]').value;
        const email = document.querySelector('input[placeholder="Email ID"]').value;
        const password = document.querySelector('input[placeholder="Password"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    });
});
