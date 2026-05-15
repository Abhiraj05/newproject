# Legal Next AI - Intelligent Legal Partner

**Legal Next AI** is a modern, AI-powered platform designed to streamline legal workflows. By bridging traditional law with the speed and precision of artificial intelligence, it empowers legal professionals and firms to perform research and analyze risks with unparalleled efficiency.

---

## Key Features
- Automatically flag risky clauses and summarize long agreements in seconds.
- Instantly find precedents, risks, and opportunities using AI-driven legal research.
- A specialized AI capable of identifying document purposes, involved parties, and potential risk factors from uploaded files.
- Access a curated directory of verified advocates specializing in corporate law, litigation, and compliance.

---

## Tech Stack 

**Frontend:**
- React
- Tailwind CSS
- Framer Motion for animations
- Lucide react icons

**Backend:**
- Django with Django REST Framework
- FastAPI for LLM operations
- LangChain with Gemini AI integration
- PostgreSQL database
- JWT authentication

**AI/ML:**

- Gemini Embedding LLM (gemini-embedding-2-preview)
- Gemini LLM (gemini-3-flash-preview)
- LangChain for prompt management
- MarkItDown for document parsing
- RAG (Retrieval-Augmented Generation) for context-aware AI responses using uploaded documents.
- Chroma Vector DB for semantic search


## Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Abhiraj05/Quizize.ai-AI-Powered-Quiz-Generation-Platform.git
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:5173

#### 3. Backend Setup - Django

```bash
cd backend/django_app

# create environment
python -m venv env

# Windows
env\Scripts\activate

# macOS / Linux
source env/bin/activate
pip install -r requirements.txt

# Run migrations
python manage.py makemigration
python manage.py migrate

# Start Django server
python manage.py runserver
```

Django runs on http://127.0.0.1:8000

#### 4. Backend Setup - FastAPI

```bash
cd backend/fastapi_app

# create environment
python -m venv env

# Windows
env\Scripts\activate

# macOS / Linux
source env/bin/activate

# Create .env file
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env

pip install -r requirements.txt

# Start FastAPI server
fastapi dev main.py --port 8001
```

FastAPI runs on http://127.0.0.1:8001

#### 5. Configuration

Environment Variables
#### Django

`Inside settings.py `

```bash

NAME: your_database_name,  # database name
USER: your_db_user,   # username
PASSWORD: your_db_password, # password
HOST: localhost,  # host

EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_email_password
```

#### FastAPI

`Create .env file in backend/fastapi_app/`

```bash
GOOGLE_API_KEY=your_google_api_key
```

## Screenshots
### Main Page
<img width="1920" height="1872" alt="screencapture-localhost-5173-2026-05-15-15_25_38" src="https://github.com/user-attachments/assets/54d36554-70bb-460e-9565-6ff995a9cbb7" />

---

### SignIn & SignUp Pages
<img width="1920" height="918" alt="screencapture-localhost-5173-signin-2026-05-15-14_40_17" src="https://github.com/user-attachments/assets/1db433bd-a9b9-4632-869b-03184b2f9696" />
<img width="1920" height="918" alt="screencapture-localhost-5173-signup-2026-05-15-14_40_35" src="https://github.com/user-attachments/assets/b1c9872c-6e23-471e-9e7a-428bf9a4ad7a" />

---
### Chat Page
<img width="1920" height="918" alt="screencapture-localhost-5173-chat-2026-05-15-14_37_44" src="https://github.com/user-attachments/assets/e46e0dcc-78d4-4bd7-ae5d-6b95704a86ed" />
<img width="1920" height="2030" alt="screencapture-localhost-5173-chat-2026-05-15-14_37_13" src="https://github.com/user-attachments/assets/f18ca28a-0280-45ad-afd5-a7ae4e4445a1" />

---
### Lawyers Page
<img width="1920" height="1406" alt="screencapture-localhost-5173-lawyers-2026-05-15-14_39_04" src="https://github.com/user-attachments/assets/9386f6e0-794b-464b-8533-b773fc3b79d5" />

---
### Contact Page 
<img width="1920" height="1097" alt="screencapture-localhost-5173-contact-2026-05-15-14_39_58" src="https://github.com/user-attachments/assets/7311363c-dd19-49f5-a8f5-01adf72bde50" />

---
### About Page
<img width="1920" height="2301" alt="screencapture-localhost-5173-about-2026-05-15-15_43_22" src="https://github.com/user-attachments/assets/3e469960-6773-4a1b-9da4-eded12f4b366" />

---
### Reset & Set New Password Pages
<img width="1920" height="918" alt="screencapture-localhost-5173-forgotpassword-2026-05-15-14_41_03" src="https://github.com/user-attachments/assets/fd5bf26d-5a9c-4ab4-83fa-37754cdb1e6e" />
<img width="1920" height="918" alt="screencapture-localhost-5173-resetpassword-2026-05-15-14_41_25" src="https://github.com/user-attachments/assets/4b6c0136-6303-465e-8621-6707a16a344f" />



