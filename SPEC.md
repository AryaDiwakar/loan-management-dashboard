# Loan Management Dashboard - SPEC.md

## 1. Concept & Vision

A premium fintech-inspired loan management dashboard that feels like a high-end banking app. The interface combines the sophistication of wealth management platforms with playful micro-interactions, creating a sense of financial empowerment. Dark mode with vibrant accent colors conveys trust, modernity, and financial health.

## 2. Design Language

### Aesthetic Direction
**"Neon Fintech"** - Deep dark backgrounds with glowing gradient accents, glassmorphism cards, and subtle light effects that create depth and premium feel.

### Color Palette
```
--bg-primary: #0a0a0f
--bg-secondary: #12121a
--bg-card: rgba(255, 255, 255, 0.03)
--bg-glass: rgba(255, 255, 255, 0.05)
--accent-primary: #6366f1 (Indigo)
--accent-secondary: #8b5cf6 (Purple)
--accent-tertiary: #06b6d4 (Cyan)
--success: #10b981
--warning: #f59e0b
--danger: #ef4444
--text-primary: #ffffff
--text-secondary: rgba(255, 255, 255, 0.6)
--text-muted: rgba(255, 255, 255, 0.4)
--border: rgba(255, 255, 255, 0.08)
--glow: rgba(99, 102, 241, 0.3)
```

### Typography
- **Headings**: Inter (700, 600) - clean, modern
- **Body**: Inter (400, 500) - excellent readability
- **Numbers**: JetBrains Mono (500) - monospace for financial figures

### Motion Philosophy
- **Entrance**: Fade up with stagger (opacity 0→1, translateY 20px→0, 500ms ease-out, 50ms stagger)
- **Hover**: Scale 1.02, shadow increase, 200ms ease
- **Numbers**: Count-up animation on load
- **Charts**: Progressive reveal from left
- **Notifications**: Slide in from right with bounce
- **Chatbot**: Messages slide up with spring easing

## 3. Features

### EMI Tracking Cards
- Total Active Loans with trend indicator
- Next EMI Due with countdown timer
- Total Outstanding with breakdown
- Credit Score gauge visualization
- Monthly Payment breakdown
- YTD Interest Paid

### Charts
1. EMI Breakdown (Donut Chart)
2. Payment History (Area Chart)
3. Loan Progress (Bar Chart)
4. Interest Trend (Line Chart)

### Notification Panel
- Slide-in panel from right
- Categories: Payments, Reminders, Alerts
- Mark as read functionality

### Chatbot UI
- Floating button with pulse animation
- Expandable chat panel
- Quick action buttons
- Typing indicator
- Financial insights responses
