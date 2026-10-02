import {
  FaIdCard,
  FaMapPin,
  FaMotorcycle,
  FaReceipt,
  FaUniversity,
  FaUserCheck,
  FaWallet,
} from 'react-icons/fa';

const steps = [
  {
    number: '01',
    icon: FaMotorcycle,
    title: 'Choose a vehicle and rental period',
    description:
      'First, choose the bike or scooter you want to rent. Select your pickup location, pickup date, and return date. The rental cost is calculated according to the vehicle&apos;s daily rate and the number of rental days.',
  },
  {
    number: '02',
    icon: FaUserCheck,
    title: 'Share your renter information',
    description:
      'Before a booking is confirmed, EasyRental collects the renter&apos;s full name, phone number, email address, current address, and an emergency contact. This information helps us keep the rental agreement accurate and contact you if we need to discuss your booking.',
  },
  {
    number: '03',
    icon: FaIdCard,
    title: 'Verify your citizenship',
    description:
      'The renter must provide a valid citizenship card for identity verification. The name and citizenship number must match the booking information. Both the front and back of the card may be requested, and the original card should be available when collecting the vehicle.',
  },
  {
    number: '04',
    icon: FaReceipt,
    title: 'Understand the rental fees',
    description:
      'The rental fee is charged per day. A service fee may also apply to each booking. The advance payment normally includes the rental fee and service fee for the selected rental period.',
    highlight:
      'If the daily rental fee is Rs. 1,200 and the rental lasts three days, the rental charge is Rs. 3,600. If the service fee is Rs. 150, the advance payment is Rs. 3,750.',
  },
  {
    number: '05',
    icon: FaWallet,
    title: 'Pay the advance and security deposit',
    description:
      'The advance confirms your rental request and is paid before pickup. A separate security deposit may be required when you collect the vehicle. The security deposit is held as protection against damage, loss, or unpaid charges and is returned after the vehicle is inspected and safely returned, subject to the rental agreement.',
  },
  {
    number: '06',
    icon: FaUniversity,
    title: 'Payment and bank details',
    description:
      'EasyRental may accept bank transfer, card payment, or cash at pickup, depending on availability. For a bank transfer, use the bank account details provided by EasyRental and include your name or booking reference in the payment description. Keep the transaction receipt so the payment can be verified quickly.',
    note: 'Bank details are used only for payment verification and, where applicable, processing a security-deposit refund. Never send payment to an account that has not been confirmed by EasyRental.',
  },
  {
    number: '07',
    icon: FaMapPin,
    title: 'Collect and return the vehicle',
    description:
      'At pickup, EasyRental checks the renter&apos;s identity, confirms the payment, and records the vehicle&apos;s condition. The renter should review the vehicle before leaving and report any existing damage. Return the vehicle on the agreed date and in the agreed condition so the final inspection and deposit-refund process can be completed.',
  },
];

const HowItWorks = () => {
  return (
    <main className="min-h-screen pb-20 pt-28 text-[#111827]">
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:p-8 lg:p-12">
          <div className="relative flex flex-col gap-5 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-[#FFCCBC] bg-[#FFF3ED] px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#F4511E]">
                How it works
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-[#102A56] sm:text-5xl">
                Renting with EasyRental is simple
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
              <div className="animate-pulse cursor-pointer rounded-xl bg-white px-4 py-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                <div className="text-lg font-black text-[#F4511E]">Fast</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">booking</div>
              </div>
              <div className="animate-pulse cursor-pointer rounded-xl bg-white px-4 py-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                <div className="text-lg font-black text-[#102A56]">Verified</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">rides</div>
              </div>
              <div className="animate-pulse cursor-pointer rounded-xl bg-white px-4 py-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
                <div className="text-lg font-black text-[#22A06B]">Clear</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">pricing</div>
              </div>
            </div>
          </div>

          <p className="relative mt-7 max-w-3xl text-lg leading-8 text-[#64748B]">
            EasyRental makes it easy to reserve a bike or scooter, verify your identity, and start your journey with clear terms and no hidden charges.
          </p>

          <div className="relative mt-12 grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
            <div className="space-y-5">
              {steps.map((step) => (
                <InfoSection
                  key={step.number}
                  title={step.title}
                  highlight={step.highlight}
                  note={step.note}
                  icon={step.icon}
                >
                  {step.description}
                </InfoSection>
              ))}
            </div>

            <aside className="lg:pt-2">
              <div className="cursor-pointer rounded-[28px] bg-[#102A56] p-6 text-white shadow-[0_18px_45px_rgba(16,42,86,0.18)] transition-transform duration-300 hover:-translate-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFB199]">Checklist</p>
                <h2 className="mt-3 text-2xl font-bold text-white">What to prepare</h2>
                <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F4511E] text-[10px] font-black text-white">✓</span>
                    Citizenship card or valid ID
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F4511E] text-[10px] font-black text-white">✓</span>
                    Active phone number and emergency contact
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F4511E] text-[10px] font-black text-white">✓</span>
                    Booking confirmation and payment proof
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F4511E] text-[10px] font-black text-white">✓</span>
                    Clear understanding of pickup and return times
                  </li>
                </ul>
              </div>

              <div className="mt-5 cursor-pointer rounded-[28px] border border-[#F9D8C7] bg-[#FFF3ED] p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F4511E]">Why people choose us</p>
                <p className="mt-4 text-base leading-7 text-[#102A56]">
                  Transparent pricing, verified rentals, and a smooth process from booking to return.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

const InfoSection = ({ title, children, highlight, note, icon: Icon }) => (
  <section className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-6">
    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#F4511E] via-[#FF7043] to-[#102A56]" />
    <div className="grid gap-4 pl-3 sm:grid-cols-[52px_1fr] sm:pl-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F4511E] to-[#FF7043] text-lg text-white shadow-lg shadow-[#F9D8C7]">
        <Icon />
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#102A56] sm:text-2xl">{title}</h2>
        <div className="mt-3 leading-7 text-[#64748B] sm:text-base sm:leading-8">{children}</div>

        {highlight && (
          <div className="mt-5 rounded-2xl border border-[#F9D8C7] bg-[#FFF3ED] p-4 text-sm leading-7 text-[#102A56]">
            <strong className="text-[#102A56]">Example:</strong> {highlight}
          </div>
        )}

        {note && <p className="mt-4 text-sm leading-7 text-[#64748B]">{note}</p>}
      </div>
    </div>
  </section>
);

export default HowItWorks;
