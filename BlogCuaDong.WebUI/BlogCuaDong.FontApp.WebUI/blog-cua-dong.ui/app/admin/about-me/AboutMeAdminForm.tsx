"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { requestJson } from "@/lib/client-request";
import type { AboutMeContent } from "@/lib/about-me-types";

type SaveState = "idle" | "saving" | "success" | "error";

function toPrettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default function AboutMeAdminForm() {
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");
  const [fatalError, setFatalError] = useState<Error | null>(null);

  const [portfolioLabel, setPortfolioLabel] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  const [skillsText, setSkillsText] = useState("");
  const [contactsJson, setContactsJson] = useState("[]");
  const [socialsJson, setSocialsJson] = useState("[]");
  const [experiencesJson, setExperiencesJson] = useState("[]");

  async function runAction(
    action: () => Promise<void>,
    options?: {
      userMessage?: string;
      escalate?: boolean;
      onFinally?: () => void;
      onError?: () => void;
    },
  ) {
    try {
      await action();
    } catch (error) {
      console.error(error);
      options?.onError?.();
      if (options?.escalate) {
        setFatalError(
          error instanceof Error ? error : new Error("Unexpected error"),
        );
      } else {
        setMessage(options?.userMessage ?? "Operation failed.");
      }
    } finally {
      options?.onFinally?.();
    }
  }

  useEffect(() => {
    void runAction(
      async () => {
        const content = await requestJson<AboutMeContent>("/api/about-me", {
          cache: "no-store",
        });

        setPortfolioLabel(content.profile.portfolioLabel);
        setName(content.profile.name);
        setTitle(content.profile.title);
        setAvatarSrc(content.profile.avatarSrc);
        setCvUrl(content.profile.cvUrl);
        setSkillsText(content.skills.join("\n"));
        setContactsJson(toPrettyJson(content.contacts));
        setSocialsJson(toPrettyJson(content.socials));
        setExperiencesJson(toPrettyJson(content.experiences));
        setMessage("");
      },
      {
        userMessage: "Failed to load data from server.",
        escalate: true,
        onFinally: () => setLoading(false),
      },
    );
  }, []);

  const hasJsonError = useMemo(() => {
    try {
      JSON.parse(contactsJson);
      JSON.parse(socialsJson);
      JSON.parse(experiencesJson);
      return false;
    } catch {
      return true;
    }
  }, [contactsJson, socialsJson, experiencesJson]);

  if (fatalError) {
    throw fatalError;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaveState("saving");
    setMessage("");

    await runAction(
      async () => {
        const contacts = JSON.parse(contactsJson);
        const socials = JSON.parse(socialsJson);
        const experiences = JSON.parse(experiencesJson);
        const skills = skillsText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);

        const payload: AboutMeContent = {
          profile: {
            portfolioLabel,
            name,
            title,
            avatarSrc,
            cvUrl,
          },
          skills,
          contacts,
          socials,
          experiences,
        };

        await requestJson<AboutMeContent>("/api/about-me", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        setSaveState("success");
        setMessage("Saved successfully.");
      },
      {
        userMessage: "Save failed. Please verify JSON fields.",
        onError: () => setSaveState("error"),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-slate-700">
            Portfolio label
            <input
              value={portfolioLabel}
              onChange={(event) => setPortfolioLabel(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-700">
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-700">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-700">
            Avatar URL
            <input
              value={avatarSrc}
              onChange={(event) => setAvatarSrc(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-700 sm:col-span-2">
            CV URL
            <input
              value={cvUrl}
              onChange={(event) => setCvUrl(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
              required
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Skills</h2>
        <p className="mt-1 text-sm text-slate-500">One skill per line.</p>
        <textarea
          value={skillsText}
          onChange={(event) => setSkillsText(event.target.value)}
          rows={10}
          className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Contacts JSON</h2>
        <p className="mt-1 text-sm text-slate-500">
          Array of objects: label, value, href.
        </p>
        <textarea
          value={contactsJson}
          onChange={(event) => setContactsJson(event.target.value)}
          rows={10}
          className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Socials JSON</h2>
        <p className="mt-1 text-sm text-slate-500">
          Array of objects: name, href, icon (email | phone | location | link).
        </p>
        <textarea
          value={socialsJson}
          onChange={(event) => setSocialsJson(event.target.value)}
          rows={10}
          className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Experiences JSON
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Array of objects: period, role, company, summary, highlights
          (string[]).
        </p>
        <textarea
          value={experiencesJson}
          onChange={(event) => setExperiencesJson(event.target.value)}
          rows={18}
          className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
        />
      </section>

      <div className="sticky bottom-4 rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            {loading
              ? "Loading..."
              : hasJsonError
                ? "JSON format issue detected in one or more sections."
                : "Ready to save."}
          </p>
          <button
            type="submit"
            disabled={loading || saveState === "saving" || hasJsonError}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saveState === "saving" ? "Saving..." : "Save About Me"}
          </button>
        </div>
        {message ? (
          <p className="mt-2 text-sm text-slate-700">{message}</p>
        ) : null}
      </div>
    </form>
  );
}
