$(function () {
    $(".btn-6").on("mouseenter", handleHover).on("mouseout", handleHover);

    function handleHover(e) {
        let parentOffset = $(this).offset();
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;

        $(this).find("span").css({ top: relY, left: relX });
    }
});
