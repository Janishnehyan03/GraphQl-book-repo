import { useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { ADD_BOOK } from "../mutations/bookMutations";
import { GET_AUTHORS } from "../queries/authorQueries";
import { GET_BOOKS } from "../queries/bookQueries";

function AddBook({ open, setOpen }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [authorId, setAuthorId] = useState("");
  const cancelButtonRef = useRef(null);

  const [addBook] = useMutation(ADD_BOOK, {
    variables: { title, details, authorId },
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const authorQuery = useQuery(GET_AUTHORS);
  if (authorQuery.error)
    return (
      <h1 className="text-red-500 text-5xl text-center font-bold">
        Something Went Wrong{" "}
      </h1>
    );
  if (authorQuery.loading)
    return (
      <h1 className="text-blue-500 text-5xl text-center font-bold">
        Loading ...
      </h1>
    );

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
                    <form className="mx-2  mt-8">
                      <h1 className="text-blue-900 text-center font-bold uppercase my-8 text-5xl">
                        Add Book
                      </h1>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            Book Title
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-sky-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Type Book Title Here..."
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                          >
                            Book Description
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-sky-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                            id="grid-last-name"
                            type="text"
                            placeholder="Type Book Description Here..."
                            onChange={(e) => setDetails(e.target.value)}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                          >
                            Author
                          </label>
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            onChange={(e) => setAuthorId(e.target.value)}
                          >
                            {authorQuery.data.authors.map((author, key) => (
                              <option key={key} value={author.id}>
                                {author.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => {
                        addBook()
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

export default AddBook;
