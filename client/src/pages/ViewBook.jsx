import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_BOOK } from "../queries/bookQueries";
import Loading from "../components/Loading";
import {
  BookOpenIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/outline";

function ViewBook() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id },
  });
  if (error)
    return (
      <h1 className="text-red-500 font-bold text-4xl">Somthing Went Wrong </h1>
    );
  if (loading) return <Loading />;
  return (
    <div className="h-auto w-3/4 border border-gray-400 mx-auto mt-4 rounded-lg">
      <div className="container px-3 my-4 border">
        <div className=" text-violet-900 text-5xl font-bold mb-3 flex space-x-2">
          <BookOpenIcon className="h-12" />
          Book Info
        </div>
        <h1 className="text-gray-500 font-semibold text-3xl">
          {data.book.title}
        </h1>
        <p className="text-gray-700 font-sm text-xl">{data.book.details}</p>
      </div>

      <div className="container px-3 my-4 border">
        <div className=" text-rose-600 text-5xl font-bold mb-3 flex space-x-2">
          <UserIcon className="h-12" />
          Author Info
        </div>
        <div className="text-gray-700 font-sm text-sm flex">
          <UserIcon className="h-4" /> {data.book.authorId.name}
        </div>
        <div className="text-gray-700 font-sm text-sm flex">
          <MailIcon className="h-4" />
          {data.book.authorId.email}
        </div>
        <div className="text-gray-700 font-sm text-sm flex">
          <PhoneIcon className="h-4" /> {data.book.authorId.phone}
        </div>
      </div>
    </div>
  );
}

export default ViewBook;
