"use client";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { AnalyzeTab, HistoryTab, WatchlistTab, CompareTab } from "@/components/tabs";
import { useHistory } from "@/hooks/useHistory";
import { useWatchlist } from "@/hooks/useWatchlist";


export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [loadedEntry, setLoadedEntry] = useState(null);
  const { history } = useHistory();
  const { watchlist } = useWatchlist();

  const handleLoadHistory = (entry: HistoryEntry) => {
    setLoadedEntry(entry);
    setActiveTab(0);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        historyCount={history.length}
        watchlistCount={watchlist.length}
      />
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "26px 20px" }}>
        {activeTab === 0 && <AnalyzeTab key={loadedEntry?.id} />}
        {activeTab === 1 && <HistoryTab onLoad={handleLoadHistory} />}
        {activeTab === 2 && <WatchlistTab />}
        {activeTab === 3 && <CompareTab />}
      </main>
    </div>
  );
}
