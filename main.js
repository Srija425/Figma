document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    // Email validation regex
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Error handling
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('error');
    }

    // Input validation
    function validateEmail(email) {
        if (!email) {
            return 'Email is required';
        }
        if (!EMAIL_REGEX.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePassword(password) {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        return '';
    }

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        removeError(emailInput);
        removeError(passwordInput);

        // Validate inputs
        const emailError = validateEmail(emailInput.value);
        const passwordError = validatePassword(passwordInput.value);

        if (emailError) {
            showError(emailInput, emailError);
            return;
        }
        if (passwordError) {
            showError(passwordInput, passwordError);
            return;
        }

        // If no errors, proceed with form submission
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Submit the form (add your API call here)
        console.log('Form submitted successfully');
    });

    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
});