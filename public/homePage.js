"use strict";

const logout = new LogoutButton;

logout.action = () => {
    ApiConnector.logout(response => {
        if (response) {
            ApiConnector.logout();
        }
        location.reload();
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
});

const ratesBoard = new RatesBoard;

function ratesUpdate() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
ratesUpdate();
let timerId = setInterval(ratesUpdate, 60000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, response.error);
        }
        else {
            ProfileWidget.showProfile(response.data);
        }
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, response.error);
        }
        else {
            ProfileWidget.showProfile(response.data);
        }
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(true, response.error);
        }
        else {
            ProfileWidget.showProfile(response.data);
        }
    });
}

const favorites = new FavoritesWidget;
ApiConnector.getFavorites(response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
    else {
        favorites.setMessage(response.success, response.error);
    }
    
});

favorites.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
        }
        else {
            favorites.setMessage(response.success, response.error);
        }
    });
}

favorites.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
        }
        else {
            favorites.setMessage(response.success, response.error);
        }
    });
}