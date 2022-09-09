import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOKS } from "../queries/bookQueries";
import Loading from "./Loading";

function BookTable() {
  const { data, error, loading } = useQuery(GET_BOOKS);
  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <div className="text-2xl text-center text-red-600">
          Something Went Wrong{" "}
        </div>
      </>
    );
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-violet-700 text-center my-5">
        All Books{" "}
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">#</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Details</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Author</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {data.books.map((book, key) => (
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {key + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {book.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {book.details}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {book.authorId.name}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTable;
