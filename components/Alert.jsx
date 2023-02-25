import { StateContext, useStateContext } from '@/context/stateContext';
import React, { useContext } from 'react'
import { useEffect } from 'react';

export default function Alert() {
    const { alert: { message, type, duration, isShow }, setAlert } = useContext(StateContext)
    useEffect(() => {
        setTimeout(() => {
            setAlert({ ...alert, isShow: false, message: "" })
        }, duration);
    }, [duration])

    return (
        <div data-alert-show={isShow} className="fixed top-10 w-full mx-auto z-40">            
            {type === 'error' ? (
                <div className={`bg-red-100 gap-4 px-4 py-3 rounded-lg flex items-center absolute w-3/4  z-50 mx-[12.5%] my-10`} role="alert">
                    <img src="/icons/error-filled-svgrepo-com.svg" alt="" className='w-8' />
                    <strong className={`font-medium text-red-700`}>{message}</strong>
                </div>
            ) : type === 'success' ? (
                <div className={`bg-green-100 gap-4 px-4 py-3 rounded-lg flex items-center absolute w-3/4  z-50 mx-[12.5%] my-10`} role="alert">
                    <img src="/icons/success-svgrepo-com.svg" alt="" className='w-8' />
                    <strong className={`font-medium text-green-700`}>{message}</strong>
                </div>
            ) : type === 'warning' &&(
                <div className={`bg-yellow-100 gap-4 px-4 py-3 rounded-lg flex items-center absolute w-3/4  z-50 mx-[12.5%] my-10`} role="alert">
                    <img src="/icons/warning-circle-svgrepo-com.svg" alt="" className='w-8' />
                    <strong className={`font-medium text-yellow-700`}>{message}</strong>
                </div>
            )}
        </div>
    );
}
