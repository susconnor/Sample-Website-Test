document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('support-form');
    const submitBtn = document.getElementById('submit-btn');
    const API_URL = 'https://vr1ujwyvbc.execute-api.us-east-1.amazonaws.com';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Lock UI
        const originalText = "Submit to AWS";
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const payload = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            problem: document.getElementById('problem').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error();

            // 2. Success State
            form.reset();
            submitBtn.textContent = 'Success!';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);

        } catch (err) {
            // 3. Error State
            submitBtn.textContent = 'Error';
            submitBtn.disabled = false;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 3000);
        }
    });
});