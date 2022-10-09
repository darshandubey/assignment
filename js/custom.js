	init();
	let LoadJson=jQuery.parseJSON(localStorage.getItem("LoadJson"));
	let GroupDefaut="All";
	$('.headline').text(GroupDefaut);

	LoadPreset();

	function init()
	{

	var JsonDefault=[{
	"dashboard_type": "Type 1",
	"dashboard_group": "Test Demo",
	"dashboard_name": "Dashboard 1",
	"dashboard_description": "Test Description",
	"dashboard_id": "1",
	"dashboard_role": "admin, user"
	},
	{
	"dashboard_type": "Type 2",
	"dashboard_group": "Test Demo",
	"dashboard_name": "Dashboard 2",
	"dashboard_description": "Test Description",
	"dashboard_id": "3",
	"dashboard_role": "systemadmin"
	},
	{
	"dashboard_type": "Type 3",
	"dashboard_group": "Page Builder Demo",
	"dashboard_name": "Dashboard 3",
	"dashboard_description": "Test Description",
	"dashboard_id": "3",
	"dashboard_role": "user"
	},
	{
	"dashboard_type": "Type 4",
	"dashboard_group": "Metabase",
	"dashboard_name": "Dashboard 4",
	"dashboard_description": "Test Description",
	"dashboard_id": "4",
	"dashboard_role": "admin"
	}];

	var LoadJson=localStorage.getItem("LoadJson");


		if(LoadJson==null)
		{

			localStorage.setItem("LoadJson", JSON.stringify(JsonDefault));	
			
		}
	}

	$(document).ready(function() {
	    $('.js-select2').select2();
	});

	$(document).ready(function() {
	    $('.js-example-basic-multiple').select2();
	});


	function LoadPreset(FilterLoadJson=null)
	{
		$(document).find('.card-dashboard').empty();
		var json=LoadJson;

		if(FilterLoadJson!==null)
		{
			json=FilterLoadJson;
		}

		
		var html="";
		if(json.length>0)
		{

			for(let i = 0; i < json.length; i++)
			{
	    		let obj = json[i];
	    	
				var html=html+'<div class="col-md-4 mb-4 stretch-card transparent" data-value='+obj.dashboard_group+'><div class="card card-tale"><div class="card-body"><div class="dash-icon"><i class="fa fa-star-o"></i><i class="fa fa-star"></i></div><div class="card-details"> <p class="card-title">'+obj.dashboard_name+'</p><p class="card-desc">'+obj.dashboard_group+'</p></div><div class="ellipsis-vertical"><i class="fa fa-ellipsis-v"></i></div> </div></div></div>';
			}
		}
		
		$(document).find('.card-dashboard').append(html);
	}



	$("#savebutton").on("click", function()
	{ 
		
		var dashboardgroup=$('#dashboardgroup').val();
		var dashboardname = $('#dashboardname').val();
		var dashboardid = $('#dashboardid').val();
		var dashboardtype = $('#dashboardtype').val();
		var roles = $('#roles').val();

		if(dashboardgroup && dashboardname && dashboardid && dashboardtype){


		 var obj = LoadJson;

		 obj.push({
			"dashboard_type": dashboardtype,
			"dashboard_group": dashboardgroup,
			"dashboard_name": dashboardname,
			"dashboard_description": "Test Description",
			"dashboard_id": dashboardid,
			"dashboard_role": roles.join(',')
			});
		 console.log(obj);
		 localStorage.setItem("LoadJson", JSON.stringify(obj));	

	 
		 LoadPreset();
		$('#dashboardgroup').val("").trigger('change');
		$('#dashboardname').val("").trigger('change');
		$('#dashboardid').val("").trigger('change');
		$('#dashboardtype').val("").trigger('change');
		$('#roles').val("").trigger('change');

		
		}
		$('#AddDataModal').modal('hide');
	});


	
	$(".tagparentfilter").on("click", function(){
		
		var value = $(this).find('.tagfilter').attr('data-filter').toLowerCase();
		GroupDefaut=value;

		$('.tagparentfilter').removeClass('active');
		$(this).addClass('active');

		$('.headline').text(GroupDefaut);
	  	
	  	var FilterLoadJson = $.grep(LoadJson, function (element, index) {
		     return element.dashboard_group.toLowerCase().indexOf(value) > -1;
		});


		LoadPreset(FilterLoadJson);

	});


	$(".search-filter").on("change", function(){
		
	  	
	  	var value = $(this).val().toLowerCase();
	  	

		var FilterLoadJson = $.grep(LoadJson, function (element, index) {
		     return element.dashboard_name.toLowerCase().indexOf(value) > -1 && (GroupDefaut!='All' && element.dashboard_group.toLowerCase().indexOf(GroupDefaut)) > -1;
		});


		LoadPreset(FilterLoadJson);

	});

