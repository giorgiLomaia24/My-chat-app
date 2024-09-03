import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';


function SearchInput() {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 4) return toast.error("Search query must be longer than at least 3 charachters");
    const conversation = conversations?.find((c) => c?.fullName?.toLowerCase()?.includes(search?.toLocaleLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      return toast.error("No such a user found");
    }
  }
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input type="text" className="input input-bordered rounded-full"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'><FaSearch className='w-6 h-6 outline-none' /></button>
    </form>
  )
}

export default SearchInput