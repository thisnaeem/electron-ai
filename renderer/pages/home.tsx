import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'

function Home() {
  return (
    <Layout title="Home - Electron AI">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="relative w-32 h-32">
          <Image
            src="/images/logo.png"
            alt="AI Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome this is version 1.0.5
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl">
          Your next-generation AI-powered desktop application built with Electron and Next.js
        </p>
        <div className="flex space-x-4">
          <Link
            href="/next"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Page
          </Link>
          <a
            href="https://nextron.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Home
