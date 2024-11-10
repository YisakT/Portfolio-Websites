$(function () {

    'use strict';

    $('#container').imagesLoaded(function () {

        // filter items on button click
        $('.filter-button-group').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });

        });

        var $grid = $('.grid').isotope({
            // options options
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });


        // images have loaded

    });

    //Image Light Box Popup
    $('.image-link').magnificPopup({ type: 'image' });

    //Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });



});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

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
                    formStatus.innerHTML = '<div class="alert alert-success">Form submitted successfully!</div>';
                    form.reset(); // Clear the form
                } else {
                    formStatus.innerHTML = '<div class="alert alert-danger">Error submitting form. Please try again.</div>';
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.innerHTML = '<div class="alert alert-danger">Error submitting form. Please try again.</div>';
            }
        });
    }
});
