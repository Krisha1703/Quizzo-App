# 🎯 Quizzo - Interactive Quiz App

## 📋 Overview
**Quizzo** is a interactive quiz web application built with **Next.js** (App Router) and **Tailwind CSS**. It allows users to answer multiple-choice questions, track their progress with visual indicators, and view a detailed result summary at the end.

![quiz-1.png](/public/Screenshots/hero-section.png)
*Interactive navbar and hero section.*

![quiz-2.png](/public/Screenshots/join.png)
*Join as Teacher or Student.*

![quiz-3.png](/public/Screenshots/cards.png)
*Quiz cards.*

## 🧑‍🏫 Class Dashboard & Add-ons

Once logged in, users see a dashboard based on their role — **Teacher** or **Student**.

### 🔍 Class Overview Table
- Lists all classes created or joined
- Shows name, code, schedule, learning outcomes
- Provides options to **edit**, **delete** (for teachers), or **leave** (for students)

### 📝 Notepad (Sticky Notes)
- Button on **bottom-right corner**
- Opens a modal to add self-notes or tasks
- Users can strike through tasks when completed
- Notes are saved locally per session

### 💡 Fact of the Day
- Button on **bottom-left corner**
- Displays an interesting daily fact
- Users can rate the fact using emoji reactions (😍 😐 😴)

![quiz-dashboard.png](/public/Screenshots/dashboard.png)  
*Role-based dashboard with Notepad and Fact of the Day popup.*

## 🖥️ Tech Stack
- **Frontend:** Next.js ⚡, Tailwind CSS 🎨, Framer Motion 🖼️
- **API Integration:** Fetching quiz data from REST APIs 🌐

![quiz-4.png](/public/Screenshots/instruction.png)
*Instruction page.*

## 🚀 Features
- **✅ Quiz Data:** – Stored the quiz data as json, and fetched using REST API.

![quiz-5.png](/public/Screenshots/current-question.png)
*Current question.*

- **✅ Multiple Choice Questions:** – Users can select an answer and receive immediate feedback.

![quiz-6.png](/public/Screenshots/correct.png)
*Correct answer.*

- **✅ Progress Indicator:** – Users can select an answer and receive immediate feedback.
    - Gray: Unanswered
    - Yellow: Current question
    - Green: Correct answer
    - Red: Incorrect or unanswered due to timeout

![quiz-7.png](/public/Screenshots/submit.png)
*Submit quiz.*

- **✅ Timer Support:** – Users must answer within a time limit.
- **✅ Attempts Tracking** – The attempt count only increases when the user clicks "Retry" or refreshes the page.
- **✅ Summary Modal** – Displays total score, correct/incorrect answers, and unanswered questions.

![quiz-8.png](/public/Screenshots/result.png)
*Result summary modal.*

- ✅ **Interactive UI:** Smooth animations, consistent design, and an intuitive layout for an immersive experience.
- ✅ **User-Friendly:** Simple navigation and easy-to-understand gameplay mechanics.

## 🔐 Demo Credentials

### 👨‍🏫 Teacher
- **Email:** `shrutibhatt09@gmail.com`  
- **Password:** `shruti09`

### 👩‍🎓 Student
- **Email:** `lucy001@mail.com`  
- **Password:** `lucy001`

> Use the above credentials to log in and try the complete dashboard functionality.

## 🛠️ Installation
1. Clone the repository:
   ```bash
   https://github.com/Krisha1703/Quizzo-App.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Quizzo-App
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
## 📢 Future Enhancements
- 🚀 Add categories & difficulty levels
- 🚀 More quiz types (true/false, fill in the blanks, etc.)

### 🖥️ Figma UI Design
https://www.figma.com/design/uzLAhhR3wwFsmM0iD6VJzN/Quizzo?node-id=0-1&t=i6jiAAZFQfSps2Uz-1

### 🖥️ Live Deployed Link
https://quizzo-app-krisha.vercel.app/


