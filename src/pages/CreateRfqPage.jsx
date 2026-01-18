import { useEffect, useState } from "react";
import api from "../api/axios.js"
import toast from "react-hot-toast";
import MenueComponentBackend from "../components/MenueComponentBackend.jsx";
import SidebarComponentBackend from "../components/SidebarComponentBackend.jsx";


const CreateRfqPage = () => {

    return (

        <div className="min-h-screen bg-base-200">

            <MenueComponentBackend />

            {/* LAYOUT: SIDEBAR + CONTENT */}
            <div className="flex">

                <SidebarComponentBackend />

                {/* MAIN CONTENT */}
                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-4">Create RFQ Page</h1>
                    <p className="mb-6">This is where you can create a new RFQ</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Product details</legend>

                            <label className="label">Name</label>
                            <input type="text" className="input" />

                            <label className="label">Price</label>
                            <input type="text" className="input" />

                            <label className="label">Provider</label>
                            <input type="text" className="input" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Provider details</legend>

                            <label className="label">Name</label>
                            <input type="text" className="input" />

                            <label className="label">E-Mail</label>
                            <input type="text" className="input" />

                            <label className="label">Phone</label>
                            <input type="text" className="input" />
                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">RFQ details</legend>

                            <label className="label">Notice</label>
                            <input type="text" className="input" />

                            <label className="label">Date</label>
                            <input type="text" className="input" />

                            <label className="label">Date</label>
                            <input type="text" className="input" />
                        </fieldset>
                    </div>
                </main>


            </div >
        </div >
    )
}

export default CreateRfqPage
