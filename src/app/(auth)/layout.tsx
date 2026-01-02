import React from 'react'
import Styles from './authglobal.module.css'
const authlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${Styles.authglobal}`}>
            {children}
        </div>
    )
}

export default authlayout