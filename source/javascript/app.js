document.addEventListener('DOMContentLoaded', function() {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function($el) {
            $el.addEventListener('click', function() {

                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
    baguetteBox.run('.container');

    normalizeBrightness();

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var $form = $(this);
        var $body = $('.form-message');
        $.ajax({
            url: $form.attr('action'),
            type: "POST",
            data: $form.serialize()
        }).done(function() {
            $form.find('input,textarea').val('');
            $body.append('<div class="notification is-primary"><button class="delete"></button>Thanks for reaching out! We will return your message shortly.</div>');
        }).fail(function() {
            $body.append('<div class="notification is-danger"><button class="delete"></button>Oops! It broke!</div>');
        });
    });

    deleteButton = $('button.delete');
    $.each(deleteButton, function(e) {
        $notification = $(e).parentNode;
        $(e).preventDefault();
        $(e).on('click', function() {
            $notification.parentNode.removeChild($notification);
            console.log("Closey");
        });
    });

    // toggle class for nav based on scroll position
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var navLogo = $("#nav-logo");
        if (scroll >= 50) {
            navLogo.addClass('logo-small');
        } else if (scroll <= 50) {
            navLogo.removeClass('logo-small');
        }
    });

    $(window).load(function() {
        $('#loading').fadeOut(500);
    });

    // document.addEventListener('DOMContentLoaded', () => {
    //     (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
    //         $notification = $delete.parentNode;
    //         $delete.preventDefault();
    //         $delete.addEventListener('click', () => {
    //             $notification.parentNode.removeChild($notification);
    //             console.log("Closey");
    //         });
    //     });
    // });


    deleteButton.on('click', function(e) {
        console.log("sdfds");
        e.target.parentElement.style.display = 'none';

    }, false);

    $(window).on('scroll', function() {
        $(".slide-in").each(function() {
            if (isScrolledIntoView($(this))) {
                //console.log('scrolly');
                $(this).addClass('slide-up-fade-in');
            }
        });

        $(".scroll-spy").each(function() {
            var sectionId = $(this).attr("href");
            var section = $(sectionId);
            if (isScrolledToTop(section)) {
                removeNavClass();
                $(this).addClass('nav-active');
            }
        });

        if ($(this).offset().top <= 0) {
            removeNavClass();
        }

    });

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemTop <= (docViewBottom - 20)));
    }

    function removeNavClass(elem) {
        $(".scroll-spy").each(function() {
            $(this).removeClass('nav-active');
        });
    }

    function isScrolledToTop(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        //console.log(elemTop + docViewBottom);

        return ((elemTop <= (docViewBottom - ($(window).height() / 3))));
    }

    $('.contact-btn').on('click', function() {
        launchContactModal();
    })
    $('.modal-close').on('click', function() {
        closeContactModal();
    })

    function launchContactModal() {
        var modalForm = $('#contact-modal');
        var html = $('html');
        modalForm.addClass('is-active');
        html.addClass('is-clipped');
    }

    function closeContactModal() {
        var modalForm = $('#contact-modal');
        var html = $('html');
        modalForm.removeClass('is-active');
        html.removeClass('is-clipped');
    }




});