$(window).on('load', function() {

    var snapping = false;
    var introHeight = $('#intro').outerHeight();

    if (window.location.hash) {
        $('#nav').show();
        setTimeout(function() {
            window.scrollTo({ top: $('#intro').outerHeight() - $('#nav').outerHeight() - 50 });
        }, 100);
    } else {
        $('#nav').hide();
    }

    function snapForward() {
        snapping = true;
        $('#nav').show();
        $('html').animate({ scrollTop: $('#intro').outerHeight() - $('#nav').outerHeight() - 50 }, 400);
        setTimeout(function() { snapping = false; }, 1000);
    }

    function snapBack() {
        snapping = true;
        $('#nav').hide();
        $('html, body').scrollTop(0);
        setTimeout(function() { snapping = false; }, 500);
    }

    $(window).on('wheel', function(e) {
        if (snapping) return;
        var scrollTop = window.pageYOffset;
        var snapTarget = $('#intro').outerHeight() - $('#nav').outerHeight() - 50;

        if (e.originalEvent.deltaY > 0 && scrollTop < snapTarget) {
            snapForward();
        } else if (e.originalEvent.deltaY < 0 && scrollTop <= snapTarget) {
            snapBack();
        }
    });

    $('.scrolly').on('click', function(e) {
        e.preventDefault();
        snapForward();
    });

});