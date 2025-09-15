"use client";

import Link from "next/link";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      {/* HERO */}
      <section className="text-center px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-30">
        <p className="uppercase text-xs sm:text-sm tracking-widest text-[#ce793d]">
          Premium Audio Sharing Website
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 sm:mb-8 lg:mb-10 leading-tight">
          Amplify Your Audio with Whispr – Where Audio & Innovation Merge
        </h2>
        <p className="text-base sm:text-lg px-4 sm:px-8 md:px-16 lg:px-26 text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Transform stress into serenity with our extensive library of ASMR
          content. From meditation aids to sleep stories, Whispr creates a
          personalized wellness journey that fits your lifestyle and helps you
          reconnect with inner peace.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-6 sm:px-7 py-3 text-base sm:text-lg font-medium mt-8 sm:mt-10">
          Explore Content <span className="font-bold">→</span>
        </button>
      </section>
      {/* INFO */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-10 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 place-items-center max-w-6xl mx-auto">
          <div className="w-fit">
            <figure className="w-48 sm:w-56 lg:w-72 h-40 sm:h-48 lg:h-64">
              <img
                src="/img/01.svg"
                alt="img01"
                className="w-full h-full object-contain"
              />
            </figure>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl flex items-center justify-center gap-x-2 sm:gap-x-4 mb-3 sm:mb-5 mt-6 sm:mt-10">
                <i className="fa-solid fa-microphone-lines text-amber-600"></i>
                <p className="font-bold">500+</p>
              </div>
              <p className="text-base sm:text-lg text-gray-600 tracking-wide">
                Episodes Produced
              </p>
            </div>
          </div>
          <div className="w-fit">
            <figure className="w-48 sm:w-56 lg:w-72 h-40 sm:h-48 lg:h-64">
              <img
                src="/img/02.svg"
                alt="img02"
                className="w-full h-full object-contain"
              />
            </figure>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl flex items-center justify-center gap-x-2 sm:gap-x-4 mb-3 sm:mb-5 mt-6 sm:mt-10">
                <i className="fa-solid fa-user-group text-cyan-700"></i>
                <p className="font-bold">1M+</p>
              </div>
              <p className="text-base sm:text-lg text-gray-600 tracking-wide">
                Listeners Reached
              </p>
            </div>
          </div>
          <div className="w-fit sm:col-span-2 lg:col-span-1">
            <figure className="w-48 sm:w-56 lg:w-72 h-40 sm:h-48 lg:h-64">
              <img
                src="/img/03.svg"
                alt="img03"
                className="w-full h-full object-contain"
              />
            </figure>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl flex items-center justify-center gap-x-2 sm:gap-x-4 mb-3 sm:mb-5 mt-6 sm:mt-10">
                <i className="fa-solid fa-user-check text-green-700"></i>
                <p className="font-bold">4.9/5</p>
              </div>
              <p className="text-base sm:text-lg text-gray-600 tracking-wide">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="border mx-4 sm:mx-8 lg:mx-18 border-gray-400 mt-5" />
      {/* SERVICES */}
      <section className="max-w-6xl mx-auto mt-20 sm:mt-32 lg:mt-40 px-4 sm:px-6 lg:px-10">
        <p className="uppercase text-xs sm:text-sm tracking-widest text-[#ce793d] mb-4 text-center sm:text-left">
          Our Services
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 lg:gap-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold lg:col-span-5 leading-tight lg:leading-14 text-center lg:text-left">
            Bring Your Stories to Life with Our All-in-One Platform for Creators
            and Listeners
          </h2>
          <div className="lg:col-span-3 lg:justify-self-end text-center lg:text-right">
            <p className="text-indigo-700 my-3">Want to see what's new?</p>
            <Link
              href="/home"
              className="bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium"
            >
              Discover More <span className="font-bold">→</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 sm:mt-12 gap-4 sm:gap-6 lg:gap-7">
          <div className="rounded-2xl overflow-hidden pb-6 sm:pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-lg sm:text-xl px-5 sm:px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>01</p>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 mt-4">
                Recording & Editing
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mt-4">
                <i className="fa-solid fa-record-vinyl"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-6 sm:pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-lg sm:text-xl px-5 sm:px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>02</p>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 mt-4">
                Get visibility
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mt-4">
                <i className="fa-solid fa-eye"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-6 sm:pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-lg sm:text-xl px-5 sm:px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>03</p>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 mt-4">
                Get revenue
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mt-4">
                <i className="fa-solid fa-piggy-bank"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-6 sm:pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-lg sm:text-xl px-5 sm:px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>04</p>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 mt-4">
                Find what you like
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mt-4">
                <i className="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-6 sm:pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-lg sm:text-xl px-5 sm:px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>05</p>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 mt-4">
                Sleep better tonight
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mt-4">
                <i className="fa-solid fa-moon"></i>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden pb-6 sm:pb-7 bg-gray-200">
            <div className="w-fit bg-indigo-600 text-white font-semibold rounded-2xl text-lg sm:text-xl px-5 sm:px-7 py-2 rounded-bl-none rounded-tr-none">
              <p>06</p>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 mt-4">
                A great Community
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Tortor nisl elit pulvinar pellentesque libero varius libero
                ullamcorper.
              </p>
              <div className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl mt-4">
                <i className="fa-solid fa-people-group"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto mt-20 sm:mt-32 lg:mt-40 px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-14">
          <figure className="lg:col-span-4 rounded-3xl overflow-hidden order-2 lg:order-1">
            <img
              src="/img/trust-creators.webp"
              alt="trust-creators-img"
              className="w-full h-64 sm:h-80 lg:h-full object-cover"
            />
          </figure>
          <div className="lg:col-span-6 py-3 order-1 lg:order-2">
            <p className="uppercase text-xs sm:text-sm tracking-widest text-[#ce793d] mb-4 text-center lg:text-left">
              Why choose us
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight lg:leading-14 text-center lg:text-left">
              Why Creators Trust Whispr for Their Journey
            </h3>
            <div className="mt-6 sm:mt-8 flex flex-col gap-5 sm:gap-7">
              <div className="flex gap-4 sm:gap-6">
                <div className="bg-indigo-200 h-fit p-2 sm:p-3 rounded-full flex-shrink-0">
                  <i className="fa-solid fa-circle-check text-indigo-700 text-xl sm:text-2xl lg:text-3xl"></i>
                </div>
                <div className="pr-2 sm:pr-4 lg:pr-10 mt-1 sm:mt-2">
                  <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 text-indigo-600">
                    Proven Results
                  </h4>
                  <p className="text-sm sm:text-base">
                    We've helped dozens of creators launch successful podcasts,
                    grow their audience, and build loyal communities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <div className="bg-indigo-200 h-fit p-2 sm:p-3 rounded-full flex-shrink-0">
                  <i className="fa-solid fa-circle-check text-indigo-700 text-xl sm:text-2xl lg:text-3xl"></i>
                </div>
                <div className="pr-2 sm:pr-4 lg:pr-10 mt-1 sm:mt-2">
                  <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 text-indigo-600">
                    Expertise and Experience
                  </h4>
                  <p className="text-sm sm:text-base">
                    We've helped dozens of creators launch successful podcasts,
                    grow their audience, and build loyal communities.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <div className="bg-indigo-200 h-fit p-2 sm:p-3 rounded-full flex-shrink-0">
                  <i className="fa-solid fa-circle-check text-indigo-700 text-xl sm:text-2xl lg:text-3xl"></i>
                </div>
                <div className="pr-2 sm:pr-4 lg:pr-10 mt-1 sm:mt-2">
                  <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 text-indigo-600">
                    Data-Driven Growth
                  </h4>
                  <p className="text-sm sm:text-base">
                    We've helped dozens of creators launch successful podcasts,
                    grow their audience, and build loyal communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CALL TO ACTION */}
      <section className="max-w-6xl mx-auto mt-20 sm:mt-32 lg:mt-40 mb-8 sm:mb-10 px-4 sm:px-6 lg:px-10">
        <p className="uppercase text-xs sm:text-sm tracking-widest text-[#ce793d] mb-4 text-center">
          Speak or Listen
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight lg:leading-14 max-w-2xl text-center mx-auto">
          Start Speaking or Listening with{" "}
          <span className="text-indigo-700 underline underline-offset-4">
            Whispr
          </span>{" "}
          Today
        </h3>
        <figure className="w-full rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden h-full max-h-64 sm:max-h-80 lg:max-h-[28rem] object-contain max-w-5xl mx-auto mt-8 sm:mt-12 lg:mt-16">
          <img
            src="/img/calltoactionimg.webp"
            alt="call-to-action-img"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12 mb-8 sm:mb-12 lg:mb-15">
          <button className="bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium">
            Join to the Community <span className="font-bold">→</span>
          </button>
        </div>
      </section>
    </main>
  );
}
