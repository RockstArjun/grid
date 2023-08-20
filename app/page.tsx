import Image from 'next/image'
import Chatbot from './Components/chatbot'
import "./globals.css"

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-12 gap-4 p-10 ">
      {/* <div className='col-span-3 bg-[#272727] rounded-2xl'></div> */}
      <div className='col-span-12 bg-[#101010] rounded-2xl'>
        <Chatbot />
      </div>
    </main>
  )
}
