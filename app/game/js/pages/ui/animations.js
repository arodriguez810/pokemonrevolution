$(function () {
    $('.js-animations').bind('change', function () {
        var animation = $(this).val();
        $('.js-animating-object').animateCss(animation);
    });
});

//Copied from https://github.com/daneden/animate.css
animateCssP = (object, animationName) => new Promise(async (resolve, reject) => {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    object.addClass('animated ' + animationName).one(animationEnd, function () {
        resolve(true);
        object.removeClass('animated ' + animationName);
    });
});
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    },
    animateCssArray: async function (animations, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        for (var item of animations) {
            await animateCssP($(this), item);
        }
        if (callback)
            callback();
    }
});