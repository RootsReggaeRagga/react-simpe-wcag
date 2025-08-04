# Automatyczne budowanie pluginu WordPress

## Szybki start

Aby zbudować plugin WordPress z najnowszymi zmianami:

```bash
npm run build:plugin
```

## Co robi skrypt `build:plugin`?

1. **Buduje aplikację React** - `npm run build`
2. **Kopiuje pliki** do folderu pluginu
3. **Aktualizuje nazwy plików** w PHP automatycznie
4. **Tworzy plik ZIP** gotowy do instalacji

## Struktura plików

```
react-simple-wcag/
├── src/                                    # Kod źródłowy React
│   ├── App.js                             # Główny komponent
│   └── components/
│       └── WcagToggle.jsx                 # Widget WCAG
├── build/                                  # Build React (generowany)
├── react-simple-wcag-wordpress-v2/        # Folder pluginu
├── build-plugin.js                        # Skrypt budowania
├── package.json                           # Konfiguracja npm
└── react-simple-wcag-wordpress-v2.zip     # Plugin gotowy do instalacji
```

## Workflow rozwoju

1. **Edytuj kod** w `src/` (React)
2. **Uruchom** `npm run build:plugin`
3. **Pobierz** `react-simple-wcag-wordpress-v2.zip`
4. **Zainstaluj** w WordPress

## Dostępne komendy

```bash
npm start              # Uruchom serwer deweloperski
npm run build          # Tylko build React
npm run build:plugin   # Pełny build pluginu
npm test               # Testy
```

## Automatyczne aktualizacje

Skrypt automatycznie:

- ✅ Znajduje nowe nazwy plików JS/CSS
- ✅ Aktualizuje ścieżki w PHP
- ✅ Kopiuje build do folderu pluginu
- ✅ Tworzy nowy plik ZIP
- ✅ Wyświetla informacje o procesie

## Rozwiązywanie problemów

### Błąd: "Main JS file not found"

- Sprawdź czy `npm run build` działa
- Sprawdź folder `build/static/js/`

### Błąd: "Failed to copy build files"

- Sprawdź uprawnienia do folderu `react-simple-wcag-wordpress-v2/`
- Upewnij się, że folder istnieje

### Błąd: "Failed to create ZIP file"

- Sprawdź czy masz zainstalowany `zip`
- Sprawdź uprawnienia do zapisu

## Konfiguracja

Możesz zmodyfikować `build-plugin.js` aby:

- Zmienić nazwę pliku ZIP
- Dodać dodatkowe pliki do kopiowania
- Zmienić logikę aktualizacji PHP
- Dodać dodatkowe kroki budowania
