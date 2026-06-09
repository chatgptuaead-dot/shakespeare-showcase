/* =========================================================
   The Bard — Interactive Shakespeare Showcase
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  const TIMELINE = [
    { year: "1564", title: "A Star is Born in Stratford", body: "William Shakespeare is baptised on 26 April in Stratford-upon-Avon, the son of a glove-maker. His exact birthday is traditionally celebrated on 23 April — St George's Day." },
    { year: "1582", title: "A Hasty Marriage", body: "At just 18, William marries Anne Hathaway, who is 26 and already expecting. Their daughter Susanna arrives six months later, followed by twins Hamnet and Judith." },
    { year: "1592", title: "The London Stage Beckons", body: "Shakespeare is established enough in London that rival playwright Robert Greene insults him in print as an 'upstart crow' — our first solid record of his theatrical success." },
    { year: "1599", title: "The Globe Rises", body: "Shakespeare and his company build the legendary Globe Theatre on the Thames' south bank. Here Hamlet, Othello, King Lear and Macbeth would first thunder to life." },
    { year: "1616", title: "Exit, Pursued by Eternity", body: "Shakespeare dies on 23 April, aged 52, in the town of his birth. Seven years later, friends publish the First Folio — preserving 36 plays that might otherwise have been lost forever." }
  ];

  const PLAYS = [
    { title: "Hamlet", year: "c. 1600", genre: "tragedy", line: "A grieving prince weighs revenge, madness, and the meaning of being." },
    { title: "Macbeth", year: "c. 1606", genre: "tragedy", line: "Ambition and prophecy drag a Scottish lord into bloody ruin." },
    { title: "Othello", year: "c. 1603", genre: "tragedy", line: "Jealousy, whispered by a villain, destroys a noble general's love." },
    { title: "King Lear", year: "c. 1606", genre: "tragedy", line: "An aging king divides his kingdom — and his sanity unravels." },
    { title: "Romeo and Juliet", year: "c. 1595", genre: "tragedy", line: "Two young lovers defy a feud, and pay with their lives." },
    { title: "Julius Caesar", year: "c. 1599", genre: "tragedy", line: "Friendship and politics collide in the most famous betrayal in history." },
    { title: "A Midsummer Night's Dream", year: "c. 1596", genre: "comedy", line: "Lovers, fairies, and a weaver with a donkey's head tangle in a moonlit wood." },
    { title: "Twelfth Night", year: "c. 1601", genre: "comedy", line: "Shipwreck, disguise, and mistaken identity spark a riot of romance." },
    { title: "Much Ado About Nothing", year: "c. 1598", genre: "comedy", line: "Two witty sparring partners are tricked into falling in love." },
    { title: "As You Like It", year: "c. 1599", genre: "comedy", line: "Exiles find freedom and love in the Forest of Arden." },
    { title: "The Comedy of Errors", year: "c. 1594", genre: "comedy", line: "Two sets of identical twins turn a city into glorious chaos." },
    { title: "Henry V", year: "c. 1599", genre: "history", line: "A reformed prince becomes a warrior king at Agincourt." },
    { title: "Richard III", year: "c. 1593", genre: "history", line: "A gleeful villain schemes and murders his way to the crown." },
    { title: "Henry IV, Part 1", year: "c. 1597", genre: "history", line: "A wild prince and the roguish Falstaff carouse toward kingship." },
    { title: "The Tempest", year: "c. 1611", genre: "romance", line: "A sorcerer conjures a storm to reclaim his stolen dukedom." },
    { title: "The Winter's Tale", year: "c. 1611", genre: "romance", line: "Jealousy shatters a family — until time and wonder mend it." }
  ];

  const QUOTES = [
    { text: "To be, or not to be, that is the question.", source: "Hamlet, Act III" },
    { text: "All the world's a stage, and all the men and women merely players.", source: "As You Like It, Act II" },
    { text: "The course of true love never did run smooth.", source: "A Midsummer Night's Dream, Act I" },
    { text: "We know what we are, but know not what we may be.", source: "Hamlet, Act IV" },
    { text: "Cowards die many times before their deaths; the valiant never taste of death but once.", source: "Julius Caesar, Act II" },
    { text: "Love looks not with the eyes, but with the mind.", source: "A Midsummer Night's Dream, Act I" },
    { text: "Some are born great, some achieve greatness, and some have greatness thrust upon them.", source: "Twelfth Night, Act II" },
    { text: "The fault, dear Brutus, is not in our stars, but in ourselves.", source: "Julius Caesar, Act I" },
    { text: "Better three hours too soon than a minute too late.", source: "The Merry Wives of Windsor, Act II" },
    { text: "What's in a name? That which we call a rose by any other name would smell as sweet.", source: "Romeo and Juliet, Act II" },
    { text: "Give every man thy ear, but few thy voice.", source: "Hamlet, Act I" },
    { text: "We are such stuff as dreams are made on, and our little life is rounded with a sleep.", source: "The Tempest, Act IV" },
    { text: "Though she be but little, she is fierce.", source: "A Midsummer Night's Dream, Act III" },
    { text: "Nothing will come of nothing.", source: "King Lear, Act I" },
    { text: "How sharper than a serpent's tooth it is to have a thankless child.", source: "King Lear, Act I" }
  ];

  const INSULTS = {
    adj1: ["artless", "bawdy", "churlish", "clouted", "craven", "dankish", "fawning", "frothy", "gleeking", "goatish", "infectious", "loggerheaded", "mammering", "paunchy", "puny", "qualling", "rank", "spongy", "surly", "venomed", "vain", "wayward"],
    adj2: ["base-court", "beef-witted", "beetle-headed", "boil-brained", "clay-brained", "dizzy-eyed", "doghearted", "dread-bolted", "fly-bitten", "fool-born", "guts-griping", "half-faced", "hasty-witted", "idle-headed", "ill-breeding", "knotty-pated", "milk-livered", "motley-minded", "onion-eyed", "rump-fed", "toad-spotted", "weather-bitten"],
    noun: ["apple-john", "baggage", "barnacle", "bladder", "boar-pig", "bugbear", "bum-bailey", "clack-dish", "coxcomb", "death-token", "flap-dragon", "foot-licker", "fustilarian", "giglet", "gudgeon", "harpy", "hedge-pig", "joithead", "lewdster", "lout", "maggot-pie", "malt-worm", "measle", "minnow", "miscreant", "pignut", "ratsbane", "scut", "skainsmate", "varlet", "vassal", "wagtail"]
  };

  const WORDS = [
    { word: "Eyeball", note: "First written down by Shakespeare in 'A Midsummer Night's Dream' and 'The Tempest'." },
    { word: "Lonely", note: "Coined in 'Coriolanus' — 'I go alone, like to a lonely dragon.'" },
    { word: "Swagger", note: "Strutting onto the page in 'A Midsummer Night's Dream' and 'Henry V'." },
    { word: "Gossip", note: "Repurposed as a verb of idle chatter in 'The Comedy of Errors'." },
    { word: "Bedazzled", note: "Sparkling into English via 'The Taming of the Shrew'." },
    { word: "Lacklustre", note: "First dulling things down in 'As You Like It'." },
    { word: "Assassination", note: "Made deadly-famous in the dagger soliloquy of 'Macbeth'." },
    { word: "Fashionable", note: "Stitched into the language in 'Troilus and Cressida'." },
    { word: "Uncomfortable", note: "First making us squirm in 'Romeo and Juliet'." },
    { word: "Zany", note: "From the Italian commedia, popularised in 'Love's Labour's Lost'." },
    { word: "Gloomy", note: "Darkening the mood first in 'Titus Andronicus'." },
    { word: "Generous", note: "Given freely to English in 'Hamlet' and 'Love's Labour's Lost'." },
    { word: "Critic", note: "First passing judgement in 'Love's Labour's Lost'." },
    { word: "Majestic", note: "Crowned into use in 'Julius Caesar' and 'The Tempest'." }
  ];

  const QUIZ = [
    { q: "In which town was Shakespeare born?", options: ["London", "Stratford-upon-Avon", "Canterbury", "York"], answer: 1, fact: "Stratford-upon-Avon — where he was born and, 52 years later, died." },
    { q: "Which theatre is most associated with Shakespeare's company?", options: ["The Swan", "The Rose", "The Globe", "Drury Lane"], answer: 2, fact: "The Globe, built in 1599 on the Thames' south bank." },
    { q: "How many sonnets did Shakespeare write?", options: ["38", "100", "154", "200"], answer: 2, fact: "Exactly 154 sonnets, published together in 1609." },
    { q: "Which of these is NOT one of Shakespeare's tragedies?", options: ["Macbeth", "Othello", "The Tempest", "King Lear"], answer: 2, fact: "'The Tempest' is classed as a late romance, not a tragedy." },
    { q: "What is the name of Shakespeare's only son?", options: ["Hamlet", "Hamnet", "Edmund", "Richard"], answer: 1, fact: "Hamnet, his son, died at 11 — four years before the play 'Hamlet'." }
  ];

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function toast(msg, duration = 1800) {
    let t = $("#toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    if (duration > 0) t._timer = setTimeout(() => t.classList.remove("show"), duration);
  }
  function hideToast() {
    const t = $("#toast");
    if (t) { clearTimeout(t._timer); t.classList.remove("show"); }
  }

  /* ---------- Hero typewriter ---------- */
  function typeWriter() {
    const lines = [
      "Poet. Playwright. Player.",
      "The soul of the age.",
      "Not of an age, but for all time.",
      "He gave us the words to feel."
    ];
    const el = $("#typed-line");
    let li = 0, ci = 0, deleting = false;
    function tick() {
      const full = lines[li];
      el.innerHTML = full.slice(0, ci) + '<span class="caret">|</span>';
      if (!deleting && ci < full.length) { ci++; setTimeout(tick, 55); }
      else if (!deleting && ci === full.length) { deleting = true; setTimeout(tick, 1900); }
      else if (deleting && ci > 0) { ci--; setTimeout(tick, 28); }
      else { deleting = false; li = (li + 1) % lines.length; setTimeout(tick, 350); }
    }
    tick();
  }

  /* ---------- Hero floating letters ---------- */
  function heroFloaties() {
    const wrap = $(".hero-floaties");
    const glyphs = ["A", "❦", "✒", "B", "❧", "S", "✦", "W"];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.textContent = rand(glyphs);
      s.style.left = Math.random() * 100 + "%";
      s.style.fontSize = 1.2 + Math.random() * 2.4 + "rem";
      s.style.animationDuration = 9 + Math.random() * 12 + "s";
      s.style.animationDelay = -Math.random() * 15 + "s";
      wrap.appendChild(s);
    }
  }

  /* ---------- Timeline ---------- */
  function buildTimeline() {
    const wrap = $("#timeline");
    TIMELINE.forEach((item, i) => {
      const el = document.createElement("div");
      el.className = "tl-item reveal";
      el.style.transitionDelay = (i * 0.05) + "s";
      el.innerHTML = `
        <span class="tl-dot"></span>
        <div class="tl-card">
          <span class="tl-year">${item.year}</span>
          <h3>${item.title}</h3>
          <div class="tl-body"><p>${item.body}</p></div>
          <span class="tl-hint">▸ click to ${"reveal"}</span>
        </div>`;
      const card = $(".tl-card", el);
      const hint = $(".tl-hint", el);
      const toggle = () => {
        card.classList.toggle("open");
        hint.textContent = card.classList.contains("open") ? "▾ click to hide" : "▸ click to reveal";
      };
      card.addEventListener("click", toggle);
      $(".tl-dot", el).addEventListener("click", toggle);
      wrap.appendChild(el);
    });
  }

  /* ---------- Plays ---------- */
  function buildPlays() {
    const grid = $("#play-grid");
    PLAYS.forEach((p) => {
      const card = document.createElement("div");
      card.className = "play-card";
      card.dataset.genre = p.genre;
      card.innerHTML = `
        <div class="flip">
          <div class="face front">
            <span class="genre-tag">${p.genre}</span>
            <h3>${p.title}</h3>
            <span class="year">${p.year}</span>
          </div>
          <div class="face back"><p>${p.line}</p></div>
        </div>`;
      // tap to flip (touch devices can't hover)
      card.addEventListener("click", () => card.classList.toggle("flipped"));
      grid.appendChild(card);
    });

    $$(".filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const g = btn.dataset.genre;
        $$(".play-card").forEach((card) => {
          const show = g === "all" || card.dataset.genre === g;
          card.classList.toggle("hide", !show);
          if (show) {
            card.classList.remove("enter");
            void card.offsetWidth; // reflow to restart animation
            card.classList.add("enter");
          }
        });
      });
    });
  }

  /* ---------- Quote oracle ---------- */
  function setupQuotes() {
    const textEl = $("#quote-text");
    const srcEl = $("#quote-source");
    let last = -1;
    function newQuote() {
      let i;
      do { i = Math.floor(Math.random() * QUOTES.length); } while (i === last && QUOTES.length > 1);
      last = i;
      textEl.style.opacity = 0;
      srcEl.style.opacity = 0;
      setTimeout(() => {
        textEl.textContent = "“" + QUOTES[i].text + "”";
        srcEl.textContent = "— " + QUOTES[i].source;
        textEl.style.opacity = 1;
        srcEl.style.opacity = 1;
      }, 220);
    }
    $("#new-quote").addEventListener("click", newQuote);
    $("#copy-quote").addEventListener("click", () => {
      const txt = textEl.textContent + " " + srcEl.textContent;
      navigator.clipboard?.writeText(txt).then(
        () => toast("Quote copied!"),
        () => toast("Copy failed")
      );
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && isInView($("#quotes"))) { e.preventDefault(); newQuote(); }
    });
  }

  /* ---------- Insult forge ---------- */
  function setupInsults() {
    const el = $("#insult-text");
    let current = "";
    function forge() {
      current = rand(INSULTS.adj1) + " " + rand(INSULTS.adj2) + " " + rand(INSULTS.noun);
      el.style.opacity = 0;
      setTimeout(() => {
        el.textContent = "art a " + current + "!";
        el.style.opacity = 1;
        el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake");
      }, 180);
    }
    $("#new-insult").addEventListener("click", forge);
    $("#speak-insult").addEventListener("click", () => {
      const phrase = "Thou " + el.textContent;
      if (!("speechSynthesis" in window)) { toast("Speech not supported"); return; }
      const u = new SpeechSynthesisUtterance(phrase);
      u.rate = 0.9; u.pitch = 0.85;
      u.onstart = () => toast("Hear the Bard's scorn!", 0); // show until speech ends
      u.onend = hideToast;
      u.onerror = hideToast;
      speechSynthesis.cancel();
      hideToast();
      speechSynthesis.speak(u);
    });
  }

  /* ---------- Word coiner ---------- */
  function buildWords() {
    const cloud = $("#word-cloud");
    const detail = document.createElement("p");
    detail.id = "word-detail";
    detail.textContent = "Tap a word to discover its Shakespearean origin.";
    WORDS.forEach((w) => {
      const tile = document.createElement("button");
      tile.className = "word-tile";
      tile.textContent = w.word;
      tile.addEventListener("click", () => {
        $$(".word-tile").forEach((t) => t.classList.remove("active"));
        tile.classList.add("active");
        detail.style.opacity = 0;
        setTimeout(() => { detail.textContent = "“" + w.word + "” — " + w.note; detail.style.opacity = 1; }, 180);
      });
      cloud.appendChild(tile);
    });
    cloud.after(detail);
  }

  /* ---------- Quiz ---------- */
  function setupQuiz() {
    const card = $("#quiz-card");
    let idx = 0, score = 0;
    function render() {
      const item = QUIZ[idx];
      card.innerHTML = `
        <div class="quiz-progress">Question ${idx + 1} of ${QUIZ.length} &middot; Score ${score}</div>
        <div class="quiz-q">${item.q}</div>
        <div class="quiz-options"></div>
        <div class="quiz-feedback"></div>`;
      const opts = $(".quiz-options", card);
      item.options.forEach((opt, i) => {
        const b = document.createElement("button");
        b.className = "quiz-opt";
        b.textContent = opt;
        b.addEventListener("click", () => choose(i, b));
        opts.appendChild(b);
      });
    }
    function choose(i, btn) {
      const item = QUIZ[idx];
      const buttons = $$(".quiz-opt", card);
      buttons.forEach((b, bi) => {
        b.disabled = true;
        if (bi === item.answer) b.classList.add("correct");
      });
      if (i !== item.answer) btn.classList.add("wrong");
      else score++;
      $(".quiz-feedback", card).textContent = (i === item.answer ? "✔ Correct! " : "✘ Not quite. ") + item.fact;
      const next = document.createElement("button");
      next.className = "btn-primary quiz-next";
      next.textContent = idx < QUIZ.length - 1 ? "Next Question →" : "See My Result";
      next.addEventListener("click", () => { idx++; idx < QUIZ.length ? render() : finish(); });
      card.appendChild(next);
    }
    function finish() {
      let title;
      if (score === QUIZ.length) title = "🎭 Bardic Master!";
      else if (score >= 3) title = "📜 Worthy Scholar";
      else if (score >= 1) title = "🪶 Promising Apprentice";
      else title = "🌱 The Journey Begins";
      card.innerHTML = `
        <div class="quiz-result">
          <div class="score">${score} / ${QUIZ.length}</div>
          <div class="title">${title}</div>
          <button class="btn-primary" id="quiz-retry">Try Again ↺</button>
        </div>`;
      $("#quiz-retry").addEventListener("click", () => { idx = 0; score = 0; render(); });
    }
    render();
  }

  /* ---------- Scroll utilities ---------- */
  function isInView(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  function setupScroll() {
    const nav = $("#navbar");
    const prog = $("#scroll-progress");
    const toTop = $("#to-top");
    function onScroll() {
      const st = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (st / h) * 100 + "%";
      nav.classList.toggle("scrolled", st > 40);
      toTop.classList.toggle("show", st > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    // mark sections + cards as reveal targets
    $$(".section-title, .section-lead, .play-card, .quote-stage, .insult-stage, .word-cloud, .quiz-card").forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
    $$(".tl-item").forEach((el) => io.observe(el));
  }

  /* ---------- Mobile nav ---------- */
  function setupNav() {
    const toggle = $("#nav-toggle");
    const links = $("#nav-links");
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    $$("#nav-links a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  }

  /* ---------- Ink trail ---------- */
  function setupInkTrail() {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
    let throttle = 0;
    document.addEventListener("mousemove", (e) => {
      if (Date.now() - throttle < 30) return;
      throttle = Date.now();
      const dot = document.createElement("div");
      dot.className = "ink-dot";
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      dot.style.width = dot.style.height = 4 + Math.random() * 8 + "px";
      $("#ink-trail").appendChild(dot);
      setTimeout(() => dot.remove(), 900);
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    typeWriter();
    heroFloaties();
    buildTimeline();
    buildPlays();
    setupQuotes();
    setupInsults();
    buildWords();
    setupQuiz();
    setupScroll();
    setupNav();
    setupInkTrail();
    $("#year").textContent = new Date().getFullYear();
  });
})();
