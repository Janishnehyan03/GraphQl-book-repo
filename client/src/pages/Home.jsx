import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddAuthor from "../components/AddAuthor";
import AddBook from "../components/AddBook";
import AllAuthors from "../components/AllAuthors";
import AllBooks from "../components/AllBooks";

function Home() {
  const [openBook, setOpenBook] = useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);
  return (
    <div className="w-full">
      <AddAuthor open={openAuthor} setOpen={setOpenAuthor} />
      <AddBook open={openBook} setOpen={setOpenBook} />
      <div className="flex  w-1/4 m-4">
        <div
          onClick={() => setOpenBook(true)}
          className="bg-violet-600 px-6 py-3 mx-2 cursor-pointer text-white font-bold rounded-xl hover:text-violet-400 border border-violet-400 hover:bg-gray-100 transition-all"
        >
          NEW BOOK
        </div>
        <div
          onClick={() => setOpenAuthor(true)}
          className="bg-rose-600 px-6 py-3 mx-2 cursor-pointer text-white font-bold rounded-xl hover:text-red-400 border border-red-400 hover:bg-gray-100 transition-all"
        >
          NEW AUTHOR
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* all books */}
        <AllBooks />
        {/* all authors */}
        <AllAuthors />
      </div>
    </div>
  );
}

export default Home;
