export function randn(max) {return Math.floor(Math.random() * max)}
export function rand(list) {return list[Math.floor(Math.random() * list.length)]}


export function space(a, b) {
    a = String(a)
    return " ".repeat(b - a.length) + a
}

export function hexc(a,b,c) {
    a = a >= 15 ? a.toString(16) : "0" + a.toString(16)
    b = b >= 15 ? b.toString(16) : "0" + b.toString(16)
    c = c >= 15 ? c.toString(16) : "0" + c.toString(16)
    return a+b+c
}

