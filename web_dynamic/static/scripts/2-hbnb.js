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
                checkedAmenities = checkBoxes.filter(":checked").map(function () {
                    return this.dataset.name
                }).get();
            } else {
                checkedAmenities.splice(checkedAmenities.indexOf(this.dataset.name), 1)
            }
            $('h4#checked_amenities').text(checkedAmenities.toString())
        }
    );
})
