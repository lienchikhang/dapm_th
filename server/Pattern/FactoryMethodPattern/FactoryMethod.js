class NotiFicationFactory {
    CreateNotification = (type) => {
        switch (type) {
            case 'error':
                return new NotificationError()
                break
            case 'success':
                return new NotificationSuccess()
        }
    }
}
class NotificationError {
    constructor() {
        this.message = 'request can not execute'
    }
}

class NotificationSuccess {
    constructor() {
        this.message = 'request success'
    }
}
module.exports = {
    NotiFicationFactory
}