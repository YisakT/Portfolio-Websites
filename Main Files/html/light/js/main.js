$(function () {
    'use strict';

    // Initialize Isotope (for filtering)
    $('#container').imagesLoaded(function () {
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });

        // Filter items on button click
        $('.filter-button-group').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
    });

    // Image Light Box Popup
    $('.image-link').magnificPopup({ type: 'image' });

    // Counter Up (to animate counters)
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });

    // Handle form submission
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]'); // Grab the submit button

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Disable the submit button to prevent multiple submissions
            submitButton.disabled = true;
            formStatus.innerHTML = ''; // Clear previous status message

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('https://tks9tgdsaf.execute-api.us-east-1.amazonaws.com/prod/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                // Re-enable the submit button after request completes
                submitButton.disabled = false;

                if (response.ok) {
                    formStatus.innerHTML = '<div class="alert alert-success">Form submitted successfully!</div>';
                    form.reset(); // Clear the form fields
                } else {
                    const errorMessage = `Error: ${response.statusText} (Status code: ${response.status})`;
                    formStatus.innerHTML = `<div class="alert alert-danger">Error submitting form. ${errorMessage}</div>`;
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.innerHTML = '<div class="alert alert-danger">Error submitting form. Please try again.</div>';
                // Re-enable the submit button if there was an error
                submitButton.disabled = false;
            }
        });
    }
});
