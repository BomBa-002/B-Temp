# B-Tamp

قالب Monorepo جاهز لبناء تطبيقات Modular Monolith قابلة للتوسع.

## الهيكل الأساسي

- `backend/`: Node.js + Express + TypeScript + Drizzle + SQLite
- `frontend/`: Vite + React + TypeScript + Tailwind CSS
- `docker-compose.yml`: تشغيل التطبيق بالكامل داخل Docker
- `DESIGN_RULES.md`: قواعد التصميم وتجربة الاستخدام

## التشغيل

انسخ `.env.example` إلى `.env`، ثم شغّل الخدمات من خلال Docker Compose بعد اكتمال إعدادات `backend/` و`frontend/`.

كل كود المصدر وأسماء الملفات والمتغيرات مكتوبة بالإنجليزية، بينما الشرح والتوثيق بالعربي المصري.
