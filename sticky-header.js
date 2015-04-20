$.fn.sticky = function() {
    'use strict';
    return this.each(function() {
        var $this = $(this);
        var doResizing;

        function resetHeaderInfo() {
            $this.find('tbody tr:first td').css('width', '');
            $this.find('th').css('min-width', '');
            $this.find('thead.sticky').removeClass('sticky');
            $this.find('thead.sticky-clone-placeholder').remove();
        }

        function init() {
            resetHeaderInfo();
            $this.find('tbody tr:first td').each(function() {
                $(this).css('width', $(this).css('width', '').outerWidth() + 'px');
            });
            $this.find('th').each(function() {
                $(this).css('min-width', $(this).outerWidth() + 'px');
            });

        }

        function scrollFixed() {
            var offset = $(window).scrollTop();
            var tableOffsetTop = $this.offset().top;
            var tableHeight = $this.height();
            var isVisible = (offset > tableOffsetTop) && (offset < tableOffsetTop + tableHeight);
            if (isVisible && offset > tableOffsetTop) {
                // Create a cloned placeholder
                if ($this.find('thead.sticky').size() === 0) {
                    $this.find('thead').addClass('sticky');
                    var clonedHead = $this.find('thead').clone();
                    clonedHead.find('[data-reactid]').removeAttr('data-reactid');
                    clonedHead.addClass('sticky-clone-placeholder').removeClass('sticky');
                    $this.prepend(clonedHead);
                }

                // Fulfill scrolling left and right
                var scrollLeft = $(window).scrollLeft();
                var offsetLeft = $this.find('.sticky-clone-placeholder').offset().left;
                $this.find('thead.sticky').css('left', -1 * scrollLeft + offsetLeft);
            } else {
                $this.find('thead.sticky').removeClass('sticky');
                $this.find('thead.sticky-clone-placeholder').remove();
            }
        }

        function resize() {
            init();
            setTimeout(scrollFixed, 100);
        }

        function waitForResize() {
            clearTimeout(doResizing);
            doResizing = setTimeout(resize, 100);
        }
        $(window).scroll(scrollFixed);
        $(window).resize(waitForResize);
        init();
        scrollFixed();
    });
};
