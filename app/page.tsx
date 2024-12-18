import { ArrowRight, ArrowUpRight, Edit2, Globe, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  // Extract user details from session (if any)
  const user = {
    name: session?.user?.name || null,
    email: session?.user?.email || null,
    avatar: "/avatars/shadcn.jpg", // or dynamically if you have it
  };

  const teams = {
    name: session?.user?.company || undefined,
    logo: null,
    plan: session?.user?.plan || undefined,
  };

  return (
    <div lang="en" className="h-full">
      <div className="h-full flex overflow-hidden">
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar user={user} teams={teams} />
          <main className="flex-1 flex flex-col bg-background overflow-hidden">
            <SidebarTrigger />
            <SidebarInset className="flex-1 overflow-y-auto w-full px-4">
              {/* Main container with padding and vertical spacing */}
              <div className="p-6 space-y-8">
                {/* Header section: Title and top-right controls */}
                <div className="flex items-center justify-between">
                  {/* Page Title */}
                  <h1 className="text-3xl font-bold">Overview</h1>

                  {/* Action buttons for time-range and notifications */}
                  <div className="flex items-center gap-2">
                    {/* "Weekly" button */}
                    <Button variant="outline">Weekly</Button>

                    {/* Notifications button (icon only) */}
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Notifications</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Metrics cards section: displays various KPIs */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Unique Users Card */}
                  <Card>
                    {/* Card header with title */}
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,234,816</div>
                      <div className="text-xs text-green-500 font-medium">+345</div>
                    </CardContent>
                  </Card>

                  {/* Active Users Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">34,650</div>
                      <div className="text-xs text-green-500 font-medium">+38</div>
                    </CardContent>
                  </Card>

                  {/* Events Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">19,438</div>
                      <div className="text-xs text-red-500 font-medium">-43%</div>
                    </CardContent>
                  </Card>

                  {/* Conversion Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Conversion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.76%</div>
                      <div className="text-xs text-red-500 font-medium">-5%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Audience section: Title, button, search input, and audience cards */}
                <div className="space-y-4">
                  {/* Audience header with "See more" button */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Audience</h2>
                    <Button variant="outline">
                      See more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Search input with arrow button */}
                  <div className="relative">
                    <Input
                      placeholder="Type in a feasability query here e.g. How many folks who shopped for a car?"
                      className="pl-4 pr-10 py-6"
                    />
                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Grid of audience-related cards */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Example Audience Card 1 */}
                    <Card>
                      <CardContent className="pt-6">
                        {/* Card header with editable title */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Netflix viewers who bought something fro...</h3>
                          <Button variant="ghost" size="icon">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {/* Metric and stats */}
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">123,518</div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-green-500">↑ 2%</div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>Last modified: 11/11/2024</span>
                              <Button variant="link" className="h-auto p-0">
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Example Audience Card 2 */}
                    <Card>
                      <CardContent className="pt-6">
                        {/* Card header with editable title */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Hardcore Wholefood</h3>
                          <Button variant="ghost" size="icon">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {/* Metric and stats */}
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">31,249</div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-red-500">↓ 5%</div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>Last modified: 11/11/2024</span>
                              <Button variant="link" className="h-auto p-0">
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Example Audience Card 3 */}
                    <Card>
                      <CardContent className="pt-6">
                        {/* Card header with editable title */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Prime Video viewers</h3>
                          <Button variant="ghost" size="icon">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {/* Metric and stats */}
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">1,579,147</div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-red-500">↓ 5%</div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>Last modified: 11/11/2024</span>
                              <Button variant="link" className="h-auto p-0">
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Example Audience Card 4 */}
                    <Card>
                      <CardContent className="pt-6">
                        {/* Card header with editable title */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Burger King + McDonalds</h3>
                          <Button variant="ghost" size="icon">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {/* Metric and stats */}
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">60,461</div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-red-500">↓ 5%</div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span>Last modified: 11/11/2024</span>
                              <Button variant="link" className="h-auto p-0">
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Footer buttons for creating new audiences and seeing more */}
                  <div className="flex items-center justify-end gap-2">
                    <Button>
                      Create <span className="ml-2">+</span>
                    </Button>
                    <Button variant="outline">
                      See more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Fraud Analysis section: Displays flagged percentages and categories */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Fraud Analysis</h2>

                  {/* Fraud metrics grid */}
                  <div className="grid gap-4 md:grid-cols-5">
                    {/* Flagged percentage card */}
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium mb-2">Flagged</h3>
                        <div className="text-2xl font-bold">11.5%</div>
                        <div className="text-xs text-red-500 font-medium">+345</div>
                      </CardContent>
                    </Card>

                    {/* Fraud categories card (wider card) */}
                    <Card className="md:col-span-4">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium mb-4">Fraud Categories</h3>

                        {/* Categories grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {/* Category: App */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-5 w-5" />
                              <span className="text-sm font-medium">App</span>
                            </div>
                            <div className="text-xl font-bold">612</div>
                            <div className="text-xs text-red-500">↓ 5%</div>
                          </div>

                          {/* Category: Website */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Globe className="h-5 w-5" />
                              <span className="text-sm font-medium">Website</span>
                            </div>
                            <div className="text-xl font-bold">345</div>
                            <div className="text-xs text-red-500">↓ 5%</div>
                          </div>

                          {/* Category: VOIP */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-5 w-5" />
                              <span className="text-sm font-medium">VOIP</span>
                            </div>
                            <div className="text-xl font-bold">5080</div>
                            <div className="text-xs text-green-500">↑ 12%</div>
                          </div>

                          {/* Category: Location */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-5 w-5" />
                              <span className="text-sm font-medium">Location</span>
                            </div>
                            <div className="text-xl font-bold">45</div>
                            <div className="text-xs text-red-500">↓ 5%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </SidebarInset>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
