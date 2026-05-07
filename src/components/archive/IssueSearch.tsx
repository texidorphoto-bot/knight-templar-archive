"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type IssueSearchProps = {
  initialValue?: string;
  onSubmit: (value: string) => void;
  label?: string;
  placeholder?: string;
};

export function IssueSearch({
  initialValue = "",
  onSubmit,
  label = "Search the Archive",
  placeholder = "Search the Archive — title, topic, article, or text",
}: IssueSearchProps) {
  const [value, setValue] = useState(initialValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function scheduleSubmit(next: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSubmit(next), 280);
  }

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        onSubmit(value);
      }}
      className="relative flex-1"
    >
      <label htmlFor="archive-search" className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cloister-stone"
        aria-hidden="true"
      />
      <input
        id="archive-search"
        type="search"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          setValue(next);
          scheduleSubmit(next);
        }}
        placeholder={placeholder}
        className="w-full bg-cream text-iron-gall placeholder:text-cloister-stone font-ui"
        style={{
          border: "1px solid var(--color-border-strong)",
          borderRadius: "var(--radius-subtle)",
          padding: "0.625rem 2.5rem 0.625rem 2.5rem",
          fontSize: "0.875rem",
          outline: "none",
          transition: `border-color var(--duration-quick) var(--ease-quick), box-shadow var(--duration-quick) var(--ease-quick)`,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-illumination)";
          e.currentTarget.style.borderBottomWidth = "2px";
          e.currentTarget.style.boxShadow = "0 1px 0 0 var(--color-illumination)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.borderBottomWidth = "";
          e.currentTarget.style.boxShadow = "";
        }}
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            setValue("");
            onSubmit("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-subtle p-1 text-cloister-stone transition-colors hover:bg-vellum-warm hover:text-iron-gall"
          style={{ transitionDuration: "var(--duration-quick)" }}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </form>
  );
}
