# DESIGN_RULES — قواعد التصميم

> المشروع: Electron Desktop TODO
> الإصدار: v0.0.1
> آخر تحديث: 2025

---

## 1. مبادئ التصميم العامة

- التصميم حديث، نظيف، ومريح للعين.
- مرونة كاملة في التخصيص عبر CSS Variables.
- متجاوب مع جميع أحجام النوافذ.
- دعم كامل لـ RTL (العربية) و LTR (الإنجليزية).
- دعم Theme Light وDark.
- Accessibility أساسية (ARIA, Focus, Keyboard Navigation).
- لا توجد animations مبالغ فيها (أداء أولاً).
- يجب عدم استخدام وحدة القياس px و يفضل دائماً em/rem.
- طريقة استخدام الالوان يجب ان تكون HSL/HSLA, عدم استخدام اي طريقة اخري (Color Names, نظام HEX, نظام RGB/RGBA, ...). 

---

## 2. نظام الألوان (CSS Variables)

```css
/* src/styles/globals.css */

:root {
  /* ── Base Colors ── */
  --color-bg:   hsl(40, 0%, 94%);
  --color-bg-f: hsl(40, 0%, 4%);

  /* ── Brand Colors ── */
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

  /* ── Window Colors ── */
  --color-titlebar:        var(--color-bg);
  --color-titlebar-text:   var(--color-bg-f);
  --color-titlebar-border: hsl(40, 0%, 85%);
  --color-window-border:   hsl(40, 0%, 80%);
  --color-window-shadow:   hsla(40, 0%, 4%, 0.15);

  /* ── Component Colors ── */
  --color-todo-completed:  var(--color-md);
  --color-checkbox-active: var(--color-py);
  --color-hover:           hsla(40, 0%, 4%, 0.04);
  --color-active:          hsla(40, 0%, 4%, 0.08);

  --color-overlay:          hsla(40, 0%, 4%, 0.5);

  /* ── Sizing ── */
  --titlebar-height:    2.5em;
  --sidebar-width:      15em;
  --border-radius-sm:   0.25em;
  --border-radius:      0.5em;
  --border-radius-lg:   0.75em;
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
  --font-size-xs:   0.75em;
  --font-size-sm:   0.875em;
  --font-size-md:   1em;
  --font-size-lg:   1.125em;
  --font-size-xl:   1.25em;
  --font-size-2xl:  1.5em;
  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;
  --line-height-tight:    1.25;
  --line-height-normal:   1.5;
  --line-height-relaxed:  1.75;

  /* ── Shadows ── */
  --shadow-sm: 0 0.0625em 0.01875em  hsla(40, 0%, 4%, 0.08);
  --shadow-md: 0 0.25em 0.75em hsla(40, 0%, 4%, 0.1);
  --shadow-lg: 0 0.5em 1.5em hsla(40, 0%, 4%, 0.1);

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

/* ── Dark Theme ── */
[data-theme="dark"], .dark {
  --color-bg:   hsl(40, 0%, 4%);
  --color-bg-f: hsl(40, 0%, 94%);

  --color-py:   hsl(40,  80%, 30%);
  --color-py-f: hsl(40,  94%, 94%);
  --color-sy:   hsl(340, 80%, 30%);
  --color-sy-f: hsl(40,  0%,  94%);
  --color-at:   hsl(200, 80%, 30%);
  --color-at-f: hsl(200, 80%, 94%);
  --color-md:   hsl(40,  15%, 30%);
  --color-md-f: hsl(40,  15%, 94%);

  --color-ok:    hsl(150, 80%, 30%);
  --color-ok-f:  hsl(40,  0%,  94%);
  --color-err:   hsl(0,   80%, 30%);
  --color-err-f: hsl(40,  0%,  94%);
  --color-war:   hsl(50,  80%, 30%);
  --color-war-f: hsl(40,  0%,  94%);
  --color-inf:   hsl(200, 80%, 30%);
  --color-inf-f: hsl(40,  0%,  94%);

  --color-titlebar-border:  hsl(40, 0%, 15%);
  --color-window-border:    hsl(40, 0%, 20%);
  --color-window-shadow:    hsla(40, 0%, 94%, 0.85);

  --color-hover:            hsla(40, 0%, 94%, 0.5);
  --color-active:           hsla(40, 0%, 94%, 0.8);

  --color-overlay:          hsla(40, 0%, 94%, 0.5);

  
  /* ── Shadows ── */
  --shadow-sm: 0 0.0625em 0.01875em  hsla(40, 0%, 94%, 0.8);
  --shadow-md: 0 0.25em 0.75em hsla(40, 0%, 94%, 0.8);
  --shadow-lg: 0 0.5em 1.5em hsla(40, 0%, 94%, 0.8);

}

/* ── RTL Support ── */
[dir="rtl"] {
  font-family: var(--font-family-ar);
}
```

---

## 3. قواعد Typography

```
العنوان الرئيسي:  font-size: var(--font-size-2xl), font-weight: 700
العنوان الثانوي: font-size: var(--font-size-xl),  font-weight: 600
العنوان الثالث:  font-size: var(--font-size-lg),  font-weight: 600
النص الأساسي:    font-size: var(--font-size-md),  font-weight: 400
النص الصغير:     font-size: var(--font-size-sm),  font-weight: 400
النص المساعد:    font-size: var(--font-size-xs),  font-weight: 400, color: var(--color-md-f)
```

---

## 4. Custom Borderless Window

### أهمية قصوى — متطلبات النافذة

يجب أن تعمل النافذة بشكل صحيح على:

- Windows 7 SP1+
- Windows 8 / 8.1
- Windows 10
- Windows 11

### 4.1 التصميم المرئي للـ Title Bar

```
┌──────────────────────────────────────────────────────────┐
│ ▣  TODO App                        [─]  [□]  [✕]       │
│ ← منطقة Drag (قابلة للسحب)  →    ← أزرار التحكم →     │
└──────────────────────────────────────────────────────────┘

الارتفاع:      var(--titlebar-height) = 2.5em
الخلفية:       var(--color-titlebar)
الحد السفلي:   0.0625em solid var(--color-titlebar-border)
```

### 4.2 تنفيذ منطقة السحب

```css
.titlebar {
  -webkit-app-region: drag;
  user-select: none;
}

.titlebar-controls,
.titlebar-controls * {
  -webkit-app-region: no-drag;
}

/* أي عنصر تفاعلي داخل التاتيلبار يجب no-drag */
.titlebar-btn,
.titlebar-menu,
.titlebar-icon {
  -webkit-app-region: no-drag;
}
```

### 4.3 أزرار التحكم

```
الحجم:          2em × 2em (على الأقل للـ Touch)
Minimize:       خلفية hover = var(--color-hover)
Maximize:       خلفية hover = var(--color-hover)
Close:          خلفية hover = #e81123 (لون Windows الأصلي)
Close (Dark):   خلفية hover = #c42b1c
```

### 4.4 سلوك النافذة

| السلوك       | التنفيذ                                            |
| ------------ | -------------------------------------------------- |
| Drag         | CSS -webkit-app-region: drag                       |
| Resize       | Electron frame: false → native resize              |
| Maximize     | ipcRenderer → mainWindow.maximize()                |
| Restore      | ipcRenderer → mainWindow.restore()                 |
| Minimize     | ipcRenderer → mainWindow.minimize()                |
| Double Click | يستمع TitleBar لـ dblclick → toggle maximize       |
| System Menu  | Right Click → ipcRenderer → Menu.buildFromTemplate |
| Close        | ipcRenderer → mainWindow.close() مع حفظ الإعدادات  |
| Shadow       | hasShadow: true في BrowserWindow                   |
| Snap         | يعمل تلقائياً مع frame: false في Electron          |

### 4.5 DPI Handling

```typescript
// apps/desktop/src/main/index.ts
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', '1');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}
```

### 4.6 حفظ واستعادة حجم النافذة

```typescript
// عند إغلاق النافذة
mainWindow.on('close', () => {
  const bounds = mainWindow.getBounds();
  const isMaximized = mainWindow.isMaximized();
  settings.set('window_width',     String(bounds.width));
  settings.set('window_height',    String(bounds.height));
  settings.set('window_x',         String(bounds.x));
  settings.set('window_y',         String(bounds.y));
  settings.set('window_maximized', isMaximized ? '1' : '0');
});

// عند فتح النافذة
const savedWidth     = Number(settings.get('window_width'))     || 1200;
const savedHeight    = Number(settings.get('window_height'))    || 700;
const savedX         = Number(settings.get('window_x'));
const savedY         = Number(settings.get('window_y'));
const wasMaximized   = settings.get('window_maximized') === '1';
```

---

## 5. قواعد المكونات

### 5.1 Buttons

```
Primary:   bg: var(--color-py),  color: var(--color-py-f), hover: opacity 90%
Secondary: bg: transparent, border: 0.0625em solid var(--color-md), hover: var(--color-hover)
Danger:    bg: var(--color-err), color: var(--color-err-f), hover: opacity 90%
Ghost:     bg: transparent, hover: var(--color-hover)
```

```
الحجم:
  sm:  padding: 0.25em 0.75em,  font-size: 0.875em
  md:  padding: 0.5em 1em,      font-size: 1em     (الافتراضي)
  lg:  padding: 0.75em 1.5em,   font-size: 1.125em

border-radius: var(--border-radius)
transition:    var(--transition-fast)
```

### 5.2 Inputs

```
border:        0.0625em solid var(--color-md)
border-radius: var(--border-radius)
padding:       0.5em 0.75em
font-size:     var(--font-size-md)
transition:    border-color var(--transition-fast)

focus:
  outline:      none
  border-color: var(--color-py)
  box-shadow:   0 0 0 0.1875em hsl(from var(--color-py) h s l / 0.2)

error:
  border-color: var(--color-err)
  box-shadow:   0 0 0 0.1875em hsl(from var(--color-err) h s l / 0.2)
```

### 5.3 Todo Item

```
padding:       0.75em 1em
border-radius: var(--border-radius)
border:        0.0625em solid var(--color-md)
margin-bottom: 0.5em
background:    var(--color-bg)
transition:    all var(--transition-fast)

hover:
  background:   var(--color-hover)
  border-color: var(--color-py)

completed:
  opacity:         0.6
  text-decoration: line-through
  color:           var(--color-md-f)
```

### 5.4 Dialog

```
overlay:
  background:      var(--color-overlay)
  backdrop-filter: blur(0.25em)
  z-index:         var(--z-modal)

dialog:
  background:    var(--color-bg)
  border-radius: var(--border-radius-lg)
  box-shadow:    var(--shadow-lg)
  padding:       1.5em
  max-width:     30em
  width:         90%
```

### 5.5 Toast

```
موقع:    bottom-right (LTR) / bottom-left (RTL)
z-index: var(--z-toast)

success: border-left: 0.1875em solid var(--color-ok)
error:   border-left: 0.1875em solid var(--color-err)
warning: border-left: 0.1875em solid var(--color-war)
info:    border-left: 0.1875em solid var(--color-inf)
```

---

## 6. Layout System

```
الـ Layout الرئيسي:
┌─────────────────────────────────────┐
│           Title Bar (2.5em)         │
├─────────────────────────────────────┤
│                                     │
│          Main Content Area          │
│           (flex: 1)                 │
│                                     │
└─────────────────────────────────────┘
```

```css
.app-layout {
  display:        flex;
  flex-direction: column;
  height:         100vh;
  overflow:       hidden;
  background:     var(--color-bg);
  color:          var(--color-bg-f);
  font-family:    var(--font-family);
  font-size:      16px; /* القاعدة لجميع الـ em */
}

.app-content {
  flex:     1;
  overflow: auto;
  padding:  var(--spacing-lg);
}
```

---

## 7. Responsive Rules

```
النافذة الدنيا:   800px × 500px
النافذة المثلى:   1200px × 700px

sm:  < 640px   → تخفيف الـ padding، إخفاء النصوص الثانوية
md:  640-1020.25em → Layout طبيعي
lg:  > 1020.25em  → Layout موسع
```

---

## 8. RTL Rules

```css
/* تطبيق RTL على مستوى الـ html */
html[dir="rtl"] {
  direction:  rtl;
  text-align: right;
}

/* استخدام Logical Properties */
.element {
  margin-inline-start: 1em;  /* بدل margin-left */
  padding-inline-end:  1em;  /* بدل padding-right */
  border-inline-start: ...;  /* بدل border-left */
}

/* Icons تحتاج mirror في RTL */
.icon-arrow {
  transform: scaleX(-1); /* في RTL فقط */
}
```

---

## 9. Animation Rules

```
لا تستخدم animation إلا عند الضرورة.

المسموح به:
- opacity: 0 → 1 (fade in)
- transform: translateY(-0.625em) → 0 (slide in)
- width/height transitions للـ collapse/expand

المدة القصوى:  300ms
Easing:        ease / ease-out

عند احترام إعدادات المستخدم:
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0ms !important; }
}
```

---

## 10. Accessibility Rules

```
- جميع الأزرار لها aria-label واضح.
- جميع الصور لها alt.
- جميع الـ Inputs لها label مرتبط بـ htmlFor.
- Keyboard Navigation يعمل بالكامل (Tab, Enter, Escape).
- Focus Ring واضح وغير مخفي (outline: none محظور بدون بديل).
- اللون ليس المعيار الوحيد لنقل المعلومة.
- الـ Dialog يستعيد Focus عند الإغلاق.
- الـ Toast يُقرأ بـ Screen Reader.
```

---

## 11. قواعد Tailwind

```
- CSS Variables هي المصدر الوحيد للقيم.
- تعريف الألوان في tailwind.config كـ CSS Variables.
- استخدام clsx + tailwind-merge دائماً.
- لا تستخدم arbitrary values إلا للضرورة.
- المكونات القابلة لإعادة الاستخدام لها cn() utility.

مثال:
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
