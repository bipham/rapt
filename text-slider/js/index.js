/**
 * Created by nobikun1412 on 24-Mar-17.
 */
// $( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });
var slideIndex = 0;
var slider = $('.bxslider').bxSlider({
    pagerCustom: '#bx-pager',
    startSlide: slideIndex,
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
        var liSelected = 'li-img-' + newIndex;
        var $this = $('li.' + liSelected)
        chooseSlideImage($this, oldIndex);
    },
    speed: 10
});

slider.goToSlide(slideIndex);
$('ul li').each(function(i) {
    $(this).attr('rel'); // This is your rel value
});
$(function() {
    $("#draggable").draggable({
        axis: 'x',
        scroll: false,
        // slideWidth: 600,
        // adaptiveHeight
        containment: '#bx-pager',
        drag: function() {
            // alert('dasd');
            posX = $(this).position().left;
            posY = $(this).position().top;
            updatePosition(posX, posY);
            // alert('dasd');
        }
    });
});

function updatePosition(posX, posY) {
    var tmp = document.elementFromPoint(posY, posX);
}
$(".img-drop").droppable({
    accept: '#draggable',
    axis: 'x',
    containment: '#bx-pager',
    over: function(event, ui) {
        $('#highlighter').html("You dropped to div ID " + $(this).parent().attr('data-slide-index'));
        slideIndex = $(this).parent().attr('data-slide-index');
        slider.goToSlide(slideIndex);
        $(this).addClass('img-visiting');
    },
    out: function(event, ui) {
        // $(this).parent().attr('class', '');
        $(this).removeClass('img-visiting');
    },
    drop: function() {

        slideIndex = $(this).parent().attr('data-slide-index');
        // slider.reloadSlider();
        slider.destroySlider();
        slider = $('.bxslider').bxSlider({
            pagerCustom: '#bx-pager',
            startSlide: slideIndex,
            onSlideAfter: function($slideElement, oldIndex, newIndex) {
                var liSelected = 'li-img-' + newIndex;
                var $this = $('li.' + liSelected)
                chooseSlideImage($this, oldIndex);
            },
            speed: 10
        });
        // slider.goToSlide(slideIndex);
    }
});
$('ul.thumbnail-list-img li').click(function () {
    var oldIndex = slider.getCurrentSlide();
    chooseThumbnailImage($(this), oldIndex);
});

function chooseThumbnailImage($this, oldIndex) {
    var classTmp = 'img-thumbnail-' + oldIndex;
    $this.find('img').addClass('img-visiting');
    $('img.' + classTmp).removeClass('img-visiting');
    var posX = $this.position().left -15;
    var posY = $('#draggable').position().top;
    $('#draggable').animate({ 'top': posY + 'px', 'left': posX + 'px'}, 200, function(){
        //end of animation.. if you want to add some code here
    });
    $('#highlighter').html("left new: " + oldIndex);
    $('#info-1').html("left current: " + posY);
    $('#info-2').html("left: " + posX);
}

function chooseSlideImage($this, oldIndex) {
    var classTmp = 'img-thumbnail-' + oldIndex;
    $this.find('img').addClass('img-visiting');
    $('img.' + classTmp).removeClass('img-visiting');
    var posX = $this.position().left -15;
    var posY = $('#draggable').position().top;
    $('#draggable').animate({ 'top': posY + 'px', 'left': posX + 'px'}, 0, function(){
        //end of animation.. if you want to add some code here
    });
    $('#highlighter').html("left new: " + oldIndex);
    $('#info-1').html("left current: " + posY);
    $('#info-2').html("left: " + posX);
}

