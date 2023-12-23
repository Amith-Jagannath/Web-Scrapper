"use client";
import React, { Fragment } from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModel = () => {
    setIsOpen(true);
  };
  const closeModel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button type="button" className="btn" onClick={openModel}>
        Track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          as="div"
          className="dialog-container"
        >
          <div className="flex justify-center text-center items-center h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content h-2/5">
                <div className="flex justify-between">
                  <Image
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    width={28}
                    height={28}
                  />
                  <Image
                    src="/assets/icons/x-close.svg"
                    alt="logo"
                    width={28}
                    height={28}
                    onClick={closeModel}
                    className="hover:cursor-pointer"
                  />
                </div>

                <div className="flex-col ">
                  <h2 className="bold mt-2">
                    Stay Updated with product pricing aletrs right in your
                    inbox!
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                  <div className="flex-col space-y-4">
                    <form action="" className="flex-col mt-4">
                      <h4 className="mt-4">Email Address</h4>
                      <div className="flex mt-4 space-x-2">
                        <Image
                          src="/assets/icons/mail.svg"
                          alt="logo"
                          width={28}
                          height={28}
                          onClick={closeModel}
                        />
                        <input
                          type="text"
                          placeholder="Enter the email"
                          className="border-0 rounded-2xl px-4"
                        />
                      </div>
                    </form>
                    <div className="flex justify-center ">
                      <button
                        type="button"
                        className="bg-black text-white rounded-2xl p-3"
                      >
                        Track product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
