// Tailwind-based Hero component (motorcycle/scooter design + Popular Vehicles)
// Replace existing Hero with this Tailwind implementation. Ensure Tailwind is configured in the project.

const Hero = () => {
  return (
    <div className="w-full">
      {/* Hero area */}
      <section className="relative overflow-hidden bg-gray-50 py-30 ">
        <div className="absolute inset-0 bg-[url('https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png?w=800&q=40')] bg-cover bg-center opacity-80 blur-[2px] scale-110 md:opacity-0 md:blur-none md:scale-100" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent md:bg-none" aria-hidden />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Left content */}
            <div className="pt-20 pb-28 lg:py-32">
              <div className="inline-block mb-4 w-12 h-1 bg-orange-500 rounded-full" aria-hidden />

              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                <span className="block">Your Ride.</span>
                <span className="block">Your Journey.</span>
                <span className="block text-orange-500">Your Freedom.</span>
              </h1>

              <p className="mt-4 text-gray-600 max-w-xl">Affordable rentals, easy pickup & go — explore more with short-term plans and flexible returns.</p>

              {/* Floating search/booking bar */}
              <div className="mt-8 relative z-10">
                <form className="mx-auto max-w-5xl bg-white/95 shadow-md rounded-2xl border border-gray-100 backdrop-blur-sm p-2 sm:p-3 flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 md:flex-1">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wide text-gray-400">Pickup</div>
                      <div className="text-sm font-medium text-gray-800 truncate">Kathmandu</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 md:flex-1 md:border-l md:border-gray-200 md:rounded-none md:bg-transparent md:pl-4">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M7 11V7a3 3 0 116 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wide text-gray-400">Date</div>
                      <div className="text-sm font-medium text-gray-800 truncate">Aug 26</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 md:flex-1 md:border-l md:border-gray-200 md:rounded-none md:bg-transparent md:pl-4">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wide text-gray-400">Time</div>
                      <div className="text-sm font-medium text-gray-800 truncate">09:00 AM</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 md:flex-1 md:border-l md:border-gray-200 md:rounded-none md:bg-transparent md:pl-4">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M7 11V7a3 3 0 116 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wide text-gray-400">Return</div>
                      <div className="text-sm font-medium text-gray-800 truncate">Aug 29</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    aria-label="Search rides"
                    className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl w-12 h-12 min-w-[48px] shrink-0 self-center shadow-sm md:ml-1 md:w-12 md:h-12 w-full md:w-auto sm:w-full"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Right visual - background image anchored right */}
            <div className="relative h-96 lg:h-[480px] rounded-lg overflow-hidden hidden md:block">
              <div className="absolute inset-0 bg-[url('https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png?w=800&q=40')] bg-cover bg-right" style={{backgroundPosition: 'right center'}} aria-hidden />
            </div>
          </div>
        </div>

{/* Popular Vehicles section */}
      <section className=" max-w-7xl mx-auto px-6 lg:px-8 mt-24 bg-gray">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popular Vehicles</h2>
            <p className="text-sm text-gray-500 mt-1">Top picks for your next trip — curated for convenience and value.</p>
          </div>
          <div>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              View All Vehicles
n              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Bike','Scooter','Cruiser','Moped'].map((type, i) => (
            <div key={type} className="bg-white rounded-xl shadow p-4 flex flex-col h-full">
              <div className="relative bg-gray-50 rounded-lg p-4 flex items-center justify-center" style={{height: 140}}>
                <span className="absolute top-3 left-3 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">{type}</span>
                <img src={`https://picsum.photos/seed/veh${i}/240/140`} alt="vehicle" className="object-contain h-full" />
              </div>

              <div className="mt-4">
                <div className="w-10 h-1 rounded-full bg-orange-500 mb-2" />
                <h3 className="text-lg font-semibold text-gray-900">{type} Model {i+1}</h3>
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-3">
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>150cc</span>
                  <span className="flex items-center gap-1"><svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>35 km/l</span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">Rs. 1,200/day</div>
                  <div className="text-sm text-yellow-500 flex items-center gap-1">★ 4.8</div>
                </div>

                <div className="mt-4">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      </section>

      
    </div>
  )
}

export default Hero
