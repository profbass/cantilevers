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

    $(window).load(function() {
        $('#loading').fadeOut(500);
    });

    $(window).scroll(function() {
        navScroll();
        slideIn();
    });

    function navScroll() {
        var scroll = $(window).scrollTop();
        var navLogo = $("#nav-logo");
        if (scroll >= 50) {
            navLogo.addClass('logo-small');
        } else if (scroll <= 50) {
            navLogo.removeClass('logo-small');
        }
    }

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



    deleteButton.on('click', function(e) {
        console.log("sdfds");
        e.target.parentElement.style.display = 'none';

    }, false);

    function slideIn() {
        $(".slide-in").each(function() {
            if (isScrolledIntoView($(this))) {
                //console.log('scrolly');
                $(this).addClass('slide-up-fade-in');
            }
        });

        // $(".scroll-spy").each(function() {
        //     var sectionId = $(this).attr("href");
        //     var section = $(sectionId);
        //     if (isScrolledToTop(section)) {
        //         removeNavClass();
        //         $(this).addClass('nav-active');
        //     }
        // });

    }

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
        // var docViewTop = $(window).scrollTop();
        // var docViewBottom = docViewTop + $(window).height();

        // var elemTop = $(this).offset().top;
        // var elemBottom = elemTop + $(elem).height();

        // //console.log(elemTop + docViewBottom);

        // return ((elemTop <= (docViewBottom - ($(window).height() / 3))));
    }

    $('.contact-btn').on('click', function(e) {
        e.preventDefault();
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

    // Floorplan Map Hide and Show
    var floorPlan = $('.floorPlan');
    $.each(floorPlan, function(el) {
        var currentPin = '';
        var id = $(this).attr("id");
        var currentPlan = $(this).data('default');
        var unitButton = $('#' + id + ' .pins');
        console.log("sdklfjh");
        $.each(unitButton, function(el) {
            var target = $(this).data('target');
            var pin = $(this).attr('id');

            $(this).on('click', function(e) {
                e.preventDefault();
                $('#' + currentPlan).fadeOut(function() {
                    $('#' + target).fadeIn();
                });
                $('#' + currentPin).removeClass('active');
                $(this).addClass('active');
                currentPin = pin;
                currentPlan = target;
            })
        });
    });

    // tabs
    var tabs = $('.tabs>ul>li');

    tabs.on('click', function() {
        var target = $(this).data('target');
        var contnetTarget = $(this).data('target');
        var content = contnetTarget ? contnetTarget : "content-tab";
        if (target) {
            openTab(event, target, content);
        }
    });

    // https://codepen.io/t7team/pen/ZowdRN
    function openTab(evt, tabName, contentTab) {
        var i, x, tablinks;

        x = document.getElementsByClassName("content-tab");
        for (i = 0; i < x.length; i++) {
            //x[i].style.display = "none";
            $(x).fadeOut();
        }
        tablinks = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" is-active", "");
        }
        $("#" + tabName).fadeIn();
        evt.currentTarget.className += " is-active";
    }
});