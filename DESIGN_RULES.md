# DESIGN_RULES — قواعد التصميم

> ملف عام قابل للتطبيق على مختلف المشاريع
> الإصدار: v1.0.0
> آخر تحديث: 2025

---

## 1. مبادئ التصميم العامة

- التصميم حديث، نظيف، ومريح للعين.
- مرونة كاملة في التخصيص عبر CSS Variables.
- متجاوب مع جميع أحجام الشاشات والنوافذ.
- دعم كامل لـ RTL (العربية) و LTR (الإنجليزية).
- دعم Theme Light وDark.
- Accessibility أساسية (ARIA, Focus, Keyboard Navigation).
- لا توجد animations مبالغ فيها (أداء أولاً).
- يجب عدم استخدام وحدة القياس `px` ويُفضَّل دائماً `em` / `rem`.
- طريقة استخدام الألوان يجب أن تكون `HSL` / `HSLA` حصراً — يُحظر استخدام أي طريقة أخرى (Color Names, HEX, RGB/RGBA, …).

---

## 2. نظام الألوان (CSS Variables)

```css
/* styles/globals.css */

:root {
  /* ── Base Colors ── */
  --color-bg:   hsl(40, 0%, 94%);
  --color-bg-f: hsl(40, 0%, 4%);

  /* ── Brand Colors ──
       py = Primary   (اللون الرئيسي للمشروع — غيّره حسب الـ Brand)
       sy = Secondary (اللون الثانوي)
       at = Accent    (لون التمييز)
       md = Muted     (لون محايد/خافت)
  */
  --color-py:   hsl(40,  80%, 60%);
  --color-py-f: hsl(40,  94%, 4%);
  --color-sy:   hsl(340, 80%, 60%);
  --color-sy-f: hsl(40,  0%,  4%);
  --color-at:   hsl(200, 80%, 60%);
  --color-at-f: hsl(200, 80%, 4%);
  --color-md:   hsl(40,  15%, 60%);
  --color-md-f: hsl(40,  15%, 4%);

  /* ── Status Colors ── */
  --color-ok:    hsl(150, 80%, 60%);
  --color-ok-f:  hsl(40,  0%,  4%);
  --color-err:   hsl(0,   80%, 60%);
  --color-err-f: hsl(40,  0%,  4%);
  --color-war:   hsl(50,  80%, 60%);
  --color-war-f: hsl(40,  0%,  4%);
  --color-inf:   hsl(200, 80%, 60%);
  --color-inf-f: hsl(40,  0%,  4%);

  /* ── Surface Colors (للمشاريع التي تحتاج طبقات متعددة) ── */
  --color-surface:      hsl(40, 0%, 100%);
  --color-surface-f:    hsl(40, 0%, 4%);
  --color-surface-alt:  hsl(40, 0%, 97%);

  /* ── Border Colors ── */
  --color-border:       hsl(40, 0%, 85%);
  --color-border-focus: var(--color-py);

  /* ── Interactive Colors ── */
  --color-hover:   hsla(40, 0%, 4%, 0.04);
  --color-active:  hsla(40, 0%, 4%, 0.08);
  --color-overlay: hsla(40, 0%, 4%, 0.5);

  /* ── Sizing ── */
  --border-radius-sm:   0.25em;
  --border-radius:      0.5em;
  --border-radius-lg:   0.75em;
  --border-radius-xl:   1em;
  --border-radius-full: 9999px;

  /* ── Spacing ── */
  --spacing-xs:  0.25em;
  --spacing-sm:  0.5em;
  --spacing-md:  1em;
  --spacing-lg:  1.5em;
  --spacing-xl:  2em;
  --spacing-2xl: 3em;

  /* ── Typography ── */
  --font-family:    'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-family-ar: 'Segoe UI', 'Cairo', 'Tajawal', sans-serif;
  --font-family-mono: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;

  --font-size-xs:  0.75em;
  --font-size-sm:  0.875em;
  --font-size-md:  1em;
  --font-size-lg:  1.125em;
  --font-size-xl:  1.25em;
  --font-size-2xl: 1.5em;
  --font-size-3xl: 2em;

  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --line-height-tight:   1.25;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.75;

  /* ── Shadows ── */
  --shadow-sm: 0 0.0625em 0.125em  hsla(40, 0%, 4%, 0.08);
  --shadow-md: 0 0.25em  0.75em   hsla(40, 0%, 4%, 0.1);
  --shadow-lg: 0 0.5em   1.5em    hsla(40, 0%, 4%, 0.1);
  --shadow-xl: 0 1em     2.5em    hsla(40, 0%, 4%, 0.12);

  /* ── Transitions ── */
  --transition-fast:   150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow:   350ms ease;

  /* ── Z-Index ── */
  --z-base:    0;
  --z-above:   10;
  --z-sticky:  100;
  --z-overlay: 200;
  --z-modal:   300;
  --z-toast:   400;
  --z-tooltip: 500;
}
```

---

### 2.1 Dark Theme

```css
[data-theme="dark"],
.dark {
  /* ── Base Colors ── */
  --color-bg:   hsl(40, 0%, 4%);
  --color-bg-f: hsl(40, 0%, 94%);

  /* ── Brand Colors ── */
  --color-py:   hsl(40,  80%, 30%);
  --color-py-f: hsl(40,  94%, 94%);
  --color-sy:   hsl(340, 80%, 30%);
  --color-sy-f: hsl(40,  0%,  94%);
  --color-at:   hsl(200, 80%, 30%);
  --color-at-f: hsl(200, 80%, 94%);
  --color-md:   hsl(40,  15%, 30%);
  --color-md-f: hsl(40,  15%, 94%);

  /* ── Status Colors ── */
  --color-ok:    hsl(150, 80%, 30%);
  --color-ok-f:  hsl(40,  0%,  94%);
  --color-err:   hsl(0,   80%, 30%);
  --color-err-f: hsl(40,  0%,  94%);
  --color-war:   hsl(50,  80%, 30%);
  --color-war-f: hsl(40,  0%,  94%);
  --color-inf:   hsl(200, 80%, 30%);
  --color-inf-f: hsl(40,  0%,  94%);

  /* ── Surface Colors ── */
  --color-surface:     hsl(40, 0%, 8%);
  --color-surface-f:   hsl(40, 0%, 94%);
  --color-surface-alt: hsl(40, 0%, 10%);

  /* ── Border Colors ── */
  --color-border:      hsl(40, 0%, 20%);

  /* ── Interactive Colors ── */
  --color-hover:   hsla(40, 0%, 94%, 0.05);
  --color-active:  hsla(40, 0%, 94%, 0.1);
  --color-overlay: hsla(40, 0%, 4%,  0.7);

  /* ── Shadows (معكوسة للوضع الداكن) ── */
  --shadow-sm: 0 0.0625em 0.125em  hsla(40, 0%, 0%, 0.3);
  --shadow-md: 0 0.25em  0.75em   hsla(40, 0%, 0%, 0.4);
  --shadow-lg: 0 0.5em   1.5em    hsla(40, 0%, 0%, 0.5);
  --shadow-xl: 0 1em     2.5em    hsla(40, 0%, 0%, 0.6);
}
```

---

### 2.2 تخصيص الـ Brand لمشروعك

> انسخ هذا القسم وعدّل القيم لتناسب هوية مشروعك.

```css
/* مثال: مشروع بـ Brand أزرق */
:root {
  --color-py:   hsl(210, 80%, 55%);
  --color-py-f: hsl(210, 80%, 98%);
  --color-sy:   hsl(260, 70%, 55%);
  --color-sy-f: hsl(40,  0%,  98%);
}
```

---

## 3. قواعد Typography

```
h1 — العنوان الرئيسي:  font-size: var(--font-size-2xl), font-weight: 700, line-height: var(--line-height-tight)
h2 — العنوان الثانوي: font-size: var(--font-size-xl),  font-weight: 600, line-height: var(--line-height-tight)
h3 — العنوان الثالث:  font-size: var(--font-size-lg),  font-weight: 600, line-height: var(--line-height-normal)
p  — النص الأساسي:    font-size: var(--font-size-md),  font-weight: 400, line-height: var(--line-height-normal)
    النص الصغير:      font-size: var(--font-size-sm),  font-weight: 400, line-height: var(--line-height-normal)
    النص المساعد:     font-size: var(--font-size-xs),  font-weight: 400, color: var(--color-md-f)
code — الكود:          font-family: var(--font-family-mono), font-size: var(--font-size-sm)
```

---

## 4. Layout System

### 4.1 الـ Layout الأساسي (Web / Desktop)

```
┌─────────────────────────────────────┐
│         Header / Title Bar          │
├──────────────┬──────────────────────┤
│              │                      │
│   Sidebar    │    Main Content      │
│  (اختياري)   │      (flex: 1)       │
│              │                      │
└──────────────┴──────────────────────┘
```

```css
/* Layout عام */
.app-layout {
  display:        flex;
  flex-direction: column;
  min-height:     100vh;
  background:     var(--color-bg);
  color:          var(--color-bg-f);
  font-family:    var(--font-family);
  font-size:      1rem; /* القاعدة لجميع الـ em */
}

.app-body {
  display: flex;
  flex:    1;
  overflow: hidden;
}

.app-sidebar {
  width:    15em;         /* عدّل حسب المشروع */
  flex-shrink: 0;
  overflow: auto;
}

.app-content {
  flex:     1;
  overflow: auto;
  padding:  var(--spacing-lg);
}
```

### 4.2 Container System

```css
.container {
  width:     100%;
  max-width: 75em;        /* 1200px */
  margin-inline: auto;
  padding-inline: var(--spacing-lg);
}

.container-sm  { max-width: 40em;  }   /* 640px  */
.container-md  { max-width: 56em;  }   /* 896px  */
.container-lg  { max-width: 75em;  }   /* 1200px */
.container-xl  { max-width: 90em;  }   /* 1440px */
.container-full{ max-width: 100%;  }
```

---

## 5. قواعد المكونات

### 5.1 Buttons

```
أنواع الأزرار:

Primary:   bg: var(--color-py),  color: var(--color-py-f), hover: opacity 90%
Secondary: bg: transparent,      border: 0.0625em solid var(--color-md), hover: var(--color-hover)
Accent:    bg: var(--color-at),  color: var(--color-at-f), hover: opacity 90%
Danger:    bg: var(--color-err), color: var(--color-err-f), hover: opacity 90%
Ghost:     bg: transparent,      hover: var(--color-hover)
Link:      bg: transparent,      color: var(--color-py), text-decoration: underline
```

```
الأحجام:

sm:  padding: 0.25em 0.75em,  font-size: var(--font-size-sm)
md:  padding: 0.5em 1em,      font-size: var(--font-size-md)   ← الافتراضي
lg:  padding: 0.75em 1.5em,   font-size: var(--font-size-lg)
xl:  padding: 1em 2em,        font-size: var(--font-size-xl)

border-radius: var(--border-radius)
transition:    var(--transition-fast)
cursor:        pointer
disabled:      opacity: 0.5, cursor: not-allowed
```

### 5.2 Inputs & Form Elements

```
border:        0.0625em solid var(--color-border)
border-radius: var(--border-radius)
padding:       0.5em 0.75em
font-size:     var(--font-size-md)
background:    var(--color-surface)
color:         var(--color-bg-f)
transition:    border-color var(--transition-fast)
width:         100% (افتراضياً)

focus:
  outline:      none
  border-color: var(--color-py)
  box-shadow:   0 0 0 0.1875em hsla(from var(--color-py) h s l / 0.2)

error:
  border-color: var(--color-err)
  box-shadow:   0 0 0 0.1875em hsla(from var(--color-err) h s l / 0.2)

success:
  border-color: var(--color-ok)

disabled:
  opacity:  0.6
  cursor:   not-allowed
  background: var(--color-surface-alt)

Label:
  font-size:   var(--font-size-sm)
  font-weight: var(--font-weight-medium)
  margin-bottom: var(--spacing-xs)

Helper Text:
  font-size: var(--font-size-xs)
  color:     var(--color-md-f)
  margin-top: var(--spacing-xs)
```

### 5.3 Cards

```
background:    var(--color-surface)
border:        0.0625em solid var(--color-border)
border-radius: var(--border-radius-lg)
box-shadow:    var(--shadow-sm)
padding:       var(--spacing-lg)
transition:    box-shadow var(--transition-fast)

hover (اختياري):
  box-shadow:    var(--shadow-md)
  border-color:  var(--color-py)
```

### 5.4 Dialog / Modal

```
overlay:
  position:        fixed
  inset:           0
  background:      var(--color-overlay)
  backdrop-filter: blur(0.25em)
  z-index:         var(--z-overlay)

dialog:
  background:    var(--color-surface)
  border-radius: var(--border-radius-lg)
  box-shadow:    var(--shadow-xl)
  padding:       var(--spacing-xl)
  max-width:     30em
  width:         90%
  z-index:       var(--z-modal)

animation:
  open:  opacity 0→1 + translateY(−1em→0), duration: 200ms ease-out
  close: opacity 1→0 + translateY(0→−1em), duration: 150ms ease-in
```

### 5.5 Toast / Notifications

```
موقع:    bottom-right (LTR) / bottom-left (RTL)
z-index: var(--z-toast)
gap:     var(--spacing-sm) (بين التوستات المتعددة)

toast container:
  padding:       var(--spacing-md)
  border-radius: var(--border-radius)
  background:    var(--color-surface)
  box-shadow:    var(--shadow-lg)
  min-width:     18em
  max-width:     25em

أنواع:
  success: border-inline-start: 0.1875em solid var(--color-ok)
  error:   border-inline-start: 0.1875em solid var(--color-err)
  warning: border-inline-start: 0.1875em solid var(--color-war)
  info:    border-inline-start: 0.1875em solid var(--color-inf)

animation:
  in:  translateX(100%) → 0 (LTR), duration: 250ms ease-out
  out: opacity 1 → 0,              duration: 200ms ease-in
```

### 5.6 Badges & Tags

```
padding:       0.125em 0.5em
border-radius: var(--border-radius-full)
font-size:     var(--font-size-xs)
font-weight:   var(--font-weight-medium)

أنواع (تتوافق مع Status Colors):
  default: bg: var(--color-md),  color: var(--color-md-f)
  primary: bg: var(--color-py),  color: var(--color-py-f)
  success: bg: var(--color-ok),  color: var(--color-ok-f)
  error:   bg: var(--color-err), color: var(--color-err-f)
  warning: bg: var(--color-war), color: var(--color-war-f)
  info:    bg: var(--color-inf), color: var(--color-inf-f)
```

### 5.7 Dropdown / Select Menu

```
background:    var(--color-surface)
border:        0.0625em solid var(--color-border)
border-radius: var(--border-radius)
box-shadow:    var(--shadow-md)
z-index:       var(--z-above)
min-width:     10em

item:
  padding:    0.5em var(--spacing-md)
  transition: background var(--transition-fast)
  cursor:     pointer

  hover:
    background: var(--color-hover)

  active / selected:
    background: var(--color-active)
    color:      var(--color-py)
    font-weight: var(--font-weight-medium)
```

### 5.8 Skeleton Loader

```
background:  var(--color-surface-alt)
border-radius: var(--border-radius)
animation:   pulse 1.5s ease-in-out infinite

@keyframes pulse {
  0%, 100% { opacity: 1;   }
  50%       { opacity: 0.4; }
}
```

---

## 6. Responsive Rules

```
Breakpoints:

xs:  < 480px    → موبايل صغير
sm:  480–639px  → موبايل
md:  640–1023px → تابلت / نافذة صغيرة
lg:  1024–1279px → لابتوب
xl:  1280–1535px → شاشة كبيرة
2xl: ≥ 1536px   → شاشة عريضة

الاستخدام:
@media (max-width: 39.9375em)  { /* xs */ }
@media (min-width: 40em)       { /* sm */ }
@media (min-width: 40em) and (max-width: 63.9375em) { /* sm only */ }
@media (min-width: 64em)       { /* lg */ }
```

```
مبادئ التجاوب:

xs/sm: padding مخفَّف، عناصر ثانوية مخفية، layout أحادي العمود
md:    layout طبيعي، sidebar قابلة للطي
lg+:   layout موسع، sidebar ثابتة

الحجم الأدنى للـ Touch Target: 2.75em × 2.75em
```

---

## 7. RTL Rules

```css
/* تطبيق RTL على مستوى الـ html */
html[dir="rtl"] {
  direction:  rtl;
  text-align: right;
}

[dir="rtl"] {
  font-family: var(--font-family-ar);
}

/* استخدام Logical Properties دائماً */
.element {
  margin-inline-start:  1em;  /* بدل margin-left  */
  margin-inline-end:    1em;  /* بدل margin-right */
  padding-inline-start: 1em;  /* بدل padding-left */
  padding-inline-end:   1em;  /* بدل padding-right */
  border-inline-start:  0.0625em solid var(--color-border); /* بدل border-left */
  inset-inline-start:   0;    /* بدل left: 0      */
}

/* Icons تحتاج mirror في RTL */
[dir="rtl"] .icon-directional {
  transform: scaleX(-1);
}

/* Toast — الموقع يتغير حسب الاتجاه */
[dir="ltr"] .toast-container { inset-inline-end: var(--spacing-lg); }
[dir="rtl"] .toast-container { inset-inline-start: var(--spacing-lg); }
```

---

## 8. Animation Rules

```
لا تستخدم animation إلا عند الضرورة القصوى.

المسموح به:
  - opacity:   0 → 1               (fade in/out)
  - transform: translateY(−0.5em) → 0  (slide in)
  - transform: scale(0.95) → 1         (pop in)
  - width/height transitions           (collapse/expand)

المدة القصوى:  300ms
Easing:        ease / ease-out (للدخول) — ease-in (للخروج)

احترام إعدادات المستخدم (إلزامي):
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration:   1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration:  1ms !important;
  }
}
```

---

## 9. Accessibility Rules

```
الإلزامي في جميع المشاريع:

- جميع الأزرار التفاعلية لها aria-label واضح.
- جميع الصور لها alt (فارغ alt="" للصور الزخرفية).
- جميع الـ Inputs لها <label> مرتبط بـ htmlFor / for.
- Keyboard Navigation يعمل بالكامل (Tab, Shift+Tab, Enter, Space, Escape).
- Focus Ring واضح وغير مخفي — (outline: none) محظور بدون بديل مرئي.
- اللون ليس المعيار الوحيد لنقل المعلومة (أضف أيقونة أو نص داعم).
- نسبة التباين لا تقل عن 4.5:1 للنصوص العادية، 3:1 للنصوص الكبيرة.
- الـ Dialog / Modal:
    · يستعيد Focus على أول عنصر تفاعلي عند الفتح.
    · يعيد Focus للعنصر المُشغِّل عند الإغلاق.
    · يحصر الـ Tab داخله (Focus Trap).
- الـ Toast يحمل role="alert" أو aria-live="polite".
- الـ Loading يحمل aria-busy="true" و aria-label.
- قوائم الـ Dropdown تتبع ARIA pattern: role="listbox" / "menu".
```

---

## 10. قواعد Tailwind (اختياري)

> طبّق هذا القسم إن كان المشروع يستخدم Tailwind CSS.

```
المبادئ:
- CSS Variables هي المصدر الوحيد للقيم — لا قيم ثابتة في الكلاسات.
- تعريف الألوان في tailwind.config كـ CSS Variables.
- استخدام clsx + tailwind-merge دائماً لدمج الكلاسات.
- لا تستخدم arbitrary values [ ] إلا عند الضرورة القصوى.
- المكونات القابلة لإعادة الاستخدام لها cn() utility.
```

```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg:      'hsl(var(--color-bg)      / <alpha-value>)',
        primary: 'hsl(var(--color-py)      / <alpha-value>)',
        secondary:'hsl(var(--color-sy)     / <alpha-value>)',
        accent:  'hsl(var(--color-at)      / <alpha-value>)',
        muted:   'hsl(var(--color-md)      / <alpha-value>)',
        ok:      'hsl(var(--color-ok)      / <alpha-value>)',
        err:     'hsl(var(--color-err)     / <alpha-value>)',
        war:     'hsl(var(--color-war)     / <alpha-value>)',
        inf:     'hsl(var(--color-inf)     / <alpha-value>)',
        surface: 'hsl(var(--color-surface) / <alpha-value>)',
        border:  'hsl(var(--color-border)  / <alpha-value>)',
      },
      borderRadius: {
        sm:   'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius)',
        lg:   'var(--border-radius-lg)',
        xl:   'var(--border-radius-xl)',
        full: 'var(--border-radius-full)',
      },
      spacing: {
        xs:  'var(--spacing-xs)',
        sm:  'var(--spacing-sm)',
        md:  'var(--spacing-md)',
        lg:  'var(--spacing-lg)',
        xl:  'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
      },
      transitionDuration: {
        fast:   '150ms',
        normal: '250ms',
        slow:   '350ms',
      },
    },
  },
};
```

---

## 11. Desktop-Specific Rules (Electron / Tauri)

> طبّق هذا القسم **فقط** على مشاريع Desktop — تجاهله في مشاريع Web.

### 11.1 Custom Borderless Window — Title Bar

```
┌──────────────────────────────────────────────────────────┐
│ ▣  App Name                        [─]  [□]  [✕]       │
│ ← منطقة Drag (قابلة للسحب)  →    ← أزرار التحكم →     │
└──────────────────────────────────────────────────────────┘

الارتفاع:    2.5em   ← خصّص حسب المشروع
الخلفية:    var(--color-bg)
الحد السفلي: 0.0625em solid var(--color-border)
```

### 11.2 تنفيذ منطقة السحب

```css
.titlebar {
  height:            2.5em;
  -webkit-app-region: drag;
  user-select:       none;
}

/* كل عنصر تفاعلي داخل التايتل بار يجب أن يكون no-drag */
.titlebar-controls,
.titlebar-controls *,
.titlebar-btn,
.titlebar-menu,
.titlebar-icon {
  -webkit-app-region: no-drag;
}
```

### 11.3 أزرار التحكم

```
الحجم الأدنى:  2em × 2em

Minimize:  hover → var(--color-hover)
Maximize:  hover → var(--color-hover)
Close:     hover → hsl(0, 80%, 45%)        ← Light
Close Dark:hover → hsl(0, 80%, 35%)        ← Dark
```

### 11.4 سلوك النافذة

| السلوك       | التنفيذ                                                     |
| ------------ | ----------------------------------------------------------- |
| Drag         | CSS `-webkit-app-region: drag`                              |
| Resize       | `frame: false` + native resize                              |
| Maximize     | `ipcRenderer` → `mainWindow.maximize()`                     |
| Restore      | `ipcRenderer` → `mainWindow.restore()`                      |
| Minimize     | `ipcRenderer` → `mainWindow.minimize()`                     |
| Double Click | `dblclick` على التايتل بار → toggle maximize                |
| System Menu  | Right Click → `Menu.buildFromTemplate`                      |
| Close        | `ipcRenderer` → حفظ الإعدادات → `mainWindow.close()`       |
| Shadow       | `hasShadow: true` في `BrowserWindow`                        |
| Snap         | يعمل تلقائياً مع `frame: false` في Electron                |

### 11.5 DPI Handling

```typescript
// main/index.ts
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', '1');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}
```

### 11.6 حفظ واستعادة حجم النافذة

```typescript
// عند الإغلاق
mainWindow.on('close', () => {
  const bounds      = mainWindow.getBounds();
  const isMaximized = mainWindow.isMaximized();
  settings.set('window_width',     String(bounds.width));
  settings.set('window_height',    String(bounds.height));
  settings.set('window_x',         String(bounds.x));
  settings.set('window_y',         String(bounds.y));
  settings.set('window_maximized', isMaximized ? '1' : '0');
});

// عند الفتح
const savedWidth   = Number(settings.get('window_width'))  || 1200;
const savedHeight  = Number(settings.get('window_height')) || 700;
const savedX       = Number(settings.get('window_x'));
const savedY       = Number(settings.get('window_y'));
const wasMaximized = settings.get('window_maximized') === '1';
```

### 11.7 دعم إصدارات Windows

| الإصدار        | مدعوم |
| -------------- | ----- |
| Windows 7 SP1+ | ✅    |
| Windows 8 / 8.1| ✅    |
| Windows 10     | ✅    |
| Windows 11     | ✅    |

---

## 12. قائمة مراجعة المشروع ✅

> تحقّق من هذه النقاط قبل أي إصدار.

```
التصميم:
  [ ] جميع الألوان مُعرَّفة كـ CSS Variables بصيغة HSL/HSLA
  [ ] Dark Theme يعمل بشكل كامل
  [ ] جميع القيم بوحدة em/rem (لا px خارج الـ font-size الجذري)
  [ ] Brand Colors مُخصَّصة لهذا المشروع

التجاوب:
  [ ] يعمل على جميع الـ Breakpoints المُعرَّفة
  [ ] Touch Targets ≥ 2.75em
  [ ] لا overflow أفقي على الشاشات الصغيرة

RTL:
  [ ] Logical Properties مُستخدَمة بدل Left/Right
  [ ] الخطوط العربية مُعيَّنة لـ [dir="rtl"]
  [ ] الـ Icons الاتجاهية مُقلوبة في RTL

Accessibility:
  [ ] aria-label على جميع الأزرار
  [ ] alt على جميع الصور
  [ ] label مرتبط بكل input
  [ ] Keyboard Navigation مختبَر
  [ ] Focus Ring مرئي
  [ ] نسبة التباين ≥ 4.5:1

الأداء:
  [ ] prefers-reduced-motion مُطبَّق
  [ ] لا animations غير ضرورية
  [ ] Skeleton Loaders للمحتوى البطيء

Desktop فقط:
  [ ] Title Bar drag يعمل
  [ ] أزرار التحكم تعمل
  [ ] حفظ واستعادة حجم النافذة يعمل
  [ ] DPI Handling مُطبَّق
```