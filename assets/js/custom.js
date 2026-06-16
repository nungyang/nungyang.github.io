if (sessionStorage.getItem('scrollToProjects')) {
    document.body.style.visibility = 'hidden';
}

$('html').css('overflow', 'hidden');

$(window).on('load', function() {

    var snapping = false;
    var hasSnappedForward = false;

    function getSnapTarget() {
        return $('#intro').outerHeight() - $('#nav').outerHeight() + 60.5;
    }

    if (sessionStorage.getItem('scrollToProjects')) {
        sessionStorage.removeItem('scrollToProjects');
        $('#nav').show();
        window.scrollTo({ top: getSnapTarget() });
        document.body.style.visibility = 'visible';
        $('html').css('overflow', '');
        hasSnappedForward = true;
    } else {
        $('#nav').hide();
        window.scrollTo({ top: 0 });
        document.body.style.visibility = 'visible';
    }

    function snapForward() {
        snapping = true;
        hasSnappedForward = true;
        $('#nav').show();
        $('html').animate({ scrollTop: getSnapTarget() }, 400, function() {
            setTimeout(function() {
                $('html').css('overflow', '');
                snapping = false;
            }, 600);
        });
    }

    function snapBack() {
        snapping = true;
        hasSnappedForward = false;
        $('#nav').hide();
        $('html').css('overflow', 'hidden');
        $('html, body').scrollTop(0);
        setTimeout(function() { snapping = false; }, 500);
    }

    window.addEventListener('wheel', function(e) {
        if (snapping) return;
        var scrollTop = window.pageYOffset;
        var snapTarget = getSnapTarget();

        if (e.deltaY > 0 && !hasSnappedForward) {
            snapForward();
        } else if (e.deltaY < 0 && scrollTop <= snapTarget && hasSnappedForward) {
            snapBack();
        }
    }, { passive: false });

    $('.scrolly').on('click', function(e) {
        e.preventDefault();
        snapForward();
    });

});