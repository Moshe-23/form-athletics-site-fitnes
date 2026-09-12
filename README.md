# FORM / ATHLETICS

Концепт-сайт премиаль-фитнес-студии: вымышленный бренд, редакционный (editorial) стиль, полностью офлайн-работоспособный.

## Что внутри

- **Главная** с hero «TRAIN WITH PURPOSE.»
- **Training** — три направления: Strength / Conditioning / Personal
- **Philosophy** — блок «CONSISTENCY OVER INTENSITY.»
- **Coaches** — три тренера
- **Membership** — три тарифа
- **Расписание недели** — с фильтром по типу (strength / conditioning / personal)
- **Booking-форма** — валидация, выбор сессии из расписания (дата и тип подставляются автоматически), success-состояние
- **FAQ** — аккордеон
- Мобильное меню, smooth-scroll, reveal-анимации, off-canvas-меню

## Технологии

- Чистый HTML + CSS + JavaScript, без фреймворков и зависимостей
- Веб-шрифты встроены в `assets/css/fonts.css` как base64 (работает через `file://` и офлайн)
- Фото — B&W-стилизованные, Wikimedia Commons (CC)

## Как запустить

Любой из способов:

1. **Просто открыть**: двойной клик по `index.html`
2. **Локальный сервер** (опционально):
   ```bash
   # Python
   python -m http.server 8000
   # и открыть http://localhost:8000
   ```
   ```bash
   # Node
   npx serve .
   ```

## Структура

```
form-athletics/
├── index.html          # страница
├── README.md
└── assets/
    ├── css/
    │   ├── main.css    # дизайн-система и стили
    │   └── fonts.css   # @font-face (base64)
    ├── js/
    │   └── main.js     # вся интерактивность
    └── img/            # локальные изображения
```

## Публикация (GitHub Pages)

Репозиторий с названием `form-athletics` → Settings → Pages → Deploy from a branch → `main` / `/(root)`. Проект использует относительные пути, поэтому после деплоя работает по адресу `https://<логин>.github.io/form-athletics/` сразу, без дополнительных настроек.

> Весь контент сайта — вымышленный. Фотографии — Wikimedia Commons.