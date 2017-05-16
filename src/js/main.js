$(function(){

    $('#informationList .information-name').on('click', function(){
        var $li = $(this).parents('.information-item')
        var $content = $li.find('.information-content')
        $li.toggleClass('active')
        $content.slideToggle()
    })

    $('#sizeList li').on('click', function(){
        $('#size').text($(this).text())
    })

    $('#quantityList li').on('click', function(){
        $('#quantity').text($(this).text())
    })

    $('#imgControl li, .color-list i').on('click', function(){
        $("#mainImg").attr('src', $(this).data('src'));
        $(this).addClass('active').siblings('i').removeClass('active');
    })
})
