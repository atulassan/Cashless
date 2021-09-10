

// Chosen drop down
$(function() {
    $('.chosen-select').chosen();
});


$(document).on('click', '.profile_details .dropdown-menu a', function () {
    $(this).addClass('active').siblings().removeClass('active');
});

$(document).on('click', '.listMenuContainer a', function () {
    $(this).addClass('active').siblings().removeClass('active');
});

$(document).on('click', '.depMenuContainer a', function () {
    $(this).addClass('active').siblings().removeClass('active');
});


// User info online status
$(document).on('click', '.online-mute', function () {
    $(this).addClass('active')
});
$(document).on('click', '.online-mute.active', function () {
    $(this).removeClass('active')
});

//User info

$(document).on('click', '.userMenu', function () {
    $('#userInfo').addClass('active');
    $('.popUp-backdrop-transparent').addClass('show');
});

$(document).on('click', '.popUp-backdrop-transparent.show', function () {
    $('#userInfo').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});
$(document).on('click', '#userMenuClose', function () {
    $('#userInfo').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});

// notification

$(document).on('click', '.userNotifi', function () {
    $('#notifications').addClass('active');
    $('.popUp-backdrop-transparent').addClass('show');
});

$(document).on('click', '.popUp-backdrop-transparent.show', function () {
    $('#notifications').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});
$(document).on('click', '#userMenuClose', function () {
    $('#notifications').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});

//setup popup
$(document).on('click', '.step01Open', function () {
    $('#step02').show();
    $('#step01').hide();
});
$(document).on('click', '.step02Open', function () {
    $('.after-login-setup').hide();
    $('.popUp-backdrop1').hide();
});
$(document).on('click', '.triggerPwd', function () {
    $('.loginStep02').show();
    $('.loginStep01').hide();
});


//footer menu active class
$(document).on('click', '.afooter-menucontainer ul li', function () {
    $(this).addClass('active').siblings().removeClass('active');
});

//chat
$(document).on('click', '.afooter-menucontainer ul li', function () {
    $(".chat-menu").show();
});
$(document).on('click', '.chat_menu_minimize', function () {
    $(".chat-menu").hide();
});
$(document).on('click', '.openSubTrigger', function () {
    $(".sub-chat-menu").show();
});
$(document).on('click', '.sub-chat-close', function () {
    $(".sub-chat-menu").hide();
});

$(document).on('click', '.openMsgTrigger', function () {
    $(".change_msg_settings").show();
    $(this).hide();
    $(".closeMsgTrigger").show();
});
$(document).on('click', '.msg_list', function () {
    $(".change_msg_settings").hide();
    $(".closeMsgTrigger").hide();
    $(".openMsgTrigger").show();
});
$(document).on('click', '.msg_list.change_status_trigger', function () {
    $(".closeMsgTrigger").show();
    $(".openMsgTrigger").hide();
});  
$(document).on('click', '.closeMsgTrigger', function () {
    $(".change_msg_settings").hide();
    $(".closeMsgTrigger").hide();
    $(".openMsgTrigger").show();
    $(".change_status_settings").hide();
    $(".chat-settings").hide();
});
$(document).on('click', '.change_status_trigger', function () {
    $(".change_status_settings").show();
    $(".closeMsgTrigger").show();
    $(".openMsgTrigger").hide();
});
$(document).on('click', '.available_list', function () {
    $(".change_status_settings").hide();
    $(".closeMsgTrigger").hide();
    $(".openMsgTrigger").show();
});
$(document).on('click', '.chat_settings_trigger', function () {
    $(".chat-settings").show();
    $(".closeMsgTrigger").show();
    $(".openMsgTrigger").hide();
});

//popup search
$(document).on('click', '.searchPopupBoxOpen', function () {
    $('#searchPopup').addClass('active');
    $('.popUp-backdrop').addClass('show');
});
$(document).on('click', '#searchPopupBoxClose, .popUp-backdrop.show', function () {
    $('#searchPopup').removeClass('active');
    $('.popUp-backdrop').removeClass('show');
});

$(document).on('click', '.settingPopupOpen', function () {
    $('#settingPopup').addClass('active');
    $('.popUp-backdrop-dark').addClass('show');
});
$(document).on('click', '#settingPopupClose, .popUp-backdrop-dark.show, #settingPopup ul li a', function () {
    $('#settingPopup').removeClass('active');
    $('.popUp-backdrop-dark').removeClass('show');
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});


$(document).on('click', '.vertical-nav-menu li.lftIconFixed a', function () {
    $('.left-sidebar').addClass('active');
    $('.mainWrapper').addClass('active');
    $(this).addClass('active');
});
$(document).on('click', '.vertical-nav-menu li.lftIconFixed a.active', function () {
    $('.left-sidebar').removeClass('active');
    $('.mainWrapper').removeClass('active');
    $(this).removeClass('active');
});

$(document).on('click', '.countdownOpen', function () {
    $('#Countdown-Modus').addClass('active');
    $('.popUp-backdrop').addClass('show');
});
$(document).on('click', '#CountdownClose, .popUp-backdrop.show', function () {
    $('#Countdown-Modus').removeClass('active');
    $('.popUp-backdrop').removeClass('show');
});

$(document).on('click', '.NutzerVonBtn', function () {
    $('#Zeitplanung').addClass('active');
    $('.popUp-backdrop').addClass('show');
});
$(document).on('click', '#ZeitplanungClose, .popUp-backdrop.show', function () {
    $('#Zeitplanung').removeClass('active');
    $('.popUp-backdrop').removeClass('show');
});

//show date picker
$(".BeschreibungOpen").focusin(function() {
    $(".BeschreibungEditor").show();
    $(this).hide();
});
$(".BeschreibungClose").click(function () {
    $(".BeschreibungEditor").hide();
    $('.BeschreibungOpen').show();
});

//reply section
$(document).on('click', '.replyTrigger', function () {
    $(".replySection").show();
    $(".replySectionList").hide();
});
$(document).on('click', '.hideReplySection', function () {
    $(".replySection").hide();
    $(".replySectionList").show();
});

/*$(document).on('click', '.TicketInfoTabs li', function () {
    $(".ticket_actions").removeClass('active');
});
$(document).on('click', '.TicketInfoTabs li .showReplyBtn', function () {
    $(".ticket_actions").addClass('active');
});*/

//Ticket Filter section
$(document).on('click', '.FilterToggle', function () {
    if(!$(this).parents().hasClass('open')){
        $('.Filter-toggle-content').removeClass('open');    
    }
    $(this).parent().addClass('open');
});

var mouse_is_inside = false;
$(document).ready(function()
{
    $('.Filter-toggle-content').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $("body").mouseup(function(){ 
        if(! mouse_is_inside) jQuery('.Filter-toggle-content.open').removeClass('open'); 
    });
});

$(document).on('click', '.Filter-toggle-content.open .FilterToggle', function () {
    $('.Filter-toggle-content').removeClass('open');
});

$(document).on('click', '.FilterTrigger, #TicketfilterClose', function () {
    $('.Ticketfilter').slideToggle();
});


$(document).on('click', '.progressBarTrigger', function () {
    $('.progressBarSection').slideToggle();
});

//Comments popup

$(document).on('click', '.comtTrigger', function () {
    $('#commentPopup').addClass('active');
    $('.popUp-backdrop').addClass('show');
});
$(document).on('click', '#commentPopupClose, .popUp-backdrop.show', function () {
    $('#commentPopup').removeClass('active');
    $('.popUp-backdrop').removeClass('show');
});


$(document).ready(function(){
    // Add down arrow icon for collapse element which is open by default
    $(".collapse.show").each(function(){
        $(this).prev(".card-header").find(".fa").addClass("fa-angle-down").removeClass("fa-angle-right");
    });
    
    // Toggle right and down arrow icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-angle-right").addClass("fa-angle-down");
    }).on('hide.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-angle-down").addClass("fa-angle-right");
    });
});

$(document).ready(function() {
    $("input[name$='cars']").click(function() {
        var test = $(this).val();
        $("div.desc").hide();
        $("#carDiv" + test).show();
    });
});


$(document).on('click', '.profileNameBase .hoverShow', function () {
    $("#profileNameEdit").show();
    $(".profileNameBase").hide();
});
$(document).on('click', '#profileNameEdit .btn', function () {
    $("#profileNameEdit").hide();
    $(".profileNameBase").show();
});


$(document).on('click', '.profileDescBase .hoverShow', function () {
    $("#profileDescEdit").show();
    $(".profileDescBase").hide();
});
$(document).on('click', '#profileDescEdit .btn', function () {
    $("#profileDescEdit").hide();
    $(".profileDescBase").show();
});

$(document).on('click', '.einklappen', function () {
    $(".rollenList").hide();
    $(".mainRollen").find($(".lnr")).removeClass('lnr lnr-circle-minus').addClass('lnr lnr-plus-circle');
});
$(document).on('click', '.erweitern', function () {
    $(".rollenList").show();
    $(".mainRollen").find($(".lnr")).addClass('lnr lnr-circle-minus').removeClass('lnr lnr-plus-circle');
});


// activation

$(document).on('click', '.activationOpen', function () {
    $('#activation').addClass('active');
    $('.popUp-backdrop-transparent').addClass('show');
});

$(document).on('click', '.popUp-backdrop-transparent.show', function () {
    $('#activation').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});
$(document).on('click', '#activationClose', function () {
    $('#activation').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});


// Letzte

$(document).on('click', '.LetzteOpen', function () {
    $('#Letzte').addClass('active');
    $('.popUp-backdrop-transparent').addClass('show');
});

$(document).on('click', '.popUp-backdrop-transparent.show', function () {
    $('#Letzte').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});
$(document).on('click', '#LetzteClose', function () {
    $('#Letzte').removeClass('active');
    $('.popUp-backdrop-transparent').removeClass('show');
});


$(function () {
    new FroalaEditor("#editor")
});
$(function () {
    new FroalaEditor("#einladung-editor")
});

$(function() {
    $(".rprogress").each(function() {

      var value = $(this).attr('data-value');
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');

      if (value > 0) {
        if (value <= 50) {
          right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
        } else {
          right.css('transform', 'rotate(180deg)')
          left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
        }
      }

    })

    function percentageToDegrees(percentage) {

      return percentage / 100 * 360

    }
})


$(document).ready(function(){
    $("#datetimepicker1" ).datetimepicker({
    })
});



// chart colors
$(function() {
    var colors = ['#0c7b00'];

    /* large line chart */
    var chLine = document.getElementById("chLine");
    var chartData = {
      labels: ["", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7AM", "8PM", "9PM", "10PM", "11PM", "12PM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM"],
        datasets: [{
        data: [.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'transparent',
        borderColor: colors[0],
        borderWidth: 2,
        pointBackgroundColor: colors[0]
      }
    //   {
    //     data: [639, 465, 493, 478, 589, 632, 674],
    //     backgroundColor: colors[3],
    //     borderColor: colors[1],
    //     borderWidth: 4,
    //     pointBackgroundColor: colors[1]
    //   }
      ]
    };
    if (chLine) {
      new Chart(chLine, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true
      }
      });
    }
})


// Letzte

$(document).on('click', '.aktivitätenPopup', function () {
    $('#Eintrag').addClass('active');
});

$(document).on('click', '#EintragClose', function () {
    $('#Eintrag').removeClass('active');
});

$(document).on('click', '.GenehmigungenOpen', function () {
    $('.Genehmigungen').show('');
});


$(document).on('click', '.ZeitEintragPopup', function () {
    $('#ZeitEintrag').addClass('active');
});

$(document).on('click', '#ZeitEintragClose', function () {
    $('#ZeitEintrag').removeClass('active');
});

$(document).on('click', '.AddProdukteOpen', function () {
    $('#AddProdukte').addClass('active');
});

$(document).on('click', '#AddProdukteClose', function () {
    $('#AddProdukte').removeClass('active');
});

$("#ticket_actions ").hide();
$("#ticket_actions li.active").show();

$(document).on('click', '#AddProdukteClose', function () {
    $('#AddProdukte').removeClass('active');
});