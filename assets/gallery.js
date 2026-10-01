// index.html과 view.html이 함께 쓰는 전시 목록 도우미
(function () {
  const list = (window.EXHIBITS || []).slice().sort((a, b) => b.no.localeCompare(a.no));
  const short = (model) => (model || "").replace(/^Claude\s+/, "");
  const withEffort = (text, x) => text + (x.effort ? " · " + x.effort : "");

  window.Gallery = {
    info: window.GALLERY || {},
    list,
    byId: (id) => list.find((x) => x.id === id) || null,
    file: (x) => "exhibits/" + x.id + ".html",
    thumb: (x) => "thumbs/" + x.id + ".png",
    date: (s) => (s || "").replace(/-/g, "."),
    by: (x) => withEffort(x.model, x),
    shortBy: (x) => withEffort(short(x.model), x)
  };
})();
