import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import DashboardComponent from "@/components/dashboard/DashboardComponent"
import CustomerDashboard from "@/components/dashboard/CustomerDashboard"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("api/auth/signin")
  }

  return <DashboardComponent user={session.user} />
// return <CustomerDashboard  />
}