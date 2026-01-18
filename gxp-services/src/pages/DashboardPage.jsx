import { useEffect, useState } from "react";
import api from "../api/axios.js"
import toast from "react-hot-toast";

const DashboardPage = () => {

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await api.get("/files/list/40");
                setFiles(res.data.files);


            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (!loading && files.length === 0) {
            toast.error("Keine Daten");
        }
    }, [files, loading]);


    return (
        <div className="min-h-screen bg-base-200">

            {/* NAVBAR */}
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a href="/dashboard" className="btn btn-ghost text-xl text-primary">
                        GXP-Service Backend
                    </a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                        >
                            <li><a>Profile</a></li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* LAYOUT: SIDEBAR + CONTENT */}
            <div className="flex">

                {/* SIDEBAR */}
                <aside className="w-64 bg-base-100 shadow-md min-h-[calc(100vh-64px)] p-4">
                    <ul className="menu rounded-box">
                        <li className="menu-title">
                            <span>Dashboard</span>
                        </li>
                        <li><a href="#">Übersicht</a></li>
                        <li><a href="#">Kunden</a></li>
                        <li><a href="#">Aufträge</a></li>
                        <li><a href="#">Reports</a></li>
                        <li><a href="#">Einstellungen</a></li>
                    </ul>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">


                    <ul className="list bg-base-100 rounded-box shadow-md mb-6">

                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Files Uploaded</li>

                        {files.length > 0 &&
                            files.map((file) => (

                                <li className="list-row flex items-center" key={file.fileId}>
                                    <div>
                                        <div>{file.fileName}</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">{file.fileId}</div>
                                    </div>

                                    <div className="ml-auto flex gap-2">
                                        <button className="btn btn-square btn-ghost">
                                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                                        </button>


                                        <button className="btn btn-square btn-ghost">
                                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                                        </button>
                                    </div>
                                </li>

                            ))
                        }

                    </ul>


                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-6">


                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Filename</th>
                                </tr>
                            </thead>

                            <tbody>
                                {files.length > 0 &&
                                    files.map((file) => (
                                        <tr key={file.fileId}>
                                            <td>{file.fileId}</td>
                                            <td>{file.fileName}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>







                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            <div className="card bg-base-100 shadow-sm">

                                <div className="card-body">
                                    <h2 className="card-title">Card 1</h2>
                                    <p>Beschreibung der Karte</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Details</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title">Card 2</h2>
                                    <p>Weitere Inhalte</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Details</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-100 shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title">Card 3</h2>
                                    <p>Noch mehr Inhalte</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Details</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

            </div >
        </div >
    )
}

export default DashboardPage
