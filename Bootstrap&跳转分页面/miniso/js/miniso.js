
$(function () {
    $('.pics>#btn>img').on('click', function () {


        if ($('.menu').hasClass('active')) {
            $('.menu').removeClass('active')

            $('.menu').css({
                display: 'block',

            })
        } else {
            $('.menu').addClass('active')
            $('.menu').css({
                display: 'none',
            })
        }
    })

    $('.nav-contentbox #list-unstyled li a').on('mouseover', function () {       
        $(this).parents('.nav-contentbox').find('a').removeClass('span-active')  
        $(this).addClass('span-active')     
        $(this).parents('.nav-contentbox').find('i').removeClass('i-active')
        $(this).next('i').addClass('i-active')

    })

    $('.carte .ipad-nav .col-active').on("mouseover", function () {
        $(this).find('.pro-icon-noactive').hide()
        $(this).find('.pro-icon-active').show()
        $(this).find('.pro-line').show()
        $(this).find('.pro-title').css("color", "#d9232e")

        $(this).siblings().find('.pro-icon-noactive').show()
        $(this).siblings().find('.pro-icon-active').hide()
        $(this).siblings().find('.pro-line').hide()
        $(this).siblings().find('.pro-title').css("color", "#888888")

    })

})