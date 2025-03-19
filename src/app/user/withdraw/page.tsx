'use client'
import { useState } from 'react'

const Withdraw = () => {
  const [amount, setAmount] = useState('')
  const [pmethod, setPmethod] = useState('')
  const [number, setNumber] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !pmethod || !number) {
      setError('সবগুলো ফিল্ড পূরণ করুন!')
      setSuccess('')
      return
    }

    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, pmethod, number }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess('✅ উইথড্র সফল হয়েছে!')
        setError('')
        setAmount('')
        setPmethod('')
        setNumber('')
      } else {
        setError(data.message || '❌ কিছু একটা সমস্যা হয়েছে!')
        setSuccess('')
      }
    } catch (err) {
      console.log(err)
      setError('❌ সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি!', )
      setSuccess('')
    }
  }

  return (
    <div className="min-h-screen bg-[#ebebeb] pb-10">
      <a href="/user/dashboard" className="h-14 w-full bg-[#0c0ce8] pl-4 gap-5 shadow text-white flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-7 font-bold cursor-pointer w-7"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
            clipRule="evenodd"
          ></path>
        </svg>
        <h2 className="text-xl font-bold">Withdraw</h2>
      </a>

      <div className="flex justify-center m-5 p-4 bg-white rounded-lg py-5 shadow text-center hind">
        Notice: মিনিমাম উইথড্র 500 টাকা। উইথড্র দেয়ার সাথে সাথে অটোম্যাটিকভাবে পেমেন্ট পেয়ে যাবেন।
      </div>

      <div className="flex gap-3 items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
        <h2 className="text-xl">Balance:</h2>
        <h2 className="text-[#0c0ce8] text-xl font-bold">100 Taka</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-5 p-4 bg-white rounded-lg py-5 shadow">
        <h2 className="mb-3 text-lg font-bold">Enter Withdrawal Details</h2>

        <input
          type="number"
          placeholder="Amount (Min 500)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />

        <select
          value={pmethod}
          onChange={(e) => setPmethod(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="nagad">Nagad</option>
          <option value="bkash">Bkash</option>
        </select>

        <input
          type="text"
          placeholder="Your Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          className="bg-[#0c0ce8] text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700"
        >
          Submit Withdraw
        </button>
      </form>
    </div>
  )
}

export default Withdraw
