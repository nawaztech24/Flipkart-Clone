export const getDiscount = (price, cuttedPrice) => {
    return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
}

export const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7);

    return deliveryDate.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export const formatDate = (dt) => {
    if (!dt) return null;

    const d = new Date(dt);

    if (isNaN(d.getTime())) return null;

    return d.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata", // 🔥 FIX
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export const getRandomProducts = (prodsArray, n) => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n);
}