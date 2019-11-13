import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentProfile } from '../../../actions/profileActions'



const DashboardPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentProfile())

    }, [])

    return <div>DashboardPage</div>
}

export default DashboardPage
