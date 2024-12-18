"use client";

import ChartCard from "@/components/charts/chart-card";
import {
  TotalMinutesSpent,
  TotalDaysEngaging,
  NetflixUser,
  AmazonPrimeUser,
  HuluUser,
  TubiUser,
  DisneyPlusUser,
  PlutoUser,
  ParamountUser,
  HBOMaxUser,
  PeacockUser,
  YouTubeTVUser,
  YouTubeUser,
  NetflixMinutes,
  AmazonPrimeMinutes,
  HuluMinutes,
  TubiMinutes,
  DisneyPlusMinutes,
  PlutoMinutes,
  ParamountMinutes,
  HBOMaxMinutes,
  PeacockMinutes,
  YouTubeTVMinutes,
  YouTubeMinutes,
} from "@/app/api/media-habits";

export default function MediaHabitsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Q1070. Media Habits</h1>
      <p className="text-sm text-gray-600">
        Behaviorally derived variables on consumers to understand their media habits on mobile devices. If consumers
        have the following observed digital behaviors in the past month, they are included in the below variables.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* A. Total minutes spent on media/streaming */}
        <ChartCard data={TotalMinutesSpent} />

        {/* B. Total number of days engaging with media/streaming */}
        <ChartCard data={TotalDaysEngaging} />

        {/* C-J: Yes/No Users */}
        <ChartCard data={NetflixUser} />
        <ChartCard data={AmazonPrimeUser} />
        <ChartCard data={HuluUser} />
        <ChartCard data={TubiUser} />
        <ChartCard data={DisneyPlusUser} />
        <ChartCard data={PlutoUser} />
        <ChartCard data={ParamountUser} />
        <ChartCard data={HBOMaxUser} />
        <ChartCard data={PeacockUser} />
        <ChartCard data={YouTubeTVUser} />
        <ChartCard data={YouTubeUser} />

        {/* N-X: Total minutes spent per platform */}
        <ChartCard data={NetflixMinutes} />
        <ChartCard data={AmazonPrimeMinutes} />
        <ChartCard data={HuluMinutes} />
        <ChartCard data={TubiMinutes} />
        <ChartCard data={DisneyPlusMinutes} />
        <ChartCard data={PlutoMinutes} />
        <ChartCard data={ParamountMinutes} />
        <ChartCard data={HBOMaxMinutes} />
        <ChartCard data={PeacockMinutes} />
        <ChartCard data={YouTubeTVMinutes} />
        <ChartCard data={YouTubeMinutes} />
      </div>
    </div>
  );
}
