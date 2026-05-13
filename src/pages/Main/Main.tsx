import svgPaths from "./svg-pwuchm5klk.ts";
import imgMedicalDashboard from "./d572a38628d70d45fb50fce0ac77c75b8c9996d3.png";
import imgHappyPets from "./326f839bfe14561b9a66ff807b7864acac95afb8.png";
import imgPetCompanionLogo from "./00e9533793b01d90c34b50db08b84853998152cb.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[30px] justify-center leading-[0] relative shrink-0 text-[#161a32] text-[24px] text-center tracking-[-0.24px] w-[306.7px]">
        <p className="leading-[30px]">Pełna opieka, uproszczona</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[672px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[96px] justify-center leading-[0] relative shrink-0 text-[#4f4448] text-[16px] text-center w-[318.11px]">
        <p className="leading-[24px] mb-0">Jeden zorganizowany dom dla wszystkich</p>
        <p className="leading-[24px] mb-0">niezbędnych informacji o zdrowiu Twojego</p>
        <p className="leading-[24px] mb-0">zwierzaka, zaprojektowany z miłością dla</p>
        <p className="leading-[24px]">nowoczesnych opiekunów.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2cccbbb0} fill="var(--fill-0, #795465)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f8c8dc] content-stretch flex items-center justify-center relative rounded-[16px] shrink-0 size-[48px]" data-name="Background">
      <Container5 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] relative shrink-0 text-[#161a32] text-[20px] w-[270.88px]">
        <p className="leading-[26px]">Cyfrowa książeczka zdrowia</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[144px] justify-center leading-[0] relative shrink-0 text-[#4f4448] text-[16px] w-[280.13px]">
        <p className="leading-[24px] mb-0">Uzyskaj dostęp do pełnej historii</p>
        <p className="leading-[24px] mb-0">medycznej swojego zwierzaka, alergii</p>
        <p className="leading-[24px] mb-0">i planów leczenia w bezpiecznym</p>
        <p className="leading-[24px] mb-0">cyfrowym skarbcu. Koniec z</p>
        <p className="leading-[24px] mb-0">zagubionymi papierowymi</p>
        <p className="leading-[24px]">dokumentami.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Background />
        <Heading2 />
        <Container6 />
      </div>
    </div>
  );
}

function MedicalDashboard() {
  return (
    <div className="max-w-[284px] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[252px]" data-name="Medical dashboard">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        <img alt="" className="absolute left-[-6.35%] max-w-none size-[112.7%] top-[-6.35%]" src={imgMedicalDashboard} />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[16px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <MedicalDashboard />
      </div>
    </div>
  );
}

function Feature() {
  return (
    <div className="bg-white col-1 drop-shadow-[0px_4px_7.5px_rgba(248,200,220,0.05)] justify-self-stretch relative rounded-[32px] row-1 self-start shrink-0" data-name="Feature 1">
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center p-[33px] relative size-full">
          <Container4 />
          <Background1 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20.05px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20.05">
        <g id="Container">
          <path d={svgPaths.p3f50100} fill="var(--fill-0, #795465)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[16px] shrink-0 size-[48px]" data-name="Background+Shadow">
      <Container8 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#161a32] text-[20px] w-full">
        <p className="leading-[26px]">Inteligentne przypomnienia</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#4f4448] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Automatyczne powiadomienia o</p>
        <p className="leading-[24px] mb-0">szczepieniach, comiesięcznych</p>
        <p className="leading-[24px] mb-0">kuracjach przeciw pchłom i</p>
        <p className="leading-[24px] mb-0">nadchodzących wizytach</p>
        <p className="leading-[24px] mb-0">kontrolnych, dzięki czemu nigdy</p>
        <p className="leading-[24px]">niczego nie przegapisz.</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <BackgroundShadow />
        <Heading3 />
        <Container9 />
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-8px] relative shrink-0 size-[32px]" data-name="Margin">
      <div className="bg-[#ffdf96] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[32px]" data-name="Margin">
      <div className="bg-[#dde1ff] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <div className="bg-[#ffd8e7] mr-[-8px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background+Border">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
        </div>
        <Margin1 />
        <Margin2 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[17px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(248,200,220,0.4)] border-solid border-t inset-0 pointer-events-none" />
      <Container10 />
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[32px] relative size-full">
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Feature1() {
  return (
    <div className="bg-[rgba(248,200,220,0.2)] col-1 justify-self-stretch relative rounded-[32px] row-2 self-start shrink-0" data-name="Feature 2">
      <div aria-hidden="true" className="absolute border border-[rgba(248,200,220,0.3)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col items-start justify-between p-[33px] relative size-full">
        <Container7 />
        <Margin />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p2b729200} fill="var(--fill-0, #3856BF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 size-[48px]" data-name="Background+Shadow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#161a32] text-[20px] w-full">
          <p className="leading-[26px]">Współpraca z weterynarzem</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#4f4448] text-[16px] w-full">
          <p className="leading-[24px] mb-0">Błyskawicznie udostępniaj</p>
          <p className="leading-[24px] mb-0">dokumentację weterynarzowi lub</p>
          <p className="leading-[24px] mb-0">opiekunowi zwierząt. Przyznaj</p>
          <p className="leading-[24px] mb-0">tymczasowy dostęp, aby zapewnić</p>
          <p className="leading-[24px]">płynną opiekę, gdy Cię nie ma.</p>
        </div>
      </div>
    </div>
  );
}

function Feature2() {
  return (
    <div className="bg-[rgba(118,146,255,0.1)] col-1 justify-self-stretch relative rounded-[32px] row-3 self-start shrink-0" data-name="Feature 3">
      <div aria-hidden="true" className="absolute border border-[rgba(118,146,255,0.2)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[33px] relative size-full">
        <BackgroundShadow1 />
        <Heading4 />
        <Container12 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] relative shrink-0 text-[#161a32] text-[20px] w-[222.48px]">
        <p className="leading-[26px]">Obsługa wielu zwierząt</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[120px] justify-center leading-[0] relative shrink-0 text-[#4f4448] text-[16px] w-[258.91px]">
        <p className="leading-[24px] mb-0">Niezależnie od tego, czy masz</p>
        <p className="leading-[24px] mb-0">jednego chomika, czy dom pełen</p>
        <p className="leading-[24px] mb-0">dogów niemieckich, zarządzaj</p>
        <p className="leading-[24px] mb-0">każdym profilem z indywidualnymi</p>
        <p className="leading-[24px]">planami opieki i harmonogramami.</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-[258.91px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Heading5 />
        <Container14 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-[30px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 28.5">
        <g id="Container">
          <path d={svgPaths.p2fc2f800} fill="var(--fill-0, #F8C8DC)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-white col-1 content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex h-[96px] items-center justify-center justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Background+Shadow">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[30.75px] relative shrink-0 w-[28.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.5 30.75">
        <g id="Container">
          <path d={svgPaths.p22859b80} fill="var(--fill-0, #F6D176)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="bg-white col-2 content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex h-[96px] items-center justify-center justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Background+Shadow">
      <Container17 />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_96px] relative size-full">
        <BackgroundShadow2 />
        <BackgroundShadow3 />
      </div>
    </div>
  );
}

function Feature3() {
  return (
    <div className="bg-[rgba(246,209,118,0.1)] col-1 justify-self-stretch relative rounded-[32px] row-4 self-start shrink-0" data-name="Feature 4">
      <div aria-hidden="true" className="absolute border border-[rgba(246,209,118,0.2)] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center p-[33px] relative size-full">
          <Container13 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[____636px_401px_296px_352px] relative shrink-0 w-full" data-name="Container">
      <Feature />
      <Feature1 />
      <Feature2 />
      <Feature3 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}

function SectionFeaturesBentoGrid() {
  return (
    <div className="absolute bg-[rgba(244,242,255,0.5)] content-stretch flex flex-col items-start left-0 px-[20px] py-[32px] right-0 top-[964px]" data-name="Section - Features Bento Grid">
      <Container />
    </div>
  );
}

function HappyPets() {
  return (
    <div className="aspect-[334/334] relative shrink-0 w-full" data-name="Happy pets">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHappyPets} />
      </div>
    </div>
  );
}

function OverlayBorderShadow() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[40px] shrink-0 w-full" data-name="Overlay+Border+Shadow">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[inherit] size-full">
        <HappyPets />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-solid border-white inset-0 pointer-events-none rounded-[40px] shadow-[0px_25px_50px_-12px_rgba(121,84,101,0.1)]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-center shrink-0" data-name="Container">
      <div className="absolute bg-[rgba(248,200,220,0.4)] blur-[32px] right-[-40px] rounded-[9999px] size-[256px] top-[-40px]" data-name="Overlay+Blur" />
      <div className="absolute bg-[rgba(246,209,118,0.3)] blur-[32px] bottom-[-40px] left-[-40px] rounded-[9999px] size-[288px]" data-name="Overlay+Blur" />
      <OverlayBorderShadow />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#161a32] text-[30px] tracking-[-0.6px] w-full">
        <p className="leading-[38px] whitespace-pre-wrap">{`   Z troską o każdą łapkę`}</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[512px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#4f4448] text-[18px] w-full">
        <p className="leading-[28px] mb-0">Zarządzanie zdrowiem Twojego pupila nie</p>
        <p className="leading-[28px] mb-0">musi być stresujące. Od śledzenia</p>
        <p className="leading-[28px] mb-0">szczepień po wizyty u weterynarza,</p>
        <p className="leading-[28px] mb-0">zapewniamy ciepłe i zorganizowane</p>
        <p className="leading-[28px] mb-0">miejsce dla wszystkiego, czego</p>
        <p className="leading-[28px]">potrzebuje Twój futrzany przyjaciel.</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#795465] content-stretch flex flex-col items-center justify-center pl-[118.66px] pr-[118.67px] py-[16px] relative rounded-[12px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(121,84,101,0.2),0px_4px_6px_-4px_rgba(121,84,101,0.2)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white tracking-[0.14px] w-[112.67px]">
        <p className="leading-[20px]">Zacznij za darmo</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p19e3b6c0} fill="var(--fill-0, #795465)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(248,200,220,0.3)] content-stretch flex gap-[7.99px] items-center justify-center px-[91.72px] py-[16px] relative rounded-[12px] shrink-0" data-name="Button">
      <Container23 />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] relative shrink-0 text-[#795465] text-[14px] text-center tracking-[0.14px] w-[134.55px]">
        <p className="leading-[20px]">Zobacz jak to działa</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Container">
      <Heading />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container18() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__438px_350px] h-[839px] max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip px-[20px] py-[32px] right-0 top-[80px]" data-name="Hero Section">
      <Container18 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[286px]" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[152px] justify-center leading-[0] relative shrink-0 text-[30px] text-center text-white tracking-[-0.6px] w-[268.48px]">
        <p className="leading-[38px] mb-0">Gotowy, by</p>
        <p className="leading-[38px] mb-0">zapewnić swojemu</p>
        <p className="leading-[38px] mb-0">pupilowi najlepszą</p>
        <p className="leading-[38px]">opiekę?</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[672px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[140px] justify-center leading-[0] relative shrink-0 text-[#ffd8e7] text-[18px] text-center w-[267.33px]">
        <p className="leading-[28px] mb-0">Dołącz do ponad 50 000</p>
        <p className="leading-[28px] mb-0">szczęśliwych opiekunów, którzy</p>
        <p className="leading-[28px] mb-0">ufają Pet Companion w kwestii</p>
        <p className="leading-[28px] mb-0">zdrowia swoich futrzanych</p>
        <p className="leading-[28px]">członków rodziny.</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[68.66px] py-[16px] relative rounded-[12px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[52px] justify-center leading-[0] relative shrink-0 text-[#795465] text-[20px] text-center w-[148.68px]">
        <p className="leading-[26px] mb-0">Załóż darmowe</p>
        <p className="leading-[26px]">konto</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[55.59px] pr-[55.6px] py-[18px] relative rounded-[12px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[26px] justify-center leading-[0] relative shrink-0 text-[20px] text-center text-white w-[174.81px]">
        <p className="leading-[26px]">Zaloguj się</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function CtaSection() {
  return (
    <div className="absolute bg-[#795465] content-stretch flex flex-col gap-[24px] items-start left-[20px] max-w-[1024px] overflow-clip p-[32px] right-[20px] rounded-[40px] top-[3087px]" data-name="CTA Section">
      <div className="absolute bg-[rgba(255,255,255,0.1)] right-[-128px] rounded-[9999px] size-[256px] top-[-128px]" data-name="Overlay" />
      <div className="absolute bg-[rgba(255,255,255,0.05)] bottom-[-96px] left-[-96px] rounded-[9999px] size-[192px]" data-name="Overlay" />
      <Heading6 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function PetCompanionLogo() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Pet Companion Logo">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPetCompanionLogo} />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[64px]" data-name="Container">
      <PetCompanionLogo />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container27 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[4px] relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[38px] justify-center leading-[0] relative shrink-0 text-[#795465] text-[30px] text-center tracking-[-1.5px] w-[205.89px]">
        <p className="leading-[38px]">Pet Companion</p>
      </div>
    </div>
  );
}

function BrandHeaderBasedOnTopAppBarIdentity() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[83px] top-[11px] w-[205.89px]" data-name="Brand Header (Based on TopAppBar Identity)">
      <Container26 />
      <Heading7 />
    </div>
  );
}

export default function Main() {
  return (
    <div className="relative size-full" data-name="Main">
      <SectionFeaturesBentoGrid />
      <HeroSection />
      <CtaSection />
      <BrandHeaderBasedOnTopAppBarIdentity />
    </div>
  );
}