import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { DELETE_AUTHOR } from "../mutations/authorMutations";
import { GET_AUTHORS } from "../queries/authorQueries";
import { GET_BOOKS } from "../queries/bookQueries";

function AllAuthors() {
  const { data, error, loading } = useQuery(GET_AUTHORS);

  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }, { query: GET_BOOKS }],
  });
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      deleteAuthor({ variables: { id: id } });
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
      <h1 className="text-blue-500 text-5xl text-center font-bold">
        Loading ...
      </h1>
    );

  return (
    <div className="w-full my-8">
      <h1 className="text-center text-blue-500 font-bold text-3xl my-4">
        All Authors
      </h1>
      <div className="flex justify-center">
        <div className="border-b border-gray-200 shadow">
          <table className="divide-y divide-gray-300 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-2 text-xs text-gray-500">#</th>
                <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                <th className="px-6 py-2 text-xs text-gray-500">Email</th>
                <th className="px-6 py-2 text-xs text-gray-500">View</th>
                <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {data.authors.map((author, key) => (
                <tr key={key} className="whitespace-nowrap">
                  <td className="px-6 py-4 text-sm text-gray-500">{key + 1}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{author.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {author.email}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/view-author/${author.id}`}
                      className="px-4 py-1 text-sm text-blue-600 bg-gray-200 rounded-full"
                    >
                      View
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(author.id)}
                      className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                    >
                      Delete
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

export default AllAuthors;
