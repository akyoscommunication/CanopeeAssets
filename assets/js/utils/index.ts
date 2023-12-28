export function positioningElement(root, endpoint, left = 50, bottom = 25, initialWidth = 'auto')
{
    if (root && endpoint) {
        const rootRect = root.getBoundingClientRect()

        if (rootRect.left < left) {
            endpoint.style.left = `${left}px`
        } else {
            endpoint.style.left = `${rootRect.left - left}px`
        }

        endpoint.style.top = `${rootRect.bottom + bottom}px`

        const endpointRect = endpoint.getBoundingClientRect()

        if (endpointRect.right > window.innerWidth) {
            endpoint.style.left = `${window.innerWidth - endpointRect.width - bottom}px`
        }

        if (endpoint.offsetLeft < 0) {
            endpoint.style.left = `${rootRect.left - left}px`
        }

        if (endpoint.offsetWidth > window.innerWidth) {
            endpoint.style.width = `${window.innerWidth - 2 * left}px`
        } else {
            endpoint.style.width = initialWidth
        }

        if (endpointRect.bottom > window.innerHeight) {
            endpoint.style.top = `${window.innerHeight - endpointRect.height - bottom}px`
        }
    }
}

export function getStatusIcon(status)
{
    let ico = 'exclamation-circle';
    switch (status) {
        case 'success':
            ico = 'check';
            break;
        case 'error':
            ico = 'exclamation-triangle';
            break;
    }

    return ico;
}

export function uniqueId()
{
    return Math.random().toString(36).substr(2, 9);
}

// set cookie
export function setCookie(name: string, value: string, days: number)
{
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

// get cookie
export function getCookie(name: string)
{
    let nameEQ = name + "="
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length)
        }
    }

    return null
}
