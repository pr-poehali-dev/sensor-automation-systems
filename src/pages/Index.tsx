import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "hero" | "theory" | "examples";

const NAV_ITEMS = [
  { id: "hero" as Section, label: "ГЛАВНАЯ", icon: "Home" },
  { id: "theory" as Section, label: "ТЕОРИЯ", icon: "BookOpen" },
  { id: "examples" as Section, label: "ПРИМЕНЕНИЕ В АПК", icon: "Tractor" },
];

const THEORY_TOPICS = [
  {
    id: 1,
    title: "Что такое датчик?",
    icon: "Cpu",
    color: "neon",
    content:
      "Датчик (сенсор) — устройство, преобразующее физическую величину (температуру, давление, ток, влажность) в электрический сигнал, пригодный для передачи и обработки в системе управления.",
    formula: "U_вых = K · X_вх + U₀",
    formulaNote: "K — коэффициент преобразования, X — входная величина",
  },
  {
    id: 2,
    title: "Принцип действия",
    icon: "Zap",
    color: "amber",
    content:
      "Работа основана на физических эффектах: пьезоэлектрическом, тензорезистивном, индукционном, ёмкостном или оптическом. Выходной сигнал — аналоговый (0–10 В, 4–20 мА) или цифровой (RS-485, CAN, Modbus).",
    formula: "I = 4 + 16 · (X - X_min)/(X_max - X_min)",
    formulaNote: "Стандарт токовой петли 4–20 мА",
  },
  {
    id: 3,
    title: "Классификация",
    icon: "Layers",
    color: "neon",
    content:
      "По принципу действия: резистивные, индуктивные, ёмкостные, пьезоэлектрические, оптические. По виду сигнала: аналоговые и дискретные. По назначению: температуры, давления, тока, напряжения, влажности, уровня.",
    formula: "—",
    formulaNote: "",
  },
  {
    id: 4,
    title: "Метрологические характеристики",
    icon: "Activity",
    color: "amber",
    content:
      "Ключевые параметры: чувствительность, погрешность (±%), диапазон измерений, нелинейность, гистерезис, время отклика. Класс точности определяет допустимую приведённую погрешность.",
    formula: "δ = (ΔX / X_max) · 100%",
    formulaNote: "Приведённая погрешность δ",
  },
  {
    id: 5,
    title: "Роль в системах электроснабжения",
    icon: "Network",
    color: "neon",
    content:
      "В системах электроснабжения АПК датчики контролируют ток нагрузки, напряжение сети, температуру трансформаторов, параметры изоляции. Данные передаются в контроллер (ПЛК) или SCADA-систему для автоматического управления и защиты.",
    formula: "P = U · I · cos φ",
    formulaNote: "Активная мощность через датчики U и I",
  },
  {
    id: 6,
    title: "Интерфейсы передачи данных",
    icon: "Radio",
    color: "amber",
    content:
      "Проводные: Modbus RTU/TCP, HART, PROFIBUS, CAN, RS-485. Беспроводные: LoRa, ZigBee, Wi-Fi, NB-IoT. В АПК широко применяется LoRa из-за большой дальности (до 15 км) и малого энергопотребления.",
    formula: "RSSI = P_tx - L_path",
    formulaNote: "Уровень сигнала в беспроводных системах",
  },
];

const APK_EXAMPLES = [
  {
    id: 1,
    system: "Электроснабжение ферм",
    icon: "Zap",
    color: "#14dcbe",
    sensors: [
      { name: "Датчик тока (ТТ)", param: "0–500 А", signal: "4–20 мА", purpose: "Контроль нагрузки двигателей насосов и вентиляции" },
      { name: "Датчик напряжения (ТН)", param: "0–10 кВ", signal: "0–10 В", purpose: "Мониторинг качества напряжения в распределительной сети" },
      { name: "Датчик температуры (ТС100)", param: "-40…+120 °C", signal: "PT100", purpose: "Защита трансформаторов от перегрева" },
    ],
    description: "Комплексный мониторинг электропараметров животноводческих ферм. Предотвращение аварий и снижение потерь электроэнергии до 18%.",
  },
  {
    id: 2,
    system: "Системы орошения",
    icon: "Droplets",
    color: "#f5c842",
    sensors: [
      { name: "Датчик влажности почвы", param: "0–100%", signal: "RS-485", purpose: "Автоматический запуск полива при снижении влажности" },
      { name: "Датчик давления воды", param: "0–16 бар", signal: "4–20 мА", purpose: "Защита насосов от работы в сухую (кавитация)" },
      { name: "Расходомер (ультразв.)", param: "0–500 м³/ч", signal: "Modbus", purpose: "Учёт потребления воды, экономия ресурсов" },
    ],
    description: "Точное земледелие с управлением поливом по данным датчиков. Экономия воды до 35%, рост урожайности на 20%.",
  },
  {
    id: 3,
    system: "Теплицы и хранилища",
    icon: "Thermometer",
    color: "#14dcbe",
    sensors: [
      { name: "Датчик температуры/влажности (SHT)", param: "-40…+85 °C / 0–100%", signal: "I²C / 4–20 мА", purpose: "Поддержание микроклимата, управление отоплением" },
      { name: "Датчик CO₂", param: "0–5000 ppm", signal: "0–10 В", purpose: "Оптимизация фотосинтеза, вентиляция теплиц" },
      { name: "Пирометр (ИК-датчик)", param: "-50…+300 °C", signal: "4–20 мА", purpose: "Бесконтактный контроль температуры продукции" },
    ],
    description: "Автоматизация микроклимата в хранилищах. Снижение потерь продукции при хранении на 25–40%.",
  },
  {
    id: 4,
    system: "Зернотоки и сушилки",
    icon: "Wind",
    color: "#f5c842",
    sensors: [
      { name: "Датчик влажности зерна", param: "0–35%", signal: "RS-485 Modbus", purpose: "Автоматическое управление сушилкой зерна" },
      { name: "Датчик температуры воздуха", param: "0–200 °C", signal: "ТХА/ТХК", purpose: "Предотвращение пересушивания, пожарная безопасность" },
      { name: "Датчик уровня зерна", param: "0–20 м", signal: "4–20 мА", purpose: "Контроль заполнения силосов и бункеров" },
    ],
    description: "Автоматизированное управление послеуборочной обработкой. Снижение потребления газа на сушку до 15%.",
  },
];

function CircuitDiagram() {
  return (
    <svg viewBox="0 0 400 120" className="w-full h-28 opacity-60" fill="none">
      <line x1="20" y1="60" x2="80" y2="60" stroke="#14dcbe" strokeWidth="1.5" className="circuit-line" />
      <rect x="80" y="44" width="40" height="32" rx="3" stroke="#14dcbe" strokeWidth="1.5" fill="hsl(220 18% 12%)" />
      <text x="100" y="63" textAnchor="middle" fill="#14dcbe" fontSize="8" fontFamily="IBM Plex Mono">SEN</text>
      <line x1="120" y1="60" x2="180" y2="60" stroke="#14dcbe" strokeWidth="1.5" className="circuit-line" />
      <circle cx="180" cy="60" r="4" fill="#f5c842" className="pulse-dot" />
      <line x1="184" y1="60" x2="240" y2="60" stroke="#f5c842" strokeWidth="1.5" className="circuit-line" />
      <rect x="240" y="44" width="40" height="32" rx="3" stroke="#f5c842" strokeWidth="1.5" fill="hsl(220 18% 12%)" />
      <text x="260" y="63" textAnchor="middle" fill="#f5c842" fontSize="8" fontFamily="IBM Plex Mono">ADC</text>
      <line x1="280" y1="60" x2="340" y2="60" stroke="#14dcbe" strokeWidth="1.5" className="circuit-line" />
      <rect x="340" y="44" width="40" height="32" rx="3" stroke="#14dcbe" strokeWidth="1.5" fill="hsl(220 18% 12%)" />
      <text x="360" y="63" textAnchor="middle" fill="#14dcbe" fontSize="8" fontFamily="IBM Plex Mono">ПЛК</text>
      <text x="100" y="30" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="7" fontFamily="IBM Plex Mono">Датчик</text>
      <text x="260" y="30" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="7" fontFamily="IBM Plex Mono">АЦП</text>
      <text x="360" y="30" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="7" fontFamily="IBM Plex Mono">Контроллер</text>
      <path d="M 184 56 L 184 20 L 260 20" stroke="#f5c842" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="222" y="15" textAnchor="middle" fill="hsl(220 10% 50%)" fontSize="6" fontFamily="IBM Plex Mono">4–20мА / RS-485</text>
    </svg>
  );
}

function SignalChart({ color }: { color: string }) {
  const heights = [20, 45, 35, 70, 55, 80, 60, 75, 40, 85, 50, 65];
  return (
    <div className="flex items-end gap-0.5 h-10">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm signal-bar"
          style={{
            height: `${h}%`,
            background: color,
            opacity: 0.7,
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${1.2 + (i % 3) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${active ? "bg-neon pulse-dot" : "bg-red-500"}`}
      style={{ boxShadow: active ? "0 0 8px #14dcbe" : "0 0 8px #ef4444" }}
    />
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [activeTopic, setActiveTopic] = useState<number>(1);
  const [activeExample, setActiveExample] = useState<number>(1);

  const currentTopic = THEORY_TOPICS.find((t) => t.id === activeTopic)!;
  const currentExample = APK_EXAMPLES.find((e) => e.id === activeExample)!;

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
        {/* HERO */}
        {activeSection === "hero" && (
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
        )}

        {/* THEORY */}
        {activeSection === "theory" && (
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
                    onClick={() => setActiveTopic((p) => Math.max(1, p - 1))}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded text-sm font-display tracking-wide hover:border-neon/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Icon name="ChevronLeft" size={14} /> НАЗАД
                  </button>
                  <button
                    disabled={activeTopic === THEORY_TOPICS.length}
                    onClick={() => setActiveTopic((p) => Math.min(THEORY_TOPICS.length, p + 1))}
                    className="flex items-center gap-2 px-4 py-2 bg-neon text-primary-foreground rounded text-sm font-display tracking-wide hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ boxShadow: "0 0 16px hsl(174 72% 48% / 0.3)" }}
                  >
                    ДАЛЕЕ <Icon name="ChevronRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EXAMPLES */}
        {activeSection === "examples" && (
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
