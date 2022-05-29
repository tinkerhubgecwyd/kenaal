const toast_block = document.getElementById('toast_block')


const toast = (msg = '', isError = false, time = 1500) => {
    let p = document.createElement('p')
    p.innerHTML = msg + (isError ? `<span onclick="this.parentElement.remove()">x</span>` : '')
    if (isError) p.style.backgroundColor = '#d83838'
    toast_block.append(p)
    setTimeout(() => {
        p.remove()
    }, isError ? 10 * 1000 : time)
}