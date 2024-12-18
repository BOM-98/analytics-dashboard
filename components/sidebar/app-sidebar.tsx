"use client";

import { Sidebar, SidebarContent, SidebarSeparator, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { SearchForm } from "@/components/sidebar/search-form";

import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  UsersRound,
  TvMinimalPlay,
  ShoppingBag,
  ShoppingBasket,
  Wallet,
  BookOpenText,
  Activity,
  Puzzle,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Demos & Attributes",
      url: "#",
      icon: UsersRound,
      isActive: true,
      items: [
        { title: "Demographics", url: "/dashboard/demographics" },
        { title: "Lifestyles", url: "/dashboard/lifestyles" },
      ],
    },
    {
      title: "Media",
      url: "#",
      icon: TvMinimalPlay,
      items: [
        { title: "Audio Streaming Habits", url: "/dashboard/audio-streaming-habits" },
        { title: "Media Habits", url: "/dashboard/media-habits" },
        { title: "Media Interests/Genres", url: "#" },
        { title: "Digital Habits", url: "#" },
        { title: "Social Media Usage", url: "#" },
        { title: "News", url: "#" },
      ],
    },
    {
      title: "Retail & Shopping",
      url: "#",
      icon: ShoppingBag,
      items: [
        { title: "Convenience Stores", url: "#" },
        { title: "Retail Shopping Store Type", url: "#" },
        { title: "DIY/Home Improvement", url: "#" },
      ],
    },
    {
      title: "Grocery & Dining",
      url: "#",
      icon: ShoppingBasket,
      items: [
        { title: "Grocery Habits", url: "#" },
        { title: "Grocery Retailers", url: "#" },
        { title: "Dining Behaviors", url: "#" },
        { title: "Dining QSR Brands", url: "#" },
      ],
    },
    {
      title: "Financial & Automotive",
      url: "#",
      icon: Wallet,
      items: [
        { title: "Financial", url: "#" },
        { title: "Insurance", url: "#" },
        { title: "Automotive", url: "#" },
      ],
    },
    {
      title: "Interests & Lifestyles",
      url: "#",
      icon: BookOpenText,
      items: [
        { title: "Books, Magazines, Blogs, & Reading", url: "#" },
        { title: "Hobbies/Interests", url: "#" },
        { title: "Home", url: "#" },
        { title: "Pets", url: "#" },
        { title: "Sports", url: "#" },
        { title: "Technology", url: "#" },
        { title: "Travel", url: "#" },
      ],
    },
    {
      title: "Health",
      url: "#",
      icon: Activity,
      items: [
        { title: "Pharmaceuticals", url: "#" },
        { title: "Nutrition & Diet", url: "#" },
      ],
    },
    {
      title: "Other",
      url: "#",
      icon: Puzzle,
      items: [
        { title: "Philanthropy", url: "#" },
        { title: "Seasonal", url: "#" },
      ],
    },
  ],
};

interface AppSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    avatar?: string;
  };
  teams: {
    name?: string;
    logo: React.ElementType | null;
    plan?: string;
  };
}

export function AppSidebar({ user, teams }: AppSidebarProps) {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              name: teams?.name ?? "Guest Team",
              logo: teams?.logo ?? GalleryVerticalEnd,
              plan: teams?.plan ?? "Free",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SearchForm />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name ?? "Guest User",
            email: user?.email ?? "guest@example.com",
            avatar: user?.avatar ?? "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
