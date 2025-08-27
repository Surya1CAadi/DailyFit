import React from "react";
import RedeemForm from "./RedeemForm.jsx";
import PendingRedeems from "./PendingRedeems.jsx";
import PreviousRedeems from "./PreviousRedeems.jsx";

function ManageCredit({id}) {

    return (

        <dialog id={id} className="modal">
            <div className="modal-box flex flex-col gap-3 px-0 md:px-4">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h3 className="font-bold text-lg">Mange credits!</h3>
                <RedeemForm inputName={"manageCredit"}/>
                <PendingRedeems inputName={"manageCredit"}/>
                <PreviousRedeems inputName={"manageCredit"}/>
            </div>
        </dialog>

    );
}

export default ManageCredit;