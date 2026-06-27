import { jsx as n, jsxs as f } from "react/jsx-runtime";
import F, { useRef as Y, useEffect as se } from "react";
const X = {
  accent: "bg-nl-accent text-white hover:-translate-y-0.5",
  primary: "bg-nl-primary text-white hover:-translate-y-0.5",
  secondary: "bg-white text-nl-text border border-nl-border-ui hover:-translate-y-0.5",
  success: "bg-nl-success text-nl-success-text hover:-translate-y-0.5",
  outlineLight: "bg-transparent text-white border border-white/50 hover:-translate-y-0.5",
  danger: "bg-nl-danger text-white hover:-translate-y-0.5"
}, q = {
  sm: "px-4 py-1.5 text-[0.82rem]",
  md: "px-[22px] py-[11px] text-[0.9rem]",
  lg: "px-[30px] py-[15px] text-base"
};
function be({
  variant: e = "primary",
  size: t = "md",
  disabled: a = !1,
  className: o = "",
  children: i,
  ...c
}) {
  return /* @__PURE__ */ n(
    "button",
    {
      disabled: a,
      className: [
        "inline-flex items-center justify-center gap-2",
        "rounded-pill font-semibold font-body",
        "transition-all duration-ui ease-nl shadow-none",
        "hover:shadow-hover",
        "focus:outline-none focus:ring-4 focus:ring-nl-primary/20",
        "disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed",
        X[e] ?? X.primary,
        q[t] ?? q.md,
        o
      ].join(" "),
      ...c,
      children: i
    }
  );
}
function ye({
  accent: e = !1,
  hover: t = !0,
  padding: a = "p-6",
  className: o = "",
  children: i,
  ...c
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: [
        "rounded-card border",
        e ? "bg-nl-primary text-white border-transparent" : "bg-white border-nl-border-soft shadow-card",
        t && !e ? "transition-all duration-ui ease-nl hover:-translate-y-[3px] hover:shadow-hover" : "",
        a,
        o
      ].join(" "),
      ...c,
      children: i
    }
  );
}
const K = {
  primary: "bg-nl-primary/10 text-nl-primary",
  accent: "bg-nl-accent/10 text-[#d64f2a]",
  success: "bg-nl-success/20 text-nl-success-text",
  danger: "bg-nl-danger/8 text-nl-danger",
  neutral: "bg-nl-400/15 text-nl-700",
  solidPrimary: "bg-nl-primary text-white",
  solidAccent: "bg-nl-accent text-white",
  solidDark: "bg-nl-900 text-white"
};
function we({
  variant: e = "primary",
  className: t = "",
  children: a,
  ...o
}) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: [
        "inline-flex items-center gap-1.5 px-3 py-1",
        "rounded-pill text-[0.78rem] font-semibold font-body",
        K[e] ?? K.primary,
        t
      ].join(" "),
      ...o,
      children: a
    }
  );
}
function ve({
  label: e,
  error: t,
  success: a,
  hint: o,
  className: i = "",
  ...c
}) {
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 w-full", children: [
    e && /* @__PURE__ */ n("label", { className: "text-[0.82rem] font-semibold text-nl-text font-body", children: e }),
    /* @__PURE__ */ n(
      "input",
      {
        className: [
          "w-full min-h-[44px] px-[14px]",
          "bg-white border-[1.5px] rounded-input",
          "font-body text-[0.9rem] text-nl-text",
          "transition-all duration-ui ease-nl",
          "outline-none focus:ring-4",
          "placeholder:text-nl-400",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          t ? "border-nl-danger focus:ring-nl-danger/20" : a ? "border-nl-success-dark focus:ring-nl-success-dark/20" : "border-nl-border-ui focus:border-nl-primary focus:ring-nl-primary/20",
          i
        ].join(" "),
        ...c
      }
    ),
    (t || o) && /* @__PURE__ */ n("p", { className: `text-[0.78rem] font-body ${t ? "text-nl-danger" : "text-nl-500"}`, children: t || o })
  ] });
}
const J = {
  info: "bg-nl-primary/8 border-l-[3px] border-nl-primary",
  success: "bg-nl-success-bg border-l-[3px] border-nl-success-dark",
  warning: "bg-yellow-50 border-l-[3px] border-yellow-400",
  error: "bg-nl-danger/7 border-l-[3px] border-nl-danger"
}, ce = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕"
}, Q = {
  info: "text-nl-primary",
  success: "text-nl-success-text",
  warning: "text-yellow-700",
  error: "text-nl-danger"
};
function ke({
  variant: e = "info",
  title: t,
  className: a = "",
  children: o,
  ...i
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      role: "alert",
      className: [
        "flex gap-3.5 rounded-[14px] p-4",
        J[e] ?? J.info,
        a
      ].join(" "),
      ...i,
      children: [
        /* @__PURE__ */ n("span", { className: `text-base mt-0.5 ${Q[e]}`, children: ce[e] }),
        /* @__PURE__ */ f("div", { className: "flex flex-col gap-0.5", children: [
          t && /* @__PURE__ */ n("p", { className: `text-[0.88rem] font-semibold font-body ${Q[e]}`, children: t }),
          /* @__PURE__ */ n("p", { className: "text-[0.85rem] font-body text-nl-700", children: o })
        ] })
      ]
    }
  );
}
function Ne({
  variant: e = "black",
  width: t = 160,
  className: a = "",
  ...o
}) {
  const i = e === "white" ? "#ffffff" : "#141414", c = Math.round(t * 125 / 464);
  return /* @__PURE__ */ f(
    "svg",
    {
      width: t,
      height: c,
      viewBox: "0 0 464 125",
      xmlns: "http://www.w3.org/2000/svg",
      className: a,
      "aria-label": "NLACE",
      role: "img",
      ...o,
      children: [
        /* @__PURE__ */ n("path", { d: "M0 123.169V34.454H28.965L30.297 52.43l-6.326 2a24.309 24.309 0 0 1 6.492-11.152 34.6 34.6 0 0 1 11.487-7.825 35.391 35.391 0 0 1 13.983-2.83c6.659 0 12.263 1.387 16.813 4.161a24.663 24.663 0 0 1 10.488 12.15c3.553 7.99 4.434 14.537 4.434 26.188v54.594H55.933v-52.1a16.819 16.819 0 0 0-1.332-7.157 9.327 9.327 0 0 0-4-4.494 11.593 11.593 0 0 0-6.326-1.332 16.741 16.741 0 0 0-5.327.832 11.132 11.132 0 0 0-4.162 2.663 11.85 11.85 0 0 0-2.83 3.828 13.35 13.35 0 0 0-.832 4.827v52.929H0Z", fill: i }),
        /* @__PURE__ */ n("path", { d: "M103.929 123.169V0h30.964v123.169h-30.964Z", fill: i }),
        /* @__PURE__ */ n("path", { d: "M183.894 124.667a35.164 35.164 0 0 1-19.81-5.825 42.478 42.478 0 0 1-13.817-16.312 54.7 54.7 0 0 1-4.994-23.8c0-9.099 1.665-17.088 4.994-23.968a39.437 39.437 0 0 1 13.817-16.145 35.285 35.285 0 0 1 20.309-5.992 36.708 36.708 0 0 1 11.32 1.664 26.914 26.914 0 0 1 8.989 4.827 36.936 36.936 0 0 1 6.659 7.157 40.531 40.531 0 0 1 4.661 8.655l-6.325-.333V34.454H240.16v88.715H209.031V101.531l6.825.333a33.93 33.93 0 0 1-11.486 16.312 37.088 37.088 0 0 1-9.323 4.824 35.157 35.157 0 0 1-11.153 1.667Zm8.823-25.466a17.28 17.28 0 0 0 9.156-2.33 15.625 15.625 0 0 0 5.826-7.157 25.864 25.864 0 0 0 2.164-10.985 26.3 26.3 0 0 0-2.164-11.152 14.636 14.636 0 0 0-5.826-6.991 18.037 18.037 0 0 0-18.312 0 14.975 14.975 0 0 0-5.66 6.991 28.2 28.2 0 0 0-2 11.152 27.732 27.732 0 0 0 2 10.985 16.031 16.031 0 0 0 5.66 7.157 17.277 17.277 0 0 0 9.156 2.33Z", fill: i }),
        /* @__PURE__ */ n("path", { d: "M298.074 124.834a46.8 46.8 0 0 1-23.638-5.992 44.24 44.24 0 0 1-16.314-16.312 47.109 47.109 0 0 1-5.993-23.8 46.2 46.2 0 0 1 5.993-23.635 43.875 43.875 0 0 1 16.314-16.478 46.79 46.79 0 0 1 23.638-5.992 60.923 60.923 0 0 1 21.974 3.828A38.016 38.016 0 0 1 336.2 47.437L319.382 67.41a18.918 18.918 0 0 0-4.661-4.161 20.772 20.772 0 0 0-6.326-3 22.581 22.581 0 0 0-7.491-1.165 18.4 18.4 0 0 0-9.655 2.5 17.182 17.182 0 0 0-6.492 6.991 22.041 22.041 0 0 0-2.164 9.987 22.041 22.041 0 0 0 2.164 9.987 17.423 17.423 0 0 0 6.326 6.991A18.357 18.357 0 0 0 300.9 98.2a26.04 26.04 0 0 0 7.491-1 20.933 20.933 0 0 0 6.16-2.829 20.131 20.131 0 0 0 4.827-4.328L336.2 110.186A40.092 40.092 0 0 1 319.882 121 60.448 60.448 0 0 1 298.074 124.834Z", fill: i }),
        /* @__PURE__ */ n("path", { d: "M387.768 124.834c-10.099 0-18.811-1.998-26.135-5.826a42.936 42.936 0 0 1-16.98-16.312 47.106 47.106 0 0 1-5.993-23.8 50.173 50.173 0 0 1 3.329-18.475 43.522 43.522 0 0 1 9.322-14.647 40.178 40.178 0 0 1 14.15-9.654 46.4 46.4 0 0 1 18.145-3.5 44.22 44.22 0 0 1 17.479 3.329 38.271 38.271 0 0 1 13.651 9.487 41.031 41.031 0 0 1 8.823 14.481 46.7 46.7 0 0 1 2.83 18.309l-.167 6.991H356.306l-3.829-15.489h48.941l-3 3.329v-3.162a10.241 10.241 0 0 0-2-6.325 11.85 11.85 0 0 0-4.994-4.328 16.521 16.521 0 0 0-7.158-1.5 17.954 17.954 0 0 0-9.489 2.33 14.314 14.314 0 0 0-5.659 6.325 22.894 22.894 0 0 0-2 9.987 23.429 23.429 0 0 0 2.663 11.485 19.088 19.088 0 0 0 8.157 7.49 30.321 30.321 0 0 0 13.318 2.663 27.386 27.386 0 0 0 8.989-1.332 31.062 31.062 0 0 0 8.49-4.66l14.316 20.14a60.03 60.03 0 0 1-11.819 7.49 58.981 58.981 0 0 1-23.472 5.16Z", fill: i }),
        /* @__PURE__ */ n("path", { d: "M448.352 125c-4.994 0-8.878-1.387-11.653-4.161-2.663-2.774-3.995-6.713-3.995-11.818a15.879 15.879 0 0 1 4.328-11.484 15.006 15.006 0 0 1 11.32-4.494c4.883 0 8.712 1.387 11.486 4.161S464 104.917 464 109.021a15.878 15.878 0 0 1-4.328 11.485A15.006 15.006 0 0 1 448.352 125Z", fill: i })
      ]
    }
  );
}
function _e({
  size: e = 40,
  rounded: t = "rounded-[22%]",
  className: a = "",
  ...o
}) {
  return /* @__PURE__ */ f(
    "svg",
    {
      width: e,
      height: e,
      viewBox: "0 0 800 800",
      xmlns: "http://www.w3.org/2000/svg",
      className: a,
      "aria-label": "NLACE avatar",
      role: "img",
      ...o,
      children: [
        /* @__PURE__ */ n("rect", { width: "800", height: "800", rx: "176", fill: "#4452f9" }),
        /* @__PURE__ */ n("g", { transform: "matrix(0.896142,0,0,0.896142,12.034931,24.543064)", children: /* @__PURE__ */ n(
          "path",
          {
            d: "M120,633L120,206.6L259.2,206.6L265.6,293L235.2,302.6C240.533,282.333 250.933,264.467 266.4,249C281.867,233 300.267,220.467 321.6,211.4C342.933,202.333 365.333,197.8 388.8,197.8C420.8,197.8 447.733,204.467 469.6,217.8C492,230.6 508.8,250.067 520,276.2C531.733,301.8 537.6,333.267 537.6,370.6L537.6,633L388.8,633L388.8,382.6C388.8,368.733 386.667,357.267 382.4,348.2C378.133,338.6 371.733,331.4 363.2,326.6C354.667,321.8 344.533,319.667 332.8,320.2C323.733,320.2 315.2,321.533 307.2,324.2C299.733,326.867 293.067,331.133 287.2,337C281.333,342.333 276.8,348.467 273.6,355.4C270.933,362.333 269.6,370.067 269.6,378.6L269.6,633L120,633ZM670.656,641.8C646.656,641.8 627.99,635.133 614.656,621.8C601.856,608.467 595.456,589.533 595.456,565C595.456,542.6 602.39,524.2 616.256,509.8C630.123,495.4 648.256,488.2 670.656,488.2C694.123,488.2 712.523,494.867 725.856,508.2C739.19,521.533 745.856,540.467 745.856,565C745.856,587.4 738.923,605.8 725.056,620.2C711.19,634.6 693.056,641.8 670.656,641.8Z",
            fill: "white",
            fillRule: "nonzero"
          }
        ) })
      ]
    }
  );
}
const ee = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[2.5px]",
  lg: "w-10 h-10 border-[3px]"
};
function Ae({ size: e = "md", className: t = "", ...a }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "status",
      "aria-label": "Cargando",
      className: [
        "rounded-full border-nl-border-ui border-t-nl-primary",
        "animate-spin-nl",
        ee[e] ?? ee.md,
        t
      ].join(" "),
      ...a
    }
  );
}
function Ce({ className: e = "", ...t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: [
        "rounded-lg bg-nl-border-soft animate-shimmer",
        "bg-[length:200%_100%]",
        e
      ].join(" "),
      style: {
        backgroundImage: "linear-gradient(90deg, #e8e8e8 25%, #efefef 50%, #e8e8e8 75%)"
      },
      ...t
    }
  );
}
const te = {
  underline: "gap-6 border-b border-nl-border-soft",
  pill: "gap-1 p-1 bg-nl-400/12 rounded-pill w-max"
};
function Le({
  items: e = [],
  value: t,
  defaultValue: a,
  onChange: o,
  variant: i = "underline",
  className: c = "",
  children: x,
  ...b
}) {
  const u = t !== void 0, [s, l] = F.useState(
    a ?? e[0]?.id
  ), r = u ? t : s, y = (d) => {
    u || l(d), o?.(d);
  };
  return /* @__PURE__ */ f("div", { className: ["flex flex-col gap-4 font-body", c].join(" "), ...b, children: [
    /* @__PURE__ */ n("div", { role: "tablist", className: ["flex items-center", te[i] ?? te.underline].join(" "), children: e.map((d) => {
      const w = d.id === r, _ = "relative cursor-pointer font-semibold text-[0.9rem] transition-all duration-ui ease-nl disabled:opacity-40 disabled:cursor-not-allowed", g = i === "pill" ? [
        "px-4 py-1.5 rounded-pill",
        w ? "bg-white text-nl-primary shadow-card" : "text-nl-500 hover:text-nl-text"
      ].join(" ") : [
        "pb-3 -mb-px border-b-2",
        w ? "border-nl-primary text-nl-text" : "border-transparent text-nl-500 hover:text-nl-text"
      ].join(" ");
      return /* @__PURE__ */ f(
        "button",
        {
          role: "tab",
          "aria-selected": w,
          disabled: d.disabled,
          onClick: () => y(d.id),
          className: [_, g].join(" "),
          children: [
            d.label,
            d.badge != null && /* @__PURE__ */ n("span", { className: "ml-2 inline-flex items-center px-2 py-0.5 rounded-pill text-[0.68rem] font-semibold bg-nl-primary/10 text-nl-primary", children: d.badge })
          ]
        },
        d.id
      );
    }) }),
    typeof x == "function" ? x(r) : x
  ] });
}
const ne = {
  sm: { track: "w-9 h-5", knob: "w-3.5 h-3.5", on: "translate-x-4" },
  md: { track: "w-12 h-7", knob: "w-5 h-5", on: "translate-x-5" }
};
function Me({
  checked: e,
  defaultChecked: t = !1,
  onChange: a,
  disabled: o = !1,
  size: i = "md",
  label: c,
  description: x,
  className: b = "",
  ...u
}) {
  const s = e !== void 0, [l, r] = F.useState(t), y = s ? e : l, d = ne[i] ?? ne.md, w = () => {
    o || (s || r(!y), a?.(!y));
  };
  return /* @__PURE__ */ f(
    "label",
    {
      className: [
        "inline-flex items-center gap-3 font-body select-none",
        o ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        b
      ].join(" "),
      ...u,
      children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": y,
            disabled: o,
            onClick: w,
            className: [
              "relative shrink-0 rounded-pill p-0.5",
              "transition-colors duration-ui ease-nl",
              "focus:outline-none focus:ring-4 focus:ring-nl-primary/20",
              d.track,
              y ? "bg-nl-primary" : "bg-nl-400/45"
            ].join(" "),
            children: /* @__PURE__ */ n(
              "span",
              {
                className: [
                  "block rounded-pill bg-white shadow-card",
                  "transition-transform duration-ui ease-nl",
                  d.knob,
                  y ? d.on : "translate-x-0"
                ].join(" ")
              }
            )
          }
        ),
        (c || x) && /* @__PURE__ */ f("span", { className: "flex flex-col", children: [
          c && /* @__PURE__ */ n("span", { className: "text-[0.9rem] font-semibold text-nl-text", children: c }),
          x && /* @__PURE__ */ n("span", { className: "text-[0.8rem] text-nl-500", children: x })
        ] })
      ]
    }
  );
}
const re = {
  top: { box: "bottom-full left-1/2 -translate-x-1/2 mb-2", arrow: "top-full left-1/2 -translate-x-1/2 -mt-1" },
  bottom: { box: "top-full left-1/2 -translate-x-1/2 mt-2", arrow: "bottom-full left-1/2 -translate-x-1/2 -mb-1" },
  left: { box: "right-full top-1/2 -translate-y-1/2 mr-2", arrow: "left-full top-1/2 -translate-y-1/2 -ml-1" },
  right: { box: "left-full top-1/2 -translate-y-1/2 ml-2", arrow: "right-full top-1/2 -translate-y-1/2 -mr-1" }
};
function $e({
  label: e,
  placement: t = "top",
  className: a = "",
  children: o,
  ...i
}) {
  const c = re[t] ?? re.top;
  return /* @__PURE__ */ f("span", { className: ["relative inline-flex group/tt font-body", a].join(" "), ...i, children: [
    o,
    /* @__PURE__ */ f(
      "span",
      {
        role: "tooltip",
        className: [
          "pointer-events-none absolute z-50 whitespace-nowrap",
          "px-2.5 py-1.5 rounded-[8px]",
          "text-[0.76rem] font-medium text-white bg-nl-900",
          "shadow-hover",
          "opacity-0 scale-95 transition-all duration-150 ease-nl",
          "group-hover/tt:opacity-100 group-hover/tt:scale-100",
          "group-focus-within/tt:opacity-100 group-focus-within/tt:scale-100",
          c.box
        ].join(" "),
        children: [
          e,
          /* @__PURE__ */ n("span", { className: ["absolute w-2 h-2 rotate-45 bg-nl-900", c.arrow].join(" ") })
        ]
      }
    )
  ] });
}
const oe = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl"
};
function Se({
  open: e = !1,
  onClose: t,
  title: a,
  description: o,
  size: i = "md",
  footer: c,
  closeOnScrim: x = !0,
  className: b = "",
  children: u,
  ...s
}) {
  return F.useEffect(() => {
    if (!e) return;
    const l = (r) => {
      r.key === "Escape" && t?.();
    };
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [e, t]), e ? /* @__PURE__ */ f(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4 font-body",
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ n(
          "div",
          {
            className: "absolute inset-0 bg-nl-900/45 backdrop-blur-[2px] animate-[fadeUp_0.2s_ease]",
            onClick: () => x && t?.()
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            className: [
              "relative w-full bg-white rounded-card shadow-hover",
              "border border-nl-border-soft overflow-hidden",
              "animate-fade-up",
              oe[i] ?? oe.md,
              b
            ].join(" "),
            ...s,
            children: [
              (a || t) && /* @__PURE__ */ f("div", { className: "flex items-start justify-between gap-4 px-6 pt-5 pb-3", children: [
                /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
                  a && /* @__PURE__ */ n("h4", { className: "text-[1.15rem] font-semibold font-display text-nl-text", children: a }),
                  o && /* @__PURE__ */ n("p", { className: "text-[0.85rem] text-nl-500", children: o })
                ] }),
                t && /* @__PURE__ */ n(
                  "button",
                  {
                    onClick: t,
                    "aria-label": "Cerrar",
                    className: "shrink-0 -mr-1 -mt-1 w-8 h-8 grid place-items-center rounded-pill text-nl-500 hover:bg-nl-400/15 hover:text-nl-text transition-colors duration-ui",
                    children: "✕"
                  }
                )
              ] }),
              /* @__PURE__ */ n("div", { className: "px-6 py-2 text-[0.9rem] text-nl-700 leading-relaxed", children: u }),
              c && /* @__PURE__ */ n("div", { className: "flex items-center justify-end gap-2.5 px-6 pt-4 pb-5 mt-2", children: c })
            ]
          }
        )
      ]
    }
  ) : null;
}
function je({
  trigger: e,
  items: t = [],
  onSelect: a,
  align: o = "left",
  className: i = "",
  ...c
}) {
  const [x, b] = F.useState(!1), u = F.useRef(null);
  return F.useEffect(() => {
    if (!x) return;
    const s = (r) => {
      u.current && !u.current.contains(r.target) && b(!1);
    }, l = (r) => {
      r.key === "Escape" && b(!1);
    };
    return document.addEventListener("mousedown", s), window.addEventListener("keydown", l), () => {
      document.removeEventListener("mousedown", s), window.removeEventListener("keydown", l);
    };
  }, [x]), /* @__PURE__ */ f("div", { ref: u, className: ["relative inline-flex font-body", i].join(" "), ...c, children: [
    /* @__PURE__ */ n("span", { onClick: () => b((s) => !s), className: "inline-flex", children: e }),
    x && /* @__PURE__ */ n(
      "div",
      {
        role: "menu",
        className: [
          "absolute top-full mt-2 z-50 min-w-[200px]",
          "bg-white rounded-[14px] border border-nl-border-soft shadow-hover",
          "p-1.5 animate-fade-up",
          o === "right" ? "right-0" : "left-0"
        ].join(" "),
        children: t.map(
          (s, l) => s.divider ? /* @__PURE__ */ n("div", { className: "my-1.5 h-px bg-nl-border-soft" }, `d${l}`) : /* @__PURE__ */ f(
            "button",
            {
              role: "menuitem",
              disabled: s.disabled,
              onClick: () => {
                a?.(s.id), b(!1);
              },
              className: [
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-[9px]",
                "text-[0.86rem] font-medium text-left",
                "transition-colors duration-150",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                s.danger ? "text-nl-danger hover:bg-nl-danger/8" : "text-nl-text hover:bg-nl-primary/8"
              ].join(" "),
              children: [
                s.icon && /* @__PURE__ */ n("span", { className: "text-[0.95rem] opacity-80", children: s.icon }),
                /* @__PURE__ */ n("span", { className: "flex-1", children: s.label }),
                s.shortcut && /* @__PURE__ */ n("span", { className: "text-[0.72rem] text-nl-400 font-mono", children: s.shortcut })
              ]
            },
            s.id
          )
        )
      }
    )
  ] });
}
function Fe({
  columns: e = [],
  rows: t = [],
  rowKey: a = "id",
  dense: o = !1,
  className: i = "",
  ...c
}) {
  const x = o ? "px-4 py-2.5" : "px-5 py-3.5", b = (u) => u === "right" ? "text-right" : u === "center" ? "text-center" : "text-left";
  return /* @__PURE__ */ n("div", { className: ["w-full overflow-x-auto rounded-card border border-nl-border-soft bg-white font-body", i].join(" "), ...c, children: /* @__PURE__ */ f("table", { className: "w-full border-collapse text-[0.88rem]", children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: "border-b border-nl-border-soft", children: e.map((u) => /* @__PURE__ */ n(
      "th",
      {
        className: [
          x,
          b(u.align),
          "text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-nl-500 whitespace-nowrap"
        ].join(" "),
        children: u.header
      },
      u.key
    )) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((u, s) => /* @__PURE__ */ n(
      "tr",
      {
        className: "border-b border-nl-border-soft last:border-0 transition-colors duration-150 hover:bg-nl-primary/5",
        children: e.map((l) => /* @__PURE__ */ n("td", { className: [x, b(l.align), "text-nl-700 whitespace-nowrap"].join(" "), children: l.render ? l.render(u) : u[l.key] }, l.key))
      },
      u[a] ?? s
    )) })
  ] }) });
}
const B = [
  "#5869f7",
  // primary
  "#fc624b",
  // accent
  "#42cf8a",
  // success
  "#b717af",
  // magenta
  "#ff8c42",
  // accent-warm
  "#f76dee",
  // pink
  "#2d3bc4",
  // primary-dark
  "#a5f3fc"
  // cyan
], R = "Inter, system-ui, sans-serif", z = '"Space Grotesk", sans-serif', ae = "#dbdcd7", le = "#a1a1aa", D = "#71717a", G = "#0f1011";
function O(e) {
  if (e <= 0) return 1;
  const t = Math.pow(10, Math.floor(Math.log10(e))), a = e / t;
  let o;
  return a <= 1 ? o = 1 : a <= 2 ? o = 2 : a <= 2.5 ? o = 2.5 : a <= 5 ? o = 5 : o = 10, o * t;
}
function U(e) {
  return Math.abs(e) >= 1e6 ? (e / 1e6).toFixed(e % 1e6 ? 1 : 0) + "M" : Math.abs(e) >= 1e3 ? (e / 1e3).toFixed(e % 1e3 ? 1 : 0) + "k" : String(Math.round(e * 100) / 100);
}
function ie({ items: e, style: t }) {
  return !e || e.length < 2 ? null : /* @__PURE__ */ n("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px 18px", ...t }, children: e.map((a, o) => /* @__PURE__ */ f("div", { style: { display: "flex", alignItems: "center", gap: 7 }, children: [
    /* @__PURE__ */ n("span", { style: { width: 10, height: 10, borderRadius: 3, background: a.color, flex: "none" } }),
    /* @__PURE__ */ n("span", { style: { fontFamily: R, fontSize: 12.5, color: D }, children: a.name })
  ] }, o)) });
}
function Ee({
  labels: e = [],
  series: t = [],
  height: a = 240,
  stacked: o = !1,
  showValues: i = !0,
  legend: c = !0,
  className: x = "",
  ...b
}) {
  const s = a, l = { top: 18, right: 14, bottom: 30, left: 38 }, r = 580 - l.left - l.right, y = s - l.top - l.bottom, d = t.map((p, k) => p.color || B[k % B.length]);
  let w;
  o ? w = O(Math.max(1, ...e.map((p, k) => t.reduce((m, h) => m + (h.values[k] || 0), 0)))) : w = O(Math.max(1, ...t.flatMap((p) => p.values)));
  const _ = [0, w / 2, w], g = r / Math.max(1, e.length), v = t.length === 1;
  return /* @__PURE__ */ f("div", { className: x, ...b, children: [
    /* @__PURE__ */ f("svg", { viewBox: `0 0 580 ${s}`, width: "100%", style: { display: "block", height: "auto", overflow: "visible" }, role: "img", children: [
      _.map((p, k) => {
        const m = l.top + y - p / w * y;
        return /* @__PURE__ */ f("g", { children: [
          /* @__PURE__ */ n("line", { x1: l.left, y1: m, x2: 580 - l.right, y2: m, stroke: ae, strokeWidth: "1", strokeDasharray: k === 0 ? "0" : "3 4" }),
          /* @__PURE__ */ n("text", { x: l.left - 8, y: m + 4, textAnchor: "end", fontFamily: R, fontSize: "11", fill: le, children: U(p) })
        ] }, k);
      }),
      e.map((p, k) => {
        const m = l.left + g * k, h = v ? g * 0.5 : g * 0.66, A = h / (v ? 1 : t.length), T = m + (g - h) / 2;
        let I = l.top + y;
        return /* @__PURE__ */ f("g", { children: [
          t.map((L, N) => {
            const H = L.values[k] || 0, S = H / w * y;
            let E, M;
            return o ? (E = m + (g - g * 0.5) / 2, M = I - S, I = M, /* @__PURE__ */ n("rect", { x: E, y: M, width: g * 0.5, height: Math.max(0, S), rx: "3", fill: d[N] }, N)) : (E = T + A * N, M = l.top + y - S, /* @__PURE__ */ f("g", { children: [
              /* @__PURE__ */ n("rect", { x: E, y: M, width: Math.max(1, A - 3), height: Math.max(0, S), rx: "4", fill: d[N] }),
              i && v && /* @__PURE__ */ n("text", { x: E + (A - 3) / 2, y: M - 6, textAnchor: "middle", fontFamily: z, fontSize: "12", fontWeight: "600", fill: G, children: U(H) })
            ] }, N));
          }),
          /* @__PURE__ */ n("text", { x: m + g / 2, y: s - l.bottom + 18, textAnchor: "middle", fontFamily: R, fontSize: "11.5", fill: D, children: p })
        ] }, k);
      })
    ] }),
    c && /* @__PURE__ */ n(ie, { items: t.map((p, k) => ({ name: p.name, color: d[k] })), style: { marginTop: 12, paddingLeft: 4 } })
  ] });
}
function de({
  labels: e = [],
  series: t = [],
  height: a = 240,
  area: o = !1,
  showDots: i = !0,
  legend: c = !0,
  className: x = "",
  ...b
}) {
  const s = a, l = { top: 18, right: 16, bottom: 30, left: 38 }, r = 580 - l.left - l.right, y = s - l.top - l.bottom, d = t.map((m, h) => m.color || B[h % B.length]), w = O(Math.max(1, ...t.flatMap((m) => m.values))), _ = [0, w / 2, w], g = e.length, v = (m) => l.left + (g <= 1 ? r / 2 : r * m / (g - 1)), p = (m) => l.top + y - m / w * y, k = F.useId ? F.useId().replace(/:/g, "") : "g" + Math.random().toString(36).slice(2, 8);
  return /* @__PURE__ */ f("div", { className: x, ...b, children: [
    /* @__PURE__ */ f("svg", { viewBox: `0 0 580 ${s}`, width: "100%", style: { display: "block", height: "auto", overflow: "visible" }, role: "img", children: [
      /* @__PURE__ */ n("defs", { children: o && t.map((m, h) => /* @__PURE__ */ f("linearGradient", { id: `${k}-a${h}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ n("stop", { offset: "0%", stopColor: d[h], stopOpacity: "0.26" }),
        /* @__PURE__ */ n("stop", { offset: "100%", stopColor: d[h], stopOpacity: "0.02" })
      ] }, h)) }),
      _.map((m, h) => {
        const A = p(m);
        return /* @__PURE__ */ f("g", { children: [
          /* @__PURE__ */ n("line", { x1: l.left, y1: A, x2: 580 - l.right, y2: A, stroke: ae, strokeWidth: "1", strokeDasharray: h === 0 ? "0" : "3 4" }),
          /* @__PURE__ */ n("text", { x: l.left - 8, y: A + 4, textAnchor: "end", fontFamily: R, fontSize: "11", fill: le, children: U(m) })
        ] }, h);
      }),
      t.map((m, h) => {
        const A = m.values.map((L, N) => [v(N), p(L)]), T = A.map((L, N) => (N ? "L" : "M") + L[0].toFixed(1) + " " + L[1].toFixed(1)).join(" "), I = `${T} L ${v(g - 1).toFixed(1)} ${p(0).toFixed(1)} L ${v(0).toFixed(1)} ${p(0).toFixed(1)} Z`;
        return /* @__PURE__ */ f("g", { children: [
          o && /* @__PURE__ */ n("path", { d: I, fill: `url(#${k}-a${h})` }),
          /* @__PURE__ */ n("path", { d: T, fill: "none", stroke: d[h], strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          i && A.map((L, N) => /* @__PURE__ */ n("circle", { cx: L[0], cy: L[1], r: "3.4", fill: "#fff", stroke: d[h], strokeWidth: "2" }, N))
        ] }, h);
      }),
      e.map((m, h) => /* @__PURE__ */ n("text", { x: v(h), y: s - l.bottom + 18, textAnchor: "middle", fontFamily: R, fontSize: "11.5", fill: D, children: m }, h))
    ] }),
    c && /* @__PURE__ */ n(ie, { items: t.map((m, h) => ({ name: m.name, color: d[h] })), style: { marginTop: 12, paddingLeft: 4 } })
  ] });
}
function Re(e) {
  return /* @__PURE__ */ n(de, { area: !0, ...e });
}
function P(e, t, a, o) {
  return [e + a * Math.cos(o), t + a * Math.sin(o)];
}
function fe(e, t, a, o, i, c) {
  const [x, b] = P(e, t, a, i), [u, s] = P(e, t, a, c), l = c - i > Math.PI ? 1 : 0;
  if (o <= 0)
    return `M ${e} ${t} L ${x} ${b} A ${a} ${a} 0 ${l} 1 ${u} ${s} Z`;
  const [r, y] = P(e, t, o, c), [d, w] = P(e, t, o, i);
  return `M ${x} ${b} A ${a} ${a} 0 ${l} 1 ${u} ${s} L ${r} ${y} A ${o} ${o} 0 ${l} 0 ${d} ${w} Z`;
}
function ue({
  data: e = [],
  size: t = 200,
  donut: a = !1,
  thickness: o = 0.42,
  centerLabel: i,
  centerValue: c,
  legend: x = !0,
  className: b = "",
  ...u
}) {
  const s = e.reduce((v, p) => v + (p.value || 0), 0) || 1, l = t / 2, r = t / 2, y = t / 2 - 2, d = a ? y * (1 - o) : 0, w = e.map((v, p) => v.color || B[p % B.length]);
  let _ = -Math.PI / 2;
  const g = e.map((v, p) => {
    const k = (v.value || 0) / s, m = _, h = _ + k * Math.PI * 2;
    return _ = h, { d: fe(l, r, y, d, m, h), color: w[p], pct: k };
  });
  return /* @__PURE__ */ f("div", { className: b, style: { display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }, ...u, children: [
    /* @__PURE__ */ f("svg", { viewBox: `0 0 ${t} ${t}`, width: t, height: t, style: { flex: "none", overflow: "visible" }, role: "img", children: [
      g.map((v, p) => /* @__PURE__ */ n("path", { d: v.d, fill: v.color, stroke: "#fff", strokeWidth: a ? 0 : 2 }, p)),
      a && (c != null || i) && /* @__PURE__ */ f("g", { children: [
        c != null && /* @__PURE__ */ n("text", { x: l, y: r + (i ? -2 : 6), textAnchor: "middle", fontFamily: z, fontSize: t * 0.18, fontWeight: "700", fill: G, children: c }),
        i && /* @__PURE__ */ n("text", { x: l, y: r + t * 0.13, textAnchor: "middle", fontFamily: R, fontSize: t * 0.075, fill: D, children: i })
      ] })
    ] }),
    x && /* @__PURE__ */ n("div", { style: { display: "flex", flexDirection: "column", gap: 9 }, children: e.map((v, p) => /* @__PURE__ */ f("div", { style: { display: "flex", alignItems: "center", gap: 9 }, children: [
      /* @__PURE__ */ n("span", { style: { width: 11, height: 11, borderRadius: 3, background: w[p], flex: "none" } }),
      /* @__PURE__ */ n("span", { style: { fontFamily: R, fontSize: 13, color: "#3f3f46", minWidth: 90 }, children: v.label }),
      /* @__PURE__ */ f("span", { style: { fontFamily: z, fontSize: 13, fontWeight: 600, color: G }, children: [
        Math.round(v.value / s * 100),
        "%"
      ] })
    ] }, p)) })
  ] });
}
function Te(e) {
  return /* @__PURE__ */ n(ue, { donut: !0, ...e });
}
const Z = ["#5869f7", "#fc624b", "#f76dee", "#b717af", "#1a1a5e"], me = "#ff8c42";
function W(e) {
  const t = String(e).replace("#", ""), a = t.length === 3 ? t.split("").map((i) => i + i).join("") : t, o = parseInt(a, 16);
  return [(o >> 16 & 255) / 255, (o >> 8 & 255) / 255, (o & 255) / 255];
}
const pe = "attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }", he = [
  "precision highp float;",
  "uniform vec2 u_res; uniform float u_time; uniform float u_speed; uniform float u_intensity; uniform float u_grain;",
  "uniform vec3 u_primary, u_accent, u_pink, u_magenta, u_deep, u_highlight;",
  "float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }",
  "float grain(vec2 uv){ return hash(uv*vec2(1031.0,1973.0)+fract(u_time)); }",
  "void main(){",
  "  vec2 uv = gl_FragCoord.xy/u_res.xy;",
  "  float t = u_time*0.16*u_speed;",
  "  vec2 p0=vec2(0.24+0.18*sin(t*1.1), 0.30+0.14*cos(t*0.9));",
  "  vec2 p1=vec2(0.80+0.14*cos(t*0.8), 0.26+0.16*sin(t*1.2));",
  "  vec2 p2=vec2(0.56+0.20*sin(t*0.7), 0.76+0.12*cos(t*0.85));",
  "  vec2 p3=vec2(0.16+0.15*cos(t*1.3), 0.70+0.13*sin(t*0.75));",
  "  float e=1.9;",
  "  float w0=pow(1.0/(distance(uv,p0)+0.05),e);",
  "  float w1=pow(1.0/(distance(uv,p1)+0.05),e);",
  "  float w2=pow(1.0/(distance(uv,p2)+0.05),e);",
  "  float w3=pow(1.0/(distance(uv,p3)+0.05),e);",
  "  float ws=w0+w1+w2+w3;",
  "  vec3 col=(u_accent*w0 + u_pink*w1 + u_primary*w2 + u_magenta*w3)/ws;",
  "  col = mix(col, u_highlight, 0.10*u_intensity*sin(t+uv.x*3.0));",
  "  col = mix(col, u_deep, smoothstep(0.45,1.15,uv.y)*0.16);",
  "  col += (grain(uv)-0.5)*0.04*u_grain;",
  "  gl_FragColor=vec4(col,1.0);",
  "}"
].join(`
`);
function Ie({
  speed: e = 10,
  intensity: t = 2,
  grain: a = 0.75,
  colors: o = Z,
  highlight: i = me,
  className: c = "",
  style: x,
  ...b
}) {
  const u = Y(null), s = Y({ speed: e, intensity: t, grain: a, colors: o, highlight: i });
  return s.current = { speed: e, intensity: t, grain: a, colors: o, highlight: i }, se(() => {
    const l = u.current;
    if (!l) return;
    const r = l.getContext("webgl", { antialias: !0, alpha: !1 });
    if (!r) {
      l.style.background = s.current.colors && s.current.colors[0] || Z[0];
      return;
    }
    const y = (C, $) => {
      const j = r.createShader(C);
      return r.shaderSource(j, $), r.compileShader(j), r.getShaderParameter(j, r.COMPILE_STATUS) || console.error(r.getShaderInfoLog(j)), j;
    }, d = r.createProgram();
    r.attachShader(d, y(r.VERTEX_SHADER, pe)), r.attachShader(d, y(r.FRAGMENT_SHADER, he)), r.linkProgram(d), r.useProgram(d);
    const w = r.createBuffer();
    r.bindBuffer(r.ARRAY_BUFFER, w), r.bufferData(r.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), r.STATIC_DRAW);
    const _ = r.getAttribLocation(d, "a");
    r.enableVertexAttribArray(_), r.vertexAttribPointer(_, 2, r.FLOAT, !1, 0, 0);
    const g = (C) => r.getUniformLocation(d, C), v = g("u_res"), p = g("u_time"), k = g("u_speed"), m = g("u_intensity"), h = g("u_grain"), A = g("u_primary"), T = g("u_accent"), I = g("u_pink"), L = g("u_magenta"), N = g("u_deep"), H = g("u_highlight"), S = () => {
      const C = Math.min(window.devicePixelRatio || 1, 2), $ = Math.max(1, Math.floor(l.clientWidth * C)), j = Math.max(1, Math.floor(l.clientHeight * C));
      (l.width !== $ || l.height !== j) && (l.width = $, l.height = j);
    };
    window.addEventListener("resize", S);
    const E = performance.now();
    let M = 0;
    const V = () => {
      if (r.isContextLost()) return;
      const C = s.current, $ = C.colors || Z;
      S(), r.viewport(0, 0, r.drawingBufferWidth, r.drawingBufferHeight), r.uniform2f(v, r.drawingBufferWidth, r.drawingBufferHeight), r.uniform1f(p, (performance.now() - E) / 1e3), r.uniform1f(k, C.speed), r.uniform1f(m, C.intensity), r.uniform1f(h, C.grain), r.uniform3fv(A, W($[0])), r.uniform3fv(T, W($[1])), r.uniform3fv(I, W($[2])), r.uniform3fv(L, W($[3])), r.uniform3fv(N, W($[4])), r.uniform3fv(H, W(C.highlight)), r.drawArrays(r.TRIANGLES, 0, 3), M = requestAnimationFrame(V);
    };
    return M = requestAnimationFrame(V), () => {
      cancelAnimationFrame(M), window.removeEventListener("resize", S);
    };
  }, []), /* @__PURE__ */ n(
    "canvas",
    {
      ref: u,
      className: c,
      style: { display: "block", width: "100%", height: "100%", ...x },
      "aria-hidden": "true",
      ...b
    }
  );
}
export {
  ke as Alert,
  Re as AreaChart,
  we as Badge,
  Ee as BarChart,
  be as Button,
  ye as Card,
  Te as DonutChart,
  je as Dropdown,
  ve as Input,
  de as LineChart,
  Ie as MeshGradient,
  Se as Modal,
  B as NL_CHART_PALETTE,
  _e as NlaceAvatar,
  Ne as NlaceLogo,
  ue as PieChart,
  Ce as Skeleton,
  Ae as Spinner,
  Me as Switch,
  Fe as Table,
  Le as Tabs,
  $e as Tooltip
};
