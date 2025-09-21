import Breadcrumbs from "../components/ui/Breadcrumbs";
import OverviewCard from "../components/ui/OverviewCard";
import { User, Package, DollarSign } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-violet-50">
            Dashboard
          </h2>
          <Breadcrumbs />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewCard
          title="Total Users"
          value="1,234"
          description="Users registered this month"
          icon={User}
          iconColor="text-blue-500"
        />
        <OverviewCard
          title="Products"
          value="567"
          description="Total products in store"
          icon={Package}
          iconColor="text-green-500"
        />
        <OverviewCard
          title="Revenue"
          value="$12,345"
          description="Revenue this month"
          icon={DollarSign}
          iconColor="text-yellow-500"
        />
      </div>
    </div>
  );
}
