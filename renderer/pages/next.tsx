import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

function NextPage() {
  return (
    <Layout title="Next Page - My Nextron App">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Next Page
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl">
          This is another page in your Nextron application. You can add more pages
          and components as needed.
        </p>
        <Link
          href="/home"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </Layout>
  )
}

export default NextPage
