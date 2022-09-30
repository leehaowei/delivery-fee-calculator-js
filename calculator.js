const BASE_DELIVERY_FEE = 200;
exports.BASE_DELIVERY_FEE = BASE_DELIVERY_FEE

const getDeliveryFee = (order) => {
    surchargeCartValue = cartValurSurcharge(order.cartValue)
    extra_delivery_amount = extraDeliveryFee(order.deliveryDistance)
    surchargeItems = itemSurcharge(order.numberOfItems)
    let deliveryFee = BASE_DELIVERY_FEE + surchargeCartValue + extra_delivery_amount + surchargeItems

    if (isFridayRush(order.time)) {
        deliveryFee *= 1.1
    }

    deliveryFee = checkMaxDeliveryFee(order.cartValue, deliveryFee)

    return deliveryFee
}

exports.getDeliveryFee = getDeliveryFee


const cartValurSurcharge = (cartValue) => {
    let surchargeCartValue = 0
    if (cartValue < 1000) {
        surchargeCartValue = 1000 - cartValue
    }
    return surchargeCartValue
}

exports.cartValurSurcharge = cartValurSurcharge

const extraDeliveryFee = (deliveryDistance) => {
    let extraDeliveryAmount = 0
    if (deliveryDistance > 1000) {
        extraDistance = deliveryDistance - 1000
        extraUnit = Math.floor(extraDistance / 500) + 1
        extraDeliveryAmount = extraUnit * 100
    }
    return extraDeliveryAmount
}

exports.extraDeliveryFee = extraDeliveryFee

const itemSurcharge = (numberOfItems) => {
    let surchargeItems = 0
    if (numberOfItems > 4) {
        extraItems = numberOfItems - 4
        surchargeItems = extraItems * 500
    }
    return surchargeItems
}


exports.itemSurcharge = itemSurcharge

const checkMaxDeliveryFee = (cartValue, deliveryFee) => {
    if (deliveryFee > 15_000) {
        deliveryFee = 15_000
    }

    if (cartValue >= 100_000) {
        deliveryFee = 0
    }
    return deliveryFee
}

const isFridayRush = (time) => {
    time = new Date(time)
    const deliveryDay = time.getUTCDay()
    const deliveryHour = time.getUTCHours()

    if (deliveryDay === 4) {
        if (15 <= deliveryHour <= 19) {
            return true
        }
    }
    return false
}
