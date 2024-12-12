import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AdExposureOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ad Exposure Overview</CardTitle>
        <CardDescription>Key metrics for user ad exposure</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">250</span>
          <span className="text-sm text-muted-foreground">Avg. Daily Ad Impressions</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">3.2%</span>
          <span className="text-sm text-muted-foreground">Avg. Click-Through Rate</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">45%</span>
          <span className="text-sm text-muted-foreground">Video Ad Completion Rate</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">$0.85</span>
          <span className="text-sm text-muted-foreground">Avg. Cost Per Click</span>
        </div>
      </CardContent>
    </Card>
  );
}
