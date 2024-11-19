$(function () {
    'use strict';

    // Initialize Isotope (for filtering)
    $('.grid').imagesLoaded(function () {
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });

        // Filter items on button click
        $('.filter-button-group').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        // Add active class to the current button
        $('.filter-button-group').on('click', 'button', function () {
            $('.filter-button-group button').removeClass('active');
            $(this).addClass('active');
        });
    });

    // Image Light Box Popup
    $('.image-link').magnificPopup({ type: 'image' });

    // Counter Up (to animate counters)
    $('.counter').counterUp({
        delay: 10,
        time: 3000
    });
});
