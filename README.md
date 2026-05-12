# sentinelx
# 🛡️ SentinelX - AI Banking Fraud Intelligence Platform

<div align="center">

![SentinelX Banner](https://img.shields.io/badge/SentinelX-AI%20Fraud%20Detection-blue)
[![Python 3.11](https://img.shields.io/badge/Python-3.11-green.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-teal.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)

**Canara Bank SuRaksha Cyber Hackathon 2.0** | *Winner Quality Solution*

[Demo](#demo) • [Architecture](#architecture) • [Installation](#installation) • [API Docs](#api-documentation)

</div>

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation Guide](#installation-guide)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Team Division](#team-division)
- [License](#license)

---

## 🎯 Overview

**SentinelX** is an AI-powered banking fraud intelligence platform that helps financial institutions detect, analyze, and track fraudulent activities across documents and URLs. The platform combines multiple forensic techniques to provide explainable fraud detection with campaign clustering capabilities.

### Problem We Solve

Banks process thousands of uploaded documents during onboarding, underwriting, KYC review, loan verification, and account checks. Fraudsters manipulate these documents using simple editing tools. Security teams need **explainable evidence**, not black-box labels, and the ability to link isolated fraud attempts into coordinated campaigns.

### Key Innovation

- 🔍 **Multi-layered detection** - Metadata, OCR, layout, and visual tampering analysis
- 🧬 **Fraud DNA** - Unique fingerprinting and DBSCAN clustering to link related fraud attempts
- 📊 **Explainable AI** - Plain-English reasons behind every risk score
- 🎯 **Campaign intelligence** - Groups related fraud events into actionable campaigns

---

## ✨ Key Features

### DocShield - Document Forensics
- **Metadata Analysis** - Detects suspicious editors (GIMP, Photoshop, Canva)
- **OCR Extraction** - Reads text from scanned documents, extracts amounts/dates
- **Layout Checking** - Identifies font anomalies and inconsistent formatting
- **ELA Forensics** - Error Level Analysis to detect visual tampering
- **Risk Scoring** - Weighted 0-100 score with CLEAN/SUSPICIOUS/HIGH RISK levels

### Fraud DNA - Campaign Intelligence
- **Fingerprint Generation** - Creates unique hash-based identifiers for each fraud event
- **TF-IDF Vectorization** - Converts fraud features into mathematical vectors
- **DBSCAN Clustering** - Groups similar fraud attempts without pre-defined cluster count
- **Campaign Visualization** - Interactive graphs showing connected fraud events

### PhishShield - URL Intelligence
- **Domain Similarity** - Detects typosquatting and bank name impersonation
- **Keyword Scanning** - Flags suspicious terms (verify, secure, update, OTP, KYC)
- **Protocol Checks** - Identifies HTTP-only and IP-as-domain URLs
- **Risk Scoring** - Comprehensive phishing detection with explainable rules

### Threat Dashboard
- Real-time fraud event feed
- Risk severity charts and statistics
- Campaign cluster visualization
- Interactive document and URL analysis interfaces

---

## 🏗️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14 | React framework with SSR |
| TailwindCSS | 3.3 | Utility-first styling |
| shadcn/ui | Latest | Component library |
| Recharts | 2.8 | Data visualization |
| TypeScript | 5.x | Type safety |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.104 | Async API framework |
| Python | 3.11 | Core language |
| SQLAlchemy | 2.0 | ORM |
| Alembic | 1.12 | Database migrations |
| PostgreSQL | 15 | Relational database |
| Supabase | Latest | Hosted PostgreSQL |

### AI/ML Libraries
| Library | Version | Purpose |
|---------|---------|---------|
| PyMuPDF | 1.23 | PDF parsing and metadata |
| EasyOCR | 1.7 | OCR for scanned documents |
| OpenCV | 4.8 | Image processing |
| scikit-learn | 1.3 | TF-IDF + DBSCAN clustering |
| Pillow | 10.1 | Image manipulation |

### DevOps
| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Vercel | Frontend deployment |
| Railway | Backend deployment |
| GitHub Actions | CI/CD pipeline |

---

## 📐 Architecture

### High-Level Flow

```mermaid
graph LR
    A[User Upload] --> B[FastAPI Backend]
    B --> C{DocShield or PhishShield?}
    C -->|Document| D[Metadata Analyzer]
    C -->|Document| E[OCR Engine]
    C -->|Document| F[Layout Checker]
    C -->|Document| G[ELA Forensics]
    C -->|URL| H[Domain Analyzer]
    C -->|URL| I[Keyword Scanner]
    D --> J[Risk Scorer]
    E --> J
    F --> J
    G --> J
    H --> K[URL Risk Scorer]
    I --> K
    J --> L[Fraud Fingerprint]
    K --> L
    L --> M[TF-IDF Vectorization]
    M --> N[DBSCAN Clustering]
    N --> O[Campaign Linking]
    O --> P[(PostgreSQL)]
    P --> Q[Dashboard UI]
