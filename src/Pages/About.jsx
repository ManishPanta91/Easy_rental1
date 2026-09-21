import { FaHeart, FaMapMarkerAlt, FaMotorcycle, FaShieldAlt, FaStar, FaUsers } from "react-icons/fa";
import { MdAccessTime, MdOutlineExplore } from "react-icons/md";

const About = () => {
  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <span className="mb-5 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-1 w-10 rounded-full bg-orange-500" />
              About EasyRental
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
              Ride more.<br />
              <span className="text-orange-500">Worry less.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              EasyRental makes city travel simple with reliable bikes, friendly service, and flexible rental plans built around your journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
                <FaMotorcycle className="text-xl text-orange-500" aria-hidden="true" />
                <span className="font-bold text-slate-950">500+<small className="ml-1 block text-xs font-normal text-slate-500">happy rides</small></span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
                <FaStar className="text-xl text-orange-500" aria-hidden="true" />
                <span className="font-bold text-slate-950">4.9/5<small className="ml-1 block text-xs font-normal text-slate-500">customer rating</small></span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-orange-100 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=85"
              alt="Motorcycle ready for a city ride"
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-slate-950/90 p-4 text-white backdrop-blur-sm">
              <FaMapMarkerAlt className="text-xl text-orange-400" aria-hidden="true" />
              <div><p className="font-bold">Made for Chitwan</p><p className="text-sm text-slate-300">Explore the city at your own pace</p></div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-1 w-10 rounded-full bg-orange-500" />
              Our mission
            </span>
            <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">Making every journey feel easy.</h2>
            <p className="mt-5 leading-7 text-slate-600">
              We believe getting around should be convenient, affordable, and enjoyable. From a quick trip across town to a weekend adventure, we take care of the ride so you can focus on the destination.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Our team keeps every vehicle clean, inspected, and ready to go, while our straightforward booking process gives you the freedom to travel on your terms.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <FaShieldAlt className="text-3xl text-orange-500" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold">Safe & reliable</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Every ride is checked and maintained before it reaches you.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <MdAccessTime className="text-4xl text-orange-500" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold">Flexible plans</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Choose hourly, daily, or weekly rentals that fit your plans.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <FaUsers className="text-3xl text-orange-500" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold">People first</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Helpful support from real people whenever you need us.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <FaHeart className="text-3xl text-orange-500" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold">Local spirit</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">A better way to discover the places that make the city special.</p>
            </div>
          </div>
        </div>

        <section className="mt-20 rounded-3xl bg-orange-500 px-8 py-10 text-white sm:px-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <MdOutlineExplore className="text-4xl" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold">Your next adventure starts here.</h2>
              <p className="mt-2 max-w-xl text-orange-50">Pick a ride, choose your plan, and explore more of the city with EasyRental.</p>
            </div>
            <a href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 font-bold transition hover:bg-slate-800">Talk to our team <FaHeart aria-hidden="true" /></a>
          </div>
        </section>
      </section>
    </main>
  );
};

export default About
