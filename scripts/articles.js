(function() {
  // 定义默认数据，确保本地预览（file:// 协议）或 fetch 失败时能显示内容
  var fallbackData = [
    {
      "title": "如何提高深度睡眠质量？",
      "url": "https://www.zhihu.com/answer/1657394452",
      "source": "知乎",
      "date": "2024-03-15",
      "summary": "牢记刚入睡的“黄金九十分钟”，通过调节体温和大脑状态，利用洗澡、足浴、单调法则等方法获得高质量睡眠。"
    },
    {
      "title": "不够聪明的人怎么高效学习？",
      "url": "https://www.zhihu.com/question/431279332/answer/1665113810",
      "source": "知乎",
      "date": "2024-02-20",
      "summary": "推荐练习冥想，通过正念让你在学习时更能聚焦于当下。体察当下产生的所有意识并接受它，不抗拒，从而提升专注力。"
    },
    {
      "title": "读《你当像鸟飞往你的山》",
      "url": "https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F205597392%3F_spm_id%3DMjEwNTM4NjIz&_i=6657905754a5b60",
      "source": "豆瓣",
      "date": "2024-01-10",
      "summary": "“无论你成为谁，无论你把自己变成了什么，那就是你本来的样子。它一直在你心中。不是在剑桥，而是在于你自心。你就是黄金。”"
    }
  ];

  function render(items) {
    var c = document.getElementById("recent-articles");
    if (c) {
      c.innerHTML = "";
      items.slice(0, 3).forEach(function(it) {
        var a = document.createElement("a");
        a.className = "card";
        a.href = it.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = '<h3>' + it.title + '</h3><p>' + it.summary + '</p><div class="card-meta"><span>' + it.source + '</span><span>' + it.date + '</span></div>';
        c.appendChild(a);
      });
    }
    
    var l = document.getElementById("articles-list");
    if (l) {
      l.innerHTML = "";
      items.forEach(function(it) {
        var a = document.createElement("a");
        a.className = "card";
        a.href = it.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = '<h3>' + it.title + '</h3><p>' + it.summary + '</p><div class="card-meta"><span>' + it.source + '</span><span>' + it.date + '</span></div>';
        l.appendChild(a);
      });
    }
  }

  // 尝试加载 JSON，如果失败则使用 fallbackData
  fetch("assets/articles.json?t=" + new Date().getTime())
    .then(function(res) {
      if (!res.ok) throw new Error("fail");
      return res.json();
    })
    .then(function(data) {
      render(data);
    })
    .catch(function(e) {
      console.warn("Fetch failed (likely due to local file:// protocol), using fallback data.", e);
      render(fallbackData);
    });
})();