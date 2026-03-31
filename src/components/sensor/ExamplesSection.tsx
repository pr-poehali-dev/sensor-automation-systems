import Icon from "@/components/ui/icon";
import { APK_EXAMPLES } from "./data";
import { StatusDot } from "./shared";

interface ExamplesSectionProps {
  activeExample: number;
  setActiveExample: (id: number) => void;
}

export default function ExamplesSection({ activeExample, setActiveExample }: ExamplesSectionProps) {
  const currentExample = APK_EXAMPLES.find((e) => e.id === activeExample)!;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="font-mono text-xs text-muted-foreground mb-1">// MODULE: APK_APPLICATIONS</div>
        <h2 className="font-display text-3xl font-bold amber-text tracking-wide">ПРИМЕНЕНИЕ В АПК</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Реальные примеры использования датчиков в агропромышленных системах электроснабжения
        </p>
      </div>

      {/* System selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {APK_EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActiveExample(ex.id)}
            className={`p-3 rounded border text-left transition-all duration-200 ${
              activeExample === ex.id
                ? "border-amber-glow/60 bg-amber-glow/10"
                : "border-border bg-card hover:border-border/80"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon
                name={ex.icon}
                size={14}
                style={{ color: activeExample === ex.id ? ex.color : "#6b7280" }}
              />
              <span
                className={`font-display text-xs tracking-wide ${
                  activeExample === ex.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {ex.system}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Example detail */}
      <div className="grid md:grid-cols-5 gap-5">
        <div className="md:col-span-2 glass-card rounded p-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded flex items-center justify-center"
              style={{ background: `${currentExample.color}20`, border: `1px solid ${currentExample.color}40` }}
            >
              <Icon name={currentExample.icon} size={24} style={{ color: currentExample.color }} />
            </div>
            <div>
              <div className="font-mono text-xs text-muted-foreground">СИСТЕМА</div>
              <h3
                className="font-display text-lg font-bold tracking-wide"
                style={{ color: currentExample.color }}
              >
                {currentExample.system}
              </h3>
            </div>
          </div>
          <p className="text-foreground/85 text-sm leading-relaxed mb-4">{currentExample.description}</p>

          {/* Signal monitor */}
          <div className="bg-muted/40 border border-border rounded p-3">
            <div className="font-mono text-xs text-muted-foreground mb-2">МОНИТОРИНГ СИГНАЛОВ</div>
            <div className="space-y-2">
              {currentExample.sensors.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground truncate flex-1">
                    {s.name.split(" (")[0]}
                  </span>
                  <div className="flex items-center gap-1.5 ml-2">
                    <StatusDot />
                    <span className="font-mono text-[10px]" style={{ color: currentExample.color }}>
                      {s.signal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sensor table */}
        <div className="md:col-span-3 space-y-3">
          <div className="font-mono text-xs amber-text tracking-widest mb-3">ПРИМЕНЯЕМЫЕ ДАТЧИКИ</div>
          {currentExample.sensors.map((sensor, i) => (
            <div
              key={i}
              className="glass-card rounded p-4 animate-slide-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-display text-sm font-semibold tracking-wide" style={{ color: currentExample.color }}>
                  {sensor.name}
                </h4>
                <div className="flex gap-2 flex-shrink-0">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted border border-border text-muted-foreground">
                    {sensor.param}
                  </span>
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{
                      borderColor: `${currentExample.color}60`,
                      color: currentExample.color,
                      background: `${currentExample.color}15`,
                    }}
                  >
                    {sensor.signal}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{sensor.purpose}</p>
            </div>
          ))}

          {/* Efficiency block */}
          <div className="border border-dashed border-neon/30 rounded p-4 bg-neon/5">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrendingUp" size={14} className="text-neon" />
              <span className="font-mono text-xs neon-text">ЭФФЕКТ ВНЕДРЕНИЯ</span>
            </div>
            <p className="text-foreground/80 text-xs leading-relaxed">{currentExample.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
