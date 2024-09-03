import React, { useEffect, useRef, useState } from 'react';
import { LuSend } from "react-icons/lu";
import { FaImages } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import useSendMessage from '../../hooks/useSendMessage';
import usePreviewImg from '../../hooks/usePreviewImg';



function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const imageInputRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const closeModalRef = useRef(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !imgUrl) return;
    await sendMessage(message,imgUrl);
    setMessage("");
    closeModalRef?.current.click()
  }

  useEffect(() => {
    if (imgUrl) {
      document.getElementById('my_modal_3').showModal()
    }
  },[imgUrl])
  return (
    <>

      {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}

      <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
          <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white'
            placeholder='type message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)} />
          <div className="absolute inset-y-0 end-0 flex justify-between pe-3" >
            <button type='button' className='' onClick={() => imageInputRef?.current?.click()}>
              {loading ? <span className='loading loading-spinner'></span> : <FaImages className='text-gray-200' />}
            </button>
            <button type='submit' className='ml-2'>
              {loading ? <span className='loading loading-spinner'></span> : <LuSend className='text-gray-200' />}
            </button>
            <input type="file" hidden ref={imageInputRef}  onChange={handleImageChange}/>
          </div>

        </div>
      </form>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={closeModalRef} onClick={() => setImgUrl("")}>✕</button>
          </form>
          <img style={{ width: '340px', height: "340px", borderRadius: '15px', margin: "auto" }} src={imgUrl} alt="" />
          <div className="w-full flex justify-end">
            <button type='submit' className='ml-2 text-3xl' onClick={handleSubmit}>
              {loading ? <span className='loading loading-spinner'></span> : <AiOutlineSend className='text-gray-900' />}
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default MessageInput