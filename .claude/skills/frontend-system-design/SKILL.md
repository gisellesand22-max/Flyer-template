---
name: frontend-system-design
description: Checklist and style guide for architecting complex, large-scale frontend applications from scratch. Use when planning frontend architecture, preparing for frontend system design interviews, doing high-level/low-level frontend design reviews, or evaluating tradeoffs like SPA vs MPA, SSR/SSG/CSR, state management, performance, accessibility, i18n, or security for a frontend system.
---

# Frontend System Design Guide

Source: [devkodeio/frontend-system-design](https://github.com/devkodeio/frontend-system-design) (MIT licensed, see `LICENSE-source.txt`).

A generic, framework-agnostic checklist for frontend system design — useful both as an
interview preparation tool and as a review checklist when architecting a real frontend
application.

## When to use this skill

- Designing or reviewing the architecture of a new large-scale frontend app.
- Preparing for or conducting a frontend system design interview.
- Sanity-checking a proposal against commonly-missed concerns (SEO, i18n, accessibility,
  security, performance, instrumentation).

## Engineering Design

- Team size
- User base
- Knowledge base
- Compliance/Governance
- User/Client expectations
- Open source vs proprietary
- Documentation / PRD
- Future Roadmaps

## High Level Design

- Platform identification
- SPA vs MPA
- SSR, SSG, CSR
- Tech stack
- Search Engine Optimization
- CI/CD
- User Experience
- A/B testing
- MVP planning
- Server Side Architecture
- Security
- State Management
- Internationalization
- E2E testing
- Tools Integration
- Authentication & Authorization
- Quality Assurance & Control
- User role management

## Low Level Design

- Code/Folder architecture
- Desktop/Mobile first approach
- System breakdown
- Component Design
- Form development
- Storage management
- API Design
- Instrumentation
- Design system
- Routing management
- CSS optimizations
- Lazy loading of modules
- Accessibility
- Image optimizations
- Pagination, Debouncing, Throttling
- Performance: FCP, LCP, TTI, CLS
- Versioning
- Unit testing

## High Level Design details

**Product Requirement Document (PRD) / Design Document**
- Identify Scope/Requirement
- Review your understanding with stakeholders

**Discuss about Design/Wireframe**
- Think like an architect
- Don't consider team bandwidth, capacity or time at this stage
- Discuss edge cases
- Robustness: handle SPOF (Single Point of Failure), e.g. monitoring, logging

**Identify Business**
- B2B vs B2C vs internal product vs customer-facing product

**Identify Platform**
- Desktop / Mobile / Tablet

**Identify Users (know your audience)**
- Surveys, location/device mix, internet speed, technical level of end users, pilot product

**Identify Design Approach**
- Responsive vs Adaptive design
- Desktop-first vs Mobile-first

**Identify APIs**
- REST / GraphQL / RPC
- JSON / Protocol Buffers

**Role based management**
- Roles, permissions, authentication and authorization
- Read/Write/View permissions, route/component-level access

**Identify Right Platform (compare frameworks by use case)**
- SPA: no page reload on navigation, weak SEO — unsuitable for blogs/news
- MPA: full page reload per navigation
- PWA: offline support, native-like functionality
- SSR: better SEO
- Key questions: mobile usage? SEO needed? Is SPA/PWA enough? SSR vs SSG vs CSR?
  Pricing model? Frontend-heavy vs backend-heavy? Canvas/SVG heavy? WebRTC heavy?

**Identify User Flow**
- Vision of the product, build vs reuse, auth strategy (Google/OAuth), scope alignment
  with product manager, happy paths, edge cases, failure scenarios

**Identify MVP**
- Problem → Solution → Build MVP → Ship to customers
- Roadmap and milestones with product manager

**Volume of Operations**
- QPS, load/stress testing, analytics (Google Analytics, Sentry, New Relic) to inform scaling

**SEO**
- Crawling, heading tags, semantic tags, site ranking, sitemap, meta keywords,
  organic vs inorganic growth, alt tags, 301 redirects (bad for SEO), robots.txt,
  Open Graph protocol

**Component Based Design**
- Component-level CI/CD, monolith vs microservice, micro-frontends, static vs dynamic
  components, iframe/shell approach

**State Management**
- How state and user data are maintained across the app
- Libraries: Redux, Flux, NgRx, etc.

**Handling APIs**
- Polling (short/long), WebSockets (real-time), batch requests, GraphQL,
  caching GET APIs, Server-Sent Events (SSE)

**Optimizing Images**
- Alt attributes, responsive images (`srcset`), compression (e.g. JPEG 2000),
  image sitemaps, SVG for scalable graphics, sprites for icons, progressive images
  (e.g. blurhash)

**Instrumentation**
- Monitoring, error logging, debugging, event tracking, analytics (GA), Sentry,
  New Relic

**Versioning of artifacts**
- Artifact tracking (e.g. Confluence), rollback and backup mechanisms

**Performance Optimization Techniques**
- Webpack optimization (code splitting, Brotli/Gzip compression)
- Web Vitals (FCP, LCP, CLS, TTI)
- Lighthouse / PageSpeed Insights
- Fast initial load
- Smooth loading indicators, consistent animation direction, skeleton loaders/blurhash
  during data fetch
- Caching (API, browser, memory, CDN, disk)
- Pagination vs infinite scroll
- Micro-interactions

**Internationalization (i18n) / Localization (l10n)**
- Numeric/date/time formats, singular/plural rules, currency, keyboard usage,
  symbols/icons/colors sensitivity, varying legal requirements

**Accessibility**
- Alt attributes, ARIA labels, multi-device and slow-network support, color contrast,
  semantic tags

**Security**
- MITM, XSS, CSRF, Clickjacking, Content Security Policy (CSP), CORS, security headers
- Useful tools: SSL Labs test, HTTP/2 test, HTTP header checker, OWASP HTML5 Security
  Cheat Sheet, Express security best practices

**Quality Assurance and Control**
- Coding standards (code/artifact/asset level), git hooks (pre-commit, Husky),
  linters/static analyzers, unit/integration/workflow testing (e.g. Cypress),
  cross-browser and cross-platform testing

**Governance**
- Workflow and asset protection: UX → Dev → PM → UX → QA
- Code-level governance (PR approvals, Gitflow), artifact/asset-level governance
  (PM and stakeholder sign-off)

**Experiment based release cycle**
- Feature/experiment flags to control rollout

**NFR (Non-Functional Requirements)**
- CI/CD (Docker, pipelines)

## Full reference

The complete original guide (with links) is also available as a PDF export from the
source repository if a deeper read-through is needed; this SKILL.md is the condensed,
actionable checklist form of it for day-to-day use.
