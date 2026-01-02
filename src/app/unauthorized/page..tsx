import Link from 'next/link'
import React from 'react'

const Unauthorized = () => {
  return (
     <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">401</h1>
      <h2 className="text-2xl mt-2">Unauthorized Access</h2>
      <p className="text-gray-500 mt-2">
        You are not authorized to view this page.
      </p>

      <Link
        href="/sign-in"
        className="mt-6 px-6 py-2 bg-black text-white rounded"
      >
        Go to Login
      </Link>
    </div>
  )
}

export default Unauthorized