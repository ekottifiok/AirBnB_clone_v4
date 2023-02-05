let checkedAmenities = []
window.addEventListener('DOMContentLoaded', function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available')
        } else {
            $('div#api_status').removeClass('available')
        }
    })

    let checkBoxes = $('input:checkbox');
    checkBoxes.change(
        function () {
            if ($(this).is(':checked')) {
                checkedAmenities = checkBoxes.filter(":checked").map(function () { return this.dataset.name }).get();
            } else {
                checkedAmenities.splice(checkedAmenities.indexOf(this.dataset.name), 1)
            }
            $('h4#checked_amenities').text(checkedAmenities.toString())
        }
    );
    $.post('http://0.0.0.0:5001/api/v1/places_search/', {}, function (data) {
        console.log(data);
    })
    jQuery.ajax ({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: "POST",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
            data.forEach(element => {
                user_name = null
                jQuery.ajax({
                    url: `http://0.0.0.0:5001/api/v1/users/${element.user_id}`,
                    type: 'get',
                    dataType: "json",
                    async: false,
                    success: function (data){
                        user_name = `${data.first_name} ${data.last_name}`}
                })
                $(`<article>
				<div class="title_box">
					<h2>${element.name}</h2>
					<div class="price_by_night">${element.price_by_night}</div>
				</div>
				<div class="information">
					<div class="max_guest">${element.max_guest} Guest${element.max_guest > 1 ? "s" : ""}</div>
					<div class="number_rooms">${element.number_rooms} Bedroom${element.number_rooms > 1 ? "s" : ""}</div>
					<div class="number_bathrooms">${element.number_bathrooms} Bathroom${element.number_bathrooms > 1 ? "s" : ""}</div>
				</div>
				<div class="user"><b>Owner:</b> ${user_name}</div>
				<div class="description">${element.description.substring(0,1000)}</div>
			</article>`).appendTo('section.places')
            });
        }
    });
    $('button:button').click(function () {
        jQuery.ajax({
            type: "POST",
            url: 'http://localhost:5001/api/v1/places_search/',
            data: JSON.stringify({}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log(response);
            }
        });
    })
})
