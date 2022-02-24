import Stack from "@material-ui/core/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDumbbell,
  faHeartPulse,
  faCalendarCheck,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="homeView">
      <div className="mainImg">
        <div className="pageTitle">
          WIRTUALNY TRENER
          <div className="subTitle">
            POLEPSZAJ TECHNIKĘ ĆWICZEŃ DZIĘKI WSKAZÓWKOM NA ŻYWO
          </div>
        </div>
      </div>
      <div className="homeIcons">
        <p>
          TRENUJ BARDZIEJ WYDAJNIE DZIĘKI MONITOROWANEMU NA BIEŻĄCO OBRAZOWI Z
          KAMERY
        </p>
        <Stack
          style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={2}
        >
          <div className="iconTable">
            <FontAwesomeIcon icon={faDumbbell} size="3x" />
            <div>
              <span style={{ fontWeight: "600" }}>Lepsza technika</span>
              <p className="subText">
                Obserwuj swoją postawę i wskazówki algorytmów, co do techniki
                wykonywania ćwiczenia. Na podstawie zaznaczanych na obrazie z
                kamery błędów koryguj swój ruch. Obserwuj ile poprawnych
                powtórzeń udało Ci się zrobić oraz grupuj je w serie.{" "}
              </p>
            </div>
          </div>
          <div className="iconTable">
            <FontAwesomeIcon icon={faHeartPulse} size="3x" />
            <div>
              <span style={{ fontWeight: "600" }}>
                Mniejsza szansa na kontuzję
              </span>
              <p className="subText">
                Obserwacja oraz wyciąganie wniosków ze wskazówek algorytmów
                zmniejszają szansę na odniesienie kontuzji z powodu złej
                techniki wykonywania ćwiczenia.
              </p>
            </div>
          </div>
          <div className="iconTable">
            <FontAwesomeIcon icon={faCalendarCheck} size="3x" />
            <div>
              <span style={{ fontWeight: "600" }}>
                Zapis treningu w dzienniku
              </span>
              <p className="subText">
                Zapisuj swoje treningi wykonywane na żywo za pomocą aplikacji.
                Uzupełniaj dziennik treningowy o dodatkowe ćwiczenia za pomocą
                formularza.
              </p>
            </div>
          </div>
          <div className="iconTable">
            <FontAwesomeIcon icon={faDesktop} size="3x" />
            <div>
              <span style={{ fontWeight: "600" }}>Minimalne wymagania</span>
              <p className="subText">
                Płynność obrazu przy niskim obciążeniu sprzętu.
              </p>
            </div>
          </div>
        </Stack>
      </div>
      <div className="homeDesc">
        <Stack
          style={{ width: "100%" }}
          direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
          spacing={2}
        >
          <div id="descriptionImg">
            <section id="btn-pulse1">
              <span className="ring"></span>
              <span className="circle"></span>
            </section>
            <section id="btn-pulse2">
              <span className="ring"></span>
              <span className="circle"></span>
            </section>
            <section id="btn-pulse3">
              <span className="ring"></span>
              <span className="circle"></span>
            </section>
            <section id="btn-pulse4">
              <span className="ring"></span>
              <span className="circle"></span>
            </section>
            <section id="btn-pulse5">
              <span className="ring"></span>
              <span className="circle"></span>
            </section>
            <section id="btn-pulse6">
              <span className="ring"></span>
              <span className="circle"></span>
            </section>
            <section id="btn-pulse7">
              <span className="ring"></span>
              <span className="circle"></span>
            </section>
            <img
              src="https://i.ibb.co/vkcqb8b/abs-g53a7cb29e-1280.jpg"
              alt=""
              width="100%"
            />
          </div>
          <div id="descriptionText">
            <p
              style={{
                fontSize: "1.4em",
                marginBottom: "8%",
                fontWeight: "600",
                color: "#d48753",
              }}
            >
              JAK TO DZIAŁA?
            </p>
            <ul>
              <li>
                Model uczenia maszynowego analizuje na bieżąco obraz z kamery
                oraz dokonuje detekcji pozy.
              </li>
              <li>
                Podczas wykonywania określonego ćwiczenia w tle działają
                odpowiednie algorytmy sprawdzające poprawność każdego z
                powtórzeń. Gdy jest ono zrobione poprawnie automatycznie zostaje
                ono zliczone.
              </li>
              <li>
                Błędy w sposobie wykonywania ćwiczeń są zaznaczane na obrazie z
                kamery za pomocą czerwonych linii oraz punktów mających
                podpowiadać użytkownikowi co w technice powtórzenia było
                niepoprawne.
              </li>
            </ul>
          </div>
        </Stack>
      </div>
      {/* <Stack
        style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        spacing={2}
      >
        <Instruction exercise="WYCISKANIE NAD GŁOWĘ" />
        <Instruction exercise="UGINANIE RAMION" />
        <Instruction exercise="WZNOSY BOKIEM" />
        <Instruction exercise="PROSTOWANIE PRZEDRAMIENIA W OPADZIE" />
        <Instruction exercise="WIOSŁOWANIE W OPADZIE" />
      </Stack> */}
    </div>
  );
}

export default Home;
