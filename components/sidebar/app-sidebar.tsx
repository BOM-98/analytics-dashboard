"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  UsersRound,
  TvMinimalPlay,
  ShoppingBag,
  ShoppingBasket,
  Wallet,
  BookOpenText,
  Activity,
  Puzzle,
} from "lucide-react";

import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { SearchForm } from "@/components/sidebar/search-form";

const data = {
  user: {
    name: "Brian O'Mahony",
    email: "brian@qriousinsight.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Qrious Insight",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Demos & Attributes",
      url: "#",
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: "Demographics",
          url: "/demographics",
        },
        {
          title: "Lifestyles",
          url: "#",
        },
      ],
    },
    {
      title: "Media",
      url: "#",
      icon: TvMinimalPlay,
      items: [
        {
          title: "Audio Streaming Habits",
          url: "/audio-streaming-habits",
        },
        {
          title: "Media Habits",
          url: "#",
        },
        {
          title: "Media Interests/Genres",
          url: "#",
        },
        {
          title: "Digital Habits",
          url: "#",
        },
        {
          title: "Social Media Usage",
          url: "#",
        },
        {
          title: "News",
          url: "#",
        },
      ],
    },
    {
      title: "Retail & Shopping",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "Convenience Stores",
          url: "#",
        },
        {
          title: "Retail Shopping Store Type",
          url: "#",
        },
        {
          title: "DIY/Home Improvement",
          url: "#",
        },
      ],
    },
    {
      title: "Grocery & Dining",
      url: "#",
      icon: ShoppingBasket,
      items: [
        {
          title: "Grocery Habits",
          url: "#",
        },
        {
          title: "Grocery Retailers",
          url: "#",
        },
        {
          title: "Dining Behaviors",
          url: "#",
        },
        {
          title: "Dining QSR Brands",
          url: "#",
        },
      ],
    },
    {
      title: "Financial & Automotive",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Financial",
          url: "#",
        },
        {
          title: "Insurance",
          url: "#",
        },
        {
          title: "Automotive",
          url: "#",
        },
      ],
    },
    {
      title: "Interests & Lifestyles",
      url: "#",
      icon: BookOpenText,
      items: [
        {
          title: "Books, Magazines, Blogs, & Reading",
          url: "#",
        },
        {
          title: "Hobbies/Interests",
          url: "#",
        },
        {
          title: "Home",
          url: "#",
        },
        {
          title: "Pets",
          url: "#",
        },
        {
          title: "Sports",
          url: "#",
        },
        {
          title: "Technology",
          url: "#",
        },
        {
          title: "Travel",
          url: "#",
        },
      ],
    },
    {
      title: "Health",
      url: "#",
      icon: Activity,
      items: [
        {
          title: "Pharmaceuticals",
          url: "#",
        },
        {
          title: "Nutrition & Diet",
          url: "#",
        },
      ],
    },
    {
      title: "Other",
      url: "#",
      icon: Puzzle,
      items: [
        {
          title: "Philanthropy",
          url: "#",
        },
        {
          title: "Seasonal",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SearchForm />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
