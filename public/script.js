const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const loader = document.getElementById('loader');
const formResponse = document.getElementById('formResponse');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!fullName || !email || !service || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    loader.classList.remove('hidden');
    formResponse.classList.add('hidden');

    const formData = {
        fullName,
        phone: document.getElementById('phone').value.trim(),
        email,
        service,
        message
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Message sent successfully! We will get back to you soon.', 'success');
            form.reset();
        } else {
            showMessage(data.error || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Failed to connect to the server. Please try again later.', 'error');
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        loader.classList.add('hidden');
    }
});

function showMessage(msg, type) {
    formResponse.textContent = msg;
    formResponse.classList.remove('hidden', 'text-green-600', 'text-red-600');
    if (type === 'success') {
        formResponse.classList.add('text-green-600');
    } else {
        formResponse.classList.add('text-red-600');
    }
}