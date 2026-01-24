import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/axios.js"
import toast from "react-hot-toast";
import MenueComponentBackend from "../components/MenueComponentBackend.jsx";
import SidebarComponentBackend from "../components/SidebarComponentBackend.jsx";


const DetailRfqPage = () => {

    const [rfq, setRfq] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const { id } = useParams();

    const statusBadgeMap = {
        CREATED: {
            label: "Created",
            className: "badge badge-primary ml-2",
        },
        SEND: {
            label: "In Progress",
            className: "badge badge-warning ml-2",
        },
        completed: {
            label: "Abgeschlossen",
            className: "badge badge-success",
        },
        CANCELLED: {
            label: "Cancelled",
            className: "badge badge-error ml-2",
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log("Fetching RFQ details for ID:", id);
                const res = await api.get(`/rfq/details/${id}`);
                setRfq(res.data);
                console.log(res.data);
            }
            catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (!loading && rfq.length === 0) {
            toast.error("Keine Daten");
        }
    }, [rfq, loading]);


    const handleSendRfq = async (status) => {

        try {

            const data = {
                status: status,
                message: message
            }
            const res = await api.put(`/rfq/update/${id}`, data);
            window.location.reload();

        } catch (err) {
            console.error("Error updating RFQ:", err);
            toast.error("Error updating RFQ");
        }
    }


    return (
        <div className="min-h-screen bg-base-200">

            <MenueComponentBackend />

            {/* LAYOUT: SIDEBAR + CONTENT */}
            <div className="flex">

                <SidebarComponentBackend />

                {/* MAIN CONTENT */}
                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">

                    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
                        <a href="/rfq/list">
                            <button className="btn btn-neutral w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                                    />
                                </svg>
                                RFQs
                            </button>
                        </a>

                        <button className="btn btn-soft btn-error"
                            onClick={() => {
                                handleSendRfq("CANCELLED");
                            }}>
                            Cancel RFQ
                        </button>

                        <button className="btn btn-soft btn-primary"
                            onClick={() => {
                                handleSendRfq("SEND");
                            }}>
                            Send RFQ
                        </button>
                    </div>

                    <h1 className="text-2xl font-bold mb-4">RFQ
                        {statusBadgeMap[rfq.status] && (
                            <div className={statusBadgeMap[rfq.status].className}>
                                {statusBadgeMap[rfq.status].label}
                            </div>
                        )}
                    </h1>
                    <p className="mb-6">View and edit your RFQ</p>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Product details</legend>

                            <label className="label font-extrabold">Name</label>
                            <label className="label">Name</label>

                            <label className="label font-extrabold">Price</label>


                            <label className="label font-extrabold">Provider</label>

                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Provider details</legend>

                            <label className="label font-extrabold">Name</label>
                            <label className="label mb-3">{rfq.providerId}</label>

                            <label className="label font-extrabold">E-Mail</label>


                            <label className="label font-extrabold">Phone</label>

                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Requester details</legend>

                            <label className="label font-extrabold">Name</label>


                            <label className="label font-extrabold">E-Mail</label>


                            <label className="label font-extrabold">Phone</label>

                        </fieldset>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Message</legend>

                            <textarea
                                onChange={(e) => setMessage(e.target.value)}
                                className="textarea"
                                placeholder="Type here ...">

                            </textarea>

                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Upload Files</legend>
                        </fieldset>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                            <legend className="fieldset-legend">Conversation</legend>

                            {rfq?.messages?.length > 0 &&
                                rfq.messages.map((message) => (

                                    <div className="chat chat-start" key={message.id}>

                                        <div className="chat-header">
                                            {message.createrId}
                                            <time className="text-xs opacity-50">{new Date(message.createdAt).toLocaleString("de-DE")}</time>
                                        </div>
                                        <div className="chat-bubble"> {message.message}</div>

                                    </div>
                                ))}

                        </fieldset>
                    </div>

                </main>
            </div>
        </div>
    )
}
export default DetailRfqPage;

