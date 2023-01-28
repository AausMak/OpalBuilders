amplitude.getInstance().setUserProperties({'website_language': languageCode});
window.selected_property_flag = 0;
jQuery(function($) {
  var personalization = getCookie('personalization');
  if(personalization == null ){
    if(custom_client_ID !=''){
      var personalizationData = {
        clientID :custom_client_ID
      }
      setCookie('personalization', JSON.stringify(personalizationData), 365);		
    }
  }
  var client_id = getCookie('custom_client_id');
  if(client_id == null ){
    if(custom_client_ID !=''){
      setCookie('custom_client_id', custom_client_ID, 365);			
    }   
  }
  $('.filter-special-character input').on('input', function() {
    var c = this.selectionStart,
        r = /[^a-z0-9 ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  
  $('.allow-only-numbers input').on('input', function() {
    var c = this.selectionStart,
        r = /[^0-9]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  
  $('.allow-only-alphabets input').on('input', function() {
    var c = this.selectionStart,
        r = /[^a-z ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  
  $('.filter-special-character .has_city input').on('input', function(e) {
  v = $(this).val();
  //console.log(v);
  if(v.length >= 50)
    {
       console.log('Max length is greater than 50');
       $(this).val($(this).val().substr(0,50));
    }
  });
  $('.filter-symbols input').on('input', function() {
      var c = this.selectionStart,
      r = /[~`!@#$%\^&*()+=_\-\[\]\\';,./{}|\\":<>\?0-9]/gi,
      v = $(this).val();
      if(r.test(v)) {
        $(this).val(v.replace(r, ''));
        c--;
      }
      this.setSelectionRange(c, c);
    });
    
  // Form validation scripts
  $('.filter-special-character input').on('input', function() {
    var c = this.selectionStart,
        r = /[^a-z0-9 ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });

  $('.allow-only-numbers input').on('input', function() {
    maxlength = 15;
    var c = this.selectionStart,
        r = /[^0-9 ]/gi,
        v = $(this).val();
    if (v.length>15)
    {
      $(this).val($(this).val().substr(0, maxlength));
    }
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });


  $('.filter-symbols input').on('input', function() {
    var c = this.selectionStart,
    r = /[~`!@#$%\^&*()+=_\-\[\]\\';,./{}|\\":<>\?0-9]/gi,
    v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
  });
  
  $('.modal').on('hidden.bs.modal', function(){
		var id = $(this).find('div.modal-body div.gform_anchor').attr('id');
		$(this).find('div.modal-body').html(formHtml[id]);
    gfromFilterSpecialCharacters();
	});

  $('.modal').on('shown.bs.modal', function(){
    gfromFilterSpecialCharacters();
		//Clone form for reload after submit
    var id = $(this).find('div.modal-body div.gform_anchor').attr('id');
    if(formHtml[id] == undefined)
    {
        formHtml[id]= $(this).find('div.modal-body div.gform_anchor').closest('div.modal-body').html();	
    }
	});
  // Community menu
  var checkMobile = window.matchMedia("(max-width: 767px)");
  var checkMobileTablet = window.matchMedia("(max-width: 991px)");
  var w = $(document).width();
  var h = $(document).height();
  $(".communities-menu").css('width',w);
  $(".communities-menu").css('height',h);

  $('.communities-tab').click(function(){

    $('.communities-menu').width( $(window).width() );
    $('.communities-menu').height( $(window).height() );
    //$('.communities-menu').css( {'overflow':'auto'} );
    $("body").toggleClass("body-fixed-position");

    $('.communities-menu').slideToggle();
    $('.communities-tab').toggleClass('active');
    event.stopPropagation();
    return false;
  });

  $(document).click(function(e) {
    if ($(e.target).is(".communities-featured-container") === false) {
      $("body").removeClass("body-fixed-position");
      $('.communities-tab').removeClass('active');
    }
  });

  $('.share-btn').click(function(){

    $('.sharing-options').slideToggle();
    $('.share-btn').toggleClass('active');
    event.stopPropagation();
    return false;

  });

/* Accept Cookie Button */
$('.cookie-disclaimer .btn-accept').on('click', function () {
  $('.cookie-disclaimer').hide();
  // setCookie('cookieconsent','dismissed',365);
});


/* - Function to get the list of communities corresponding to property type */
function _deprecated_getCommByType( types=null ) {
    if( types == null )
        return;
	//debugger;
    var jqXHR = jQuery.ajax({
        type: "POST",
        url: ct_ajax_script.ajaxurl,
        data: {
            action : 'get_community_by_type',
            types:types
        },
        success: function (data) {
            cbCommByType( data );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
    });
    return jqXHR.responseText
}
function _deprecated_cbCommByType( data ){
	//console.log('@@@@@@@@'+$('#prop_search_mobile_form input[name="comm[]"]').length);
	//console.log(data);
	//console.log(data.data.community_list);
	
	var data1 = jQuery.parseJSON(data);
	$(data1).each(function(i,val)
	{
	$.each(val,function(key,val)
	  {
		//console.log(key + " : " + val);     
	  });
	});
	
	return data;
}
window.CommunityDDBeforeAJax;
CommunityDDBeforeAJax = false;
$('#mobile-property-apply').click(function(){
    $('#propertyTypeModal').hide();
	$('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
	$('#community-for-mobile .search-val').removeClass('selected-val').text(all_communities_text);
  var checkedBoxes = $('input[name="p-type[]"]:checked').length;
	var sel_property = [];
	$('input[name="p-type[]"]:checked').each(function() {
	   sel_property.push(this.value); 
	});
	if (sel_property.length != 0) {
		var CommByTpe = getCommByType(sel_property);
		if(checkedBoxes == 1)
            {
              selected_msg_label = checkedBoxes + ' ' + property_type_text;
            }
            if(checkedBoxes > 1)
            {
              selected_msg_label = checkedBoxes + ' ' + properties_type_text;
            }
            $('#property-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
	}
	else{
		$('.community-options-mobile').html(CommunityDDBeforeAJax);
		$('#property-for-mobile .search-val').removeClass('selected-val').text(any_text);
		return;
	}
	
	if( !CommunityDDBeforeAJax ){
		CommunityDDBeforeAJax = $('.community-options-mobile').html();
	}		
  });

$('.home-search-component input[name="p-type[]"]').on('change', function () {
	//clear all enaable disable function
	checkAllSearchFilters();
    var checkedBoxes = $('input[name="p-type[]"]:checked').length;
    var selected_msg_label = "";
    var sel_property = [];
		
    $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
    $('input[name="p-type[]"]:checked').each(function () {
	  sel_property.push(this.value);
    });

    if (sel_property.length != 0) {
      var CommByTpe = getCommByType(sel_property);
      /* make width of the main community list full width */
      $('.primary-communitylist-container').addClass('property-community-list');
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + property_type_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + properties_type_text;
      }
      //for property alert
      if($('#gform_16').length > 0){
        $('#gform_16 #input_16_44').val(sel_property.join(','));
      }
      $('.property-type-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	  $('.clear-selection.all').addClass('active-clearall');
    } else {
      $('.community-options-desktop').html(CommunityDDBeforeAJax);
      $('.property-type-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('.primary-communitylist-container').removeClass('property-community-list');
      return;
    }

    if (!CommunityDDBeforeAJax) {
      CommunityDDBeforeAJax = $('.community-options-desktop').html();
    }
		
  });
  
  /*  Function To Hide floors */
  $('input[name="p-type[]"]').on('change', function () {
	  
	 var selected_msg_label = "";  
	 var checkedBoxes = $('input[name="p-type[]"]:checked').length;
	 if (checkedBoxes > 0){
	 if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + property_type_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + properties_type_text;
      }
      $('.property-type-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	  $('#property-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
	  $('.clear-selection.all').addClass('active-clearall');
    } else {
      $('.property-type-selection').find('span.search-val').removeClass('selected-val').text(any_text);
	  $('#property-for-mobile .search-val').removeClass('selected-val').text(any_text);
    }
	
	 //console.log("checkedBoxes-"+checkedBoxes);
	 if(checkedBoxes == 0 || checkedBoxes > 3) {
		selected_property_flag = 0;
		//console.log("ZERO"+selected_property_flag);		
	}
	else {
		if (checkedBoxes >= 1 && checkedBoxes <= 3) {
			$('input[name="p-type[]"]:checked').each(function () {
				//console.log(this.value);
				if(this.value != "Villa" && this.value != "Townhouse" && this.value != "Plot" )
				{
					selected_property_flag = 0;
					//console.log(selected_property_flag+"FLAG is ZERO now");	
					return false;				
				}
				else{
					if(this.value == "Villa" || this.value == "Townhouse" || this.value == "Plot" )
					{
						selected_property_flag = 1;
						//console.log(selected_property_flag+"FLAG IS ONE now");
					}
				}			
			});
		}		
	}
	//console.log("OUtside loop FLAG"+ selected_property_flag);
	if(selected_property_flag){
		if(checkMobile.matches){
			$('#floor-for-mobile').addClass("d-none"); 
			}
		else{
			$('.floor-selection').addClass("d-none");   
		    }
	}
	else
		{
			if(checkMobile.matches){
				$('#floor-for-mobile').removeClass("d-none"); 
			}
			else{
				$('.floor-selection').removeClass("d-none"); 
			}
				 
		}			
  });
  /* END  Hide floors */
  
  function checkAllSearchFilters() {
    if ( $('input[name="comm[]"]:checked').length == 0 && $('input[name="bed[]"]:checked').length == 0 && 
       $('input[name="p-type[]"]:checked').length == 0 && 
       $('select[name="max-price"]').val() == 100000000 && $('select[name="min-price"]').val() == 0 && 
       $('select[name="floor"]').val() == 'All' &&
        $('select[name="max-area"]').val() == 50000 && $('select[name="min-area"]').val() == 0 )
    {
      $('#clear-all-fields').removeClass('active-clearall');
      $('.clear-selection.all').removeClass('active-clearall');
    }

    if ($('input[name="comm[]"]:checked').length == 0 && $('input[name="p-type[]"]:checked').length == 0 && 
        $('select[name="floor"]').val() == 'All' && $('select[name="max-area"]').val() == 50000 && $('select[name="min-area"]').val() == 0 )
    {
      $('#clear-all-fields').removeClass('active-clearall');
      $('.clear-selection.all').removeClass('active-clearall');
    }

  }


  $('#propertyTypeModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  $('#communityModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  $('#priceModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  $('#bedroomsModal').on('hidden.bs.modal', function () {
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
  });

  /* */

  /* This section for max price to change onclick min price which does not work on Safari */
  $.fn.showOption = function () {
    this.each(function () {
      if (this.tagName == "OPTION") {
        var opt = this;
        if ($(this).parent().get(0).tagName == "SPAN") {
          var span = $(this).parent().get(0);
          $(span).replaceWith(opt);
          $(span).remove();
        }
        opt.disabled = false;
        $(opt).show();
      }
    });
    return this;
  }
  $.fn.hideOption = function () {
    this.each(function () {
      if (this.tagName == "OPTION") {
        var opt = this;
        if ($(this).parent().get(0).tagName == "SPAN") {
          var span = $(this).parent().get(0);
          $(span).hide();
        } else {
          $(opt).wrap("span").hide();
        }
        opt.disabled = true;
      }
    });
    return this;
  }
  /* End this section */  
  
  $(document.body).on("click", function (event) {
    var el = event.srcElement;
    if (!$(el).hasClass("trigger") && (!$(el).is("a")))
      $(".communities-menu").slideUp();
  });

  $(document.body).on("click", function (event) {
    var el = event.srcElement;
    if (!$(el).hasClass("trigger") && (!$(el).is("a")))
      $(".sharing-options").slideUp();
  });

  $(document).mouseup(function (e) {
    var search_form = $(".prop-search-bar");
    var mobile_search_form = $(".homepage-mobile-filter-section");
    // If the target of the click isn't the container  
    if (!search_form.is(e.target) && search_form.has(e.target).length === 0) {
      //alert('Clicked outside');
      if (!checkMobile.matches) {
        if ($(".price-range-selection .select-sec-options").is(":visible")) {
          // $('.price-range-selection .select-sec-options').slideUp();
          $('.price-range-selection label.search-fld').removeClass("active");
          // $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
        if ($(".property-type-selection .select-sec-options").is(":visible")) {
          // $('.property-type-selection .select-sec-options').slideUp();
          $('.property-type-selection label.search-fld').removeClass("active");
          // $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
        if ($(".bedroom-selection .select-sec-options").is(":visible")) {
          // $('.bedroom-selection .select-sec-options').slideUp();
          $('.bedroom-selection label.search-fld').removeClass("active");
          // $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
		if ($(".floor-selection .select-sec-options").is(":visible")) {
          // $('.floor-selection .select-sec-options').slideUp();
          $('.floor-selection label.search-fld').removeClass("active");
          // $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
		if ($(".area-selection .select-sec-options").is(":visible")) {
          // $('.area-selection .select-sec-options').slideUp();
          $('.area-selection label.search-fld').removeClass("active");
          // $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
		if ($(".property-selection .select-sec-options").is(":visible")) {
          // $('.property-selection .select-sec-options').slideUp();
          $('.property-selection label.search-fld').removeClass("active");
          // $('.property-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
        if ($('.community-options').is(":visible")) {
          // $('.community-options').slideUp();
          $('.community-selection label.search-fld').toggleClass('active');
          // $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
        }
      }
    }
    if (!mobile_search_form.is(e.target) && mobile_search_form.has(e.target).length === 0) {
      $(".homepage-mobile-filter-section #prop_search_mobile_form").hide();
      $(".home-hero-section .prop-search-bar").removeClass('position-property-search');
      $(".hero-background-overlay").removeClass('set-hero-overlay');
      $("#btn-show-filters").show();
    }
  });


  $(document).ready(function () {

	/*
		Custom select picker on search property page
	*/
	if( $('.emr-custom-select').length ){
		$('.emr-custom-select').selectpicker();
				
	}
	

    /*
    adjust css for header, hide the CTA 
    */
    if ($('.phone-tab').length <= 0 && $('.watsapp-tab').length <= 0 && $('.register-tab').length <= 0) {
      $("ul li.lang-tab").addClass("mr-5");
    } else {
      $("ul li.lang-tab").removeClass("mr-5");
    }
    if ($('.home-search-component').length > 0) {
      $('.home-search-component input[name="comm[]"]:checkbox').prop('checked', false);
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      $('.home-search-component input[name="bed[]"]:checkbox').prop('checked', false);
      $('.bedroom-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('.home-search-component select[name="min-price"] option[value="0"]').prop("selected", true);
      $('.home-search-component select[name="max-price"] option[value="100000000"]').prop("selected", true);
      $('.home-search-component .price-range-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('.home-search-component input[name="p-type[]"]:checkbox').prop('checked', false);
      $('.property-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    }

    if (!checkMobileTablet.matches) {
      /* Sticky Fixed on scroll left remove sticky before footer */
      $(window).scroll(function () {

        if ($(window).scrollTop() > 100) {
          $('.cookie-disclaimer').addClass('stick-top');
        } else if ($(window).scrollTop() <= 100) {
          $('.cookie-disclaimer').removeClass('stick-top');
        }

        if ($('#myElementToStick').length && $('#myElementToStick').offset().top + $("#myElementToStick").height() > $("#colophon").offset().top) {
          $('#myElementToStick').css('top', -($("#myElementToStick").offset().top + $("#myElementToStick").height() - $("#colophon").offset().top));
        }


      });

    }

    if(device != "desktop" || device_tablet || window.innerWidth < 991 )
		{
      setTimeout(function(){
        // MMenu for mobile
  		  const menu = new Mmenu( document.querySelector( '#mobile_nav' ),
  			{
  			  navbars : [
  				{
  				  content   : [ 'close' ]
  				},{
  				  content   : [ 'prev' ]
  				},
  			  ]
  			}
  		  );
  		$("#mobile_nav").find( ".mm-navbar__btn.mm-btn_prev" ).append( "Back to Menu" );  
  		const api = menu.API;
  		  api.bind( "close:after", function() {
  			  api.closeAllPanels();
  		});

      $('.get-touch-btn').click(function( ev ) {
        ev.preventDefault();
        if ($("#mobile_nav").hasClass( "mm-menu_opened" )){
          api.close();
        } 
      });
      
      $('.instant-video-call').on('click', function(){
        var checkExist = setInterval(function() {
          if ($('.calendly-overlay').length) {
             if ($("#mobile_nav").hasClass( "mm-menu_opened" )){
              api.close();
            }
            clearInterval(checkExist);
          }
        }, 50);        
      })
      console.log('Mmenu Loaded');
      }, 800);		
  }

	/* Mobile Filter -Sticky */
	$(window).scroll(function() {
	  var distanceFromTop = $(document).scrollTop();
	  if (distanceFromTop >= 200)
	  {
		  $('.prop-search-mobile-form').addClass('search-sticky');
		  if($('.prop-search-mobile-form').hasClass('search-sticky') && $('#collapseFilter').hasClass('show')){
			  $('body').css('overflow-y','hidden');
		  }
	  }
	  else
	  {
		  $('.prop-search-mobile-form').removeClass('search-sticky');
	  }
	});
	
	$("#collapseFilter").on('show.bs.collapse', function(){
		if($('.prop-search-mobile-form').hasClass('search-sticky')){
			$('body').css('overflow-y','hidden');
		}
	});
	
	$("#collapseFilter").on('hide.bs.collapse', function(){
		$('body').css('overflow-y','scroll');
	});
  
    /* Initialize animation on scroll */
    //AOS.init();

    /* Remove scroll staggered animation from featured community menu */
    $(".communities-menu-featured .communities-featured-block").removeClass("come-in");

    var currentItem;
    var itemsFound;
    var min_price_selection;
    var max_price_selection;
    
    //$('.price-validation-error').hide();

    //$('#select').append($('<option>', {value:1, text:'One'}));
	
	//alert($('select[name="max-price"]').val());
	//alert($('select[name="min-price"]').val());
	if(checkMobile.matches){
		$('#floor-for-mobile').removeClass("d-none"); 
	}
	else{
		$('.floor-selection').removeClass("d-none"); 
	}
    if ($('select[name="max-price"]').val()==0){
		$('select[name="max-price"] option[value="100000000"]').prop("selected", true);
	}
	if ($('select[name="max-area"]').val()==0 || $('select[name="max-area"]').val()==50000){
		$('select[name="max-area"] option[value="50000"]').prop("selected", true);
	}
    if ($('input[name="comm[]"]:checked').length > 0) {
      $('.community-selection').find('span.search-val').addClass('selected-val');
      $('#clear-community').addClass('active-clear');
      $('#community-for-mobile').find('span.search-val').addClass('selected-val');
      $('#mobile-clear-community').addClass('active-clear');
	  $('.clear-selection.all').addClass('active-clearall');
    }
    if ($('input[name="bed[]"]:checked').length > 0) {
      $('.bedroom-selection').find('span.search-val').addClass('selected-val');
      $('#clear-bedrooms').addClass('active-clear');
      $('#bedroom-for-mobile').find('span.search-val').addClass('selected-val');
      $('#mobile-clear-bedrooms').addClass('active-clear');
	  $('.clear-selection.all').addClass('active-clearall');
    }
    if ($('select[name="max-price"]').val() > 0) {
		  if ($('select[name="max-price"]').val() == 100000000 & $('select[name="min-price"]').val() == 0) {
        $('.price-range-selection, #price-for-mobile').find('span.search-val').removeClass('selected-val');
      }
      else if($('select[name="max-price"]').val() == 20000000 & $('select[name="min-price"]').val() == 0){
        $('.price-range-selection').find('span.search-val').removeClass('selected-val');  
      }
	    else {
        if ($('select[name="min-price"]').val() > 0 || $('select[name="max-price"]').val() > 0) {
          $('.price-range-selection').find('span.search-val').addClass('selected-val');
          $('#clear-price').addClass('active-clear');
          $('#mobile-clear-price').addClass('active-clear');
          $('#price-for-mobile').find('span.search-val').addClass('selected-val');
		      $('.clear-selection.all').addClass('active-clearall');
		  //console.log("HHHHHHHHH#");
        }
      }
    }
	if ($('select[name="floor"]').val() >= 1 ){
     $('.floor-selection').find('span.search-val').addClass('selected-val');
     //$('#clear-price').addClass('active-clear');
     $('#clear-floor-mobile').addClass('active-clear');
     $('#clear-floor').addClass('active-clear');
     $('#floor-for-mobile').find('span.search-val').addClass('selected-val');
	   $('.clear-selection.all').addClass('active-clearall'); 
     //console.log("HHHHHHHHH#");	 
    }
	
	if ($('select[name="min-area"]').val() > 500){
     //$('.price-range-selection').find('span.search-val').addClass('selected-val');
     //$('#clear-price').addClass('active-clear');
     $('#clear-area, #clear-area-mobile').addClass('active-clear');
     $('#area-for-mobile').find('span.search-val').addClass('selected-val');
	  $('.clear-selection.all').addClass('active-clearall'); 
     //console.log("HHHHHHHHH#");	 
    }
	
    if ($('input[name="p-type[]"]:checked').length > 0) {
	  var selectedPropTypes = [];
      $('.property-type-selection').find('span.search-val').addClass('selected-val');
      $('#clear-property').addClass('active-clear');
      $('#property-for-mobile').find('span.search-val').addClass('selected-val');
      $('#mobile-clear-property').addClass('active-clear');
	  $('.clear-selection.all').addClass('active-clearall');
	  
	  // - Hide Floor if its ***
	  var sel_property = [];
	  $('input[name="p-type[]"]:checked').each(function () {
		sel_property.push(this.value);
	  });
	  //console.log("length of property type selection"+sel_property.length);
	  if (sel_property.length <= 3) {
		  //console.log("I am less than equal to 2 !")
		$('input[name="p-type[]"]:checked').each(function () {
			//console.log(this.value);
			/*
			switch (this.value) {
				case "Villa":
					selected_property_flag = 1;
				break;
				case "Townhouse":
					selected_property_flag = 1;
				break;
				case "Plot":
					selected_property_flag = 1;
				break;
				default:
					selected_property_flag = 0;
  
			}
			*/
			
			
			if(this.value != "Villa" && this.value != "Townhouse" && this.value != "Plot" )
			{
				selected_property_flag = 0;
				//console.log(selected_property_flag+"FLAG is ZERO now");	
				return false;
				
			}
			else{
				if(this.value == "Villa" || this.value == "Townhouse" || this.value == "Plot" )
				{
					selected_property_flag = 1;
					//console.log(selected_property_flag+"FLAG IS ONE now");
				}
			}
							
			
			
		});
	}
	//console.log("OUtside loop FLAG"+ selected_property_flag);
	if(selected_property_flag){
		if(checkMobile.matches){
			$('#floor-for-mobile').addClass("d-none"); 
			}
		else{
			$('.floor-selection').addClass("d-none");   
		    }
	}
	else
		{
			if(checkMobile.matches){
				$('#floor-for-mobile').removeClass("d-none"); 
			}
			else{
				$('.floor-selection').removeClass("d-none"); 
			}
				 
		}
	  
	  
    }
	
	if ($('input[name="prop[]"]:checked').length > 0) {
      $('.property-selection').find('span.search-val').addClass('selected-val');
      $('#clear-comm-property').addClass('active-clear');
      $('#property-comm-for-mobile').find('span.search-val').addClass('selected-val');
      $('#mobile-clear-property').addClass('active-clear');
	  $('.clear-selection.all').addClass('active-clearall');
    }

    if ($('select[name="min-floor"]').val() > 1 || $('select[name="max-floor"]').val() > 1) {
      //console.log("EEEEYYYYYYY");
      if ($('select[name="min-floor"]').val() == 1) {
        $('.floor-selection').find('span.search-val').removeClass('selected-val');
        $('#floor-for-mobile span.search-val').removeClass('selected-val');
        $('#clear-floor').removeClass('active-clear');
		$('.floor-selection').find('span.search-val').text(any_text);
      } 
	  else {
		$('.floor-selection').find('span.search-val').addClass('selected-val'); 
		$('#floor-for-mobile span.search-val').addClass('selected-val');		
	  }
      }
    

    if ($('select[name="min-area"]').val() > 0 || $('select[name="max-area"]').val() > 0) {
      //console.log("AREAAAAAAAA");
	  
	  
      if ($('select[name="min-area"]').val() == 0 & $('select[name="max-area"]').val() == 50000) {
        $('.area-selection').find('span.search-val').removeClass('selected-val');
        $('#area-for-mobile span.search-val').removeClass('selected-val');
		$('.area-selection').find('span.search-val').text(any_text);
        $('#area-for-mobile span.search-val').text(any_text);
      } 
	  else {
		$('.area-selection').find('span.search-val').addClass('selected-val'); 
		$('#area-for-mobile span.search-val').addClass('selected-val');		
	  }
    }

    // ############################ Enable and disable Clear button  ##############################
    $('input[name="comm[]"]').on('change', function () {
	   //clear all enaable disable function
	   checkAllSearchFilters();
      ////console.log($('#prop_search_form input[name="comm[]"]:checked').length);
      if (checkMobileTablet.matches) {
        //console.log('checkMobile.matches ==============>' + checkMobile.matches);
        //console.log($('#prop_search_mobile_form input[name="comm[]"]:checked').length);
        if ($('input[name="comm[]"]:checked').length < 1) {
          $('#mobile-clear-community').removeClass('active-clear');
        } else {
          $('#mobile-clear-community').addClass('active-clear');
          $('.clear-selection.all').addClass('active-clearall');
        }
      } else {
        if ($('#prop_search_form input[name="comm[]"]:checked').length < 1) {
          ////console.log($('#prop_search_form input[name="comm[]"]:checked').length);
          $('#clear-community').removeClass('active-clear');
        } else {
          $('#clear-community').addClass('active-clear');
        }
      }
    });
    $('input[name="bed[]"]').on('change', function () {
	  //clear all enaable disable function
	  checkAllSearchFilters();
      if (checkMobileTablet.matches) {
        if ($('input[name="bed[]"]:checked').length < 1) {
          $('#mobile-clear-bedrooms').removeClass('active-clear');
        } else {
          $('#mobile-clear-bedrooms').addClass('active-clear');
          $('.clear-selection.all').addClass('active-clearall');
        }
      } else {
        if ($('#prop_search_form input[name="bed[]"]:checked').length < 1) {
          $('#clear-bedrooms').removeClass('active-clear');
        } else {
          $('#clear-bedrooms').addClass('active-clear');
        }
      }
    });
    $('input[name="p-type[]"]').on('change', function () {
	  //clear all enaable disable function
	  checkAllSearchFilters();
      if (checkMobileTablet.matches) {
        if ($('input[name="p-type[]"]:checked').length < 1) {
          $('#mobile-clear-property').removeClass('active-clear');
        } else {
          $('#mobile-clear-property').addClass('active-clear');
        }
      } else {
        if ($('#prop_search_form input[name="p-type[]"]:checked').length < 1) {
          $('#clear-property').removeClass('active-clear');
        } else {
          $('#clear-property').addClass('active-clear');
        }
      }
    });

    $('select[name="min-price"]').on('change', function () {
	   //clear all enaable disable function
	   checkAllSearchFilters();
      //console.log('++++++++++++Changing Min Price');
      if ($(this).val() > 0) {
        $('#clear-price').addClass('active-clear');
        $('#mobile-clear-price').addClass('active-clear');
        $('.clear-selection.all').addClass('active-clearall');
      } else {
        $('#clear-price').removeClass('active-clear');
        $('#mobile-clear-price').removeClass('active-clear');
      }
      /* Onchange of min-price populate max price from min price onwards */
      min_price_selection = parseInt($(this).children("option:selected").val());
      max_price_selection = parseInt($(this).parents('.price-options').find('.price-max-range select[name="max-price"]').children("option:selected").val());
      summary_prices_select(min_price_selection, max_price_selection);
      ////console.log(min_price_selection);
      $('select[name="max-price"] option').each(function () {
        $(this).showOption();
        currentItem = parseInt($(this).val());
        ////Console.log(currentItem);
        if (currentItem < min_price_selection) {
          $(this).hideOption();
        }

      });

    });
    /* END Onchange of min-price populate max price from min price onwards */
    $('select[name="max-price"]').on('change', function () {
	  //clear all enaable disable function
	  checkAllSearchFilters();
      //console.log('++++++++++++Changing Max Price');
      if ($(this).val() > 0) {
        $('#clear-price').addClass('active-clear');
        $('#mobile-clear-price').addClass('active-clear');
        $('.clear-selection.all').addClass('active-clearall');
      } else {
        $('#clear-price').removeClass('active-clear');
        $('#mobile-clear-price').removeClass('active-clear');
      }
      /* Onchange of min-price populate max price from min price onwards */
      min_price_selection = parseInt($(this).parents('.price-options').find('.price-min-range select[name="min-price"]').children("option:selected").val());
      max_price_selection = parseInt($(this).children("option:selected").val());
      summary_prices_select(min_price_selection, max_price_selection);
      ////console.log(max_price_selection);
      $('select[name="min-price"] option').each(function () {
        $(this).showOption();
        currentItem = parseInt($(this).val());
        ////console.log(currentItem);
        if (currentItem > max_price_selection) {
          $(this).hideOption();
        }

      });
      /* END Onchange of min-price populate max price from min price onwards */
    });
	
	$(document).on("change",'input[name="prop[]"]',function() {
      checkAllSearchFilters();
      if ($('input[name="prop[]"]:checked').length < 1) {
        $(this).parents('.select-sec-options').find('#clear-comm-property').removeClass('active-clear');
        $(this).parents('.modal-content').find('#clear-comm-property').removeClass('active-clear');
      } else {
        $(this).parents('.select-sec-options').find('#clear-comm-property').addClass('active-clear');
        $(this).parents('.modal-content').find('#clear-comm-property').addClass('active-clear');
      }
      // var chkBoxIdStr = $(this).attr('id');
      // var chkBoxId = chkBoxIdStr.slice(7);
      // $('#map_popup_search_form #filterForMap .property-selection .property-options #d-prop-map-'+ chkBoxId).trigger('click');
      
    var checkedBoxes = $(this).parents('.property-selection').find('.property-options input[name="prop[]"]:checked').length || $(this).parents('#property-comm-for-mobile').find('#propertyCommModal .property-comm-options input[name="prop[]"]:checked').length;
    //alert(checkedBoxes);
    var selected_msg_label = "";
    if (checkedBoxes > 0) {
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + property_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + properties_text;
      }
      $('.property-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	    $('#property-comm-for-mobile .search-fld span.search-val').addClass('selected-val').text(selected_msg_label);
      $('.clear-selection.all').addClass('active-clearall');
    } else {
      $('.property-selection').find('span.search-val').removeClass('selected-val').text(all_properties_text);
	    $('#property-comm-for-mobile .search-fld span.search-val').removeClass('selected-val').text(all_properties_text);
    }

    });
	
    // ########## END Enable and disable Clear button
    // if (typeof lazyload === 'function'){      
    //   setTimeout(function(){ lazyload(); }, 250);
    // }
    
  });

  var pid = "";
  var desktop_screen_size = window.matchMedia("(min-width: 1025px)");
  var screen_size = window.matchMedia("(max-width: 1024px)");

  /* Search filter on click toggle */

  $('.community-selection label.search-fld').click(function () {
    pid = $(this).parent().attr("id");
    if (pid == "community-selection-wrapper") {
      if (!checkMobile.matches) {
        $('html, body').animate({
          scrollTop: 400
        }, 600);
      }
    }

    /* hide the other toggles */
    $('.price-range-selection .select-sec-options').slideUp(); //slideUp
    $('.price-range-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    $('.property-selection .select-sec-options').slideUp();	
    $('.property-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-selection .select-sec-options").is(":visible")) {	
      $('.property-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }
    /* toggle the other icon */
    $('.community-options').slideToggle();
    $('.community-selection label.search-fld').toggleClass('active');
    $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.bedroom-selection label.search-fld').click(function () {
    pid = $(this).parent().attr("id");
    if (pid == "bedroom-selection-wrapper") {
      if (!checkMobile.matches) {
        $('html, body').animate({
          scrollTop: 400
        }, 600);
      }
    }

    /* hide the other toggles */
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.community-options').slideUp();
    $('.community-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    $('.property-selection .select-sec-options').slideUp();	
    $('.property-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.bedroom-selection .select-sec-options').slideToggle();
    $('.bedroom-selection label.search-fld').toggleClass('active');
    $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;
  });

  $('.price-range-selection label.search-fld').click(function () {
    pid = $(this).parent().attr("id");
    if (pid == "price-range-selection-wrapper") {
      if (!checkMobile.matches) {
        $('html, body').animate({
          scrollTop: 400
        }, 600);
      }
    }

    /****** hide the other toggles *********/
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    $('.property-selection .select-sec-options').slideUp();	
    $('.property-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.price-range-selection .select-sec-options').slideToggle();
    $('.price-range-selection label.search-fld').toggleClass('active');
    $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.property-type-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    //console.log(pid);

    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    $('.property-selection .select-sec-options').slideUp();	
    $('.property-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    /* toggle the other icon */
    $('.property-type-selection .select-sec-options').slideToggle();
    $('.property-type-selection label.search-fld').toggleClass('active');
    $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.floor-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    //console.log(pid);

    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();
    $('.area-selection label.search-fld').removeClass("active");
    $('.property-selection .select-sec-options').slideUp();	
    $('.property-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".area-selection .select-sec-options").is(":visible")) {
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".property-type-selection .select-sec-options").is(":visible")) {	
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }	
	if ($(".property-selection .select-sec-options").is(":visible")) {	
      $('.property-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }
    /* toggle the other icon */
    $('.floor-selection .select-sec-options').slideToggle();
    $('.floor-selection label.search-fld').toggleClass('active');
    $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

  $('.area-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    //console.log(pid);

    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.property-selection .select-sec-options').slideUp();	
    $('.property-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }    	
    if ($(".property-type-selection .select-sec-options").is(":visible")) {	
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }	
    if ($(".floor-selection .select-sec-options").is(":visible")) {	
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }	
    if ($(".property-selection .select-sec-options").is(":visible")) {	
      $('.property-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }
    /* toggle the other icon */
    $('.area-selection .select-sec-options').slideToggle();
    $('.area-selection label.search-fld').toggleClass('active');
    $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;

  });

$('.property-selection label.search-fld').click(function () {
    var pid = $(this).parent().attr("id");
    /* hide the other toggles */
    $('.bedroom-selection .select-sec-options').slideUp();
    $('.bedroom-selection label.search-fld').removeClass("active");
    $('.price-range-selection .select-sec-options').slideUp();
    $('.price-range-selection label.search-fld').removeClass("active");
    $(".community-options").hide("fast");
    $('.community-selection label.search-fld').removeClass("active");
    $('.property-type-selection .select-sec-options').slideUp();
    $('.property-type-selection label.search-fld').removeClass("active");
    $('.floor-selection .select-sec-options').slideUp();
    $('.floor-selection label.search-fld').removeClass("active");
    $('.area-selection .select-sec-options').slideUp();	
    $('.area-selection label.search-fld').removeClass("active");
    /* hide the other toggles */
    /* toggle the other icons */
    if ($('.community-options').is(":visible")) {
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".price-range-selection .select-sec-options").is(":visible")) {
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".bedroom-selection .select-sec-options").is(":visible")) {
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    }
    if ($(".floor-selection .select-sec-options").is(":visible")) {	
      $('.floor-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }	
	  if ($(".area-selection .select-sec-options").is(":visible")) {	
      $('.area-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');	
    }
    /* toggle the other icon */
    $('.property-selection .select-sec-options').slideToggle();
    $('.property-selection label.search-fld').toggleClass('active');
    $('.property-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
    return false;
  });

  //here put the common function
  function summary_bedrooms_select() {
    var bedrooms_dropdown_array = [];
    var bedrooms_dropdown_string = "";
    //var element_id = $(this).attr('id');
    //var number = element_id.match(/\d+/);
    var single_string = "";
    $.each($('input[name="bed[]"]:checked'), function () {
      //single_string = $(this).val().toString().replace(' '+bedrooms_text+'','');
      //single_string = single_string.replace(' '+bedroom_text+'',''); 
      //element_id = $(this).attr('id');
      single_string = $(this).attr('id').match(/\d+/);
      if (single_string == "5")
        single_string = single_string + '+';
      //console.log(single_string);
      bedrooms_dropdown_array.push(single_string);
    });
    bedrooms_dropdown_string = bedrooms_dropdown_array.join(", ");
    //for property alert
    if($('#gform_16').length > 0){
      $('#gform_16 #input_16_46').val(bedrooms_dropdown_string);
    }
    //alert(bedrooms_dropdown_array);
    //bedrooms_dropdown_string = bedrooms_dropdown_array.toString();
    if (bedrooms_dropdown_string == '1') {
      bedrooms_dropdown_string = bedrooms_dropdown_array + ' ' + bedroom_text;
    } else {
      bedrooms_dropdown_string = bedrooms_dropdown_array + ' ' + bedrooms_text;
    }
    bedrooms_dropdown_string = bedrooms_dropdown_string.replace(/,/g, ", ");
    return (bedrooms_dropdown_string);
  }

  function summary_prices_select(min_price_selection, max_price_selection) {
    //alert('Min Price:'+$('select[name="min-price"]').val());
    //alert('Max Price:'+$('select[name="max-price"]').val());
    /*if($('select[name="min-price"]').val() == 0 & $('select[name="max-price"]').val()== 100000000)
      {
        selectedPriceRange = any_text;
        $('.price-range-selection').find('span.search-val').removeClass('selected-val').text(selectedPriceRange);                    
        $('#price-for-mobile .search-val').removeClass('selected-val').text(selectedPriceRange);
        //alert(selectedPriceRange);    
      }
      else
      {
        selectedPriceRange = currency_text + ' '  + parseInt($('select[name="min-price"]').val()).toLocaleString() + ' - ' + parseInt($('select[name="max-price"]').val()).toLocaleString();
    
        $('.price-range-selection').find('span.search-val').addClass('selected-val').text(selectedPriceRange);                    
        $('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange); 
        //alert(selectedPriceRange);    
      }
  */
    selectedPriceRange = currency_text + ' ' + parseInt(min_price_selection).toLocaleString() + ' - ' + parseInt(max_price_selection).toLocaleString();
    $('.price-range-selection').find('span.search-val').addClass('selected-val').text(selectedPriceRange);
    $('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange);
    //for property alert
    if($('#gform_16').length > 0){
      $('#gform_16 #input_16_47').val(selectedPriceRange);
    }
  }

  function summary_floors_select(floorLevel) {
    if (floorLevel > 0 ) {
      $('.clear-selection.all').addClass('active-clearall');
      $('#clear-floor-mobile, #clear-floor').addClass('active-clear');
	    $('.floor-selection, #floor-for-mobile').find('span.search-val').addClass('selected-val').text(floorLevel);
    } else {
      $('#clear-floor').removeClass('active-clear');
	    $('.floor-selection, #floor-for-mobile').find('span.search-val').removeClass('selected-val').text(any_text);
    }
    if (floorLevel == 0 ) {
      $('.floor-selection, #floor-for-mobile').find('span.search-val').removeClass('selected-val').text(any_text);
    }
  }

  function summary_area_select(minArea, maxArea) {
	if (minArea > 0 || maxArea < 50000) {
      $('.clear-selection.all').addClass('active-clearall');
      $('#clear-area, #clear-area-mobile').addClass('active-clear');
    } else {
      $('#clear-area, #clear-area-mobile').removeClass('active-clear');
    }
	if ($('select[name="min-area"]').val() == 0 && $('select[name="max-area"]').val() == 0) {
      $('.area-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      $('#area-for-mobile span.search-val').removeClass('selected-val').text(any_text);
    } else {
      var selectedAreaRange = parseInt(minArea) + ' ' + sqft_text + ' - ' + parseInt(maxArea) + ' ' + sqft_text;
      $('.area-selection').find('span.search-val').addClass('selected-val').text(selectedAreaRange);
	    $('#area-for-mobile span.search-val').addClass('selected-val').text(selectedAreaRange);
    }
    
    //alert('summary_area_select'+selectedAreaRange);
    
    //$('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange);
  }

  /* Clear Function  */
  $(document).on("click",".clear-selection",function(e) {
    //e.preventDefault();
    $(this).removeClass('active-clear');
	  // $(this).removeClass('active-clearall');
    selected_id = $(this).attr("id");
    if (selected_id == 'clear-community' || selected_id == 'clear-all-fields') {
      $('#prop_search_form input[name="comm[]"]:checkbox').prop('checked', false);
      //console.log("CLEAR COMMUNITY@@@@");
      //clear-community
      //document.getElementByName("comm").checked = false;
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      //$('#clear-community').removeClass('active-clear');
    }
    if (selected_id == 'mobile-clear-community' || selected_id == 'clear-all-fields') {
      $('#communityModal input[name="comm[]"]:checkbox').prop('checked', false);
      $('#community-for-mobile span.search-val').removeClass('selected-val').text(all_communities_text);
      //$('.community-selection').find('span.search-val').css({ 'color': '#232323' }).text(all_communities_text );
      //$('#clear-community').removeClass('active-clear'); 
    }
    if (selected_id == 'clear-bedrooms' || selected_id == 'clear-all-fields') {
      $('#prop_search_form input[name="bed[]"]:checkbox').prop('checked', false);
      $('.bedroom-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    }
    if (selected_id == 'mobile-clear-bedrooms') {
      $('#bedroomsModal input[name="bed[]"]:checkbox').prop('checked', false);
      $('#bedroom-for-mobile span.search-val').removeClass('selected-val').text(any_text);
    }
    if (selected_id == 'clear-price' || selected_id == 'mobile-clear-price' || selected_id == 'clear-all-fields') {
      $('select[name="min-price"] option').showOption();
      $('select[name="max-price"] option').showOption();
      $('select[name="min-price"] option[value="0"]').prop("selected", true);
      $('select[name="max-price"] option[value="100000000"]').prop("selected", true);
      $('#priceModal select[name="min-price"] option[value="0"]').prop("selected", true);
      $('#priceModal select[name="max-price"] option[value="100000000"]').prop("selected", true);
      $('.price-range-selection, #price-for-mobile').find('span.search-val').removeClass('selected-val').text(any_text);
      //$('#clear-price').removeClass('active-clear');
    }
    if (selected_id == 'clear-property' || selected_id == 'clear-all-fields') {
      $('#prop_search_form input[name="p-type[]"]:checkbox').prop('checked', false);
      $('.property-type-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      //$('#clear-property').removeClass('active-clear');
      $('.community-options-desktop').html(CommunityDDBeforeAJax);
      $('.primary-communitylist-container').removeClass('property-community-list');
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
    }
    if (selected_id == 'mobile-clear-property') {
      $('#property-for-mobile .search-val').removeClass('selected-val').text(any_text);
      $('#propertyTypeModal input[name="p-type[]"]:checkbox').prop('checked', false);
      $('.community-options-mobile').html(CommunityDDBeforeAJax);
      $('#community-for-mobile span.search-val').removeClass('selected-val').text(all_communities_text);
      $('#mobile-clear-community').removeClass('active-clear');
    }
    if (selected_id == 'clear-floor' || selected_id == 'clear-floor-mobile' || selected_id == 'clear-all-fields') {
      $('select[name="floor"] option[value="All"]').prop("selected", true);
      $('.floor-selection, #floor-for-mobile').find('span.search-val').removeClass('selected-val').text(any_text);
    }
    if (selected_id == 'clear-area' || selected_id == 'clear-area-mobile' || selected_id == 'clear-all-fields') {
      /*
      $('select[name="min-area"] option').each(function () {
        $(this).showOption();
      });
      $('select[name="max-area"] option').each(function () {
        $(this).showOption();
      });
      */
      $('select[name="min-area"] option').showOption();
      $('select[name="max-area"] option').showOption();
      $('select[name="min-area"] option[value="0"]').prop("selected", true);
      $('select[name="max-area"] option[value="50000"]').prop("selected", true);
      $('#clear-area-mobile').removeClass('active-clear');
      $('.area-selection, #area-for-mobile').find('span.search-val').removeClass('selected-val').text(any_text);
    }
	
    if (selected_id == 'clear-comm-property' || selected_id == 'clear-all-fields') {
      $('#prop_search_form input[name="prop[]"]:checkbox, #prop_search_mobile_form input[name="prop[]"]:checkbox').prop('checked', false);
      $('.property-selection').find('span.search-val').removeClass('selected-val').text(any_text);
      //$('#clear-property').removeClass('active-clear');
      //$('.community-options-desktop').html(CommunityDDBeforeAJax);
      //$('.primary-communitylist-container').removeClass('property-community-list');
      $('.property-selection, #property-comm-for-mobile').find('span.search-val').removeClass('selected-val').text(all_properties_text);
    }
    
    if (selected_id == 'clear-all-fields') {
      ('#clear-all-fields').removeClass('active-clearall');
    }
    checkAllSearchFilters()
  });


  //Scripts for front page search filter enhancement

  $('input[name="bed[]"]').on('change', function () {
    /* Bedrooms select dropdown */
    var bedrooms_dropdown_string1 = summary_bedrooms_select();
    if ($('input[name="bed[]"]:checked').length > 0) {
      $('.bedroom-selection').find('span.search-val').addClass('selected-val').text(bedrooms_dropdown_string1);
      $('#bedroom-for-mobile .search-val').addClass('selected-val').text(bedrooms_dropdown_string1);
      $('.clear-selection.all').addClass('active-clearall');
    } else {
      $('.bedroom-selection').find('span.search-val').removeClass('selected-val').text(any_text);
	  $('#bedroom-for-mobile .search-val').removeClass('selected-val').text(any_text);
    }
    /* End Bedrooms select dropdown */
  });

  $('#prop_search_form ul li input[name="comm[]"], #map_popup_search_form .popUpFilter .community-selection .community-options.select-sec-options ul li input[name="comm[]"], .homesearch_mobile_filter .prop-search-mobile-form #communityModal .community-options.select-sec-options ul li input[name="comm[]"]').on('change', function () {
    //var checkedBoxes = $('input[name="comm[]"]:checked').length;
    var checkedBoxes = $(this).parents('#prop_search_form').find('input[name="comm[]"]:checked').length || $(this).parents('.community-selection').find('.community-options.select-sec-options input[name="comm[]"]:checked').length || $(this).parents('.community-options-mobile').find('input[name="comm[]"]:checked').length;
    var selected_msg_label = "";
    if (checkedBoxes > 0) {
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + community_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + communities_text;
      }
      $(this).parents('.community-options.select-sec-options').siblings('.community-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
      $(this).closest('.community-options.select-sec-options').parents('.community-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
      $('#community-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
      $('.clear-selection.all').addClass('active-clearall');
    } else {
      $(this).parents('.community-options.select-sec-options').siblings('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      $(this).closest('.community-options.select-sec-options').parents('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      $('#community-for-mobile .search-val').removeClass('selected-val').text(all_communities_text);
    }

    var sel_comm = [];
    if($(this).parents('#prop_search_form').length > 0){
      $(this).parents('#prop_search_form').find('input[name="comm[]"]:checked').each(function() {
        sel_comm.push(this.value); 
      });
      getPropertiesByCommunities( sel_comm , $(this).parents('#prop_search_form'));
    }
    

    if($(this).parents('#map_popup_search_form').length > 0){
      $(this).parents('#map_popup_search_form').find('.community-options.select-sec-options input[name="comm[]"]:checked').each(function() {
        sel_comm.push(this.value); 
      });
      getPropertiesByCommunities( sel_comm , $(this).parents('#map_popup_search_form'));
    }
  });

  function getPropertiesByCommunities( communities =null, objElement ) {
    $('.property-selection').find('span.search-val').removeClass('selected-val').text(any_text);
    $('.property-selection').find('.emaarspinner').removeClass('d-none');
    var jqXHR = jQuery.ajax({
        type: "POST",
        url: emaar_ajax_script.ajaxurl,
        data: {
            action : 'get_properties_by_communities',
            comm:communities,
        },
        success: function (data) {
          // preserve newlines, etc - use valid JSON
          data = data.replace(/\\n/g, "\\n")  
          .replace(/\\'/g, "\\'")
          .replace(/\\"/g, '\\"')
          .replace(/\\&/g, "\\&")
          .replace(/\\r/g, "\\r")
          .replace(/\\t/g, "\\t")
          .replace(/\\b/g, "\\b")
          .replace(/\\f/g, "\\f");
          // remove non-printable and other non-valid JSON chars
          data = data.replace(/[\u0000-\u0019]+/g,""); 
          data = JSON.parse( data );

          if( data.message == 'success' ){
            var htmlMobilePropertiesList = '';
            var htmlPropertiesList = '';
            var htmlPropertiesMap = '';
            $.each( data.data.properties_list, function( key, value ) {
                htmlMobilePropertiesList += '<li><input type="checkbox" id="m-prop-'+key+'" name="prop[]" value="'+value.SF_SLUG+'"><label for="m-prop-'+key+'">'+value.TITLE+'</label><br></li>';  
                htmlPropertiesList += '<li><input type="checkbox" id="d-prop-'+key+'" name="prop[]" value="'+value.SF_SLUG+'"><label for="d-prop-'+key+'">'+value.TITLE+'</label><br></li>';
                htmlPropertiesMap += '<li><input type="checkbox" id="d-prop-map-'+key+'" name="prop[]" value="'+value.SF_SLUG+'"><label for="d-prop-map-'+key+'">'+value.TITLE+'</label><br></li>';
            });
            if(htmlPropertiesList.length > 0){
              $('#prop_search_form .property-options ul').html(htmlPropertiesList);
              $('#map_popup_search_form .property-options ul').html(htmlPropertiesMap);
              $('div.property-comm-options ul').html(htmlMobilePropertiesList);
            }
          }else{
            $('.property-options ul').html('<li>'+no_property_text+'</li>');
          }
          $('.property-selection').find('.emaarspinner').addClass('d-none');
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    return jqXHR.responseText
}

  $(document).on('click', '.prop-search-bar input[name="comm[]"]', function () {
    
    //console.log("New Property Community List Clicked.");
    //alert(this);
    var checkedBoxes = $('.prop-search-bar input[name="comm[]"]:checked').length;
    //alert(checkedBoxes);
    var selected_msg_label = "";
    if (checkedBoxes > 0) {
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + community_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + communities_text;
      }
      $('.community-selection').find('span.search-val').addClass('selected-val').text(selected_msg_label);
	    $('#community-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
      $('#clear-community').addClass('active-clear');
      if (checkMobile.matches) {
        $('#mobile-clear-community').addClass('active-clear');
      }

    } else {
      $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
      $('#clear-community').removeClass('active-clear');
      if (checkMobile.matches) {
        $('#mobile-clear-community').removeClass('active-clear');
      }

    }
    var sel_comm = [];
    if($(this).parents('div.prop-search-mobile-form').length > 0){
      $(this).parents('div.prop-search-mobile-form').find('input[name="comm[]"]:checked').each(function() {
        sel_comm.push(this.value); 
      });
      getPropertiesByCommunities( sel_comm , $(this).parents('div.prop-search-mobile-form'));
    }

  });

  $(document).on('click', '.home-search-component #clear-community', function () {
    //console.log("clear-community--CCCCCCCCCC");
    $('.home-search-component input[name="comm[]"]:checkbox').prop('checked', false);
    $('.community-selection').find('span.search-val').removeClass('selected-val').text(all_communities_text);
    $('#clear-community').removeClass('active-clear');
  });
/*
  $('select[name="min-price"]').on('change', function () {
    summary_prices_select();
  });

  $('select[name="max-price"]').on('change', function () {
    summary_prices_select();
  });
*/

  $('#priceModal select[name="min-price"]').on('change', function () {
    //console.log('summary_prices_select()');
    if ($('#priceModal select[name="min-price"]').val() == 0 & $('#priceModal select[name="max-price"]').val() == 100000000) {
      /*selectedPriceRange = any_text;
        $('#price-for-mobile .search-val').removeClass('selected-val').text(selectedPriceRange);
        //alert(selectedPriceRange);  
    $('#mobile-clear-price').removeClass('active-clear');
    */
    } else {
      selectedPriceRange = currency_text + ' ' + parseInt($('#priceModal select[name="min-price"]').val()).toLocaleString() + ' - ' + parseInt($('#priceModal select[name="max-price"]').val()).toLocaleString();
      $('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange);
      //alert(selectedPriceRange);
      $('#mobile-clear-price').addClass('active-clear');
    }
  });

  $('select[name="max-price-mobile"]').on('change', function () {
    //alert('summary_prices_select()');
    summary_prices_select();
  });

  //END Scripts for front page search filter enhancement
  // Scripts for Home Page -- Mobile Filter 

  $('#mobile-bedrooms-apply').click(function () {
    var bedrooms_dropdown_string1 = summary_bedrooms_select();
    $('#bedroomsModal').hide();
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
    if ($('input[name="bed[]"]:checked').length > 0) {
      $('#bedroom-for-mobile .search-val').addClass('selected-val').text(bedrooms_dropdown_string1);
    } else {
      $('#bedroom-for-mobile .search-val').removeClass('selected-val').text(any_text);
    }
  });


  $('#mobile-community-apply').click(function () {
    $('#communityModal').hide();
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
    var checkedBoxes = $('input[name="comm[]"]:checked').length;
    var selected_msg_label = "";
    if (checkedBoxes > 0) {
      if (checkedBoxes == 1) {
        selected_msg_label = checkedBoxes + ' ' + community_text;
      }
      if (checkedBoxes > 1) {
        selected_msg_label = checkedBoxes + ' ' + communities_text;
      }
      $('#community-for-mobile .search-val').addClass('selected-val').text(selected_msg_label);
    } else {
      $('#community-for-mobile .search-val').removeClass('selected-val').text(all_communities_text);
    }
  });

  $('#mobile-price-apply').click(function () {
    $('#priceModal').hide();
    $('#btn-show-filters').hide();
    $('.homepage-mobile-filter-section #prop_search_mobile_form').show();
    var min_price_mobile = $('#priceModal select[name="min-price"]').val();
    var max_price_mobile = $('#priceModal select[name="max-price"]').val();
    //console.log(min_price_mobile);
    //console.log(max_price_mobile);
    if (min_price_mobile == 0 & max_price_mobile == 100000000) {
      selectedPriceRange = any_text;
      $('#price-for-mobile .search-val').removeClass('selected-val').text(selectedPriceRange);
      //alert(selectedPriceRange);    
    } else {
      selectedPriceRange = currency_text + ' ' + parseInt(min_price_mobile).toLocaleString() + ' - ' + parseInt(max_price_mobile).toLocaleString();
      $('#price-for-mobile .search-val').addClass('selected-val').text(selectedPriceRange);
      //alert(selectedPriceRange);    
    }
  });

  /*
  $(document).on('click', '#propertyTypeModal input[name="p-type[]"]', function() { 
   var checkedBoxes = $('input[name="p-type[]"]:checked').length;
   if (checkedBoxes > 0)
   {
     $('#mobile-clear-property').addClass('active-clear');
   }
   else {
    $('#mobile-clear-property').removeClass('active-clear'); 
   }
   });
  */

  $('#priceModal select[name="max-price"]').on('change', function () {
    //console.log('++++++++++++Changing Max Price');
    if ($(this).val() > 0) {

      $('#mobile-clear-price').addClass('active-clear');
    } else {

      $('#mobile-clear-price').removeClass('active-clear');
    }
    /* Onchange of min-price populate max price from min price onwards */
    /* Onchange populate min-price max-price */
    max_price_selection = parseInt($(this).children("option:selected").val());
    ////console.log(max_price_selection);
    $('#priceModal select[name="min-price"] option').each(function () {
      $(this).showOption();
      currentItem = parseInt($(this).val());
      ////console.log(currentItem);
      if (currentItem > max_price_selection) {
        $(this).hideOption();
      }

    });
  });

  $('#priceModal select[name="min-price"]').on('change', function () {
    //console.log('++++++++++++Changing Min Price');
    if ($(this).val() > 0) {
      $('#mobile-clear-price').addClass('active-clear');
    } else {
      $('#mobile-clear-price').removeClass('active-clear');
    }
    /* Onchange of min-price populate max price from min price onwards */
    min_price_selection = parseInt($(this).children("option:selected").val());
    ////console.log(min_price_selection);
    $('#priceModal select[name="max-price"] option').each(function () {
      $(this).showOption();
      currentItem = parseInt($(this).val());
      ////Console.log(currentItem);
      if (currentItem < min_price_selection) {
        $(this).hideOption();
      }
    });

  });

  //On change max select populate min select
  $('select[class="max-select"]').on('change', function () {
    checkAllSearchFilters();
    if ($(this).val() > 0) {
      $(this).parents('.select-sec-options').find('.clear-selection').addClass('active-clear');
    } else {
      $(this).parents('.select-sec-options').find('.clear-selection').removeClass('active-clear');
    }
    max_selection = parseInt($(this).children("option:selected").val());
    ////console.log(max_price_selection);
    var topTwo = $(this).parents().eq(1).attr('class');
    topTwo = '.' + topTwo.split(/\s(.+)/)[0] + " ";
    //alert(topTwo);
    $(topTwo + 'select[class="min-select"] option').each(function () {
      $(this).showOption();
      currentItem = parseInt($(this).val());
      ////console.log(currentItem);
      if (currentItem > max_selection) {
        $(this).hideOption();
      }
    });
  });

  //On change max select populate min select
  $('select[class="min-select"]').on('change', function () {
    checkAllSearchFilters();
    if ($(this).val() > 0) {
      $(this).parents('.select-sec-options').find('.clear-selection').addClass('active-clear');
    } else {
      $(this).parents('.select-sec-options').find('.clear-selection').removeClass('active-clear');
    }
    min_selection = parseInt($(this).children("option:selected").val());
    ////console.log(max_price_selection);
    var topTwo = $(this).parents().eq(1).attr('class');
    topTwo = '.' + topTwo.split(/\s(.+)/)[0] + " ";
    //alert(topTwo);
    $(topTwo + 'select[class="max-select"] option').each(function () {
      $(this).showOption();
      currentItem = parseInt($(this).val());
      ////console.log(currentItem);
      if (currentItem < min_selection) {
        $(this).hideOption();
      }
    });
  });

/*
  $('select[name="floor"]').on('change', function () {
    //alert('summary_floors_select()');
    summary_floors_select();
  });
*/
  $('select[name="floor"]').on('change', function () {
    //alert('summary_floors_select()');
    checkAllSearchFilters();
    summary_floors_select($(this).children("option:selected").val());
  });

  $('select[name="min-area"]').on('change', function () {
    //alert('summary_area_select()');
    checkAllSearchFilters();
    var min_area_selection = parseInt($(this).children("option:selected").val());
    var max_area_selection = parseInt($(this).parents('.area-options').find('.area-max-range select[name="max-area"]').children("option:selected").val());    
    summary_area_select(min_area_selection, max_area_selection);
  });

  $('select[name="max-area"]').on('change', function () {
    //alert('summary_area_select()');
    checkAllSearchFilters();
    var min_area_selection = parseInt($(this).parents('.area-options').find('.area-min-range select[name="min-area"]').children("option:selected").val());
    var max_area_selection = parseInt($(this).children("option:selected").val());
    summary_area_select(min_area_selection, max_area_selection);
  });

  $(document).click(function(evt) {
    evt.stopPropagation();
    var propContainer = $(".home-search-component .property-type-options");
    var bedsContainer = $(".home-search-component .bedroom-options, .property-alert-select .bedroom-selection .bedroom-options");
    var przContainer =  $(".home-search-component .price-options, .property-alert-select .price-range-selection .price-options");
    var commContainer = $(".home-search-component .community-options, .property-alert-select .community-options");

    //check if the clicked area is dropDown or not
    if(propContainer !== evt.target && !propContainer.has(evt.target).length && $(propContainer).is(':visible')){
      $('.property-type-selection label.search-fld').removeClass("active");
      $('.property-type-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
      $('.property-type-options').slideUp();      
    }
    if(bedsContainer !== evt.target && !bedsContainer.has(evt.target).length && $(bedsContainer).is(':visible')){      
      $('.bedroom-selection label.search-fld').removeClass("active");
      $('.bedroom-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
      $('.bedroom-options').slideUp();
    }
    if(przContainer !== evt.target && !przContainer.has(evt.target).length && $(przContainer).is(':visible')){
      $('.price-range-selection label.search-fld').removeClass("active");
      $('.price-range-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
      $('.price-options').slideUp();
    }
    if(commContainer !== evt.target && !commContainer.has(evt.target).length && $(commContainer).is(':visible')){
      $('.community-selection label.search-fld').removeClass("active");
      $('.community-selection label.search-fld i.dropdown-icon').toggleClass('fa-angle-up fa-angle-down');
      $('.community-options').slideUp();
    }
    
  });
	  
  // End Scripts for Home Page -- Mobile Filter


  // Slick Slider RTL Support
  /*
  function rtl_slick(){
    if ($('body').hasClass("rtl")) {
       return true;
    } else {
       return false;
    }
  }
*/

  // Featured Communities Slider
  /*
  $('.slider-nav').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: false,
    arrows: true,
    rtl: rtl_slick(),
    nextArrow: '<a href="#" class="slick-next">'+pagination_to_title+'</a> <a href="#" class="slick-next-2">'+pagination_to_title+' 2</a> ',
    prevArrow: '<a href="#" class="slick-prev">'+pagination_from_title+'</i>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerPadding: '15px',
        }
      }
    ],

  });
*/	
	
	// Promotions Slider on Home Page
/*
  $('.slider-promotions').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: false,
    arrows: true,
    rtl: rtl_slick(),
    nextArrow: '<a href="#" class="slick-next">'+pagination_to_title+'</a> <a href="#" class="slick-next-2">'+pagination_to_title+' 2</a> ',
    prevArrow: '<a href="#" class="slick-prev">'+pagination_from_title+'</i>',
  });
*/  
      // Phone masking function for Register your interest form
  function initRYIF_1(){
    var checkNumber = false;
    $('#gform_1 #field_1_6.phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
    });
    $('#gform_1 #field_1_6.phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      $( '#gform_1 #gfield_description_1_6 .phone-mask').html( selectedCountry );
    });
    $('#gform_1 #gfield_description_1_6 .phone-mask').html( $('#gform_1 #field_1_6.phone-intl-code select').val() );
  }

   function initRYIF_4(){
    $('#gform_6 #field_6_32.phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
    });
    $('#gform_6 #field_6_32.phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      //console.log(selectedCountry)
      $( '#gform_6 #gfield_description_6_32 .phone-mask').html( selectedCountry );
    });
    $('#gform_6 #gfield_description_6_32 .phone-mask').html( $('#gform_6 #field_6_32.phone-intl-code select').val() );
  
    $('#gform_6 #field_6_6.booking-phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
    });
    $('#gform_6 #field_6_6.booking-phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      //console.log(selectedCountry)
      $( '#gform_6 #gfield_description_6_6 .phone-mask').html( selectedCountry );
    });
    $('#gform_6 #gfield_description_6_6 .phone-mask').html( $('#gform_6 #field_6_6.booking-phone-intl-code select').val() );
  }


  // Phone masking function for Broker Webinar form
  function initRYIF_12() {    
    $('#gform_12 #field_12_6.booking-phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
    });
    $('#gform_12 #field_12_6.booking-phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      $( '#gform_12 #gfield_description_12_6 .phone-mask').html( selectedCountry );
    });
    $('#gform_12 #gfield_description_12_6 .phone-mask').html( $('#gform_12 #field_12_6.booking-phone-intl-code select').val() );
    //console.log($('#gform_12 #field_12_6.booking-phone-intl-code select').val());
  }

  // Phone masking function for Mortgage offers
  function initRYIF_13() {
    $('#gform_13 #field_13_6.phone-intl-code select').find('option').each(function () {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " + $(this).val());
    });
    $('#gform_13 #field_13_6.phone-intl-code select').change(function () {
      var selectedCountry = $(this).children("option:selected").val();
      $('#gform_13 #gfield_description_13_6 .phone-mask').html(selectedCountry);
    });
    $('#gform_13 #gfield_description_13_6 .phone-mask').html($('#gform_13 #field_13_6.phone-intl-code select').val());
    //console.log($('#gform_13 #field_13_6.phone-intl-code select').val());
  }

  // Phone masking function for Property Alerts
  function initRYIF_16() {    
    var checkNumber = false;
    $('#gform_16 #field_16_6.phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
    });
    $('#gform_16 #field_16_6.phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      $( '#gform_16 #gfield_description_16_6 .phone-mask').html( selectedCountry );
    });
    $('#gform_16 #gfield_description_16_6 .phone-mask').html( $('#gform_16 #field_16_6.phone-intl-code select').val() );
  }
	
  function initRYIF_8(){
	//console.log("initRYIF_8");
    $('#gform_8 #field_8_17.phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
	  //console.log("append"+$(this).val());
    });
    $('#gform_8 #field_8_17.phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      $( '#gform_8 #gfield_description_8_17 .phone-mask').html( selectedCountry );
    });
    $('#gform_8 #gfield_description_8_17 .phone-mask').html( $('#gform_8 #field_8_17.phone-intl-code select').val() );
  }
  
  /* New Book Unit Online Form */
  function initRYIF_14(){
    $('#gform_14 #field_14_32.phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
    });
    $('#gform_14 #field_14_32.phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      //console.log(selectedCountry)
      $( '#gform_14 #gfield_description_14_32 .phone-mask').html( selectedCountry );
    });
    $('#gform_14 #gfield_description_14_32 .phone-mask').html( $('#gform_14 #field_14_32.phone-intl-code select').val() );
  
    $('#gform_14 #field_14_6.booking-phone-intl-code select').find('option').each(function() {
      if( !checkNumber ){
        var val = $(this).text();
        var hasNumber = /\d/;   
        var checkNumber = hasNumber.test(val);
      }
      if( checkNumber )
        return;
      $(this).append(" " +$(this).val()); 
    });
    $('#gform_14 #field_14_6.booking-phone-intl-code select').change(function(){
      var selectedCountry = $(this).children("option:selected").val();
      //console.log(selectedCountry)
      $( '#gform_14 #gfield_description_14_6 .phone-mask').html( selectedCountry );
    });
    $('#gform_14 #gfield_description_14_6 .phone-mask').html( $('#gform_14 #field_14_6.booking-phone-intl-code select').val() );
  }

  function gfromFilterSpecialCharacters(){
    //Form email filter characters
    $('.gform_wrapper div.ginput_container_email input').on('input', function(e) {
      var c = this.selectionStart,
      r = /[~`!#$%\^&*()+=\[\]\\';,/{}|\\": <>\?]/gi,
      v = $(this).val();
      if(r.test(v)) {
        $(this).val(v.replace(r, ''));
        c--;
      }
      this.setSelectionRange(c, c);
    });
    //Allow one space in between words
    $('.gform_wrapper input[type=text], .gform_wrapper textarea').on('input', function(e) {
      var c = this.selectionStart,
      r = /  /gi,
      v = $(this).val();
      if(r.test(v)) {
        $(this).val(v.replace(r, ' '));
        c--;
      }
      this.setSelectionRange(c, c);
    });
  }
  jQuery(document).on('gform_post_render', function(event, form_id, current_page){
    if ( $('div.validation_error').length > 0) {
      if(typeof formName !== 'undefined'){
        setFormName(formName);
      }
    }

    if($('#gform_1').length > 0 && form_id == 1 )
    {
      initRYIF_1();
    }

    if($('#gform_16').length > 0 && form_id == 16 )
    {
      initRYIF_16();
      if ( $('div.validation_error').length > 0) 
      {
        //console.log('validation errors in form 6');
        $(".booking-overlay").hide();
        //console.log('Hiding Overlay Now!');
      }
    }
    
    if($('#gform_6').length > 0 && form_id == 6 )
    {
      initRYIF_4();
      if ( $('div.validation_error').length > 0) 
      {
        //console.log('validation errors in form 6');
        $(".booking-overlay").hide();
        //console.log('Hiding Overlay Now!');
      }
    }
	
	if($('#gform_14').length > 0 && form_id == 14 )
    {
      initRYIF_14();
      if ( $('div.validation_error').length > 0) 
      {
        //console.log('validation errors in form 6');
        $(".booking-overlay").hide();
        //console.log('Hiding Overlay Now!');
      }
    }
	
	if($('#gform_8').length > 0 && form_id == 8 )
    {
      initRYIF_8();
      if ( $('div.validation_error').length > 0) 
      {

        var hashLink = window.location.hash;
        if(hashLink && hashLink == '#investor-enquiries'){
          $('#gform_8 select#input_8_15').css('pointer-events', 'none');
          $('#gform_8 select#input_8_15').val('Investor Enquiries');
          $('#gform_8 select#input_8_15 option:not(:selected)').remove();
        }
      }
    }

    if($('#gform_12').length > 0 && form_id == 12 )
    {
      initRYIF_12();
      if ( $('div.validation_error').length > 0) 
      {        
        $(".booking-overlay").hide(); 
    var selectedValueDate = jQuery("#input_12_9").val();
          var getDateTimeArray = selectedValueDate.split("_");
          var getDateTime = getDateTimeArray[5];
          var JSONObject = JSON.parse(getDateTime);

          var now = new Date();

          var timeSlot = {};
          $.each( JSONObject, function( keyDate, valueDateTime ) {
              //console.log(keyDate);
              var preferredDate = keyDate;
              timeSlot = valueDateTime;
              jQuery('#input_12_10').html('<option value="">Select time</option>');
                $.each( timeSlot, function( key, value ) {
                  jQuery('#input_12_10').append('<option value="'+value+'">'+value+'</option>');
              });
          });
        var h_preftime = $('#input_12_15').val(); 
        //console.log('RRRRRRR '+h_preftime);
    //$("#input_12_10 option[value=" +h_preftime+ "']").prop('selected', true);
        $("#input_12_10 option[value='" +h_preftime+ "']").prop("selected", true);  
    
      }
    }
	
	  if ($('#gform_13').length > 0 && form_id == 13) {
      initRYIF_13();
      if ($('div.validation_error').length > 0) {
        $(".booking-overlay").hide();
      }
    }
    gfromFilterSpecialCharacters();
    //Clone form for reload after submit
    if(formHtml['gf_'+form_id] == undefined)
	  {
		    formHtml['gf_'+form_id]= $('#gform_wrapper_'+form_id).closest('div.modal-body').html();	
	  }
  });

  initRYIF_1();
  initRYIF_4();
  initRYIF_12();
  initRYIF_13();
  initRYIF_8();
  initRYIF_14();
  initRYIF_16();
  gfromFilterSpecialCharacters();

  // MMenu for mobile
  /*
  const menu = new Mmenu( document.querySelector( '#mobile_nav' ),
    {
      navbars : [
        {
          content   : [ 'close' ]
        },{
          content   : [ 'prev' ]
        },
      ]
    }
  );


  $("#mobile_nav").find( ".mm-navbar__btn.mm-btn_prev" ).append( "Back to Menu" );
  
  const api = menu.API;
  api.bind( "close:after", function() {
      api.closeAllPanels();
  });


  $('.get-touch-btn').click(function( ev ) {
    ev.preventDefault();
    if ($("#mobile_nav").hasClass( "mm-menu_opened" )){
      api.close();
    } 
  });

*/
/*
$('.close-collapse-mobile-view').click(function() {
    //console.log('Close the collapse now')
    //$('.unit-details-collapse').removeClass('show');
    //$('.unit-details-collapse').removeClass('hide');
    $(this).closest().find('.detail-units').attr('aria-expanded', function (i, attr) {
    return attr == 'true' ? 'false' : 'true'
});
  });
  */

  
  


/* $('.sort-by').click(function(sortval){
    $(this).find('span.icon-stack i.sort-arrows-up').css('opacity', '0.2');
    $(this).find('span.icon-stack i.sort-arrows-down').css('opacity', '1');
}); */
$("#gform_fields_1 .ginput_container_email #input_1_2").attr('maxlength','80');
$("#gform_fields_2 .ginput_container_email #input_2_1").attr('maxlength','80');

/* On click submit show overlay */
$('#gform_submit_button_6').click(function() {
  $(".booking-overlay").show();
});

$('#gform_submit_button_14').click(function() {
  $(".booking-overlay").show();
});

$('#gform_submit_button_17').click(function() {
  $(".booking-overlay").show();
});
$('#gform_next_button_17_59').click(function() {
  $(".booking-overlay").show();
});
$('#gform_previous_button_17').click(function() {
  $(".booking-overlay").show();
});

$('#gform_submit_button_12').click(function() {
  $(".booking-overlay").show();
});
$(document).on("click","#gform_submit_button_16",function() {
  $(".booking-overlay").show();
});
window.ryiv_form_introduction;
window.formName;
window.brochureTriggeredLead;
$(document).on("click", ".get-touch-btn", function() {
  formName = $(this).attr('data-formname');
  setFormName(formName);
  if( $(this).hasClass('brochure-upload') ){
    brochureTriggeredLead = true;
  }
  else{
    brochureTriggeredLead = false;
  }

});

function setFormName(formName){
  if (formName != '') {
      $('#input_1_24').val(formName);
      var ryi = $('#registerModal').attr('data-ryi');
      var git = $('#registerModal').attr('data-git');
	  var ryiv = $('#registerModal').attr('data-ryiv');
      var rypi = $('#registerModal').attr('data-rypi');
	  
      if (formName == 'Register your Interest') {
        $('#registerModal .gform_heading .gform_title').text(ryi);
        $('.schedule-call-info').text("");

      } else if (formName == 'Get in Touch') {
        if (git != '')
          $('#registerModal .gform_heading .gform_title').text(git);
        $('.schedule-call-info').text("");
      }
      else if (formName == 'Register Interest') {
        if (rypi != '')
          $('#registerModal .gform_heading .gform_title').text(rypi);
        $('.schedule-call-info').text("");
      }
      else if (formName == 'Schedule A Call') {
        if (ryiv != '')
          $('#registerModal .gform_heading .gform_title').text(ryiv);
        //console.log(ryiv_form_introduction);
        $('.schedule-call-info').text(ryiv_form_introduction);

      }
  }
}

// New Promotions Slider on Home Page
/*
var slider = $('.new-promotions-slider');

var settings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  centerMode: false,
  focusOnSelect: false,
  arrows: true,
  rtl: rtl_slick(),
  appendDots: $(".slide-m-dots"),
  prevArrow: $(".slick-prev-new"),
  nextArrow: $(".slick-next-new"),
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
  ]
}

/* Initialize the Slick slider */
/*
$(window).on('load', function() {
	if($(window).width() > 600){
		slider.slick(settings);
	}
});
*/
/*
$(window).on('resize', function() {
	if($(window).width() < 600 && slider.hasClass('slick-initialized'))
	{
	  $('.new-promotions-slider').slick('unslick');
	}
	else if($(window).width() > 600 &&  !slider.hasClass('slick-initialized')) 
	{
		$('.new-promotions-slider').slick(settings);
    } 
});


if (slider.hasClass('slick-initialized'))
{
  if ($('.slide-m-dots .slick-dots li').length == 0 && !slider.hasClass('slick-initialized')) 
  {
    // remove arrows
    $('.slider-controls').hide();
  }
}
*/
});

/*! contentloaded.min.js - https://github.com/dperini/ContentLoaded - Author: Diego Perini - License: MIT */
function contentLoaded(b,i){var j=false,k=true,a=b.document,l=a.documentElement,f=a.addEventListener,h=f?'addEventListener':'attachEvent',n=f?'removeEventListener':'detachEvent',g=f?'':'on',c=function(d){if(d.type=='readystatechange'&&a.readyState!='complete')return;(d.type=='load'?b:a)[n](g+d.type,c,false);if(!j&&(j=true))i.call(b,d.type||d)},m=function(){try{l.doScroll('left')}catch(e){setTimeout(m,50);return}c('poll')};if(a.readyState=='complete')i.call(b,'lazy');else{if(!f&&l.doScroll){try{k=!b.frameElement}catch(e){}if(k)m()}a[h](g+'DOMContentLoaded',c,false);a[h](g+'readystatechange',c,false);b[h](g+'load',c,false)}}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getRefQueryParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function getUTMsFromQueryParam() {
    return {
        utm_source: getRefQueryParam("utm_source") || '',
      utm_medium: getRefQueryParam("utm_medium") || '',
      utm_content: getRefQueryParam("utm_content") || '',
      utm_campaign: getRefQueryParam("utm_campaign") || '',
      utm_term: getRefQueryParam("utm_term") || ''
    }
}

function persistUTMs() {
  if(getRefQueryParam("utm_source") || getRefQueryParam("utm_medium") || getRefQueryParam("utm_content") || getRefQueryParam("utm_campaign") || getRefQueryParam("utm_term")) {
    setCookie('emr_utms', JSON.stringify(getUTMsFromQueryParam()), 7);
  }
}

function getUTMs() {
  var emr_utms = {};
      try {
          emr_utms = JSON.parse(getCookie("emr_utms")) || {};
      } catch(e) { };

  return (emr_utms && (typeof emr_utms === "object") && emr_utms.hasOwnProperty("utm_source")) ? emr_utms : getUTMsFromQueryParam();
}

function getUTMSV2() {
  var emr_utms = {};
  try {
    emr_utms = JSON.parse(getCookie("emr_utms")) || {};
  } catch (e) {};

  return (emr_utms && (typeof emr_utms === "object") && emr_utms.hasOwnProperty("utm_source")) ? emr_utms : getUTMsFromQueryParam();
}

contentLoaded(window, persistUTMs);

function replaceUrlParam(url, paramName, paramValue)
{
    if (paramValue == null) {
        paramValue = '';
    }
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
    if (url.search(pattern)>=0) {
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    url = url.replace(/[?#]$/,'');
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
}

function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');   
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}

$(".gform_button").click(function() {
    if ($(this).attr('data-init') == 'Y')
        return;
    //initCaptchaListener();
    $(this).attr('data-init', 'Y');
});

/* Click event for after error captcha */
$(document).on("click", ".gform_button", function() {
  //initCaptchaListener();
});

/*
function initCaptchaListener() {

    // find the open reCaptcha window
    HTMLCollection.prototype.find = Array.prototype.find

    var frame = document.getElementsByTagName('iframe');

    for (var i = 0; i < frame.length; i++) {
        if (String(frame[i].getAttribute('src')).includes('google.com/recaptcha/api2/bframe')); {
            var recaptchaWindow = frame[i].parentNode.parentNode;
            if (!isHidden(recaptchaWindow))
                new MutationObserver(x => recaptchaWindow.style.opacity == 0 && onClose())
                .observe(recaptchaWindow, {
                    attributes: true,
                    attributeFilter: ['style']
                })
        }
    }
}
*/

function isHidden(el) {
    return (el.offsetParent === null)
}
/*
function initReinitiatedCaptchaListener() {
    HTMLCollection.prototype.find = Array.prototype.find

    mainiframedom = document.getElementsByTagName('iframe');
    lastIndex = mainiframedom.length;
    var lastelement = mainiframedom[lastIndex - 1].getAttribute("name");
    var recaptchaWindow = document.getElementsByName(lastelement)[0].parentNode.parentNode;
    new MutationObserver(x => recaptchaWindow.style.opacity == 0 && onClose())
        .observe(recaptchaWindow, {
            attributes: true,
            attributeFilter: ['style']
        })
}
*/
/*
function onClose() {
  $('.gform_ajax_spinner').hide();
  $('.booking-overlay').hide();
}
*/

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

/* Scripts for Marketing Cloud Tracking code */
window.getInTouchEmail;
window.newsAndOffers;
$('#gform_1').submit(function () { 
  setTimeout(function(){ 
	  $('.gform_ajax_spinner').show(); 
	  getInTouchEmail = $('#input_1_2').val();  
  }, 600);
  if($('#choice_1_9_1').is(':checked'))
  {
    newsAndOffers = true;
  }else
  {
    newsAndOffers = false;
  }
});

jQuery(document).bind("gform_confirmation_loaded", function (event, form_id) { 

  if (form_id == 1 && formName == 'Schedule A Call') {
    let params = new URLSearchParams( getUTMSV2() );
    let keysForDel = [];
    params.forEach((v, k) => {
    if (v == '')
        keysForDel.push(k);
    });
    keysForDel.forEach(k => {
        params.delete(k);
    });
    
    var utm_params_calendly = params.toString();
    if( utm_params_calendly ){
        calendly_session_url += '?' + utm_params_calendly
    }

    Calendly.initPopupWidget({
        url: calendly_session_url,
        prefill: {
            name: ''+registerFormName,
            email: ''+registerFormEmail,
            customAnswers: {
                a0: ''+registerFormPhone,            
            }
        },
    });
  }

  if(form_id == 1 && newsAndOffers)
  {
	  
	_etmc.push(["setOrgId", "510001196"]);     
  _etmc.push(["setUserInfo", {"email": getInTouchEmail}]);     
  _etmc.push(["trackPageView"]);
    	
  }
  // Trigger GTM Event on Successful Lead Form Submission
  if(form_id == 1) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "Su_Lead_Submission"
  });  
  }
});
/* End Scripts for Marketing Cloud Tracking code */

$('#gform_1').submit(function () {
  setTimeout(function(){ $('.gform_ajax_spinner').show(); }, 600);
});

$('#gform_12').submit(function (e) {
  //e.preventDefault();
  setTimeout(function(){ $('.booking-overlay').show(); }, 600);
});

if ($('body.no-cta').length) {
  $('#footer-widget .widget_nav_menu #menu-item-803').remove();
  $('.no-cta .footer-contact').remove();
}

window.registerFormName;
window.registerFormEmail;
window.registerFormPhone;
$('#gform_1').submit(function () {
  //getInTouchEmail = $('#input_1_2').val();  
  if ($('#choice_1_9_1').is(':checked')) {
    //newsAndOffers = true;
  } else {
    //newsAndOffers = false;
  }
  registerFormName = $('#input_1_1').val();
  registerFormEmail = $('#input_1_2').val();
  registerFormPhone = $('#input_1_12').val();

  setTimeout(function () {
    $('.gform_ajax_spinner').show();
  }, 600);
});

jQuery(document).on('gform_confirmation_loaded', function(event, formId){
  // code to be trigger when confirmation page is loaded
  if( formId == 16 ){
    $(".booking-overlay").hide();
  }
  if( formId == 1 ){
    var SF_Lead_ProductID = getCookie('SF_Lead_ProductID');
    var SF_Lead_TransactionID = getCookie('SF_Lead_TransactionID');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'ProductID': SF_Lead_ProductID,
        'TransactionID' : 'RI' + SF_Lead_TransactionID
    });
    eraseCookie('SF_Lead_ProductID');
    eraseCookie('SF_Lead_TransactionID');

    var objPush = {
      'finished_flow': true, 
      'form_name':formName,
      'source' : SF_Lead_ProductID,
      'ref' : SF_Lead_TransactionID
    };

    if( typeof brochureTriggeredLead != 'undefined' && brochureTriggeredLead == true ){
      objPush.brochure_trigger = true;
    }

    amplitude.getInstance().logEvent(
      'submit_lead', 
      objPush
    );

  }

  if( formId == 8 ){
    var SF_ContactUs_TransactionID = getCookie('SF_ContactUs_TransactionID');
    var SF_ContactUs_Category = getCookie('SF_ContactUs_Category');

    if( !SF_ContactUs_TransactionID ){
      var objPush = {
        'finished_flow': true, 
        'form_name':'Contact Us',
        'source' : 'Contact Us'
      };
      if( SF_ContactUs_Category ){
        objPush.category = SF_ContactUs_Category;
      }
      amplitude.getInstance().logEvent(
        'submit_lead',
        objPush
      );
      return false;
    }

    var objPush = {
      'finished_flow': true, 
      'form_name':'Contact Us',
      'source' : 'Contact Us',
      'ref' : SF_ContactUs_TransactionID
    };
    
    if( SF_ContactUs_Category ){
      objPush.category = SF_ContactUs_Category;
    }    

    amplitude.getInstance().logEvent(
      'submit_lead',
      objPush
    );
    
    eraseCookie('SF_ContactUs_TransactionID');
    eraseCookie('SF_ContactUs_Category');
  }

});


// Home page slider hide and show of CTA (Get in touch)
$(window).scroll(function(){

  if(window.innerWidth < 992){
    
    var maxScrollPos = 0;
    if($('.cookie-disclaimer').is(":visible")){
      var cookieHgt = $('.cookie-disclaimer').height();
      maxScrollPos = 74 + cookieHgt;
    }else{
      maxScrollPos = 74;
    }

    var scrollPos = $(this).scrollTop();

    if(scrollPos > maxScrollPos){
      $('.sticky-prop-bar').show();
	  $('#btn-show-filters').addClass('show-hero-video-filter');
    }else{
      $('.sticky-prop-bar').hide();
	  $('#btn-show-filters').removeClass('show-hero-video-filter');
    }

  }

});


// Event DatePicker
$( document ).ready(function() {
  function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

	window.selectedCat = 'all';
	window.selectedDate = '';
	
	$('#searchEvent').on('shown.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    $('body').addClass('datepicker-show');
		$('.date-overlay').show();
	});
	
	$('#searchEvent').on('hidden.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    $('body').removeClass('datepicker-show');
		$('.date-overlay').hide();
	});
	
	$('#searchEvent').on('change', function (e) {
		// $('.date-overlay').hide();
    $('body').addClass('datepicker-show');
    $('.date-overlay').show();
    var eventType = selectedCat = $(this).val();

    var url = window.location.href
    var arr = url.split("/");

    if( eventType == 'all' ){
      window.location = arr[0] + "//" + arr[2] + '/' + arr[3]  + '/' + arr[4] + '/';
      return;
    }
    
    var redirectURL = arr[0] + "//" + arr[2] + '/' + arr[3] + '/' + arr[4] + window.location.search;
    
    /* Redirect */
    window.location = updateQueryStringParameter( redirectURL , 'category' , eventType );
    return;

		var filteredResults = [];
		$.each(objEvents, function (key, value) {
			if( 'all' == eventType ){
				if ( selectedDate == '' ) {
					filteredResults.push(value);					
				}
				else if ( value.DATE_FORMAT == selectedDate ) {
					filteredResults.push(value);
				}
			}
			else{
				if ( value.CATEGORY.SLUG == eventType && selectedDate == '' ) {
					filteredResults.push(value);
				}
				else if ( value.CATEGORY.SLUG == eventType && value.DATE_FORMAT == selectedDate ) {
					filteredResults.push(value);
				}
			}	
			
		});

		if (filteredResults.length > 0) {
			$('#eventsBlks').empty(); 
			var showHtml = renderHTML(filteredResults);
			$('#eventsBlks').html(showHtml);
		} else {
			//alert('No Results');
			$('#eventsBlks').html('<div class="col-12 col-sm-12 no-results-found-container"><h3>No Event Available</h3></div>');
		}
	});

	function renderHTML(filteredResults) {
		var html = '';
		// //console.log(filteredResults);
		// return false;

		for (index = 0; index < filteredResults.length; ++index) {
			
			// //console.log(index);
			
			var filteredResult = filteredResults[index];
			//console.log(filteredResult);

			var fDate = filteredResult.DATE;
			var splitDate = fDate.split(" ");

			html += '<div class="col-12 col-sm-6 col-md-6 col-lg-4 event-blk">' +
						'<div class="event-img">' +
							'<a href="' + filteredResult.LINK + '"><img class="img-fluid" src="' + filteredResult.IMAGE.URL + '" alt="' + filteredResult.IMAGE.ALT + '" title="' + filteredResult.IMAGE.TITLE + '" class="w-100" width="' + filteredResult.IMAGE.WIDTH + '" height="' + filteredResult.IMAGE.HEIGHT + '" ></a>' +
						'</div>' +
						'<div class="event-details">' +
							'<div class="lft-blk">' +
								'<div class="event-name p-0">' +
									'<h5>' + filteredResult.LOCATION + '</h5>' +
									'<a href="' + filteredResult.LINK + '"><h4>' + filteredResult.SLUG + '</h4></a>' +
								'</div>' +
								'<div class="event-desc">' +
									'<p>' + filteredResult.SHORT_CONTENT + '</p>' +
								'</div>' +
								'<div class="event-location">' +
									'<span class="text-capitalize"><i class="far fa-map-marked"></i>' + filteredResult.PLACE + '</span>' +
								'</div>' +
								'</div>' +
								'<div class="rht-blk">' +
								'<div class="event-cat">' +
									'<span>' + filteredResult.CATEGORY.NAME + '</span>' +
								'</div>' +
									'<div class="event-date">' +
									'<span>' + splitDate[0] + '</span>' +
									'<span>' + splitDate[1] + '</span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>';
					// //console.log(html);
		}
		return html;
	}

	function dateObjFilter(date) {
		selectedDate = date;
		var filteredResults = [];
		$.each(objEvents, function (key, value) {
			if ( value.DATE_FORMAT == date && selectedCat == 'all' ) {
				filteredResults.push(value);
			}
			else if ( value.DATE_FORMAT == date && selectedCat == value.CATEGORY.SLUG ) {
				filteredResults.push(value);
			}
		});		

		if (filteredResults.length > 0) {
			$('#eventsBlks').empty(); 
			var showHtml = renderHTML(filteredResults);
			$('#eventsBlks').html(showHtml);
		} else {
			$('#eventsBlks').html('<div class="col-12 col-sm-12 no-results-found-container"><h3>No Event Available</h3></div>');
			// alert('No Results');
		}
	}

  if( $("#calendarBtn").length ){
    setTimeout(function(){

    $("#calendarBtn").datepicker({
      showOn: "button",
      //buttonImage: "/wp-content/themes/emaar/inc/assets/images/calendar.svg",
      buttonText: "Select date",
      dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      minDate: 0,
      onClose: function () {
        $('body').removeClass('datepicker-show');
        $('.date-overlay').hide();
      },
      beforeShow: function (textbox, instance) {
        $('.events-filter-block').append($('#ui-datepicker-div'));
        $('body').addClass('datepicker-show');
        $('.date-overlay').show();
        $('.event-cat-select').selectpicker('destroy');
        $('.event-cat-select').selectpicker();
        
        $('#searchEvent').on('shown.bs.select', function (e, clickedIndex, isSelected, previousValue) {
          $('body').addClass('datepicker-show');
          $('.date-overlay').show();
        });
        
        $('#searchEvent').on('hidden.bs.select', function (e, clickedIndex, isSelected, previousValue) {
          $('body').removeClass('datepicker-show');
          $('.date-overlay').hide();
        });
        
      },
      onSelect: function (dateText, inst) {
        $("input[name='eventDate']").val(dateText);

        var url = window.location.href
        var arr = url.split("/");
        var redirectURL = arr[0] + "//" + arr[2] + '/' + arr[3] + '/' + arr[4] + window.location.search;

        /* Redirect */
        window.location = updateQueryStringParameter( redirectURL , 'date' , dateText );
        return;

        dateObjFilter(dateText);
      }
    });
    }, 300);
    // To style custom select
    //$('.emr-custom-select').selectpicker();
    //$(".prop-sort-cont .filter-option-inner-inner").prepend(sortby_text + ' ');
  }

  /*
  $('.emr-custom-select').on('show.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    // do something...
    $('#calendarBtn').datepicker("hide");
  });
  */

});
  $(window).on('load', function () {
	if ($('#eventsBlks div.no-results-found-container').length) {
		$('div.prop-sort-cont div.row').hide();
	}
  
  // Gravity Forms
  // Disable past dates in Expiry Date Fields
  gform.addFilter( 'gform_datepicker_options_pre_init', function( optionsObj, formId, fieldId ) {
      if ( formId == 6 ||  formId == 14 || formId ==17 ) {
        if( fieldId == 21 ||  fieldId == 23 ||  fieldId == 25 || fieldId == 66 )
        {
          optionsObj.minDate = 0;
        }        
      }
      return optionsObj;
  });
  gform.addFilter( 'gform_datepicker_options_pre_init', function( optionsObj, formId, fieldId ) {
      if ( formId == 6 ) {
        if( fieldId == 20)
        {
          optionsObj.maxDate = 0;
        }        
      }
      return optionsObj;
  });

  $('.home .container-search-property input[type="submit"]').on('click', function(){
    $(".booking-overlay").show();
  });
});

// Key under which name the cookie is saved
const cookieName = 'cookieconsent';
// The value could be used to store different levels of consent
const cookieValue = 'dismissed';

function dismiss() {
    const date = new Date();
    // Cookie is valid 1 year: now + (years x days x hours x minutes x seconds x milliseconds)
    date.setTime(date.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
    // Set cookie
    document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};path=/`;

    // You probably want to remove the banner
    document.querySelector('.disclaimer-content').remove();
}

// Get button element
const buttonElement = document.querySelector('.btn-accept');
// Maybe cookie consent is not present
if (buttonElement) {
    // Listen on button click
    buttonElement.addEventListener('click', dismiss);
}

if( device != 'mobile' ){
  jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
  };
  jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
  };
  jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
  };
  jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
  };
}

// Remove blur buttons when modal closes.
$('body').on('hidden.bs.modal', '.modal', function() {
  $('.btn').blur();
}); 


document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazyload");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.onload = function() {
            image.classList.remove("lazyload");
            imageObserver.unobserve(image);
          };
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazyload");
    
    function lazyloading () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazyload');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyloading);
          window.removeEventListener("resize", lazyloading);
          window.removeEventListener("orientationChange", lazyloading);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyloading);
    window.addEventListener("resize", lazyloading);
    window.addEventListener("orientationChange", lazyloading);
  }
})