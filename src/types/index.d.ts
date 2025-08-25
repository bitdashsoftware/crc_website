import type { CollectionEntry, CollectionKey } from "astro:content";
import type { MarkdownHeading } from "astro";

export type GenericEntry = CollectionEntry<CollectionKey>;

export type AboutEntry = CollectionEntry<"about">;

export type BlogEntry = CollectionEntry<"blog">;
export type CommunityEntry = CollectionEntry<"community">;
export type DocsEntry = CollectionEntry<"docs">;
export type EventsEntry = CollectionEntry<"events">;
export type GetInvolvedEntry = CollectionEntry<"getInvolved">;
export type HomeEntry = CollectionEntry<"home">;
export type IndexCardsEntry = CollectionEntry<"indexCards">;

export type PortfolioEntry = CollectionEntry<"portfolio">;

export type TermsEntry = CollectionEntry<"terms">;

export type ContentEntry =
  | AboutEntry
  | BlogEntry
  | CommunityEntry
  | DocsEntry
  | EventsEntry
  | GetInvolvedEntry
  | HomeEntry
  | IndexCardsEntry
  | PortfolioEntry
  | TermsEntry;

export type SearchableEntry = ContentEntry;

export type SocialLinks = {
  discord?: string;
  email?: string;
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedIn?: string;
  pinterest?: string;
  tiktok?: string;
  website?: string;
  youtube?: string;
}

export type EntryReference = {
  id: string;
  collection: string;
};

// Define heading hierarchy so that we can generate ToC
export interface HeadingHierarchy extends MarkdownHeading {
  subheadings: HeadingHierarchy[];
}

export type MenuItem = {
  title?: string;
  id: string;
  children: MenuItem[];
};

// Define the type for menu items to created nested object
export type MenuItemWithDraft = {
  title?: string;
  id: string;
  draft: boolean;
  children: MenuItemWithDraft[];
};

// Define the props for the SideNavMenu component
export type SideNavMenuProps = {
  items: MenuItemWithDraft[];
  level: number;
};
