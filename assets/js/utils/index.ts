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

        if (endpoint.offsetLeft < left) {
            endpoint.style.left = `${left}px`
        }

        if (endpoint.offsetWidth < window.innerWidth) {
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
    let ico = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" class="c-icon"><title>exclamation-circle</title><path d="M16 8c-0.424 0-0.831 0.169-1.131 0.469s-0.469 0.707-0.469 1.131v6.4c0 0.424 0.169 0.831 0.469 1.131s0.707 0.469 1.131 0.469c0.424 0 0.831-0.169 1.131-0.469s0.469-0.707 0.469-1.131v-6.4c0-0.424-0.169-0.831-0.469-1.131s-0.707-0.469-1.131-0.469zM17.472 21.792c-0.035-0.102-0.084-0.199-0.144-0.288l-0.192-0.24c-0.225-0.222-0.511-0.372-0.821-0.432s-0.632-0.026-0.923 0.096c-0.194 0.081-0.373 0.195-0.528 0.336-0.148 0.149-0.266 0.327-0.345 0.522s-0.12 0.404-0.119 0.614c0.003 0.209 0.046 0.416 0.128 0.608 0.072 0.199 0.187 0.379 0.336 0.528s0.33 0.264 0.528 0.336c0.191 0.085 0.399 0.128 0.608 0.128s0.416-0.044 0.608-0.128c0.199-0.072 0.379-0.187 0.528-0.336s0.264-0.33 0.336-0.528c0.082-0.192 0.125-0.399 0.128-0.608 0.008-0.107 0.008-0.213 0-0.32-0.028-0.102-0.071-0.199-0.128-0.288zM16 0c-3.164 0-6.258 0.938-8.889 2.696s-4.682 4.257-5.893 7.181c-1.211 2.924-1.528 6.141-0.91 9.244s2.141 5.955 4.379 8.192c2.238 2.238 5.089 3.761 8.192 4.379s6.321 0.3 9.244-0.911c2.924-1.211 5.423-3.262 7.181-5.893s2.696-5.725 2.696-8.889c0-2.101-0.414-4.182-1.218-6.123s-1.983-3.705-3.468-5.191c-1.486-1.486-3.25-2.664-5.191-3.468s-4.022-1.218-6.123-1.218zM16 28.8c-2.532 0-5.006-0.751-7.111-2.157s-3.746-3.406-4.714-5.744-1.222-4.913-0.728-7.396c0.494-2.483 1.713-4.764 3.503-6.554s4.071-3.009 6.554-3.503c2.483-0.494 5.057-0.24 7.396 0.728s4.338 2.609 5.744 4.714c1.406 2.105 2.157 4.58 2.157 7.111 0 3.395-1.349 6.651-3.749 9.051s-5.656 3.749-9.051 3.749z"></path></svg>';
    switch (status) {
        case 'success':
            ico = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" class="c-icon"><title>check</title><path d="M31.267 5.036c-0.212-0.213-0.463-0.383-0.741-0.498s-0.575-0.175-0.876-0.175c-0.301 0-0.598 0.059-0.875 0.175s-0.529 0.285-0.741 0.498l-16.963 16.986-7.127-7.15c-0.22-0.212-0.479-0.379-0.764-0.491s-0.588-0.167-0.893-0.162c-0.306 0.005-0.607 0.071-0.887 0.193s-0.534 0.298-0.746 0.517c-0.212 0.22-0.379 0.479-0.491 0.763s-0.167 0.588-0.162 0.893 0.071 0.607 0.193 0.887c0.122 0.28 0.298 0.534 0.517 0.746l8.743 8.744c0.212 0.213 0.463 0.383 0.741 0.498s0.575 0.175 0.876 0.175c0.301 0 0.598-0.059 0.876-0.175s0.529-0.285 0.741-0.498l18.58-18.58c0.231-0.213 0.416-0.472 0.542-0.76s0.191-0.599 0.191-0.914c0-0.314-0.065-0.625-0.191-0.914s-0.311-0.547-0.542-0.76z"></path></svg>';
            break;
        case 'error':
            ico = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor" class="c-icon"><title>exclamation-triangle</title><path d="M15.964 21.834c-0.286 0-0.566 0.085-0.803 0.244s-0.423 0.385-0.533 0.649c-0.109 0.264-0.138 0.555-0.082 0.836s0.194 0.538 0.396 0.74c0.202 0.202 0.46 0.34 0.74 0.396s0.571 0.027 0.836-0.082c0.264-0.109 0.49-0.295 0.649-0.533s0.244-0.517 0.244-0.803c0-0.384-0.152-0.751-0.424-1.023s-0.639-0.424-1.023-0.424zM31.393 23.959l-11.641-20.245c-0.376-0.675-0.926-1.236-1.592-1.628s-1.424-0.597-2.197-0.597c-0.772 0-1.531 0.206-2.197 0.597s-1.216 0.953-1.592 1.628l-11.568 20.245c-0.389 0.657-0.598 1.404-0.606 2.167s0.186 1.515 0.561 2.18c0.376 0.664 0.92 1.218 1.578 1.605s1.406 0.593 2.17 0.599h23.31c0.769 0.008 1.527-0.19 2.195-0.571s1.223-0.934 1.607-1.601c0.384-0.667 0.584-1.424 0.579-2.193s-0.214-1.524-0.607-2.186zM28.892 26.852c-0.127 0.226-0.312 0.413-0.535 0.543s-0.478 0.197-0.737 0.195h-23.31c-0.259 0.002-0.513-0.065-0.737-0.195s-0.409-0.317-0.535-0.543c-0.127-0.22-0.194-0.469-0.194-0.723s0.067-0.503 0.194-0.723l11.568-20.245c0.121-0.237 0.306-0.436 0.533-0.574s0.488-0.212 0.754-0.212 0.527 0.073 0.754 0.212c0.227 0.139 0.411 0.338 0.533 0.574l11.641 20.245c0.143 0.217 0.226 0.468 0.239 0.728s-0.045 0.518-0.166 0.747v-0.029zM15.964 10.265c-0.383 0-0.751 0.152-1.023 0.424s-0.424 0.639-0.424 1.023v5.784c0 0.384 0.152 0.751 0.424 1.023s0.639 0.424 1.023 0.424 0.751-0.152 1.023-0.424c0.271-0.271 0.424-0.639 0.424-1.023v-5.784c0-0.384-0.152-0.751-0.424-1.023s-0.639-0.424-1.023-0.424z"></path></svg>';
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
