import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { DELETE_BOOK } from "../mutations/bookMutations";
import { GET_BOOKS } from "../queries/bookQueries";
import { TrashIcon, EyeIcon } from "@heroicons/react/outline";

function AllBooks() {
  const { data, error, loading } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this book")) {
      deleteBook({ variables: { id: id } });
    }
  };
  if (error)
    return (
      <h1 className="text-red-500 text-5xl text-center font-bold">
        Something Went Wrong{" "}
      </h1>
    );
  if (loading)
    return (
      <h1 className="text-violet-500 text-5xl text-center font-bold">
        Loading ...
      </h1>
    );

  return (
    <div className="w-full my-8">
      <h1 className="text-center text-violet-500 font-bold text-3xl my-4">
        All Books
      </h1>
      <div className="flex justify-center ">
        <div className="border-b border-gray-500 shadow">
          <table className="divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-2 text-xs text-gray-500">#</th>
                <th className="px-6 py-2 text-xs text-gray-500">Title</th>
                <th className="px-6 py-2 text-xs text-gray-500">Author</th>
                <th className="px-6 py-2 text-xs text-gray-500">View</th>
                <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {data.books.map((book, key) => (
                <tr key={key} className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-gray-500">{key + 1}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{book.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {book.authorId.name}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/view-book/${book.id}`}>
                      <button className="px-4 py-1 text-sm text-white bg-gray-500 rounded-md">
                        <EyeIcon className="h-4 text-white" />
                      </button>
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-4 py-1 text-sm text-white bg-red-500 rounded-md"
                    >
                      <TrashIcon className="text-white h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllBooks;
