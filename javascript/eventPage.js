let contextMenuItem = {
    id: "spendMoney",
    title: "SpendMoney",
    contexts: ["selection"]
}

browser.contextMenus.create(contextMenuItem)
const isInt = function (value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

browser.contextMenus.onClicked.addListener((clickData, tab) => {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {

        if (isInt(clickData.selectionText)) {
            browser.storage.sync.get(['total', 'limit'], function (budget) {

                let newTotal = 0;

                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                browser.storage.sync.set({
                    'total': newTotal
                })


            })
        }
    }

})

browser.storage.onChanged.addListener(function(changes,storageName) {
    browser.browserAction.setBadgeText({
        "text":changes.total.newValue.toString()
    });

})



let count = 0;

function createNotification(amount, newTotal, budget) {


    if (amount && newTotal >= budget.limit) {
        let notifOptions = {

            type: 'basic',
            title: 'limit reached!',
            message: `Oops... Looks like you've exceeded your limit! `
        };

        browser.notifications.create('limitNotif' + count, notifOptions)
        count += 1;
    }
}