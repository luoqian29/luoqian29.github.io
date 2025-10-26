(() => {
  // ns-hugo-imp:F:\luoqian\hugo_extended_withdeploy_0.151.0_windows-amd64\luoqian\themes\hugo-theme-stack\assets\ts\gallery.ts
  var StackGallery = class _StackGallery {
    galleryUID;
    items = [];
    constructor(container, galleryUID = 1) {
      if (window.PhotoSwipe == void 0 || window.PhotoSwipeUI_Default == void 0) {
        console.error("PhotoSwipe lib not loaded.");
        return;
      }
      this.galleryUID = galleryUID;
      _StackGallery.createGallery(container);
      this.loadItems(container);
      this.bindClick();
    }
    loadItems(container) {
      this.items = [];
      const figures = container.querySelectorAll("figure.gallery-image");
      for (const el of figures) {
        const figcaption = el.querySelector("figcaption"), img = el.querySelector("img");
        let aux = {
          w: parseInt(img.getAttribute("width")),
          h: parseInt(img.getAttribute("height")),
          src: img.src,
          msrc: img.getAttribute("data-thumb") || img.src,
          el
        };
        if (figcaption) {
          aux.title = figcaption.innerHTML;
        }
        this.items.push(aux);
      }
    }
    static createGallery(container) {
      const images = container.querySelectorAll("img.gallery-image");
      for (const img of Array.from(images)) {
        const paragraph = img.closest("p");
        if (!paragraph || !container.contains(paragraph)) continue;
        if (paragraph.textContent.trim() == "") {
          paragraph.classList.add("no-text");
        }
        let isNewLineImage = paragraph.classList.contains("no-text");
        if (!isNewLineImage) continue;
        const hasLink = img.parentElement.tagName == "A";
        let el = img;
        const figure = document.createElement("figure");
        figure.style.setProperty("flex-grow", img.getAttribute("data-flex-grow") || "1");
        figure.style.setProperty("flex-basis", img.getAttribute("data-flex-basis") || "0");
        if (hasLink) {
          el = img.parentElement;
        }
        el.parentElement.insertBefore(figure, el);
        figure.appendChild(el);
        if (img.hasAttribute("alt")) {
          const figcaption = document.createElement("figcaption");
          figcaption.innerText = img.getAttribute("alt");
          figure.appendChild(figcaption);
        }
        if (!hasLink) {
          figure.className = "gallery-image";
          const a = document.createElement("a");
          a.href = img.src;
          a.setAttribute("target", "_blank");
          img.parentNode.insertBefore(a, img);
          a.appendChild(img);
        }
      }
      const figuresEl = container.querySelectorAll("figure.gallery-image");
      let currentGallery = [];
      for (const figure of figuresEl) {
        if (!currentGallery.length) {
          currentGallery = [figure];
        } else if (figure.previousElementSibling === currentGallery[currentGallery.length - 1]) {
          currentGallery.push(figure);
        } else if (currentGallery.length) {
          _StackGallery.wrap(currentGallery);
          currentGallery = [figure];
        }
      }
      if (currentGallery.length > 0) {
        _StackGallery.wrap(currentGallery);
      }
    }
    /**
     * Wrap adjacent figure tags with div.gallery
     * @param figures 
     */
    static wrap(figures) {
      const galleryContainer = document.createElement("div");
      galleryContainer.className = "gallery";
      const parentNode = figures[0].parentNode, first = figures[0];
      parentNode.insertBefore(galleryContainer, first);
      for (const figure of figures) {
        galleryContainer.appendChild(figure);
      }
    }
    open(index) {
      const pswp = document.querySelector(".pswp");
      const ps = new window.PhotoSwipe(pswp, window.PhotoSwipeUI_Default, this.items, {
        index,
        galleryUID: this.galleryUID,
        getThumbBoundsFn: (index2) => {
          const thumbnail = this.items[index2].el.getElementsByTagName("img")[0], pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      });
      ps.init();
    }
    bindClick() {
      for (const [index, item] of this.items.entries()) {
        const a = item.el.querySelector("a");
        a.addEventListener("click", (e) => {
          e.preventDefault();
          this.open(index);
        });
      }
    }
  };
  var gallery_default = StackGallery;

  // ns-hugo-imp:F:\luoqian\hugo_extended_withdeploy_0.151.0_windows-amd64\luoqian\themes\hugo-theme-stack\assets\ts\color.ts
  var colorsCache = {};
  if (localStorage.hasOwnProperty("StackColorsCache")) {
    try {
      colorsCache = JSON.parse(localStorage.getItem("StackColorsCache"));
    } catch (e) {
      colorsCache = {};
    }
  }
  async function getColor(key, hash, imageURL) {
    if (!key) {
      return await Vibrant.from(imageURL).getPalette();
    }
    if (!colorsCache.hasOwnProperty(key) || colorsCache[key].hash !== hash) {
      const palette = await Vibrant.from(imageURL).getPalette();
      colorsCache[key] = {
        hash,
        Vibrant: {
          hex: palette.Vibrant.hex,
          rgb: palette.Vibrant.rgb,
          bodyTextColor: palette.Vibrant.bodyTextColor
        },
        DarkMuted: {
          hex: palette.DarkMuted.hex,
          rgb: palette.DarkMuted.rgb,
          bodyTextColor: palette.DarkMuted.bodyTextColor
        }
      };
      localStorage.setItem("StackColorsCache", JSON.stringify(colorsCache));
    }
    return colorsCache[key];
  }

  // ns-hugo-imp:F:\luoqian\hugo_extended_withdeploy_0.151.0_windows-amd64\luoqian\themes\hugo-theme-stack\assets\ts\menu.ts
  var slideUp = (target, duration = 500) => {
    target.classList.add("transiting");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    window.setTimeout(() => {
      target.classList.remove("show");
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("transiting");
    }, duration);
  };
  var slideDown = (target, duration = 500) => {
    target.classList.add("transiting");
    target.style.removeProperty("display");
    target.classList.add("show");
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("transiting");
    }, duration);
  };
  var slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === "none") {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  };
  function menu_default() {
    const toggleMenu = document.getElementById("toggle-menu");
    if (toggleMenu) {
      toggleMenu.addEventListener("click", () => {
        if (document.getElementById("main-menu").classList.contains("transiting")) return;
        document.body.classList.toggle("show-menu");
        slideToggle(document.getElementById("main-menu"), 300);
        toggleMenu.classList.toggle("is-active");
      });
    }
  }

  // ns-hugo-imp:F:\luoqian\hugo_extended_withdeploy_0.151.0_windows-amd64\luoqian\themes\hugo-theme-stack\assets\ts\createElement.ts
  function createElement(tag, attrs, children) {
    var element = document.createElement(tag);
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name];
        if (name == "dangerouslySetInnerHTML") {
          element.innerHTML = value.__html;
        } else if (value === true) {
          element.setAttribute(name, name);
        } else if (value !== false && value != null) {
          element.setAttribute(name, value.toString());
        }
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i];
      if (child) {
        element.appendChild(
          child.nodeType == null ? document.createTextNode(child.toString()) : child
        );
      }
    }
    return element;
  }
  var createElement_default = createElement;

  // ns-hugo-imp:F:\luoqian\hugo_extended_withdeploy_0.151.0_windows-amd64\luoqian\themes\hugo-theme-stack\assets\ts\colorScheme.ts
  var StackColorScheme = class {
    localStorageKey = "StackColorScheme";
    currentScheme;
    systemPreferScheme;
    constructor(toggleEl) {
      this.bindMatchMedia();
      this.currentScheme = this.getSavedScheme();
      if (window.matchMedia("(prefers-color-scheme: dark)").matches === true)
        this.systemPreferScheme = "dark";
      else
        this.systemPreferScheme = "light";
      this.dispatchEvent(document.documentElement.dataset.scheme);
      if (toggleEl)
        this.bindClick(toggleEl);
      if (document.body.style.transition == "")
        document.body.style.setProperty("transition", "background-color .3s ease");
    }
    saveScheme() {
      localStorage.setItem(this.localStorageKey, this.currentScheme);
    }
    bindClick(toggleEl) {
      toggleEl.addEventListener("click", (e) => {
        if (this.isDark()) {
          this.currentScheme = "light";
        } else {
          this.currentScheme = "dark";
        }
        this.setBodyClass();
        if (this.currentScheme == this.systemPreferScheme) {
          this.currentScheme = "auto";
        }
        this.saveScheme();
      });
    }
    isDark() {
      return this.currentScheme == "dark" || this.currentScheme == "auto" && this.systemPreferScheme == "dark";
    }
    dispatchEvent(colorScheme) {
      const event = new CustomEvent("onColorSchemeChange", {
        detail: colorScheme
      });
      window.dispatchEvent(event);
    }
    setBodyClass() {
      if (this.isDark()) {
        document.documentElement.dataset.scheme = "dark";
      } else {
        document.documentElement.dataset.scheme = "light";
      }
      this.dispatchEvent(document.documentElement.dataset.scheme);
    }
    getSavedScheme() {
      const savedScheme = localStorage.getItem(this.localStorageKey);
      if (savedScheme == "light" || savedScheme == "dark" || savedScheme == "auto") return savedScheme;
      else return "auto";
    }
    bindMatchMedia() {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (e.matches) {
          this.systemPreferScheme = "dark";
        } else {
          this.systemPreferScheme = "light";
        }
        this.setBodyClass();
      });
    }
  };
  var colorScheme_default = StackColorScheme;

  // ns-hugo-imp:F:\luoqian\hugo_extended_withdeploy_0.151.0_windows-amd64\luoqian\themes\hugo-theme-stack\assets\ts\scrollspy.ts
  function debounced(func) {
    let timeout;
    return () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(() => func());
    };
  }
  var headersQuery = ".article-content h1[id], .article-content h2[id], .article-content h3[id], .article-content h4[id], .article-content h5[id], .article-content h6[id]";
  var tocQuery = "#TableOfContents";
  var navigationQuery = "#TableOfContents li";
  var activeClass = "active-class";
  function scrollToTocElement(tocElement, scrollableNavigation) {
    let textHeight = tocElement.querySelector("a").offsetHeight;
    let scrollTop = tocElement.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "smooth" });
  }
  function buildIdToNavigationElementMap(navigation) {
    const sectionLinkRef = {};
    navigation.forEach((navigationElement) => {
      const link = navigationElement.querySelector("a");
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        sectionLinkRef[href.slice(1)] = navigationElement;
      }
    });
    return sectionLinkRef;
  }
  function computeOffsets(headers) {
    let sectionsOffsets = [];
    headers.forEach((header) => {
      sectionsOffsets.push({ id: header.id, offset: header.offsetTop });
    });
    sectionsOffsets.sort((a, b) => a.offset - b.offset);
    return sectionsOffsets;
  }
  function setupScrollspy() {
    let headers = document.querySelectorAll(headersQuery);
    if (!headers) {
      console.warn("No header matched query", headers);
      return;
    }
    let scrollableNavigation = document.querySelector(tocQuery);
    if (!scrollableNavigation) {
      console.warn("No toc matched query", tocQuery);
      return;
    }
    let navigation = document.querySelectorAll(navigationQuery);
    if (!navigation) {
      console.warn("No navigation matched query", navigationQuery);
      return;
    }
    let sectionsOffsets = computeOffsets(headers);
    let tocHovered = false;
    scrollableNavigation.addEventListener("mouseenter", debounced(() => tocHovered = true));
    scrollableNavigation.addEventListener("mouseleave", debounced(() => tocHovered = false));
    let activeSectionLink;
    let idToNavigationElement = buildIdToNavigationElementMap(navigation);
    function scrollHandler() {
      let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      let newActiveSection;
      sectionsOffsets.forEach((section) => {
        if (scrollPosition >= section.offset - 20) {
          newActiveSection = document.getElementById(section.id);
        }
      });
      let newActiveSectionLink;
      if (newActiveSection) {
        newActiveSectionLink = idToNavigationElement[newActiveSection.id];
      }
      if (newActiveSection && !newActiveSectionLink) {
        console.debug("No link found for section", newActiveSection);
      } else if (newActiveSectionLink !== activeSectionLink) {
        if (activeSectionLink)
          activeSectionLink.classList.remove(activeClass);
        if (newActiveSectionLink) {
          newActiveSectionLink.classList.add(activeClass);
          if (!tocHovered) {
            scrollToTocElement(newActiveSectionLink, scrollableNavigation);
          }
        }
        activeSectionLink = newActiveSectionLink;
      }
    }
    window.addEventListener("scroll", debounced(scrollHandler));
    function resizeHandler() {
      sectionsOffsets = computeOffsets(headers);
      scrollHandler();
    }
    window.addEventListener("resize", debounced(resizeHandler));
  }

  // ns-hugo-imp:F:\luoqian\hugo_extended_withdeploy_0.151.0_windows-amd64\luoqian\themes\hugo-theme-stack\assets\ts\smoothAnchors.ts
  var anchorLinksQuery = "a[href]";
  function setupSmoothAnchors() {
    document.querySelectorAll(anchorLinksQuery).forEach((aElement) => {
      let href = aElement.getAttribute("href");
      if (!href.startsWith("#")) {
        return;
      }
      aElement.addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        const targetId = decodeURI(aElement.getAttribute("href").substring(1)), target = document.getElementById(targetId), offset = target.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;
        window.history.pushState({}, "", aElement.getAttribute("href"));
        scrollTo({
          top: offset,
          behavior: "smooth"
        });
      });
    });
  }

  // <stdin>
  var Stack = {
    init: () => {
      menu_default();
      const articleContent = document.querySelector(".article-content");
      if (articleContent) {
        new gallery_default(articleContent);
        setupSmoothAnchors();
        setupScrollspy();
      }
      const articleTile = document.querySelector(".article-list--tile");
      if (articleTile) {
        let observer = new IntersectionObserver(async (entries, observer2) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer2.unobserve(entry.target);
            const articles = entry.target.querySelectorAll("article.has-image");
            articles.forEach(async (articles2) => {
              const image = articles2.querySelector("img"), imageURL = image.src, key = image.getAttribute("data-key"), hash = image.getAttribute("data-hash"), articleDetails = articles2.querySelector(".article-details");
              const colors = await getColor(key, hash, imageURL);
              articleDetails.style.background = `
                        linear-gradient(0deg, 
                            rgba(${colors.DarkMuted.rgb[0]}, ${colors.DarkMuted.rgb[1]}, ${colors.DarkMuted.rgb[2]}, 0.5) 0%, 
                            rgba(${colors.Vibrant.rgb[0]}, ${colors.Vibrant.rgb[1]}, ${colors.Vibrant.rgb[2]}, 0.75) 100%)`;
            });
          });
        });
        observer.observe(articleTile);
      }
      const highlights = document.querySelectorAll(".article-content div.highlight");
      const copyText = `Copy`, copiedText = `Copied!`;
      highlights.forEach((highlight) => {
        const copyButton = document.createElement("button");
        copyButton.innerHTML = copyText;
        copyButton.classList.add("copyCodeButton");
        highlight.appendChild(copyButton);
        const codeBlock = highlight.querySelector("code[data-lang]");
        if (!codeBlock) return;
        copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            copyButton.textContent = copiedText;
            setTimeout(() => {
              copyButton.textContent = copyText;
            }, 1e3);
          }).catch((err) => {
            alert(err);
            console.log("Something went wrong", err);
          });
        });
      });
      new colorScheme_default(document.getElementById("dark-mode-toggle"));
    }
  };
  window.addEventListener("load", () => {
    setTimeout(function() {
      Stack.init();
    }, 0);
  });
  window.Stack = Stack;
  window.createElement = createElement_default;
})();
/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/
