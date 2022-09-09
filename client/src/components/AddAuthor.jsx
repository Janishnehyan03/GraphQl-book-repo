import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { ADD_AUTHOR } from "../mutations/authorMutations";
import { useMutation } from "@apollo/client";
import { GET_AUTHORS } from "../queries/authorQueries";

function AddAuthor({open, setOpen}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const cancelButtonRef = useRef(null);

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    variables: { name, email, phone },
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      alert("Please enter all fields");
    }
    try {
      let { data } = await addAuthor(name, email, phone);
      setName("");
      setEmail("");
      setPhone("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="w-full">
                    <form className="mx-4 mt-8">
                      <h1 className="text-rose-900 text-center font-bold uppercase my-8 text-2xl">
                        Add Author
                      </h1>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            Author Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-rose-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Type Author Name Here..."
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                          >
                            Author Email
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-rose-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                            id="grid-last-name"
                            type="text"
                            placeholder="Type Autho Email Here..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                          >
                            Author Phone
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-rose-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                            id="grid-last-name"
                            type="text"
                            placeholder="Type Author Phone here..."
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => {
                        handleSubmit(e);
                        setOpen(false);
                      }}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default AddAuthor;
