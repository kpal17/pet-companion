import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import imgVet from "./pets-at-vet.png";
import imgHero from "./landing.jpg";
import imgAnimals from "./multiple-pets.jpg";
import imgLogo from "./00e9533793b01d90c34b50db08b84853998152cb.png";

type IconName =
  | "calendar"
  | "heart"
  | "medical"
  | "pets"
  | "shield"
  | "sparkles"
  | "users";

const iconPaths: Record<IconName, React.ReactNode> = {
  calendar: (
    <>
      <path d="M7 3v3M17 3v3M4 9h16" />
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="m8 15 2 2 5-5" />
    </>
  ),
  heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 22l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  medical: (
    <>
      <path d="M9 3h6l1 3h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1-3Z" />
      <path d="M12 10v7M8.5 13.5h7" />
    </>
  ),
  pets: (
    <>
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="17" cy="7" r="2.2" />
      <circle cx="4.5" cy="12.5" r="2" />
      <circle cx="19.5" cy="12.5" r="2" />
      <path d="M8 13.5c1.8-2.2 6.2-2.2 8 0 2.8 3.5.7 7.5-4 7.5s-6.8-4-4-7.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.4c0 4.8 3.1 8.6 7.5 10.1 4.4-1.5 7.5-5.3 7.5-10.1V6L12 3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
      <path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
      <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2.5 21a6.5 6.5 0 0 1 13 0M16 4.5a4 4 0 0 1 0 7M17 15a6 6 0 0 1 4.5 5.8" />
    </>
  ),
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name]}
      </g>
    </svg>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="landing-nav">
      <div className="landing-container landing-nav__inner">
        <button className="landing-brand" type="button" onClick={() => scrollTo("top")}>
          <img src={imgLogo} alt="" />
          <span>Pet Companion</span>
        </button>
        <nav className="landing-nav__links" aria-label="Nawigacja strony głównej">
          <button type="button" onClick={() => scrollTo("features")}>Możliwości</button>
          <button type="button" onClick={() => scrollTo("how-it-works")}>Jak to działa</button>
          <button type="button" onClick={() => scrollTo("vet")}>Dla weterynarzy</button>
        </nav>
        <div className="landing-nav__actions">
          <button className="landing-button landing-button--quiet" type="button" onClick={() => navigate("/logowanie")}>
            Zaloguj się
          </button>
          <button className="landing-button landing-button--primary landing-nav__register" type="button" onClick={() => navigate("/rejestracja")}>
            Załóż konto
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="landing-hero landing-container" id="top">
      <div className="landing-hero__copy">
        <div className="landing-eyebrow">
          <span><Icon name="sparkles" /></span>
          Zdrowie pupila zawsze pod ręką
        </div>
        <h1>Spokojniejsza opieka zaczyna się od <em>dobrego planu.</em></h1>
        <p>
          Pet Companion porządkuje historię zdrowia, wizyty i codzienne obowiązki
          każdego pupila. Wszystko w jednym miejscu, gotowe wtedy, gdy naprawdę
          tego potrzebujesz.
        </p>
        <div className="landing-hero__actions">
          <button className="landing-button landing-button--primary landing-button--large" type="button" onClick={() => navigate("/rejestracja")}>
            Zacznij bezpłatnie
            <span aria-hidden="true">→</span>
          </button>
          <button className="landing-button landing-button--soft landing-button--large" type="button" onClick={() => scrollTo("features")}>
            Poznaj możliwości
          </button>
        </div>
        <div className="landing-hero__trust">
          <span><Icon name="shield" /></span>
          <p><strong>Twoje dane, Twoja kontrola.</strong> Ty decydujesz, komu i na jak długo udostępniasz kartotekę.</p>
        </div>
      </div>

      <div className="landing-hero__visual">
        <div className="landing-hero__shape" aria-hidden="true" />
        <img src={imgHero} alt="Pies i kot odpoczywający razem" />
        <div className="hero-status-card">
          <div className="hero-status-card__icon"><Icon name="calendar" /></div>
          <div>
            <span>Najbliższe zadanie</span>
            <strong>Szczepienie przypominające</strong>
            <small>Leo · jutro, 10:30</small>
          </div>
          <i>✓</i>
        </div>
        <div className="hero-pets-card">
          <div className="hero-pets-card__avatars">
            <span>L</span><span>B</span><span>+</span>
          </div>
          <strong>Wszystkie profile razem</strong>
          <small>Bez przełączania między notatkami</small>
        </div>
      </div>
    </section>
  );
}

const features: Array<{ icon: IconName; title: string; text: string; tone: string }> = [
  {
    icon: "medical",
    title: "Cyfrowa kartoteka",
    text: "Wizyty, rozpoznania, zalecenia, leki i dokumenty tworzą uporządkowaną historię zdrowia.",
    tone: "rose",
  },
  {
    icon: "calendar",
    title: "Planer opieki",
    text: "Zaplanuj szczepienia, kontrole, podawanie leków i codzienne zadania dla każdego pupila.",
    tone: "yellow",
  },
  {
    icon: "pets",
    title: "Wiele profili",
    text: "Pies, kot, królik czy papuga: każdy otrzymuje własny profil i indywidualny plan opieki.",
    tone: "lavender",
  },
  {
    icon: "heart",
    title: "Ważne informacje",
    text: "Alergie, choroby przewlekłe, masa ciała i kontakty alarmowe są łatwe do odnalezienia.",
    tone: "peach",
  },
  {
    icon: "users",
    title: "Współpraca z lecznicą",
    text: "Przekaż weterynarzowi dostęp do wybranej kartoteki bez udostępniania całego konta.",
    tone: "blue",
  },
  {
    icon: "shield",
    title: "Bezpieczny dostęp",
    text: "Kody czasowe i możliwość cofnięcia dostępu dają Ci pełną kontrolę nad danymi pupila.",
    tone: "green",
  },
];

function FeaturesSection() {
  return (
    <section className="landing-features" id="features">
      <div className="landing-container">
        <div className="landing-section-heading">
          <span>Wszystko, czego potrzebujesz</span>
          <h2>Jedno miejsce dla całej opieki</h2>
          <p>Od pierwszego profilu po kolejną wizytę w gabinecie. Pet Companion pomaga pamiętać, porządkować i działać na czas.</p>
        </div>
        <div className="landing-features__grid">
          {features.map((feature) => (
            <article className="landing-feature-card" key={feature.title}>
              <div className={`landing-feature-card__icon landing-feature-card__icon--${feature.tone}`}>
                <Icon name={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const navigate = useNavigate();
  const steps = [
    ["01", "Dodaj pupila", "Uzupełnij podstawowe informacje, zdjęcie i najważniejsze dane zdrowotne."],
    ["02", "Zbuduj historię", "Dodawaj wizyty, dokumenty oraz zadania. Wszystko układa się w czytelną oś czasu."],
    ["03", "Dziel się bezpiecznie", "Gdy trzeba, wygeneruj kod i udostępnij kartotekę wybranemu weterynarzowi."],
  ];

  return (
    <section className="landing-how landing-container" id="how-it-works">
      <div className="landing-how__image">
        <div className="landing-how__image-frame">
          <img src={imgAnimals} alt="Różne gatunki zwierząt domowych" />
        </div>
        <div className="landing-how__badge"><strong>1 konto</strong><span>dla wszystkich pupili</span></div>
      </div>
      <div className="landing-how__copy">
        <div className="landing-section-heading landing-section-heading--left">
          <span>Proste od pierwszego dnia</span>
          <h2>Ty znasz swojego pupila. My pomagamy ogarnąć resztę.</h2>
        </div>
        <div className="landing-steps">
          {steps.map(([number, title, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
        <button className="landing-text-link" type="button" onClick={() => navigate("/rejestracja")}>
          Utwórz pierwszy profil <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function VetSection() {
  const navigate = useNavigate();

  return (
    <section className="landing-vet" id="vet">
      <div className="landing-container landing-vet__inner">
        <div className="landing-vet__copy">
          <div className="landing-vet__label"><Icon name="medical" /> Pet Companion VET</div>
          <h2>Pełniejszy obraz pacjenta jeszcze przed wizytą</h2>
          <p>
            Osobny portal dla lekarzy weterynarii łączy gabinet z kartoteką
            udostępnioną przez opiekuna. Bez szukania zdjęć dokumentów w telefonie
            i bez dostępu do danych pozostałych zwierząt.
          </p>
          <ul>
            <li><span>✓</span> Realizacja bezpiecznego kodu dostępu</li>
            <li><span>✓</span> Historia pacjenta i najważniejsze dane medyczne</li>
            <li><span>✓</span> Kalendarz, lista pacjentów i dokumentacja wizyt</li>
          </ul>
          <div className="landing-vet__actions">
            <button className="landing-button landing-button--white landing-button--large" type="button" onClick={() => navigate("/vet/logowanie")}>
              Przejdź do VET <span aria-hidden="true">→</span>
            </button>
            <button className="landing-button landing-button--vet-outline landing-button--large" type="button" onClick={() => navigate("/vet/rejestracja")}>
              Załóż konto gabinetu
            </button>
          </div>
        </div>
        <div className="landing-vet__visual">
          <div className="landing-vet__photo">
            <img src={imgVet} alt="Lekarze weterynarii z psim i kocim pacjentem" />
          </div>
          <div className="vet-preview-card">
            <div className="vet-preview-card__top"><span><Icon name="medical" /></span><small>Kartoteka pacjenta</small></div>
            <strong>Leo</strong>
            <p>Pies · 4 lata · 18,6 kg</p>
            <div><span>Ostatnia wizyta</span><b>Kontrola ogólna</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const navigate = useNavigate();

  return (
    <section className="landing-cta landing-container">
      <div className="landing-cta__inner">
        <span className="landing-cta__paw"><Icon name="pets" /></span>
        <div>
          <h2>Mniej pamiętania. Więcej dobrych chwil razem.</h2>
          <p>Załóż konto i stwórz spokojniejszy plan opieki dla swojego pupila.</p>
        </div>
        <button className="landing-button landing-button--primary landing-button--large" type="button" onClick={() => navigate("/rejestracja")}>
          Zacznij bezpłatnie <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer__inner">
        <div className="landing-footer__brand">
          <img src={imgLogo} alt="" />
          <div><strong>Pet Companion</strong><span>Z troską o każdą łapkę.</span></div>
        </div>
        <div className="landing-footer__links">
          <button type="button" onClick={() => scrollTo("features")}>Możliwości</button>
          <button type="button" onClick={() => scrollTo("vet")}>Pet Companion VET</button>
        </div>
        <small>© 2026 Pet Companion</small>
      </div>
    </footer>
  );
}

export default function Main() {
  return (
    <div className="page-landing">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <VetSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
