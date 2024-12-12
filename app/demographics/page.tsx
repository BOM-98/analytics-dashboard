"use client";
import { AdExposureOverview } from "@/components/charts/ad-exposure-overview";
import { AdExposureChart } from "@/components/charts/ad-exposure-chart";
import { AdEngagement } from "@/components/charts/ad-engagement";
import { Genders, AgeCohorts, Regions, Education, KidsInHousehold, Ethnicity, Hispanic } from "../api/demographics";
import ChartCard from "@/components/charts/chart-card";

export default function DemographicsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Ad Exposure Analysis</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard data={Genders} />
        <ChartCard data={AgeCohorts} />
        <ChartCard data={Regions} />
        <ChartCard data={Education} />
        <ChartCard data={KidsInHousehold} />
        <ChartCard data={Ethnicity} />
        <ChartCard data={Hispanic} />
      </div>
    </div>
  );
}
