import AdminLayout from "@/components/AdminLayout";
import Navbar from "@/components/Navbar";



export default function Layout({children}) {
    return (
        <div>
    
            <AdminLayout>
            {children}
        </AdminLayout>
        </div>
    )
}