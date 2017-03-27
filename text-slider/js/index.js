/**
 * Created by nobikun1412 on 24-Mar-17.
 */
// $( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });
var isHover = false;
var slideIndex = 0;
var sliderDetail;
var sliderDetailTotal;
var slider = $('.bxslider.slider-overview').bxSlider({
    pagerCustom: '#bx-pager',
    startSlide: slideIndex,
    slideMargin: 10,
    pagerType: 'full',
    controls: false, 
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

$('ul.bxslider.slider-overview').hover(function(){
    if (isHover == false) {
        alert('www');
        isHover = true;
    }
    else return;
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
        // $('#highlighter').html("You dropped to div ID " + $(this).parent().attr('data-slide-index'));
        // slideIndex = $(this).parent().attr('data-slide-index');
        // slider.goToSlide(slideIndex);
        slideIndex = $(this).parent().attr('data-slide-index');
        $(this).addClass('img-visiting');
        // slider.reloadSlider();
        slider.destroySlider();
        slider = $('.bxslider.slider-overview').bxSlider({
            pagerCustom: '#bx-pager',
            startSlide: slideIndex,
            // slideWidth: 100,
            slideMargin: 10,
             controls: false, 
            pagerType: 'full', 
            onSlideAfter: function($slideElement, oldIndex, newIndex) {
                var liSelected = 'li-img-' + newIndex;
                var $this = $('li.' + liSelected)
                chooseSlideImage($this, oldIndex);
            },
            speed: 10
        });
    },
    out: function(event, ui) {
        // $(this).parent().attr('class', '');
        $(this).removeClass('img-visiting');
    },
    drop: function() {

        // slideIndex = $(this).parent().attr('data-slide-index');
        // // slider.reloadSlider();
        // slider.destroySlider();
        // slider = $('.bxslider.slider-overview').bxSlider({
        //     pagerCustom: '#bx-pager',
        //     startSlide: slideIndex,
        //     slideMargin: 10,
        //     pagerType: 'full', 
        //     onSlideAfter: function($slideElement, oldIndex, newIndex) {
        //         var liSelected = 'li-img-' + newIndex;
        //         var $this = $('li.' + liSelected)
        //         chooseSlideImage($this, oldIndex);
        //     },
        //     speed: 10
        // });
        // slider.goToSlide(slideIndex);
    }
});
$('ul.thumbnail-list-img li').click(function () {
    var oldIndex = slider.getCurrentSlide();
    chooseThumbnailImage($(this), oldIndex);
});

function chooseThumbnailImage($this, oldIndex) {
    var classTmp = 'img-thumbnail-' + oldIndex;
    var currentIndex = slider.getCurrentSlide();
    $this.find('img').addClass('img-visiting');
    $('img.' + classTmp).removeClass('img-visiting');
    var posX = $this.position().left;
    var posY = $('#draggable').position().top;
    if (currentIndex != 0) {
        posX = posX - 20;
    }
        else posX = posX - 12;
    $('#draggable').animate({ 'top': posY + 'px', 'left': posX + 'px'}, 200, function(){
        //end of animation.. if you want to add some code here
    });
    $('#highlighter').html("left new: " + oldIndex);
    $('#info-1').html("left current: " + posY);
    $('#info-2').html("left: " + posX);
}

function chooseSlideImage($this, oldIndex) {
    var classTmp = 'img-thumbnail-' + oldIndex;
    var currentIndex = slider.getCurrentSlide();
    $this.find('img').addClass('img-visiting');
    $('img.' + classTmp).removeClass('img-visiting');
    var posX = $this.position().left;
    var posY = $('#draggable').position().top;
    if (currentIndex != 0) {
        posX = posX - 20;
    }
    else posX = posX - 12;
    $('#draggable').animate({ 'top': posY + 'px', 'left': posX + 'px'}, 0, function(){
        //end of animation.. if you want to add some code here
    });
    $('#highlighter').html("left new: " + oldIndex);
    $('#info-1').html("left current: " + posY);
    $('#info-2').html("left: " + posX);
}

$('ul.bxslider.slider-overview li .btn-zoom').click(function(){
    var slideOffset = $(this).data('slide-offset');
    sliderDetail = $('.bxslider.slider-detail').bxSlider({
    startSlide: slideOffset,
    slideMargin: 10,
    // controls: false,
    speed: 10,
    //  nextSelector: '.prev-btn',
    // prevSelector: '.next-btn',
    pagerType: 'short', 
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
                sliderDetailTotal = sliderDetail.getSlideCount();
                updateIndexSlider(newIndex, sliderDetailTotal);
            },
});
    $('.row.first-row').hide();
    $('.row.second-row').show();
    sliderDetailTotal = sliderDetail.getSlideCount();
    // $('#box-slide-index').val(slideOffset + 1);
    // $('.total-slide').html('/' + sliderDetailTotal);
    updateIndexSlider(slideOffset, sliderDetailTotal);
     sliderDetail.reloadSlider();
    console.log('Id: ' + slideOffset);
});

$('ul.bxslider.slider-detail li .btn-exit').click(function(){
    var slideOffset = $(this).data('slide-offset');
//     var sliderDetail = $('.bxslider.slider-detail').bxSlider({
//     startSlide: slideOffset,
//     slideMargin: 10,
//     speed: 10
// });
    $('.row.first-row').show();
    $('.row.second-row').hide();
     sliderDetail.destroySlider();
    console.log('Id: ' + slideOffset);
});

function updateIndexSlider(newIndex, totalIndex) {
    newIndex = newIndex + 1;
    $('.box-slide-current').html(newIndex + '/' + totalIndex);
    if (newIndex == 1) {
        $('#slider-prev').addClass('deactive');
        $('#slider-next').removeClass('deactive');
    }
    else if (newIndex == totalIndex) {
        $('#slider-next').addClass('deactive');
         $('#slider-prev').removeClass('deactive');
    }
    else {
        $('#slider-prev').removeClass('deactive');
        $('#slider-next').removeClass('deactive');
    }
} 

$('.next-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide() + 1;
    if (currentDetail != sliderDetailTotal) {
        sliderDetail.goToNextSlide();
         updateIndexSlider(currentDetail + 1, sliderDetailTotal);
    }
});

$('.prev-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide() + 1;
    if (currentDetail != 1) {
        sliderDetail.goToPrevSlide();
         updateIndexSlider(currentDetail - 1, sliderDetailTotal);
    }
}); 
