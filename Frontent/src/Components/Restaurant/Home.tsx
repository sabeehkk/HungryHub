import React from 'react'

function Home() {
  return (
    <div className="bg-gray-100">
    <header className="bg-white py-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Our Restaurant</h1>
      </div>
    </header>
    <main className="container mx-auto py-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
          {/* Your menu items go here */}
          <img src="https://png.pngtree.com/thumb_back/fw800/background/20231003/pngtree-d-rendering-of-tablet-pc-mockup-displaying-an-online-food-ordering-image_13562533.png" alt="" />
        </div>
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          {/* Contact information and a map can go here */}
        </div>
      </section>
    </main>
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Your Restaurant. All rights reserved.</p>
      </div>
    </footer>
  </div>
  )
}

export default Home