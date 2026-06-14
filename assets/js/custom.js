$(window).on('load', function() {

    var snapping = false;
    var introHeight = $('#intro').outerHeight();

    if (window.location.hash) {
        $('#nav').show();
        window.scrollTo({ top: $('#intro').outerHeight() - $('#nav').outerHeight() - 50 });
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
        $('html').animate({ scrollTop: 0 }, 200);
        setTimeout(function() { snapping = false; }, 1000);
    }

    $(window).on('wheel', function(e) {
        if (snapping) return;
        var scrollTop = window.pageYOffset;
        var snapTarget = $('#intro').outerHeight() - $('#nav').outerHeight() - 50;

        if (e.originalEvent.deltaY > 0 && scrollTop < snapTarget) {
            snapForward();
        } else if (e.originalEvent.deltaY < 0 && scrollTop <= snapTarget - 100) {
            snapBack();
        }
    });

    $('.scrolly').on('click', function(e) {
        e.preventDefault();
        snapForward();
    });

});