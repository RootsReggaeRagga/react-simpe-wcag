# React Simple WCAG Accessibility Widget for WordPress v2.0

Plugin WordPress dodający widget dostępności zgodny z wytycznymi WCAG 2.1. **Nowa wersja używa builda React zamiast przepisywania na vanilla JS.**

## Funkcjonalności

- **Kontrola rozmiaru tekstu**: Normalny, Duży (Text+), Bardzo duży (Text++)
- **Przełącznik kontrastu**: Wysoki kontrast (czarne tło, żółty tekst)
- **Reset ustawień**: Przywracanie domyślnych ustawień
- **Zapisywanie preferencji**: Ustawienia zapisywane w ciasteczkach
- **Responsywny design**: Działa na urządzeniach mobilnych
- **Zgodność z WCAG**: Spełnia wytyczne dostępności

## Instalacja

1. Pobierz plik ZIP z pluginem
2. W panelu administracyjnym WordPress przejdź do **Wtyczki > Dodaj nową**
3. Kliknij **Wyślij wtyczkę** i wybierz pobrany plik ZIP
4. Kliknij **Zainstaluj teraz**
5. Po instalacji kliknij **Aktywuj wtyczkę**

## Konfiguracja

1. Przejdź do **Ustawienia > WCAG Accessibility**
2. Włącz/wyłącz widget
3. Dodaj własne style CSS (opcjonalnie)
4. Zapisz ustawienia

## Użytkowanie

Po aktywacji pluginu, widget dostępności pojawi się w lewym górnym rogu strony. Użytkownicy mogą:

- Kliknąć ikonę dostępności, aby otworzyć panel
- Wybrać rozmiar tekstu (Text, Text+, Text++)
- Włączyć/wyłączyć wysoki kontrast
- Zresetować ustawienia do domyślnych
- Uzyskać dostęp do deklaracji dostępności i mapy strony

## Struktura plików

```
react-simple-wcag-wordpress-v2/
├── react-simple-wcag-wordpress-v2.php    # Główny plik pluginu
├── build/                                # React build
│   └── static/
│       ├── css/
│       │   └── main.17b314e4.css         # Style CSS
│       └── js/
│           ├── main.a303f56b.js          # Główny plik JS
│           └── 453.ed3810f9.chunk.js     # Chunk JS
├── languages/                            # Pliki tłumaczeń
└── README.md                             # Ten plik
```

## Wymagania

- WordPress 5.0 lub nowszy
- PHP 7.4 lub nowszy
- Przeglądarka z obsługą JavaScript

## Wsparcie

Plugin jest zgodny z:

- WCAG 2.1 AA
- WordPress Coding Standards
- Responsive Web Design

## Licencja

GPL v2 lub nowsza

## Autor

Twój Nazwa - [Twój Email]

## Changelog

### 2.0.0

- **Nowa architektura**: Używa builda React zamiast vanilla JS
- **Lepsza wydajność**: Zoptymalizowany kod React
- **Łatwiejsze utrzymanie**: Oryginalny kod React bez przepisywania
- **Lepsza kompatybilność**: Mniej konfliktów z motywami

### 1.0.0

- Pierwsza wersja pluginu
- Podstawowe funkcjonalności dostępności
- Integracja z WordPress
- Panel administracyjny
