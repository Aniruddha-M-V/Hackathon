# System Instructions: AI Manufacturing Order Management System

## Project Overview

Build a **web-based conversational manufacturing order management system** where users interact entirely through natural language.

The application should allow users and operations teams to:
- Create manufacturing orders through chat
- Update order status through chat
- Log quality inspection updates through chat
- Track all orders in a dashboard

The system should focus on:
- Accurate NLP extraction
- Clean and responsive UI
- Fast and token-efficient architecture
- Real-time dashboard updates
- Local persistence for demo stability

---

# Core Requirements

## 1. NLP Chat Interface

### Chat Features
- Web-based conversational interface
- Users type requests in plain English
- AI extracts structured data from user input
- System must support:
  - Order creation
  - Status updates
  - Quality updates
  - Basic order queries

### Supported Intents

#### Create Order
Example:
```txt
I need 200 titanium flanges delivered by July 20
```

#### Update Status
Example:
```txt
Mark order #3 as accepted
```

#### Quality Update
Example:
```txt
Quality update on order #3 — passed visual inspection
```

#### Query Orders (Bonus)
Example:
```txt
Show all accepted orders
```

---

# Order Status Flow

Orders must follow this lifecycle:

```txt
Received → In Review → Accepted
```

Allowed statuses:
- Received
- In Review
- Accepted

---

# NLP Extraction Requirements

The AI extraction system must identify:

## Required Entities

### Order Creation
- part_name
- material
- quantity
- deadline
- dimensions (optional)
- notes (optional)

### Status Updates
- order_id
- status

### Quality Updates
- order_id
- quality_note

### Query Requests
- status_filter
- date_filter (optional)

---

# AI Prompting Rules

## Extraction Strategy

The AI should ONLY extract structured information.

The AI should NOT:
- generate long conversational responses
- explain reasoning
- produce markdown
- hallucinate fields

The AI must return ONLY valid JSON.

---

# Expected JSON Formats

## Create Order

```json
{
  "intent": "create_order",
  "part_name": "Titanium Flange",
  "material": "Titanium",
  "quantity": 200,
  "deadline": "2025-07-20",
  "dimensions": "80mm bore",
  "notes": null
}
```

---

## Update Status

```json
{
  "intent": "update_status",
  "order_id": 3,
  "status": "Accepted"
}
```

---

## Quality Update

```json
{
  "intent": "quality_update",
  "order_id": 3,
  "quality_note": "Passed visual inspection with no surface defects"
}
```

---

## Query Orders

```json
{
  "intent": "query_orders",
  "status_filter": "Accepted"
}
```

---

# Dashboard Requirements

## Dashboard Purpose

Provide a clean read-only overview of all manufacturing orders.

Dashboard should automatically update whenever:
- a new order is created
- status changes
- quality notes are added

---

# Dashboard Layout

## Main Sections

### 1. Header

Display:
- App title
- User profile
- Logout button
- Theme toggle (optional)

---

### 2. Chat Panel

Features:
- Chat bubbles
- User messages
- AI/system responses
- Input field
- Send button
- Loading indicator

Suggested placement:
- Left side panel

---

### 3. Orders Dashboard

Suggested placement:
- Right side panel

Display all orders as:
- cards
OR
- table rows

---

# Order Card Requirements

Each order card should display:

- Order ID
- Part Name
- Material
- Quantity
- Deadline
- Current Status
- Latest Quality Note
- Created Timestamp

Optional:
- Status badge color
- Timeline view
- Expandable quality history

---

# Dashboard Features

## Filters (Bonus)

Allow filtering by:
- Received
- In Review
- Accepted

Optional:
- Search by order ID
- Search by part name

---

# Authentication Requirements

## Authentication System

The application must require authentication before accessing the dashboard.

Recommended:
- Clerk Authentication

Supported Login Methods:
- Google Login
- Email Login

Protected Routes:
- Dashboard
- Chat Interface
- Order Management

Public Routes:
- Landing page
- Sign in page

---

# Data Persistence Requirements

## Storage

Use:
- localStorage
OR
- in-memory state

Recommended:
- localStorage persistence

Requirements:
- Orders survive page refresh
- Quality history persists
- Status updates persist

---

# Data Models

## Order

```json
{
  "id": "number",
  "partName": "string",
  "material": "string",
  "quantity": "number",
  "deadline": "string",
  "dimensions": "string | null",
  "status": "Received | In Review | Accepted",
  "qualityNotes": [],
  "createdAt": "timestamp"
}
```

---

## Quality Note

```json
{
  "id": "string",
  "text": "string",
  "timestamp": "timestamp"
}
```

---

# Suggested Frontend Structure

```txt
src/
 ├── app/
 ├── components/
 │    ├── ChatBox.tsx
 │    ├── Dashboard.tsx
 │    ├── OrderCard.tsx
 │    ├── MessageBubble.tsx
 │    ├── Navbar.tsx
 │    └── StatusBadge.tsx
 ├── hooks/
 ├── lib/
 │    ├── gemini.ts
 │    ├── storage.ts
 │    └── parser.ts
 ├── types/
 └── utils/
```

---

# Suggested Backend/API Structure

## API Route

```txt
/api/chat
```

### Responsibilities
- Receive user message
- Send extraction prompt to Gemini
- Parse AI response
- Return structured JSON

---

# Gemini Extraction Prompt

```txt
You are an AI extraction engine.

Extract manufacturing order information from the user message.

Supported intents:
- create_order
- update_status
- quality_update
- query_orders

Extract the following fields when relevant:
- order_id
- part_name
- material
- quantity
- deadline
- dimensions
- status
- quality_note
- status_filter

Rules:
- Return ONLY valid JSON
- No markdown
- No explanations
- Use null for missing values
- Do not invent information

User Message:
"{{message}}"
```

---

# UI Design Guidelines

## Design Style

The UI should feel:
- modern
- industrial
- clean
- fast
- professional

Recommended:
- rounded cards
- soft shadows
- dark/light mode
- responsive layout
- smooth animations

---

# Suggested Color Palette

## Primary
- Dark Blue
- Slate
- White

## Status Colors

### Received
- Gray

### In Review
- Orange / Yellow

### Accepted
- Green

---

# Performance Guidelines

## Token Efficiency

The AI architecture should minimize token usage.

Recommended strategies:
- Stateless extraction
- Small prompts
- JSON-only responses
- Avoid sending order history repeatedly
- Process one message at a time

---

# Error Handling

## AI Failures

If Gemini fails:
- show fallback error message
- preserve chat state
- avoid app crash

Optional:
- regex fallback parsing

---

# MVP Features

## Required MVP

- Authentication
- Chat interface
- Order creation
- Status updates
- Quality updates
- Dashboard
- Local persistence

---

# Bonus Features

## Recommended Bonus Features

### Multi-Order Queries
Examples:
- Show accepted orders
- Show orders in review
- Show all pending orders

### Dashboard Enhancements
- Filters
- Search
- Animations
- Timeline view

### UX Improvements
- Toast notifications
- Typing indicators
- Real-time updates
- Status transitions

---

# Demo Flow Recommendation

## Suggested Demo Script

1. User logs in
2. Create two manufacturing orders via chat
3. Show automatic dashboard updates
4. Move one order to In Review
5. Mark order as Accepted
6. Add quality inspection note
7. Filter accepted orders
8. Explain token-efficient architecture

---

# Technical Stack Recommendation

## Frontend
- Next.js
- TypeScript
- Tailwind CSS

## Authentication
- Clerk

## AI
- Gemini 1.5 Flash

## Storage
- localStorage

## Deployment
- Vercel

---

# Final Goal

Build a fast, clean, conversational manufacturing order management system that demonstrates:
- accurate NLP extraction
- reliable workflow handling
- excellent UI/UX
- efficient AI usage
- smooth real-time dashboard updates

