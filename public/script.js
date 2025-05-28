document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value, // This will now correctly get the textarea value
    rating: document.getElementById('rating').value
  };

  console.log('Sending form data:', formData);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const responseData = await response.json();
    console.log('Server response:', responseData);

    if (response.ok) {
      alert("Form submitted successfully!");
      document.getElementById('contact-form').reset();
    } else {
      alert('Failed to send message: ' + (responseData.message || 'Unknown error.'));
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred. Please try again later.');
  }
});