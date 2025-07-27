import { DashboardLayout } from "@/components/dashboardLayout";
import { ReactNode } from "react";

export default function Layout({ children }: {
    children: ReactNode
}) {
    return(
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}