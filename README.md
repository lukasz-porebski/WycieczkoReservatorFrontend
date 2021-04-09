# WycieczkoReservatorFrontend

## Przygotowanie lokalnego środowiska do uruchomienia aplikacji
1. Sklonowanie repozytorium z projektem aplikacji `https://github.com/lukasz-porebski/WycieczkoReservatorFrontend.git`
1. Zainstalowanie [Node.js](https://nodejs.org/en/) (wersja LTS). Powinien się też przy okazji zainstalować `npm package manager`
2. Uruchomienie terminala (np. CMD)
3. Zainstalowanie Angulara przy pomocy komendy `npm install -g @angular/cli`
4. Przejście terminalem do folderu z projektem aplikacji (folder `WycieczkoReservatorFrontend`)
5. Zainstalowanie paczek wchodzących w skład projektu aplikacji przy pomocy komendy `npm-install`

## Uruchomienie aplikacji
Aplikację uruchamia się przy pomocy komendy `ng serve`.
Można również skorzystać z opcji `--o`, która od razu uruchomi aplikację w oknie przeglądarki. Cała komenda ma wtedy taką postać : `ng serve --o`


[Więcej szczegółów znajduje się tutaj](https://angular.io/guide/setup-local)

## Routy
Routy aplikacji są w pliku `app-routes.ts`. Jego lokalizacja to: `WycieczkoReservatorFrontend\src\app\core\configurations\routing`. Przykładowy route to: `http://localhost:4200/user/log-in`. Resztę routów można poskładać w podobny sposób. 


## Tryb uruchomiania aplikacji
W pliku `environment.ts` (lokalizacja: `WycieczkoReservatorFrontend\src\environments`) można ustawić w jakim trybie uruchomi się aplikacja. Wystarczy zmienić wartość stałej mode na inną wartość enuma. Domyślna wartość to `const mode = DevelopmentEnvironmentMode.FullAccess;`. Daje pełny dostęp do aplikacji. Inne tryby ograniczają w różny sposób dostęp do jej obszarów. 
