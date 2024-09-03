import React from 'react'

function ImagePreviewModal() {
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <img style={{ width: '340px', height: "340px", borderRadius: '15px', margin: "auto" }} src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="" />

            </div>
        </dialog>

    )
}

export default ImagePreviewModal