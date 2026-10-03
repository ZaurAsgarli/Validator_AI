# Validator AI — Startup Idea & Problem Validator

Validator AI is an AI-driven market research and startup validation platform developed during a hackathon. The system validates business ideas by scanning social discussions (such as Reddit) and analyzing target audience pain points to ensure problem-solution fit before launching products.

---

## 🚀 Live Demo

- **Frontend / Application:** https://validator-ai-theta.vercel.app/

---

## ✨ Key Features

- **Automated Market Research:** Scans community discussions (e.g., Reddit, forums) for real target audience feedback.
- **Pain Point Analysis:** Evaluates whether the user's business idea addresses an existing, high-demand problem.
- **n8n Workflow Integration:** Designed to integrate with automated n8n workflows for multi-bot processing and web scraping triggers.
- **AI-Powered Evaluation:** Leverages LLM agents to cross-examine problem severity, existing solutions, and market opportunity.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Automation / Integration:** n8n Workflow Automation

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation & Local Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/ZaurAsgarli/Validator_AI.git](https://github.com/ZaurAsgarli/Validator_AI.git)
   cd Validator_AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser to view the application.

---

## 📌 Architecture Overview

```text
Validator_AI/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── find-users/      # API endpoint for scanning user feedback
│   │   ├── globals.css          # Global style definitions
│   │   ├── layout.tsx           # Main application layout wrapper
│   │   └── page.tsx             # Validation dashboard interface
│   └── components/              # Modular UI components (UserCard, etc.)
└── public/                      # Static assets and icons
```