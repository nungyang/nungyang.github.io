if (sessionStorage.getItem('scrollToProjects')) {
    document.body.style.visibility = 'hidden';
}

$('html').css('overflow', 'hidden');

$(window).on('load', function() {

    var snapping = false;
    var hasSnappedForward = false;

    function getSnapTarget() {
        var offset = window.innerHeight <= 500 ? 150 : 60.5;
        return $('#intro').outerHeight() - $('#nav').outerHeight() + offset;
    }

    if (sessionStorage.getItem('scrollToProjects')) {
        sessionStorage.removeItem('scrollToProjects');
        $('#nav').css('display', 'flex');
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
        $('#nav').css('display', 'flex');
        $('html').animate({ scrollTop: getSnapTarget() }, 400, function() {
            if (window.innerHeight <= 450) {
                window.scrollBy(0, 65);
            } else if (window.innerHeight <= 600) {
                window.scrollBy(0, 50);
            }
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
        } else if (e.deltaY < 0 && scrollTop <= snapTarget - (window.innerWidth <= 736 ? 50 : 180) && hasSnappedForward) {
            snapBack();
        }
    }, { passive: false });

    var touchStartY