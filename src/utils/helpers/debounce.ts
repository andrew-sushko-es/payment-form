export function debounce(fn: (...args: any[]) => void, delay: number) {
    let timer: number
    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}
