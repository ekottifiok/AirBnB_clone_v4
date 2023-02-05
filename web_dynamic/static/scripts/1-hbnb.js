let checkedAmenities = []
window.addEventListener('DOMContentLoaded', function () {
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
