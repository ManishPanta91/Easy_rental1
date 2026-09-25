const HowItWorks = () => {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 pt-32 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">How it works</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Renting with EasyRental is simple
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            EasyRental makes it easy to reserve a bike or scooter, verify your identity, and start your journey with clear terms and no hidden charges.
          </p>

          <div className="mt-12 space-y-10">
            <InfoSection number="01" title="Choose a vehicle and rental period">
              First, choose the bike or scooter you want to rent. Select your pickup location, pickup date, and return date. The rental cost is calculated according to the vehicle&apos;s daily rate and the number of rental days.
            </InfoSection>

            <InfoSection number="02" title="Share your renter information">
              Before a booking is confirmed, EasyRental collects the renter&apos;s full name, phone number, email address, current address, and an emergency contact. This information helps us keep the rental agreement accurate and contact you if we need to discuss your booking.
            </InfoSection>

            <InfoSection number="03" title="Verify your citizenship">
              The renter must provide a valid citizenship card for identity verification. The name and citizenship number must match the booking information. Both the front and back of the card may be requested, and the original card should be available when collecting the vehicle.
            </InfoSection>

            <InfoSection number="04" title="Understand the rental fees">
              The rental fee is charged per day. A service fee may also apply to each booking. The advance payment normally includes the rental fee and service fee for the selected rental period.
              <div className="mt-5 rounded-2xl bg-orange-50 p-5 text-sm leading-7 text-slate-700">
                <p><strong className="text-slate-950">Example:</strong> If the daily rental fee is Rs. 1,200 and the rental lasts three days, the rental charge is Rs. 3,600. If the service fee is Rs. 150, the advance payment is Rs. 3,750.</p>
              </div>
            </InfoSection>

            <InfoSection number="05" title="Pay the advance and security deposit">
              The advance confirms your rental request and is paid before pickup. A separate security deposit may be required when you collect the vehicle. The security deposit is held as protection against damage, loss, or unpaid charges and is returned after the vehicle is inspected and safely returned, subject to the rental agreement.
            </InfoSection>

            <InfoSection number="06" title="Payment and bank details">
              EasyRental may accept bank transfer, card payment, or cash at pickup, depending on availability. For a bank transfer, use the bank account details provided by EasyRental and include your name or booking reference in the payment description. Keep the transaction receipt so the payment can be verified quickly.
              <p className="mt-4">Bank details are used only for payment verification and, where applicable, processing a security-deposit refund. Never send payment to an account that has not been confirmed by EasyRental.</p>
            </InfoSection>

            <InfoSection number="07" title="Collect and return the vehicle">
              At pickup, EasyRental checks the renter&apos;s identity, confirms the payment, and records the vehicle&apos;s condition. The renter should review the vehicle before leaving and report any existing damage. Return the vehicle on the agreed date and in the agreed condition so the final inspection and deposit-refund process can be completed.
            </InfoSection>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-8">
            <h2 className="text-2xl font-bold text-slate-950">What you should have ready</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Keep your citizenship card, active phone number, emergency contact details, payment receipt, and booking information ready before pickup. Providing complete and accurate information helps avoid delays.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

const InfoSection = ({ number, title, children }) => (
  <section className="grid gap-4 sm:grid-cols-[52px_1fr]">
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">{number}</span>
    <div>
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-3 leading-8 text-slate-600">{children}</div>
    </div>
  </section>
);

export default HowItWorks;
