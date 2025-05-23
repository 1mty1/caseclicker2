export function formatNum(i, n) {
    return (i / 100).toLocaleString(undefined, {
        minimumFractionDigits: n
    })
}