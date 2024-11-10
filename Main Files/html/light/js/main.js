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
    // Handle form submission
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Display a submitting message
        formStatus.innerHTML = '<div class="alert alert-info">Submitting form...</div>';

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

            if (response.ok) {
                const result = await response.json();
                formStatus.innerHTML = `<div class="alert alert-success">${result.message || 'Form submitted successfully!'}</div>`;
                form.reset(); // Clear the form fields
            } else {
                const errorText = await response.text();
                formStatus.innerHTML = `<div class="alert alert-danger">Form submission failed: ${response.statusText} (Status ${response.status})<br>${errorText}</div>`;
            }
        } catch (error) {
            console.error('Fetch Error:', error); // More specific error log
            formStatus.innerHTML = '<div class="alert alert-danger">Form submission failed. Please try again.</div>';
        }
    });
}
