import { use, useEffect, useState } from "react";
import api from "../api/axios.js"
import toast from "react-hot-toast";
import MenueComponentBackend from "../components/MenueComponentBackend.jsx";
import SidebarComponentBackend from "../components/SidebarComponentBackend.jsx";


const ListRfqPage = () => {

    const [rfqs, setRfqs] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusBadgeMap = {
        CREATED: {
            label: "Created",
            className: "badge badge-primary",
        },
        SEND: {
            label: "In Progress",
            className: "badge badge-warning",
        },
        completed: {
            label: "Abgeschlossen",
            className: "badge badge-success",
        },
        CANCELLED: {
            label: "Cancelled",
            className: "badge badge-error",
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/rfq/list");
                setRfqs(res.data);
            }
            catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);;


    useEffect(() => {
        if (!loading && rfqs.length === 0) {
            toast.error("Keine Daten");
        }
    }, [rfqs, loading]);


    return (
        <div className="min-h-screen bg-base-200">
            <MenueComponentBackend />

            {/* LAYOUT: SIDEBAR + CONTENT */}
            <div className="flex">

                <SidebarComponentBackend />

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">

                    <h1 className="text-2xl font-bold mb-4">All RFQs</h1>
                    <p className="mb-6">All your RFQs are listed here</p>



                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">

                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                {rfqs.length > 0 &&
                                    rfqs.map((rfq) => (

                                        <tr key={rfq.id}>
                                            <td>{new Date(rfq.createdAt).toLocaleString("de-DE")}</td>

                                            <td>
                                                {statusBadgeMap[rfq.status] && (
                                                    <div className={statusBadgeMap[rfq.status].className}>
                                                        {statusBadgeMap[rfq.status].label}
                                                    </div>
                                                )}
                                            </td>

                                            <td>
                                                <a href={`/rfq/${rfq.id}`} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </a>

                                            </td>
                                        </tr>


                                    ))
                                }
                            </tbody>

                        </table>
                    </div>


                </main>
            </div >

        </div>
    )
}

export default ListRfqPage;