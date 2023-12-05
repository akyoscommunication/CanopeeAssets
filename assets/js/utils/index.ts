export function positioningElement(root, endpoint, left = 50, bottom = 25)
{
    if (root && endpoint) {
        const rootRect = root.getBoundingClientRect()

        endpoint.style.left = `${rootRect.left - left}px`
        endpoint.style.top = `${rootRect.bottom + bottom}px`

        const endpointRect = endpoint.getBoundingClientRect()
        if (endpointRect.right > window.innerWidth) {
            endpoint.style.left = `${window.innerWidth - endpointRect.width - bottom}px`
        }

        if (endpointRect.left < 0) {
            endpoint.style.left = `${rootRect.left - left}px`
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
