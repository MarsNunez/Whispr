export default function Home() {
  return (
    <main className="pb-30">
      {/* HERO */}
      <section className="text-center px-10 py-30">
        <p className="uppercase text-sm tracking-widest text-[#ce793d]">
          Premium Audio Sharring Website
        </p>
        <h2 className="text-6xl font-semibold mt-4 mb-10">
          Amplify Your Audio with Whispr – Where Audio & Innovation Merge
        </h2>
        <p className="text-lg px-26 text-gray-600">
          Transform stress into serenity with our extensive library of ASMR
          content. From meditation aids to sleep stories, Whispr creates a
          personalized wellness journey that fits your lifestyle and helps you
          reconnect with inner peace.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-7 py-3 text-lg font-medium mt-10">
          Explore Content <span className="font-bold">→</span>
        </button>
      </section>
      {/* INFO */}
      <section className="pt-20 pb-20 mx-10 text-center">
        <div className="grid grid-cols-3 place-items-center">
          <div className="w-fit">
            <figure className="w-72 h-64">
              <img
                src="/img/01.svg"
                alt="img01"
                className="w-full h-full object-contain"
              />
            </figure>
            <div>
              <div className="text-5xl flex items-center justify-center gap-x-4 mb-5 mt-10">
                <i className="fa-solid fa-microphone-lines text-amber-600"></i>
                <p className="font-bold">500+</p>
              </div>
              <p className="text-lg text-gray-600 tracking-wide">
                Episodes Produced
              </p>
            </div>
          </div>
          <div className="w-fit">
            <figure className="w-72 h-64">
              <img
                src="/img/02.svg"
                alt="img01"
                className="w-full h-full object-contain"
              />
            </figure>
            <div>
              <div className="text-5xl flex items-center justify-center gap-x-4 mb-5 mt-10">
                <i className="fa-solid fa-user-group text-cyan-700"></i>
                <p className="font-bold">1M+</p>
              </div>
              <p className="text-lg text-gray-600 tracking-wide">
                Listeners Reached
              </p>
            </div>
          </div>
          <div className="w-fit">
            <figure className="w-72 h-64">
              <img
                src="/img/03.svg"
                alt="img01"
                className="w-full h-full object-contain"
              />
            </figure>
            <div>
              <div className="text-5xl flex items-center justify-center gap-x-4 mb-5 mt-10">
                <i className="fa-solid fa-user-check text-green-700"></i>
                <p className="font-bold">4.9/5</p>
              </div>
              <p className="text-lg text-gray-600 tracking-wide">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="border mx-18 border-gray-400 mt-5" />
      {/* SERVICES */}
      <section className="max-w-6xl mx-auto mt-40 px-10">
        <p className="uppercase text-sm tracking-widest text-[#ce793d] mb-4">
          Our Services
        </p>
        <div className="grid grid-cols-8">
          <h2 className="text-5xl font-semibold col-span-5 leading-14">
            Bring Your Stories to Life with Our All-in-One Platform for Creators
            and Listeners
          </h2>
          <div className="col-span-3 justify-self-end">
            <p className="text-indigo-700 my-3 text-center">
              Want to see what's new?
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-8 py-4 text-lg font-medium">
              Discover More <span className="font-bold">→</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-12 gap-7">
          <div className="rounded-2xl overflow-hidden pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-xl px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>01</p>
            </div>
            <div className="px-8">
              <h3 className="text-3xl font-semibold mb-3 mt-4">
                Recording & Editing
              </h3>
              <p className="text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-5xl mt-4">
                <i className="fa-solid fa-record-vinyl"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-xl px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>02</p>
            </div>
            <div className="px-8">
              <h3 className="text-3xl font-semibold mb-3 mt-4">
                Get visivility
              </h3>
              <p className="text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-5xl mt-4">
                <i className="fa-solid fa-eye"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-xl px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>03</p>
            </div>
            <div className="px-8">
              <h3 className="text-3xl font-semibold mb-3 mt-4">Get revenue</h3>
              <p className="text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-5xl mt-4">
                <i className="fa-solid fa-piggy-bank"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-xl px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>04</p>
            </div>
            <div className="px-8">
              <h3 className="text-3xl font-semibold mb-3 mt-4">
                Find what you like
              </h3>
              <p className="text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-5xl mt-4">
                <i className="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-xl px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>05</p>
            </div>
            <div className="px-8">
              <h3 className="text-3xl font-semibold mb-3 mt-4">
                Sleep better tonight
              </h3>
              <p className="text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-5xl mt-4">
                <i className="fa-solid fa-moon"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-xl px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>06</p>
            </div>
            <div className="px-8">
              <h3 className="text-3xl font-semibold mb-3 mt-4">
                A great Comunity
              </h3>
              <p className="text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-5xl mt-4">
                <i className="fa-solid fa-people-group"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto mt-40">
        <div className="grid grid-cols-10 gap-14">
          <figure className="col-span-4 rounded-3xl overflow-hidden">
            <img
              src="/img/trust-creators.webp"
              alt="trust-creators-img"
              className="h-full object-cover"
            />
          </figure>
          <div className="col-span-6 py-3">
            <p className="uppercase text-sm tracking-widest text-[#ce793d] mb-4">
              Why choose us
            </p>
            <h3 className="text-5xl font-semibold leading-14">
              Why Creators Trust Whispr for Their Journey
            </h3>
            <div className="mt-8 flex flex-col gap-7">
              <div className="flex gap-6">
                <div className="bg-indigo-200 h-fit p-3 rounded-full">
                  <i className="fa-solid fa-circle-check text-indigo-700 text-3xl"></i>
                </div>
                <div className="pr-10 mt-2">
                  <h4 className="font-bold text-2xl mb-2 text-indigo-600">
                    Proven Results
                  </h4>
                  <p>
                    We’ve helped dozens of creators launch successful podcasts,
                    grow their audience, and build loyal communities.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-indigo-200 h-fit p-3 rounded-full">
                  <i className="fa-solid fa-circle-check text-indigo-700 text-3xl"></i>
                </div>
                <div className="pr-10 mt-2">
                  <h4 className="font-bold text-2xl mb-2 text-indigo-600">
                    Expertise and Experience
                  </h4>
                  <p>
                    We’ve helped dozens of creators launch successful podcasts,
                    grow their audience, and build loyal communities.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-indigo-200 h-fit p-3 rounded-full">
                  <i className="fa-solid fa-circle-check text-indigo-700 text-3xl"></i>
                </div>
                <div className="pr-10 mt-2">
                  <h4 className="font-bold text-2xl mb-2 text-indigo-600">
                    Data-Driven Growth
                  </h4>
                  <p>
                    We’ve helped dozens of creators launch successful podcasts,
                    grow their audience, and build loyal communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
