$('.stage .ui .ctrl label input[type=range]').on('input', function () {
    console.log($(this).val());
    $('.stage .ui .ctrl label .progress').css("width", $(this).val() + "%");
    audio.currentTime = $(this).val() / 100 * audio.duration
})

$('.stage .volume-right input[type=range]').on('input', function () {
    console.log($(this).val());
    $('.stage .volume-right .progress').css("width", $(this).val() + "%");
})


var playlist = [
    {
        title: '德国第一装甲师进行曲',
        artist: '德国',
        album: '德国第一装甲师进行曲.mp3',
        cover: 'img/1.jpg',
        mp3: 'mp3/deguo.mp3',
    },
    {
        title: '亡灵序曲',
        artist: '魔兽世界',
        album: '魔兽世界 - 亡灵序曲.mp3',
        cover: 'img/2.jpg',
        mp3: 'mp3/The Dawn.mp3',
    },
    {
        title: 'chenparty dj.mp3',
        artist: '德国童声',
        album: 'chenparty 超好听的德国童声 dj.mp3',
        cover: 'img/3.jpg',
        mp3: 'mp3/chenparty dj.mp3',
    },
    
];

$.each(playlist, function (i, e) {
    $('.tag').append(
        "<li><h3>" + e.title + "</h3> <p>" + e.artist + "</p> <p>" + e.album + "</p></li>"

    )
    // $('.ui .img').append("<img src=" + e.cover + " >")

});

var audio = $("audio")[0];
var current = 0;

function play() {
    $('.playlist li').eq(current).addClass('playing').siblings().removeClass('playing')
    $('.playlist .playing').removeClass('paused')
}

$('audio').attr('src', playlist[current].mp3)
//第一张照片显示
$(".ui .img").css("background-image", "url(" + playlist[0].cover + ")");

$(".playlist li").eq(current).addClass('playing paused')
//第一个li显示
$(".tag li").eq(0).show().siblings().hide()




// 事件监听

audio.oncanplay = function () {
    console.log("可以播放");
};
audio.onloadedmetadata = function () {
    console.log("加载到了");
    audio.play();
};

//开始按钮
$('.control .fa-play').click(function () {
    play()
    $(this).fadeOut()
    $('.control .fa-pause').fadeIn()
    audio.play()
    $(".ui .img").css("background-image", "url(" + playlist[current].cover + ")");
})

//暂停按钮
$('.control .fa-pause').click(function () {
    audio.pause()
    $(this).fadeOut()
    $('.control .fa-play').fadeIn()
    $('.playlist .playing').addClass('paused')

})
//下一首
$('.control .fa-forward').click(function () {
    current++
    play()
    $('audio').attr('src', playlist[current].mp3)
    $(".ui .img").css("background-image", "url(" + playlist[current].cover + ")");

})
//上一首

$('.control .fa-backward').click(function () {
    current--
    play()
    $('audio').attr('src', playlist[current].mp3)
    $(".ui .img").css("background-image", "url(" + playlist[current].cover + ")");

})

//歌单
$('.playlist li').click(function () {
    current = $(this).index()
    $('audio').attr('src', playlist[current].mp3)
    $(".ui .img").css("background-image", "url(" + playlist[current].cover + ")");
    play()

})

audio.ontimeupdate = function () {
    console.log(audio.currentTime / audio.duration * 100 + '%');
    $('.stage .ui .ctrl label .progress').css("width", audio.currentTime / audio.duration * 100 + '%');

}

audio.onended = function () {
    current++
    play()
    $('audio').attr('src', playlist[current].mp3)
    $(".ui .img").css("background-image", "url(" + playlist[current].cover + ")");
}








