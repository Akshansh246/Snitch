/**
 * Deterministic discount calculator.
 * Returns a static discount percentage (e.g. 10%, 15%, 20%, 25%) and final discounted price
 * based on a string hash of the productId so it NEVER changes on page refresh or checkout.
 */
export function getFixedDiscount(productId, amount) {
    if (!amount || amount <= 0) {
        return { finalAmt: 0, discount: 0, originalAmount: 0 };
    }

    let hash = 0;
    if (productId) {
        const str = String(productId);
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
    }

    const discounts = [10, 15, 20, 25];
    const discount = discounts[Math.abs(hash) % discounts.length];
    const finalAmt = Math.round(amount * (1 - discount / 100));

    return {
        finalAmt,
        discount,
        originalAmount: amount,
        savings: Math.max(0, amount - finalAmt)
    };
}
