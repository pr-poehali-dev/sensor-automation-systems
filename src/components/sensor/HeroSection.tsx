import Icon from "@/components/ui/icon";
import { Section, THEORY_TOPICS } from "./data";
import { CircuitDiagram, StatusDot } from "./shared";

interface HeroSectionProps {
  setActiveSection: (s: Section) => void;
  setActiveTopic: (id: number) => void;
}

export default function HeroSection({ setActiveSection, setActiveTopic }: HeroSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8 relative">
        <div className="absolute -top-2 left-0 font-mono text-xs text-muted-foreground">
          // MODULE_INIT :: SENSORS_AND_CONTROLLERS
        </div>
        <div className="pt-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="font-mono text-xs amber-text mb-2 tracking-widest">ОБРАЗОВАТЕЛЬНАЯ ПЛАТФОРМА</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              СЕНСОРЫ И<br />
              <span className="neon-text">ДАТЧИКИ</span>
              <br />В СИСТЕМАХ АПК
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              Роль сенсоров и датчиков в автоматизации и контроле систем электроснабжения.
              Основные принципы работы. Реальные примеры применения в агропромышленном комплексе.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setActiveSection("theory")}
                className="px-5 py-2.5 bg-neon text-primary-foreground font-display font-semibold tracking-wider text-sm rounded hover:opacity-90 transition-opacity"
                style={{ boxShadow: "0 0 20px hsl(174 72% 48% / 0.4)" }}
              >
                ТЕОРИЯ →
              </button>
              <button
                onClick={() => setActiveSection("examples")}
                className="px-5 py-2.5 border border-border text-foreground font-display font-semibold tracking-wider text-sm rounded hover:border-neon/50 transition-colors"
              >
                ПРИМЕРЫ АПК
              </button>
            </div>
          </div>

          {/* Circuit diagram */}
          <div className="glass-card rounded p-4 scan-line">
            <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center justify-between">
              <span>СТРУКТУРНАЯ СХЕМА: ДАТЧИК → ПЛК</span>
              <StatusDot />
            </div>
            <CircuitDiagram />
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { label: "СИГНАЛ", value: "4–20 мА", c: "neon" },
                { label: "ПРОТОКОЛ", value: "Modbus RTU", c: "amber" },
                { label: "ТОЧНОСТЬ", value: "±0.5%", c: "neon" },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded p-2">
                  <div className="text-muted-foreground text-[10px]">{item.label}</div>
                  <div className={item.c === "neon" ? "neon-text font-semibold" : "amber-text font-semibold"}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Типов датчиков", value: "50+", icon: "Cpu", color: "#14dcbe" },
          { label: "Разделов теории", value: "6", icon: "BookOpen", color: "#f5c842" },
          { label: "Примеров в АПК", value: "4", icon: "Tractor", color: "#14dcbe" },
          { label: "Стандартов связи", value: "8+", icon: "Radio", color: "#f5c842" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
            >
              <Icon name={stat.icon} size={18} style={{ color: stat.color }} />
            </div>
            <div>
              <div
                className="font-display text-2xl font-bold"
                style={{ color: stat.color, textShadow: `0 0 12px ${stat.color}60` }}
              >
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick topics */}
      <div className="grid md:grid-cols-3 gap-4">
        {THEORY_TOPICS.slice(0, 3).map((topic) => (
          <button
            key={topic.id}
            onClick={() => {
              setActiveTopic(topic.id);
              setActiveSection("theory");
            }}
            className="glass-card rounded p-4 text-left hover:border-neon/40 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon
                name={topic.icon}
                size={16}
                className={topic.color === "neon" ? "text-neon" : "text-amber-glow"}
              />
              <span className="font-display text-sm font-semibold tracking-wide">{topic.title}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{topic.content}</p>
            <div className="mt-3 font-mono text-xs bg-muted/50 rounded px-2 py-1 inline-block opacity-70">
              {topic.formula}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
