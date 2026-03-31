import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "@/components/sensor/data";
import { StatusDot } from "@/components/sensor/shared";
import HeroSection from "@/components/sensor/HeroSection";
import TheorySection from "@/components/sensor/TheorySection";
import ExamplesSection from "@/components/sensor/ExamplesSection";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [activeTopic, setActiveTopic] = useState<number>(1);
  const [activeExample, setActiveExample] = useState<number>(1);

  return (
    <div className="min-h-screen font-sans">
      {/* Top status bar */}
      <div className="border-b border-border bg-card/50 px-4 py-1.5 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="neon-text font-semibold">SENSOR_APK v2.4</span>
          <span className="flex items-center gap-1.5">
            <StatusDot /> СИСТЕМА АКТИВНА
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <StatusDot /> MODBUS: ONLINE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block">КАНАЛ: RS-485 / LoRa</span>
          <span className="amber-text blink">■</span>
          <span>31.03.2026</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 py-0">
          <div className="mr-4 py-3 pr-4 border-r border-border">
            <span className="font-display text-lg font-bold neon-text tracking-widest">⚡ АПК</span>
          </div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium font-display tracking-wider transition-all duration-200 border-b-2 ${
                activeSection === item.id
                  ? "border-neon neon-text"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <Icon name={item.icon} size={14} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeSection === "hero" && (
          <HeroSection
            setActiveSection={setActiveSection}
            setActiveTopic={setActiveTopic}
          />
        )}
        {activeSection === "theory" && (
          <TheorySection
            activeTopic={activeTopic}
            setActiveTopic={setActiveTopic}
          />
        )}
        {activeSection === "examples" && (
          <ExamplesSection
            activeExample={activeExample}
            setActiveExample={setActiveExample}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>SENSOR_APK EDUCATION PLATFORM © 2026</span>
          <span className="flex items-center gap-2">
            <StatusDot /> ALL SYSTEMS NOMINAL
          </span>
        </div>
      </footer>
    </div>
  );
}
