import Icon from "@/components/ui/icon";
import { THEORY_TOPICS } from "./data";
import { SignalChart } from "./shared";

interface TheorySectionProps {
  activeTopic: number;
  setActiveTopic: (id: number) => void;
}

export default function TheorySection({ activeTopic, setActiveTopic }: TheorySectionProps) {
  const currentTopic = THEORY_TOPICS.find((t) => t.id === activeTopic)!;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="font-mono text-xs text-muted-foreground mb-1">// MODULE: THEORY_BASE</div>
        <h2 className="font-display text-3xl font-bold neon-text tracking-wide">ТЕОРЕТИЧЕСКИЕ ОСНОВЫ</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Принципы работы сенсоров и датчиков в системах управления электроснабжением
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Topic list */}
        <div className="space-y-2">
          <div className="font-mono text-xs amber-text mb-3 tracking-widest">РАЗДЕЛЫ</div>
          {THEORY_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`w-full text-left p-3 rounded border transition-all duration-200 ${
                activeTopic === topic.id
                  ? "border-neon/60 bg-neon/10 neon-text"
                  : "border-border bg-card hover:border-border/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  name={topic.icon}
                  size={14}
                  className={activeTopic === topic.id ? "text-neon" : "text-muted-foreground"}
                />
                <span className="font-display text-sm tracking-wide">{topic.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Topic detail */}
        <div className="md:col-span-2 space-y-4">
          <div className="glass-card rounded p-5 scan-line" key={activeTopic}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ background: "#14dcbe20", border: "1px solid #14dcbe40" }}
              >
                <Icon name={currentTopic.icon} size={20} className="text-neon" />
              </div>
              <div>
                <div className="font-mono text-xs text-muted-foreground">ТЕМА {currentTopic.id}/6</div>
                <h3 className="font-display text-xl font-bold neon-text tracking-wide">{currentTopic.title}</h3>
              </div>
            </div>

            <p className="text-foreground/90 text-sm leading-relaxed mb-5">{currentTopic.content}</p>

            {currentTopic.formula !== "—" && (
              <div className="bg-muted/60 border border-border rounded p-4">
                <div className="font-mono text-xs text-muted-foreground mb-2">ФОРМУЛА</div>
                <div className="font-mono text-base amber-text font-semibold">{currentTopic.formula}</div>
                {currentTopic.formulaNote && (
                  <div className="text-muted-foreground text-xs mt-1">{currentTopic.formulaNote}</div>
                )}
              </div>
            )}
          </div>

          {/* Signal visualization */}
          <div className="glass-card rounded p-4">
            <div className="font-mono text-xs text-muted-foreground mb-3">ВИЗУАЛИЗАЦИЯ СИГНАЛА</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-xs mb-2" style={{ color: "#14dcbe" }}>
                  АНАЛОГОВЫЙ (4–20 мА)
                </div>
                <SignalChart color="#14dcbe" />
              </div>
              <div>
                <div className="font-mono text-xs mb-2" style={{ color: "#f5c842" }}>
                  ЦИФРОВОЙ (RS-485)
                </div>
                <div className="flex items-end gap-0.5 h-10">
                  {[1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1].map((bit, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all"
                      style={{
                        height: bit ? "80%" : "15%",
                        background: "#f5c842",
                        opacity: 0.75,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              disabled={activeTopic === 1}
              onClick={() => setActiveTopic(Math.max(1, activeTopic - 1))}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded text-sm font-display tracking-wide hover:border-neon/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeft" size={14} /> НАЗАД
            </button>
            <button
              disabled={activeTopic === THEORY_TOPICS.length}
              onClick={() => setActiveTopic(Math.min(THEORY_TOPICS.length, activeTopic + 1))}
              className="flex items-center gap-2 px-4 py-2 bg-neon text-primary-foreground rounded text-sm font-display tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 16px hsl(174 72% 48% / 0.3)" }}
            >
              ДАЛЕЕ <Icon name="ChevronRight" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
