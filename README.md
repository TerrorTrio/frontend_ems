# Employee Management System (Frontend)

Dieses Repository enthält das Frontend für das LF10 Employee-Management-System.
Die Anwendung ist eine React/Vite-App und nutzt OIDC (Authentik) zur Anmeldung.

## Voraussetzungen

* Node.js (empfohlen: aktuelle LTS-Version)
* npm (kommt mit Node.js)
* Docker + Docker Compose (für Backend, Datenbank und Authentik)

## Installation

```bash
npm install
```

## Lokale Entwicklung

1. **Abhängigkeiten starten (Postgres, EmployeeBackend, Authentik)**

   ```bash
   docker compose up
   ```

   > Achtung: Die Container laufen dauerhaft. Bei Bedarf mit `docker compose down` stoppen.

2. **Frontend starten**

   ```bash
   npm run dev
   ```

3. **App öffnen**

   * Frontend: `http://localhost:5173`
   * Backend Swagger: `http://localhost:8089/swagger`
   * Authentik Admin: `http://localhost:9000`

## Authentik / Passwort für den User „john“ setzen

Um ein gültiges Passwort für den User `john` zu setzen:

1. Melden Sie sich als Administrator unter `http://localhost:9000` an (`a@b.com` / `secret`).
2. Öffnen Sie die Kachel **employee_api** → **More Details** → **Edit**.
3. Links auf **Directory** → **Users**.
4. Klicken Sie auf den User **john**.
5. Klicken Sie auf **Set Password** und setzen Sie ein Passwort.

## Nützliche Befehle

```bash
# Linting
npm run lint

# Production-Build
npm run build

# Preview des Builds
npm run preview
```

## Datenbank zurücksetzen (nur wenn nötig)

```bash
docker compose down
docker volume rm docker_employee_postgres_data
docker compose up
```
