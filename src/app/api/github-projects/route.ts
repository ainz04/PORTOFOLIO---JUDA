import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/data/portfolio";

export const revalidate = 1800;

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  has_pages: boolean;
  homepage: string | null;
  html_url: string;
  fork: boolean;
  stargazers_count: number;
  updated_at: string;
}

export interface GitHubProjectPayload {
  id: number;
  repoName: string;
  eyebrow: string;
  title: string;
  descId: string;
  descEn: string;
  url: string;
  repoUrl: string;
  tags: string[];
  img: string;
  fallbackImg: string;
  hasPages: boolean;
  livePreview: boolean;
  updatedAt: string;
}

function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w+/g, (word) => {
      const upper = word.toUpperCase();
      if (["3D", "RPG", "AI", "UI", "UX", "API", "CMS", "APP"].includes(upper)) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

function resolveLiveUrl(repo: GitHubRepo, username: string): string {
  const cleanHome = repo.homepage?.trim();
  if (cleanHome && /^https?:\/\//i.test(cleanHome)) {
    return cleanHome;
  }
  if (repo.has_pages) {
    if (repo.name.toLowerCase() === `${username.toLowerCase()}.github.io`) {
      return `https://${username}.github.io/`;
    }
    return `https://${username}.github.io/${repo.name}/`;
  }
  return repo.html_url;
}

export async function GET() {
  const username = SITE_CONFIG.githubUsername;

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-github-showcase",
        },
        next: { revalidate: 1800 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API returned ${res.status}`, projects: [] },
        { status: res.status }
      );
    }

    const repos: GitHubRepo[] = await res.json();

    const ownRepos = repos.filter((r) => !r.fork);
    const liveRepos = ownRepos.filter(
      (r) =>
        r.has_pages ||
        Boolean(r.homepage && /^https?:\/\//i.test(r.homepage.trim()))
    );

    const selected = liveRepos.length > 0 ? liveRepos : ownRepos.slice(0, 6);

    const projects: GitHubProjectPayload[] = selected.map((repo) => {
      const liveUrl = resolveLiveUrl(repo, username);
      const isLiveSite =
        repo.has_pages ||
        Boolean(repo.homepage && /^https?:\/\//i.test(repo.homepage.trim()));

      const ogCard = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;

      const tagSet = new Set<string>();
      if (repo.language) tagSet.add(repo.language);
      if (repo.has_pages) tagSet.add("GitHub Pages");
      if (Array.isArray(repo.topics)) {
        for (const topic of repo.topics.slice(0, 2)) {
          tagSet.add(topic);
        }
      }

      const cleanDesc = repo.description?.trim();
      const title = formatRepoTitle(repo.name);

      return {
        id: repo.id,
        repoName: repo.name,
        eyebrow: repo.has_pages
          ? "GITHUB PAGES"
          : (repo.language || "GITHUB REPO").toUpperCase(),
        title,
        descId:
          cleanDesc ||
          `Proyek web interaktif ${title} yang di-deploy langsung di GitHub Pages (${username}.github.io).`,
        descEn:
          cleanDesc ||
          `Interactive web project ${title} deployed live on GitHub Pages (${username}.github.io).`,
        url: liveUrl,
        repoUrl: repo.html_url,
        tags: [...tagSet].slice(0, 3),
        img: ogCard,
        fallbackImg: "/images/projects/project-1.svg",
        hasPages: repo.has_pages,
        livePreview: isLiveSite,
        updatedAt: repo.updated_at,
      };
    });

    return NextResponse.json({ username, projects });
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return NextResponse.json(
      { error: "Failed to reach GitHub API", projects: [] },
      { status: 500 }
    );
  }
}
