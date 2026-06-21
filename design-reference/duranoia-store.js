// DuraNoia client-side store — persists progress, resume, and showcase state
// in the browser's localStorage so the prototype behaves like a real app.
// Plain JS (no JSX). Load this BEFORE the babel scripts on every page.
(function () {
  var NS = "duranoia:";

  // Real lesson counts per model slug (from the lesson catalog).
  var LESSON_COUNTS = {
    chatgpt: 7, claude: 6, gemini: 6, copilot: 6, cursor: 6,
    midjourney: 6, perplexity: 6, llama: 6, deepseek: 6, grok: 6
  };

  var DStore = {
    LESSON_COUNTS: LESSON_COUNTS,

    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(NS + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch (e) {}
    },

    // ---- Lesson progress: { slug: [completedIndices] } ----
    allProgress: function () { return this.get("progress", null); },
    completed: function (slug) {
      var p = this.get("progress", {});
      return p[slug] || [];
    },
    isCompleted: function (slug, idx) {
      return this.completed(slug).indexOf(idx) !== -1;
    },
    setCompletedSet: function (slug, arr) {
      var p = this.get("progress", {});
      p[slug] = arr.slice().sort(function (a, b) { return a - b; });
      this.set("progress", p);
    },
    toggleLesson: function (slug, idx) {
      var arr = this.completed(slug).slice();
      var i = arr.indexOf(idx);
      if (i === -1) arr.push(idx); else arr.splice(i, 1);
      this.setCompletedSet(slug, arr);
      return arr;
    },
    doneCount: function (slug) { return this.completed(slug).length; },
    totalFor: function (slug) { return LESSON_COUNTS[slug] || 6; },

    // ---- Resume: last lesson viewed ----
    resume: function () { return this.get("resume", null); },
    setResume: function (r) { this.set("resume", r); },

    // ---- One-time seed so the dashboard looks populated on first visit ----
    seedIfEmpty: function () {
      if (this.get("progress", null) === null) {
        // Claude finished; ChatGPT partway; light starts elsewhere.
        this.set("progress", {
          claude:     [0, 1, 2, 3, 4, 5],
          chatgpt:    [0, 1, 2],
          perplexity: [0],
          gemini:     [0]
        });
      }
      if (this.get("resume", null) === null) {
        this.set("resume", {
          slug: "chatgpt", model: "ChatGPT", mark: "@chatgpt",
          lessonIdx: 3, lessonNo: "04",
          lessonTitle: "Voice mode for thinking out loud",
          level: "Practical", dur: "6:02"
        });
      }
    },

    // ---- Showcase state ----
    showcase: function () {
      return this.get("showcase", {
        likedByMe: [], likes: {}, comments: {},
        hidden: [], deleted: [], submitted: []
      });
    },
    setShowcase: function (s) { this.set("showcase", s); },
    toggleLike: function (id, baseLikes) {
      var s = this.showcase();
      var i = s.likedByMe.indexOf(id);
      if (i === -1) { s.likedByMe.push(id); s.likes[id] = (s.likes[id] != null ? s.likes[id] : baseLikes) + 1; }
      else { s.likedByMe.splice(i, 1); s.likes[id] = (s.likes[id] != null ? s.likes[id] : baseLikes) - 1; }
      this.setShowcase(s);
      return s;
    },
    addComment: function (id, comment) {
      var s = this.showcase();
      if (!s.comments[id]) s.comments[id] = [];
      s.comments[id].push(comment);
      this.setShowcase(s);
      return s;
    },
    setHidden: function (id, hidden) {
      var s = this.showcase();
      var i = s.hidden.indexOf(id);
      if (hidden && i === -1) s.hidden.push(id);
      if (!hidden && i !== -1) s.hidden.splice(i, 1);
      this.setShowcase(s);
      return s;
    },
    addDeleted: function (id) {
      var s = this.showcase();
      if (s.deleted.indexOf(id) === -1) s.deleted.push(id);
      this.setShowcase(s);
      return s;
    },
    addSubmitted: function (project) {
      var s = this.showcase();
      s.submitted.unshift(project);
      this.setShowcase(s);
      return s;
    }
  };

  window.DStore = DStore;
  // Seed demo progress on first visit so the experience looks populated,
  // then real interactions persist on top of it.
  try { DStore.seedIfEmpty(); } catch (e) {}
})();
