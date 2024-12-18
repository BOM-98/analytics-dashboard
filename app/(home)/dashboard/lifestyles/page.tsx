"use client";

import ChartCard from "@/components/charts/chart-card";
import {
  BargainHunters,
  HeavyGamers,
  HeavySocialMediaUsers,
  SelfImprovement,
  GreenLiving,
  NaturalFoods,
  PlanningAWedding,
  NewBaby,
} from "@/app/api/lifestyles";

export default function LifestylesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Q1065. Lifestyles</h1>
      <p className="text-sm text-gray-600">
        Behaviorally derived variables on consumers to understand their lifestyles and mindsets. If consumers have the
        following observed digital behaviors in the past 3-months, they are included in the below variables.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard data={BargainHunters} />
        <ChartCard data={HeavyGamers} />
        <ChartCard data={HeavySocialMediaUsers} />
        <ChartCard data={SelfImprovement} />
        <ChartCard data={GreenLiving} />
        <ChartCard data={NaturalFoods} />
        <ChartCard data={PlanningAWedding} />
        <ChartCard data={NewBaby} />
      </div>
    </div>
  );
}
