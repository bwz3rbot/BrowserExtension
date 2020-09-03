$(function () {

    // Load page with total and limit
    browser.storage.sync.get(['total', 'limit'], function (budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })


    // [Spend Amnt]*
    $('#spendAmount').click(function () {

        // Get from storage -> [ total, limit ]
        browser.storage.sync.get(['total', 'limit'], function (budget) {


            let newTotal = 0;
            if (budget.total) { // If total exists, add to 
                newTotal += parseInt(budget.total)
            }

            let amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            // Set new total
            browser.storage.sync.set({
                'total': newTotal
            }, createNotification(amount,newTotal,budget))


            $('#total').text(newTotal);
            $('#amount').val('')
        })
    })

    // [Open Options]*
    $('#openOptions').click(function () {
        browser.runtime.openOptionsPage();
    })
})

let count = 0;

function createNotification(amount,newTotal,budget) {


    if (amount && newTotal >= budget.limit) {
        let notifOptions = {
            iconUrl: '../icons/person-48.png',
            type: 'basic',
            title: 'limit reached!',
            message: `Oops... Looks like you've exceeded your limit! `
        };

        browser.notifications.create('limitNotif'+count, notifOptions)
        count += 1;
    }



}