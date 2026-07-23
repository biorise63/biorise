const state = {
  articles: [],
  selectedId: null,
  dirty: false,
  lastSavedAt: null,
}

const listEl = document.getElementById('articles-list')
const editorRoot = document.getElementById('editor-root')
const countPill = document.getElementById('count-pill')
const publishedPill = document.getElementById('published-pill')
const saveBtn = document.getElementById('save-btn')
const newArticleBtn = document.getElementById('new-article-btn')

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Zа-яА-Я0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function filled(value) {
  if (Array.isArray(value)) return value.length > 0
  return Boolean(String(value || '').trim())
}

function articleProgress(article) {
  const fields = [article.keyword, article.title, article.description, article.h1, article.url]
  return fields.filter(filled).length
}

function updateStats() {
  countPill.textContent = `Статей: ${state.articles.length}`
  publishedPill.textContent = `Опубликовано: ${state.articles.filter((a) => a.published).length}`
}

function markDirty() {
  state.dirty = true
  renderEditor()
  renderList()
}

function currentArticle() {
  return state.articles.find((item) => item.id === state.selectedId) || null
}

function renderList() {
  listEl.innerHTML = ''

  state.articles.forEach((article) => {
    const card = document.createElement('button')
    card.type = 'button'
    card.className = `article-card ${article.id === state.selectedId ? 'active' : ''}`
    card.addEventListener('click', () => {
      state.selectedId = article.id
      renderList()
      renderEditor()
    })

    const progress = articleProgress(article)
    const titleFilled = filled(article.title)
    const h1Filled = filled(article.h1)
    const descFilled = filled(article.description)

    card.innerHTML = `
      <h3>${escapeHtml(article.keyword || 'Новая статья')}</h3>
      <p>${escapeHtml(article.title || 'Title пока не заполнен')}</p>
      <div class="article-meta">
        <span class="mini-pill ${titleFilled ? 'done' : 'empty'}">Title ${titleFilled ? 'есть' : 'пустой'}</span>
        <span class="mini-pill ${h1Filled ? 'done' : 'empty'}">H1 ${h1Filled ? 'есть' : 'пустой'}</span>
        <span class="mini-pill ${descFilled ? 'done' : 'empty'}">Description ${descFilled ? 'есть' : 'пустой'}</span>
        <span class="mini-pill ${article.published ? 'done' : 'empty'}">${article.published ? 'Опубликована' : 'Не опубликована'}</span>
        <span class="mini-pill">Заполнено: ${progress}/5</span>
      </div>
    `

    listEl.appendChild(card)
  })

  updateStats()
}

function renderEditor() {
  const article = currentArticle()
  if (!article) {
    editorRoot.innerHTML = '<div class="empty-state">Выбери статью слева или создай новую.</div>'
    return
  }

  editorRoot.innerHTML = `
    <div class="editor-grid">
      <div class="field">
        <label for="keyword">Основной keyword</label>
        <input id="keyword" value="${escapeAttr(article.keyword || '')}" />
      </div>
      <div class="field">
        <label for="priority">Приоритет</label>
        <select id="priority">
          ${['низкий', 'средний', 'высокий'].map((item) => `<option value="${item}" ${article.priority === item ? 'selected' : ''}>${item}</option>`).join('')}
        </select>
      </div>

      <div class="field">
        <label for="intent">Интент</label>
        <input id="intent" value="${escapeAttr(article.intent || '')}" />
      </div>
      <div class="field">
        <label for="status">Статус в работе</label>
        <select id="status">
          ${['idea', 'brief', 'draft', 'review', 'ready'].map((item) => `<option value="${item}" ${article.status === item ? 'selected' : ''}>${item}</option>`).join('')}
        </select>
      </div>

      <div class="field full">
        <label for="secondaryKeywords">Дополнительные запросы</label>
        <textarea id="secondaryKeywords" placeholder="Каждый запрос с новой строки">${escapeHtml((article.secondaryKeywords || []).join('\n'))}</textarea>
        <div class="hint">По одному запросу на строку.</div>
      </div>

      <div class="field full">
        <label for="title">Title</label>
        <textarea id="title">${escapeHtml(article.title || '')}</textarea>
      </div>

      <div class="field full">
        <label for="description">Description</label>
        <textarea id="description">${escapeHtml(article.description || '')}</textarea>
      </div>

      <div class="field full">
        <label for="h1">H1</label>
        <input id="h1" value="${escapeAttr(article.h1 || '')}" />
      </div>

      <div class="field full">
        <label for="url">URL / slug</label>
        <input id="url" value="${escapeAttr(article.url || '')}" />
      </div>

      <div class="field full">
        <label for="sections">Основные разделы статьи</label>
        <textarea id="sections" placeholder="Каждый H2/H3 с новой строки">${escapeHtml((article.sections || []).join('\n'))}</textarea>
      </div>

      <div class="field full">
        <label for="internalLinks">Внутренние ссылки / анкоры</label>
        <textarea id="internalLinks" placeholder="Каждый анкор или URL с новой строки">${escapeHtml((article.internalLinks || []).join('\n'))}</textarea>
      </div>

      <div class="field full">
        <label for="notes">Заметки</label>
        <textarea id="notes">${escapeHtml(article.notes || '')}</textarea>
      </div>

      <div class="field full">
        <div class="checkbox-row">
          <input type="checkbox" id="published" ${article.published ? 'checked' : ''} />
          <label for="published">Статья опубликована</label>
        </div>
      </div>
    </div>

    <div class="save-row">
      <div class="status-text">${state.dirty ? 'Есть несохраненные изменения' : state.lastSavedAt ? `Сохранено: ${state.lastSavedAt}` : 'Изменений пока нет'}</div>
      <div class="toolbar">
        <button class="btn secondary" id="duplicate-btn">Дублировать</button>
        <button class="btn secondary" id="delete-btn">Удалить</button>
        <button class="btn" id="save-inline-btn">Сохранить</button>
      </div>
    </div>
  `

  bindEditor(article)
}

function bindEditor(article) {
  const map = {
    keyword: 'keyword',
    priority: 'priority',
    intent: 'intent',
    status: 'status',
    title: 'title',
    description: 'description',
    h1: 'h1',
    url: 'url',
    notes: 'notes',
  }

  Object.entries(map).forEach(([id, field]) => {
    const el = document.getElementById(id)
    el.addEventListener('input', (event) => {
      article[field] = event.target.value
      if (field === 'keyword' && !filled(article.url)) {
        article.url = `/blog/${slugify(event.target.value)}/`
      }
      article.updatedAt = today()
      markDirty()
      if (field === 'keyword') renderEditor()
    })
  })

  document.getElementById('secondaryKeywords').addEventListener('input', (event) => {
    article.secondaryKeywords = toList(event.target.value)
    article.updatedAt = today()
    markDirty()
  })

  document.getElementById('sections').addEventListener('input', (event) => {
    article.sections = toList(event.target.value)
    article.updatedAt = today()
    markDirty()
  })

  document.getElementById('internalLinks').addEventListener('input', (event) => {
    article.internalLinks = toList(event.target.value)
    article.updatedAt = today()
    markDirty()
  })

  document.getElementById('published').addEventListener('change', (event) => {
    article.published = event.target.checked
    article.updatedAt = today()
    markDirty()
  })

  document.getElementById('save-inline-btn').addEventListener('click', saveArticles)
  document.getElementById('duplicate-btn').addEventListener('click', () => duplicateArticle(article))
  document.getElementById('delete-btn').addEventListener('click', () => deleteArticle(article.id))
}

function toList(value) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean)
}

function duplicateArticle(article) {
  const copy = JSON.parse(JSON.stringify(article))
  copy.id = `${article.id}-copy-${Date.now()}`
  copy.keyword = `${article.keyword} (копия)`
  copy.published = false
  copy.createdAt = today()
  copy.updatedAt = today()
  state.articles.unshift(copy)
  state.selectedId = copy.id
  markDirty()
  renderList()
  renderEditor()
}

function deleteArticle(id) {
  const ok = window.confirm('Удалить эту статью из планнера?')
  if (!ok) return
  const index = state.articles.findIndex((item) => item.id === id)
  if (index === -1) return
  state.articles.splice(index, 1)
  state.selectedId = state.articles[0]?.id || null
  markDirty()
  renderList()
  renderEditor()
}

function createArticle() {
  const base = `article-${Date.now()}`
  const article = {
    id: base,
    keyword: '',
    secondaryKeywords: [],
    priority: 'средний',
    intent: 'информационный',
    status: 'idea',
    published: false,
    title: '',
    h1: '',
    description: '',
    url: '',
    sections: [],
    internalLinks: [],
    notes: '',
    source: 'manual',
    createdAt: today(),
    updatedAt: today(),
  }
  state.articles.unshift(article)
  state.selectedId = article.id
  markDirty()
  renderList()
  renderEditor()
}

async function saveArticles() {
  saveBtn.disabled = true
  try {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articles: state.articles }),
    })
    if (!response.ok) throw new Error('Save failed')
    const payload = await response.json()
    state.dirty = false
    state.lastSavedAt = new Date(payload.updatedAt).toLocaleString('ru-RU')
    renderList()
    renderEditor()
  } catch (error) {
    window.alert('Не удалось сохранить articles.json')
  } finally {
    saveBtn.disabled = false
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", '&#39;')
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

async function loadArticles() {
  const response = await fetch('/api/articles')
  const payload = await response.json()
  state.articles = payload.articles || []
  state.selectedId = state.articles[0]?.id || null
  renderList()
  renderEditor()
}

saveBtn.addEventListener('click', saveArticles)
newArticleBtn.addEventListener('click', createArticle)
loadArticles()
