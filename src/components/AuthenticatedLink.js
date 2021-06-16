import { createRef } from 'react';
import { get } from '../services/api';

function AuthenticatedLink({ url, filename, children }) {
    const link = createRef()

    const handleAction = async () => {
        if (link.current.href) { return }

        const response = await get(url, true, {
            responseType: 'blob',
        });

        const blob = new Blob([response.result.data], {
            type: 'text/csv',
        });
        const href = window.URL.createObjectURL(blob)

        link.current.download = filename
        link.current.href = href

        link.current.click()
    }

    return (
        <>
            {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="btn export-button text-link" role='button' ref={link} onClick={handleAction}>{children}</a>
            }
        </>
    )
}

export default AuthenticatedLink;