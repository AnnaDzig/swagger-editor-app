# Swagger/OpenAPI UI - Team Project

## 🔗 Links

- **Deploy Link:**
- **YouTube Demo Video:**

## 📝 Description

A full-stack React application for editing, validating, viewing, and testing APIs using OpenAPI/Swagger specifications.

The application is built with Next.js App Router and uses server-side logic to execute API requests through the application server in order to avoid CORS issues.

## 🛠 Tech Stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS / CSS Modules
- **State Management:**
- **Auth & Database:**
- **Localization:**
- **Testing:**
- **Deployment:**

## 🚀 Local Setup

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## 🧪 Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:coverage
```

## 📋 Self-Assessment Checklist

### Feature 1: App Header (60/60)

- [ ] Non-authenticated users see Sign In and Sign Up buttons [15]
- [ ] Authenticated users see History and Sign Out buttons [10]
- [ ] Navigation links to the About page are available in header/footer [10]
- [ ] Automatic redirection to Main page if token is expired/invalid [10]
- [ ] Navigation to authentication forms via header buttons [15]

### Feature 2: Sign In / Sign Up (50/50)

- [ ] Auth buttons are consistently present across the app [10]
- [ ] Client-side validation: email format and password strength [20]
- [ ] Successful login redirects to the Main page [10]
- [ ] Authenticated users are redirected away from Sign In / Sign Up pages [10]

### Feature 3: Swagger Editor (120/120)

- [ ] Support for JSON and YAML schema loading/pasting [25]
- [ ] Automatic format detection: JSON vs YAML [20]
- [ ] Format switching with automatic conversion: JSON ↔ YAML [20]
- [ ] Schema validation with error messaging [15]
- [ ] Schema persistence for authenticated users: save/restore on login [10]
- [ ] Viewer automatically updates based on valid schema [10]
- [ ] Responsive split view: horizontal/vertical based on orientation [20]

### Feature 4: Swagger Viewer (120/120)

- [ ] Endpoints organized by path and method [20]
- [ ] Detailed parameter view: path, query, header, cookie [25]
- [ ] Request schema and example payloads display [20]
- [ ] Response schema, examples, and all status codes display [25]
- [ ] Try-It-Out functionality via server-side request handling [20]
- [ ] Generate cURL button with copy-to-clipboard [10]

### Feature 5: History and Analytics (70/70)

- [ ] Server-side generated history with empty state handling [15]
- [ ] Requests sorted by timestamp, most recent first [10]
- [ ] Server-side analytics: duration, status code, timestamp, method, request size, response size, error details, endpoint/URL [45]

### Feature 6: About Page (25/25)

- [ ] Publicly accessible route [5]
- [ ] Contains information about the RS School course [5]
- [ ] Team member details: names, roles, GitHub links [10]
- [ ] Design consistency with the rest of the app [5]

### Feature 7: General Requirements (55/55)

- [ ] Multi-language support with i18n toggler in the header [30]
- [ ] Sticky header with scroll animation [10]
- [ ] User-friendly error handling: toast, modal, or similar [10]
- [ ] Private route protection with 401 handling [5]

### Feature 8: YouTube Video (50/50)

- [ ] 5–7 minute YouTube video is linked and demonstrates all implemented features [50]

---

## ✅ Quality Checklist

- [ ] Build passes
- [ ] Lint passes
- [ ] Tests pass
- [ ] Test coverage is 80% or higher
- [ ] No `any`
- [ ] No `@ts-ignore`
- [ ] No console errors
- [ ] No console warnings
- [ ] No `console.log`
- [ ] No commented/dead code
- [ ] Required routes are lazy-loaded
- [ ] Default favicon is replaced
- [ ] README contains deploy link
- [ ] README contains local setup instructions
- [ ] README contains proxy/server request instructions if needed

---

## 📸 Screenshots

## 💬 Additional Comments

## 👥 Team

| Member        | Role               | GitHub                                            |
| ------------- | ------------------ | ------------------------------------------------- |
| Name          | Team Lead          | @GitHub                                           |
| Michael Elsky | Frontend Developer | [michael-elsky](https://github.com/michael-elsky) |
| Anna Dzhyhota | Frontend Developer | [annadzig](https://github.com/annadzig)           |
| Mikhail Kruk  | Frontend Developer | [mikekruk](https://github.com/mikekruk)           |

---

**Total Score: 0/550**
