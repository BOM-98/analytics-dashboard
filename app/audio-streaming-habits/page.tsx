"use client";
import ChartCard from "@/components/charts/chart-card";
import {
  AudioStreamingTimePerDay,
  AudioStreamingDays,
  AudioStreamingEvents,
  SpotifyListener,
  YouTubeMusicListener,
  PandoraMusicListener,
  AmazonMusicListener,
} from "../api/audio-streaming-habits";

export default function AudioStreamingHabitsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Q1001. Audio Streaming Habits</h1>
      <p className="text-sm text-gray-600 mb-6">
        Behaviorally derived variables on consumers to understand their audio streaming habits on mobile devices. If
        consumers have the following observed digital behaviors in the past month, they are included in the below
        variables.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard data={AudioStreamingTimePerDay} />
        <ChartCard data={AudioStreamingDays} />
        <ChartCard data={AudioStreamingEvents} />
        <ChartCard data={SpotifyListener} />
        <ChartCard data={YouTubeMusicListener} />
        <ChartCard data={PandoraMusicListener} />
        <ChartCard data={AmazonMusicListener} />
      </div>
    </div>
  );
}
