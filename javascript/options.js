$(function () { // Jquery's version of document.ready()

    browser.storage.sync.get('limit', function (budget) {
        $('#limit').val(budget.limit)
    })


    // Save Limit Function
    $('#saveLimit').click(function () {
        let limit = $('#limit').val();
        if (limit) {
            browser.storage.sync.set({
                'limit': limit
            })
        }
    })

    $('#resetTotal').click(function () {
        browser.storage.sync.set({
            'total': 0
        }, createNotification())
    })

})

let count = 0;

function createNotification() {

    let title = 'Reset_Total_' + count;


    let notifOptions = {
        type: 'basic',
        iconUrl: '../icons/person-48.png',
        title: 'Reset Total',
        message: 'Total has been reset to 0'
    }

    browser.notifications.create(title, notifOptions)
    count += 1;
}