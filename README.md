<div align="center">
  <div style="background-color: #b04090; color: white; display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 20px; font-size: 32px; font-weight: 900; font-family: monospace; margin-bottom: 20px;">
  </div>

  # MailESign
  
  **Meticulously designed, inline-styled email signatures built to establish your professional presence.**

  [![React](https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  
  ---
</div>

## 📖 Overview

**MailESign** is a cutting-edge web application tailored for professionals and businesses to effortlessly create, manage, and install beautiful email signatures. Built on a modern tech stack, MailESign ensures your signatures look perfect across all standard email clients by outputting certified, inline HTML code. 

Whether you need a sleek corporate layout or a modern creative signature, MailESign has you covered.

## ✨ Key Features

- 🎨 **Professional Templates:** A curated library of layouts suited for diverse professional roles.
- ✏️ **Rich WYSIWYG Editor:** Real-time signature preview and editing, complete with custom image cropping via `react-easy-crop`.
- 🤖 **AI-Powered Enhancements:** Integrated with `@google/genai` to smartly generate engaging profile bios or refine signature details.
- 💾 **Local Persistence:** Signatures are securely stored right in your browser. No databases, no tracking. Come back anytime to edit.
- 📱 **Fluid & Responsive UI:** Featuring stunning dark-mode aesthetics, slick transitions via `motion`, and real-time toast notifications.
- 📧 **Cross-Client Compatibility:** Guaranteed to render perfectly on **Gmail, Outlook, Apple Mail, and Thunderbird**.

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/MailESign.git
   cd MailESign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Copy the example environment file and add your Google GenAI API key to unlock AI features.
   ```bash
   cp .env.example .env
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```
   > 💡 The app will be running at [http://localhost:3000](http://localhost:3000).