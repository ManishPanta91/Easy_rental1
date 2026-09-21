import { FaFacebookF, FaInstagram, FaPhoneVolume, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail, IoPaperPlane } from "react-icons/io5";
import { MdAccessTime, MdOutlineDirectionsBike } from "react-icons/md";

const Contact = () => {
  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div className="max-w-xl">
            <span className="mb-5 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              <span className="h-1 w-10 rounded-full bg-orange-500" />
              Contact EasyRental
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
              Let&apos;s get you on the road.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Have a question about a booking, a vehicle, or your next city adventure? Our team is ready to help.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a href="tel:+9779800000000" className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                <FaPhoneVolume aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-semibold text-slate-500">Call us</p>
              <p className="mt-1 font-bold text-slate-950">+977 9800000000</p>
            </a>
            <a href="mailto:info@easyrental.com" className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                <IoMail aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-semibold text-slate-500">Email us</p>
              <p className="mt-1 font-bold text-slate-950">info@easyrental.com</p>
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-3xl">
              <MdOutlineDirectionsBike aria-hidden="true" />
            </div>
            <h2 className="mt-8 text-3xl font-bold">Visit or message us</h2>
            <p className="mt-4 leading-7 text-slate-300">We&apos;re here to make renting a bike or scooter feel simple from the first question to the final ride.</p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <FaLocationDot className="mt-1 shrink-0 text-xl text-orange-400" aria-hidden="true" />
                <div><p className="font-semibold">Our location</p><p className="mt-1 text-sm text-slate-300">Bharatpur,chitwan, Nepal</p></div>
              </div>
              <div className="flex gap-4">
                <MdAccessTime className="mt-1 shrink-0 text-2xl text-orange-400" aria-hidden="true" />
                <div><p className="font-semibold">Opening hours</p><p className="mt-1 text-sm text-slate-300">Every day, 7:00 AM - 9:00 PM</p></div>
              </div>
              <div className="flex gap-4">
                <FaWhatsapp className="mt-1 shrink-0 text-xl text-orange-400" aria-hidden="true" />
                <div><p className="font-semibold">WhatsApp support</p><p className="mt-1 text-sm text-slate-300">Quick answers, whenever you need them</p></div>
              </div>
            </div>

            <div className="mt-12 flex gap-3 border-t border-white/10 pt-6">
              <a href="#facebook" aria-label="EasyRental on Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-orange-500"><FaFacebookF /></a>
              <a href="#instagram" aria-label="EasyRental on Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-orange-500"><FaInstagram /></a>
              <a href="#whatsapp" aria-label="EasyRental on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-orange-500"><FaWhatsapp /></a>
            </div>
          </aside>

          <form className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 sm:p-10" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">Send a message</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">How can we help?</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">Your name<input type="text" placeholder="Alex Morgan" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100" /></label>
              <label className="text-sm font-semibold text-slate-700">Email address<input type="email" placeholder="alex@example.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100" /></label>
            </div>
            <label className="mt-5 block text-sm font-semibold text-slate-700">Subject<input type="text" placeholder="Tell us what you need" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100" /></label>
            <label className="mt-5 block text-sm font-semibold text-slate-700">Message<textarea rows="5" placeholder="Write your message here..." className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100" /></label>
            <button type="submit" className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-100">
              Send message <IoPaperPlane aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact
