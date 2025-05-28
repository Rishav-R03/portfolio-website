document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // <-- IMPORTANT: Uncomment this to prevent page reload

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    // Make sure this ID matches your HTML for the main message
    message: document.getElementById('message').value,
    // If you add a subject field back, add it here:
    // subject: document.getElementById('subject').value,
    rating: document.getElementById('rating').value
  };

  try {
    const response = await fetch('/api/contact', { // Ensure this matches your backend route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Form submitted successfully!");
      document.getElementById('contact-form').reset();
    } else {
      const errorData = await response.json();
      alert('Failed to send message: ' + (errorData.message || 'Unknown error.'));
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred. Please try again later.');
  }
});