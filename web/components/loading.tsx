import React from 'react'

export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="relative">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-black"></div>
            </div>
        </div>
    )
}
