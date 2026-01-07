"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { coreAPI } from "../../../../lib/coreAPI";
export default function TextSummarize() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, logout }: any = useAuth()!;
  const router = useRouter();
  console.log("users", user);
  const handleSummarize = async () => {
    try {
      setLoading(true);
      const response = await coreAPI.post("/api/text/text_summary", { text });
      setSummary(response.data.Summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
      />
    );
  }
  return (
    <>
      <div className="absolute top-4 right-4 rounded-md p-2">
        <button className="cursor-pointer" onClick={logout}>
          <LogOut className="text-white" />
        </button>
      </div>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black px-4">
        <div
          className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col gap-8"
          style={{ padding: "20px" }}
        >
          {/* Title */}
          <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Text Summarize AI
            {user?.username && (
              <span className="block text-sm font-medium text-indigo-300 mt-1">
                Welcome, {user.username}
              </span>
            )}
          </h1>

          {/* Textarea */}
          <Textarea
            placeholder="Paste or type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ padding: "20px" }}
            className="min-h-[160px] resize-none rounded-xl border border-white/20 bg-black/40 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 p-4"
          />

          {/* Button */}
          <Button
            size="lg"
            onClick={handleSummarize}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-indigo-500/40 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </Button>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}

          {/* Summary Output */}
          {summary && !loading && (
            <div
              style={{ padding: "20px" }}
              className="rounded-xl bg-indigo-500/10 border border-indigo-400/20 p-6 text-gray-200 leading-relaxed text-justify"
            >
              <h3 className="mb-2 text-sm font-semibold text-indigo-300 uppercase tracking-wide">
                Summary Result
              </h3>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
