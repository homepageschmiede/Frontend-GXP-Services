
function SidebarComponentBackend() {
    return (
        <div>

            {/* SIDEBAR */}
            <aside className="w-64 bg-base-100 shadow-md min-h-[calc(100vh-64px)] p-4">
                <ul className="menu rounded-box">
                    <li className="menu-title">
                        <span>Admin</span>
                    </li>
                    <li><a href="/dashboard">Dashboard</a></li>


                    <li className="menu-title mt-10">
                        <span>Costumers</span>
                    </li>

                    <li><a href="/create-rfq">Create RFQ</a></li>
                    <li><a href="/rfq/list">List RFQ</a></li>

                </ul>
            </aside>

        </div>
    )
}
export default SidebarComponentBackend