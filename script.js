document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('support-form');
    const messageBox = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    
    // AWS Gateway URL ($default stage)
    const API_URL = 'https://vr1ujwyvbc.execute-api.us-east-1.amazonaws.com';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Map form values to DynamoDB attributes
        const payload = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            problem: document.getElementById('problem').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                mode: 'cors', // Triggers CORS preflight handshake
                headers: { 
                    'Content-Type': 'application/json' // Signals JSON payload to API
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`Status: ${response.status}`);

            // Update UI on success
            messageBox.textContent = 'Ticket recorded in DynamoDB.';
            messageBox.style.color = 'green';
            form.reset();
            submitBtn.textContent = 'Success';

        } catch (err) {
            // Logs CORS or Network failures
            console.error('AWS Error:', err);
            messageBox.textContent = 'Connection failed. See console.';
            messageBox.style.color = 'red';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Retry';
        }
    });
});