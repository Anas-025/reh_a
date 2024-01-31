export default function ContactUS() {
  return (
    <>
      <section className="body-font px-4">
        <div
          className="container flex flex-col md:flex-row lg:max-w-6xl md:my-24 my-16 w-full mx-auto section border-2 border-black rounded-lg overflow-hidden"
          id="contact-form"
        >
          <div className="md:w-1/2 w-full bg-[#f8ff50] p-4 py-8 md:p-12 md:border-r-2 md:border-b-0 border-b-2 border-black">
            <h1 className="text-4xl text-gray-800 sm:text-4xl font-bold title-font mb-4">
              Contact Us
            </h1>
            <p className="leading-relaxed text-xl text-black">
              We're here to assist you! If you have any questions or need
              assistance, please feel free to reach out to us.
            </p>
          </div>

          <div className="md:w-1/2 w-full bg-[#72b1ff] p-4 py-8 md:p-12">
            <h1 className="text-4xl text-gray-800 sm:text-4xl font-bold title-font mb-4">
              Contact Info
            </h1>
            <div className="p-2 w-full leading-7 py-4 text-lg">
              Mobile Number: +91 9979743483
            </div>
            <div className="p-2 w-full leading-7 py-4 text-lg">
              Email: rehaa.2024@gmail.com
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
