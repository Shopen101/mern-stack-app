import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LinksList, Loader } from '../components'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

function LinksPage() {
    const [links, setLinks] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(fetched)
        } catch (error) {
            console.log(error)
        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}

export default LinksPage