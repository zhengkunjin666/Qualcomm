const PAGE={
    data: {
        sectionIdArr: ['intro-section','course-section','teachers-section','products-section','about-section'],
        navOffsetTop: 497,
        navOffsetHeight: 70,
        duration: 500,
        index: 0,
        // translateX: 0,
        // swiperItemWidth: null,
        // defaultLength: null,
        // isLock: false,
    },
    init: function(){
        this.bind();
        this.addData();
        this.mySwiper();
    },
    bind: function(){
        $(window).on('scroll load resize',this.refreshNav);
        $(".nav-item").live("click",this.goSection);
        $(".course-arrow-icon").toggle(this.courseDdHide,this.courseDdShow);
        $(".course-download-icon").hover(function(){$(this).prop("src","./image/download-icon-hover.png")},function(){$(this).prop("src","./image/download-icon.png")});
        $(".course-player-btn").click(this.videoPlay);
        // $(".swiper-prev").click(this.swiperPrev);
        // $(".swiper-next").click(this.swipeNext);
        // // $(".swiper-item").live("mousedown",function(){PAGE.data.swiperIsLock=false;});
        // // $(window).mousemove(this.handleMouseMove);
        // // $(window).mouseup(this.handleMouseUp);
        $(".top-arrow").click(this.goTop);
        $(window).on('scroll load',this.topArrowHideOrShow);
    },
    addData: function(){
        $(".nav-item").each(function(index){
            let sectionIdArr=PAGE.data.sectionIdArr;
            $(".nav-item")[index].setAttribute("data-id",sectionIdArr[index]);
        });
        // $(".swiper-item").each(function(index){
        //     $(".swiper-item")[index].setAttribute("data-index",index);
        // });
        // let swiperItem=$(".swiper-item").length;
        // let swiperItemWidth=$(".swiper-item").outerWidth();
        // let index=PAGE.data.index;
        // PAGE.data.defaultLength=swiperItem;
        // PAGE.data.swiperItemWidth=swiperItemWidth;
        // PAGE.data.translateX=-(swiperItemWidth + swiperItemWidth*index);
        // $(".swiper-item").slice(1,5).clone().prependTo(".swiper-list");
        // $(".swiper-item").slice(4,8).clone().appendTo(".swiper-list");
        // PAGE.goIndex(index);
    },
    mySwiper: function(){
        const mySwiper=new Swiper('.swiper',{
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 4,
        })
    },
    refreshNav: function(){
        PAGE.navStickyTop();
        PAGE.highlight();
    },
    navStickyTop: function(){
        let scrollTop=$(window).scrollTop();
        let navOffsetTop=PAGE.data.navOffsetTop;
        if(scrollTop>=navOffsetTop){
            $(".nav-section").addClass("nav-section sticky-top")
        }
    },
    highlight: function(){
        let scrollTop=$(window).scrollTop();
        let sectionIdArr=PAGE.data.sectionIdArr;
        for(i=0;i<sectionIdArr.length;i++){
            let sectionOffsetTop=$("#"+sectionIdArr[i]).offset().top-PAGE.data.navOffsetHeight;
            let sectionHeight=$("#"+sectionIdArr[i]).outerHeight();
            if(scrollTop>=sectionOffsetTop && scrollTop < sectionOffsetTop+sectionHeight){
                $(".nav-item")[i].className="nav-item active";
            }else{
                $(".nav-item")[i].className="nav-item";
            }
        }
    },
    goSection: function(event){
        let id=event.target.dataset.id;
        let beginScrollTop=$(window).scrollTop();
        let endScrollTop=$("#"+id).offset().top-PAGE.data.navOffsetHeight;
        let duration=PAGE.data.duration;
        PAGE.animateTo(beginScrollTop,endScrollTop,duration,function(value){
            $(window).scrollTop(value);
        },function(value){
            $(window).scrollTop(value+1);
            if(id==="course-section"){
                PAGE.videoPlay();
            }
        })
    },
    animateTo: function(begin,end,duration,changeCallback,finishCallback){
        let startTime=Date.now();
        requestAnimationFrame(function update(){
            let dataNow=Date.now();
            let time=dataNow-startTime;
            let value=PAGE.linear(time,begin,end,duration);
            typeof changeCallback === 'function' && changeCallback(value);
            if(startTime+duration > dataNow){
                requestAnimationFrame(update);
            }else{
                typeof finishCallback === 'function' && finishCallback(end);
            }
        })
    },
    linear: function(time,begin,end,duration){
        return (end - begin) * time / duration + begin;
    },
    courseDdHide: function(){
        $(this).parent().next().slideUp(500);
        $(this).css({"transform":"rotate(180deg)","transition":"all .5s"})
    },
    courseDdShow: function(){
        $(this).parent().next().slideDown(500)
        $(this).css({"transform":"rotate(0deg)","transition":"all .5s"})
    },
    videoPlay: function(){
        $(".course-player-btn").fadeOut(10);
        $(".course-player-video")[0].play();
        $(".course-player-video").attr("controls","controls")
    },
    // goIndex: function(index){
    //     let swiperItemWidth=PAGE.data.swiperItemWidth;
    //     let beginTranslateX=PAGE.data.translateX;
    //     let endTranslateX=-(swiperItemWidth + swiperItemWidth*index);
    //     let swiperDuration=PAGE.data.duration;
    //     if(PAGE.data.isLock){
    //         return
    //     }else{
    //         PAGE.data.isLock=true;
    //     };
    //     PAGE.animateTo(beginTranslateX,endTranslateX,swiperDuration,function(value){
    //         $(".swiper-list").css("transform",`translateX(${value}px)`);
    //     },function(value){
    //         let itemLength=PAGE.data.defaultLength;
    //         if(index === itemLength){
    //             index=0;
    //             value=-(swiperItemWidth + swiperItemWidth*index);
    //         };
    //         if(index === -1){
    //             index=itemLength-1;
    //             value=-(swiperItemWidth + swiperItemWidth*index);
    //         }
    //         $(".swiper-list").css("transform",`translateX(${value}px)`);
    //         PAGE.data.index=index;
    //         PAGE.data.translateX=value;
    //         PAGE.data.isLock=false;
    //     })
    // },
    // swiperPrev: function(){
    //     index=PAGE.data.index;
    //     PAGE.goIndex(index-1)
    // },
    // swipeNext: function(){
    //     index=PAGE.data.index;
    //     PAGE.goIndex(index+1)
    // },
    // handleMouseMove: function(event){
    //     if(!PAGE.data.swiperIsLock){
    //         let swiperItemWidth=PAGE.data.swiperItemWidth;
    //         let itemLength=PAGE.data.defaultLength;
    //         let minWidth=-(swiperItemWidth + swiperItemWidth*itemLength);
    //         let maxWidth=0;
    //         let translateX=-event.pageX;
    //         translateX=translateX>maxWidth ? maxWidth : translateX;
    //         translateX=translateX<minWidth ? minWidth : translateX;
    //         $(".swiper-list").css("transform",`translateX(${translateX}px)`)
    //         PAGE.data.minWidth=minWidth;
    //         PAGE.data.swiperTranslateX=translateX;
    //     }
    // },
    // handleMouseUp: function(){
    //     let itemLength=$(".swiper-item").length;
    //     for(i=0;i<itemLength;i++){
    //         let offsetLeft=$(".swiper-item")[i].offsetLeft;
    //         let translateX=PAGE.data.swiperTranslateX;
    //         if(-translateX < offsetLeft){
    //             let translateX=offsetLeft-PAGE.data.swiperItemWidth;
    //             $(".swiper-list").css("transform",`translateX(${-translateX}px)`);
    //             index=$(".swiper-item")[i].dataset.index;
    //             PAGE.data.index=Number(index);
    //             // PAGE.data.translateX=-translateX;
    //             // console.log(PAGE.data.index)
    //             // console.log(PAGE.data.translateX)
    //             PAGE.data.swiperIsLock=true;
    //             return
    //         }else if(translateX===offsetLeft){
    //             $(".swiper-list").css("transform",`translateX(${translateX}px)`);
    //             // index=$(".swiper-item")[i].dataset.index;
    //             // PAGE.data.index=Number(index);
    //             PAGE.data.swiperIsLock=true;
    //             return
    //         }
    //     }
    // },
    goTop: function(event){
        let beginScrollTop=$(window).scrollTop();
        let endScrollTop=0;
        let duration=PAGE.data.duration;
        PAGE.animateTo(beginScrollTop,endScrollTop,duration,function(value){
            $(window).scrollTop(value);
        },function(value){
            $(window).scrollTop(value);
            $(".top-arrow").fadeOut(500);
        })
    },
    topArrowHideOrShow: function(){
        let scrollTop=$(window).scrollTop();
        if(!scrollTop){
            $(".top-arrow").fadeOut(500);
        }else{
            $(".top-arrow").fadeIn(500);
        }
    }
};
PAGE.init();