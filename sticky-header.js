$.fn.sticky = function() {
    'use strict';
    return this.each(function() {
        var $this = $(this);

        function init() {
            $this.find('th').each(function(index) {
                $(this).css('width', $this.find('th').eq(index).outerWidth() + 'px');
            });

            $this.find('tbody tr:first td').each(function() {
                $(this).css('width', $(this).outerWidth() + 'px');
            });
        }

        function scrollFixed() {
            var offset = $(window).scrollTop();
            var tableOffsetTop = $this.offset().top;
            if (offset > tableOffsetTop) {
                if ($this.find('thead.sticky').size() === 0) {
                    $this.find('thead').addClass('sticky');
                    var clonedHead = $this.find('thead').clone();
                    clonedHead.find('[data-reactid]').removeAttr('data-reactid');
                    clonedHead.addClass('sticky-clone-placeholder').removeClass('sticky');
                    $this.prepend(clonedHead);
                }
            } else {
                $this.find('thead.sticky').removeClass('sticky');
                $this.find('thead.sticky-clone-placeholder').remove();
            }
        }
        $(window).scroll(scrollFixed);
        init();
    });
};
