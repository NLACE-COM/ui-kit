import { jsx as n, jsxs as d } from "react/jsx-runtime";
import A from "react";
const P = {
  accent: "bg-nl-accent text-white hover:-translate-y-0.5",
  primary: "bg-nl-primary text-white hover:-translate-y-0.5",
  secondary: "bg-white text-nl-text border border-nl-border-ui hover:-translate-y-0.5",
  success: "bg-nl-success text-nl-success-text hover:-translate-y-0.5",
  outlineLight: "bg-transparent text-white border border-white/50 hover:-translate-y-0.5",
  danger: "bg-nl-danger text-white hover:-translate-y-0.5"
}, O = {
  sm: "px-4 py-1.5 text-[0.82rem]",
  md: "px-[22px] py-[11px] text-[0.9rem]",
  lg: "px-[30px] py-[15px] text-base"
};
function ie({
  variant: e = "primary",
  size: t = "md",
  disabled: r = !1,
  className: o = "",
  children: a,
  ...s
}) {
  return /* @__PURE__ */ n(
    "button",
    {
      disabled: r,
      className: [
        "inline-flex items-center justify-center gap-2",
        "rounded-pill font-semibold font-body",
        "transition-all duration-ui ease-nl shadow-none",
        "hover:shadow-hover",
        "focus:outline-none focus:ring-4 focus:ring-nl-primary/20",
        "disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed",
        P[e] ?? P.primary,
        O[t] ?? O.md,
        o
      ].join(" "),
      ...s,
      children: a
    }
  );
}
function se({
  accent: e = !1,
  hover: t = !0,
  padding: r = "p-6",
  className: o = "",
  children: a,
  ...s
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: [
        "rounded-card border",
        e ? "bg-nl-primary text-white border-transparent" : "bg-white border-nl-border-soft shadow-card",
        t && !e ? "transition-all duration-ui ease-nl hover:-translate-y-[3px] hover:shadow-hover" : "",
        r,
        o
      ].join(" "),
      ...s,
      children: a
    }
  );
}
const R = {
  primary: "bg-nl-primary/10 text-nl-primary",
  accent: "bg-nl-accent/10 text-[#d64f2a]",
  success: "bg-nl-success/20 text-nl-success-text",
  danger: "bg-nl-danger/8 text-nl-danger",
  neutral: "bg-nl-400/15 text-nl-700",
  solidPrimary: "bg-nl-primary text-white",
  solidAccent: "bg-nl-accent text-white",
  solidDark: "bg-nl-900 text-white"
};
function de({
  variant: e = "primary",
  className: t = "",
  children: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: [
        "inline-flex items-center gap-1.5 px-3 py-1",
        "rounded-pill text-[0.78rem] font-semibold font-body",
        R[e] ?? R.primary,
        t
      ].join(" "),
      ...o,
      children: r
    }
  );
}
function ce({
  label: e,
  error: t,
  success: r,
  hint: o,
  className: a = "",
  ...s
}) {
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-1.5 w-full", children: [
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
          t ? "border-nl-danger focus:ring-nl-danger/20" : r ? "border-nl-success-dark focus:ring-nl-success-dark/20" : "border-nl-border-ui focus:border-nl-primary focus:ring-nl-primary/20",
          a
        ].join(" "),
        ...s
      }
    ),
    (t || o) && /* @__PURE__ */ n("p", { className: `text-[0.78rem] font-body ${t ? "text-nl-danger" : "text-nl-500"}`, children: t || o })
  ] });
}
const G = {
  info: "bg-nl-primary/8 border-l-[3px] border-nl-primary",
  success: "bg-nl-success-bg border-l-[3px] border-nl-success-dark",
  warning: "bg-yellow-50 border-l-[3px] border-yellow-400",
  error: "bg-nl-danger/7 border-l-[3px] border-nl-danger"
}, te = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕"
}, V = {
  info: "text-nl-primary",
  success: "text-nl-success-text",
  warning: "text-yellow-700",
  error: "text-nl-danger"
};
function fe({
  variant: e = "info",
  title: t,
  className: r = "",
  children: o,
  ...a
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      role: "alert",
      className: [
        "flex gap-3.5 rounded-[14px] p-4",
        G[e] ?? G.info,
        r
      ].join(" "),
      ...a,
      children: [
        /* @__PURE__ */ n("span", { className: `text-base mt-0.5 ${V[e]}`, children: te[e] }),
        /* @__PURE__ */ d("div", { className: "flex flex-col gap-0.5", children: [
          t && /* @__PURE__ */ n("p", { className: `text-[0.88rem] font-semibold font-body ${V[e]}`, children: t }),
          /* @__PURE__ */ n("p", { className: "text-[0.85rem] font-body text-nl-700", children: o })
        ] })
      ]
    }
  );
}
function pe({
  variant: e = "black",
  width: t = 160,
  className: r = "",
  ...o
}) {
  const a = e === "white" ? "#ffffff" : "#141414", s = Math.round(t * 125 / 464);
  return /* @__PURE__ */ d(
    "svg",
    {
      width: t,
      height: s,
      viewBox: "0 0 464 125",
      xmlns: "http://www.w3.org/2000/svg",
      className: r,
      "aria-label": "NLACE",
      role: "img",
      ...o,
      children: [
        /* @__PURE__ */ n("path", { d: "M0 123.169V34.454H28.965L30.297 52.43l-6.326 2a24.309 24.309 0 0 1 6.492-11.152 34.6 34.6 0 0 1 11.487-7.825 35.391 35.391 0 0 1 13.983-2.83c6.659 0 12.263 1.387 16.813 4.161a24.663 24.663 0 0 1 10.488 12.15c3.553 7.99 4.434 14.537 4.434 26.188v54.594H55.933v-52.1a16.819 16.819 0 0 0-1.332-7.157 9.327 9.327 0 0 0-4-4.494 11.593 11.593 0 0 0-6.326-1.332 16.741 16.741 0 0 0-5.327.832 11.132 11.132 0 0 0-4.162 2.663 11.85 11.85 0 0 0-2.83 3.828 13.35 13.35 0 0 0-.832 4.827v52.929H0Z", fill: a }),
        /* @__PURE__ */ n("path", { d: "M103.929 123.169V0h30.964v123.169h-30.964Z", fill: a }),
        /* @__PURE__ */ n("path", { d: "M183.894 124.667a35.164 35.164 0 0 1-19.81-5.825 42.478 42.478 0 0 1-13.817-16.312 54.7 54.7 0 0 1-4.994-23.8c0-9.099 1.665-17.088 4.994-23.968a39.437 39.437 0 0 1 13.817-16.145 35.285 35.285 0 0 1 20.309-5.992 36.708 36.708 0 0 1 11.32 1.664 26.914 26.914 0 0 1 8.989 4.827 36.936 36.936 0 0 1 6.659 7.157 40.531 40.531 0 0 1 4.661 8.655l-6.325-.333V34.454H240.16v88.715H209.031V101.531l6.825.333a33.93 33.93 0 0 1-11.486 16.312 37.088 37.088 0 0 1-9.323 4.824 35.157 35.157 0 0 1-11.153 1.667Zm8.823-25.466a17.28 17.28 0 0 0 9.156-2.33 15.625 15.625 0 0 0 5.826-7.157 25.864 25.864 0 0 0 2.164-10.985 26.3 26.3 0 0 0-2.164-11.152 14.636 14.636 0 0 0-5.826-6.991 18.037 18.037 0 0 0-18.312 0 14.975 14.975 0 0 0-5.66 6.991 28.2 28.2 0 0 0-2 11.152 27.732 27.732 0 0 0 2 10.985 16.031 16.031 0 0 0 5.66 7.157 17.277 17.277 0 0 0 9.156 2.33Z", fill: a }),
        /* @__PURE__ */ n("path", { d: "M298.074 124.834a46.8 46.8 0 0 1-23.638-5.992 44.24 44.24 0 0 1-16.314-16.312 47.109 47.109 0 0 1-5.993-23.8 46.2 46.2 0 0 1 5.993-23.635 43.875 43.875 0 0 1 16.314-16.478 46.79 46.79 0 0 1 23.638-5.992 60.923 60.923 0 0 1 21.974 3.828A38.016 38.016 0 0 1 336.2 47.437L319.382 67.41a18.918 18.918 0 0 0-4.661-4.161 20.772 20.772 0 0 0-6.326-3 22.581 22.581 0 0 0-7.491-1.165 18.4 18.4 0 0 0-9.655 2.5 17.182 17.182 0 0 0-6.492 6.991 22.041 22.041 0 0 0-2.164 9.987 22.041 22.041 0 0 0 2.164 9.987 17.423 17.423 0 0 0 6.326 6.991A18.357 18.357 0 0 0 300.9 98.2a26.04 26.04 0 0 0 7.491-1 20.933 20.933 0 0 0 6.16-2.829 20.131 20.131 0 0 0 4.827-4.328L336.2 110.186A40.092 40.092 0 0 1 319.882 121 60.448 60.448 0 0 1 298.074 124.834Z", fill: a }),
        /* @__PURE__ */ n("path", { d: "M387.768 124.834c-10.099 0-18.811-1.998-26.135-5.826a42.936 42.936 0 0 1-16.98-16.312 47.106 47.106 0 0 1-5.993-23.8 50.173 50.173 0 0 1 3.329-18.475 43.522 43.522 0 0 1 9.322-14.647 40.178 40.178 0 0 1 14.15-9.654 46.4 46.4 0 0 1 18.145-3.5 44.22 44.22 0 0 1 17.479 3.329 38.271 38.271 0 0 1 13.651 9.487 41.031 41.031 0 0 1 8.823 14.481 46.7 46.7 0 0 1 2.83 18.309l-.167 6.991H356.306l-3.829-15.489h48.941l-3 3.329v-3.162a10.241 10.241 0 0 0-2-6.325 11.85 11.85 0 0 0-4.994-4.328 16.521 16.521 0 0 0-7.158-1.5 17.954 17.954 0 0 0-9.489 2.33 14.314 14.314 0 0 0-5.659 6.325 22.894 22.894 0 0 0-2 9.987 23.429 23.429 0 0 0 2.663 11.485 19.088 19.088 0 0 0 8.157 7.49 30.321 30.321 0 0 0 13.318 2.663 27.386 27.386 0 0 0 8.989-1.332 31.062 31.062 0 0 0 8.49-4.66l14.316 20.14a60.03 60.03 0 0 1-11.819 7.49 58.981 58.981 0 0 1-23.472 5.16Z", fill: a }),
        /* @__PURE__ */ n("path", { d: "M448.352 125c-4.994 0-8.878-1.387-11.653-4.161-2.663-2.774-3.995-6.713-3.995-11.818a15.879 15.879 0 0 1 4.328-11.484 15.006 15.006 0 0 1 11.32-4.494c4.883 0 8.712 1.387 11.486 4.161S464 104.917 464 109.021a15.878 15.878 0 0 1-4.328 11.485A15.006 15.006 0 0 1 448.352 125Z", fill: a })
      ]
    }
  );
}
function me({
  size: e = 40,
  rounded: t = "rounded-[22%]",
  className: r = "",
  ...o
}) {
  return /* @__PURE__ */ d(
    "svg",
    {
      width: e,
      height: e,
      viewBox: "0 0 625 625",
      xmlns: "http://www.w3.org/2000/svg",
      className: r,
      "aria-label": "NLACE avatar",
      role: "img",
      ...o,
      children: [
        /* @__PURE__ */ n("rect", { width: "625", height: "625", rx: "140", fill: "#5869f7" }),
        /* @__PURE__ */ n(
          "text",
          {
            x: "50%",
            y: "58%",
            dominantBaseline: "middle",
            textAnchor: "middle",
            fill: "white",
            fontSize: "360",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: "800",
            children: "n."
          }
        )
      ]
    }
  );
}
const K = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[2.5px]",
  lg: "w-10 h-10 border-[3px]"
};
function he({ size: e = "md", className: t = "", ...r }) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "status",
      "aria-label": "Cargando",
      className: [
        "rounded-full border-nl-border-ui border-t-nl-primary",
        "animate-spin-nl",
        K[e] ?? K.md,
        t
      ].join(" "),
      ...r
    }
  );
}
function ue({ className: e = "", ...t }) {
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
const U = {
  underline: "gap-6 border-b border-nl-border-soft",
  pill: "gap-1 p-1 bg-nl-400/12 rounded-pill w-max"
};
function xe({
  items: e = [],
  value: t,
  defaultValue: r,
  onChange: o,
  variant: a = "underline",
  className: s = "",
  children: u,
  ...x
}) {
  const f = t !== void 0, [i, l] = A.useState(
    r ?? e[0]?.id
  ), b = f ? t : i, g = (p) => {
    f || l(p), o?.(p);
  };
  return /* @__PURE__ */ d("div", { className: ["flex flex-col gap-4 font-body", s].join(" "), ...x, children: [
    /* @__PURE__ */ n("div", { role: "tablist", className: ["flex items-center", U[a] ?? U.underline].join(" "), children: e.map((p) => {
      const y = p.id === b, M = "relative cursor-pointer font-semibold text-[0.9rem] transition-all duration-ui ease-nl disabled:opacity-40 disabled:cursor-not-allowed", k = a === "pill" ? [
        "px-4 py-1.5 rounded-pill",
        y ? "bg-white text-nl-primary shadow-card" : "text-nl-500 hover:text-nl-text"
      ].join(" ") : [
        "pb-3 -mb-px border-b-2",
        y ? "border-nl-primary text-nl-text" : "border-transparent text-nl-500 hover:text-nl-text"
      ].join(" ");
      return /* @__PURE__ */ d(
        "button",
        {
          role: "tab",
          "aria-selected": y,
          disabled: p.disabled,
          onClick: () => g(p.id),
          className: [M, k].join(" "),
          children: [
            p.label,
            p.badge != null && /* @__PURE__ */ n("span", { className: "ml-2 inline-flex items-center px-2 py-0.5 rounded-pill text-[0.68rem] font-semibold bg-nl-primary/10 text-nl-primary", children: p.badge })
          ]
        },
        p.id
      );
    }) }),
    typeof u == "function" ? u(b) : u
  ] });
}
const X = {
  sm: { track: "w-9 h-5", knob: "w-3.5 h-3.5", on: "translate-x-4" },
  md: { track: "w-12 h-7", knob: "w-5 h-5", on: "translate-x-5" }
};
function be({
  checked: e,
  defaultChecked: t = !1,
  onChange: r,
  disabled: o = !1,
  size: a = "md",
  label: s,
  description: u,
  className: x = "",
  ...f
}) {
  const i = e !== void 0, [l, b] = A.useState(t), g = i ? e : l, p = X[a] ?? X.md, y = () => {
    o || (i || b(!g), r?.(!g));
  };
  return /* @__PURE__ */ d(
    "label",
    {
      className: [
        "inline-flex items-center gap-3 font-body select-none",
        o ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        x
      ].join(" "),
      ...f,
      children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": g,
            disabled: o,
            onClick: y,
            className: [
              "relative shrink-0 rounded-pill p-0.5",
              "transition-colors duration-ui ease-nl",
              "focus:outline-none focus:ring-4 focus:ring-nl-primary/20",
              p.track,
              g ? "bg-nl-primary" : "bg-nl-400/45"
            ].join(" "),
            children: /* @__PURE__ */ n(
              "span",
              {
                className: [
                  "block rounded-pill bg-white shadow-card",
                  "transition-transform duration-ui ease-nl",
                  p.knob,
                  g ? p.on : "translate-x-0"
                ].join(" ")
              }
            )
          }
        ),
        (s || u) && /* @__PURE__ */ d("span", { className: "flex flex-col", children: [
          s && /* @__PURE__ */ n("span", { className: "text-[0.9rem] font-semibold text-nl-text", children: s }),
          u && /* @__PURE__ */ n("span", { className: "text-[0.8rem] text-nl-500", children: u })
        ] })
      ]
    }
  );
}
const Y = {
  top: { box: "bottom-full left-1/2 -translate-x-1/2 mb-2", arrow: "top-full left-1/2 -translate-x-1/2 -mt-1" },
  bottom: { box: "top-full left-1/2 -translate-x-1/2 mt-2", arrow: "bottom-full left-1/2 -translate-x-1/2 -mb-1" },
  left: { box: "right-full top-1/2 -translate-y-1/2 mr-2", arrow: "left-full top-1/2 -translate-y-1/2 -ml-1" },
  right: { box: "left-full top-1/2 -translate-y-1/2 ml-2", arrow: "right-full top-1/2 -translate-y-1/2 -mr-1" }
};
function ge({
  label: e,
  placement: t = "top",
  className: r = "",
  children: o,
  ...a
}) {
  const s = Y[t] ?? Y.top;
  return /* @__PURE__ */ d("span", { className: ["relative inline-flex group/tt font-body", r].join(" "), ...a, children: [
    o,
    /* @__PURE__ */ d(
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
          s.box
        ].join(" "),
        children: [
          e,
          /* @__PURE__ */ n("span", { className: ["absolute w-2 h-2 rotate-45 bg-nl-900", s.arrow].join(" ") })
        ]
      }
    )
  ] });
}
const q = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl"
};
function ye({
  open: e = !1,
  onClose: t,
  title: r,
  description: o,
  size: a = "md",
  footer: s,
  closeOnScrim: u = !0,
  className: x = "",
  children: f,
  ...i
}) {
  return A.useEffect(() => {
    if (!e) return;
    const l = (b) => {
      b.key === "Escape" && t?.();
    };
    return window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l);
  }, [e, t]), e ? /* @__PURE__ */ d(
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
            onClick: () => u && t?.()
          }
        ),
        /* @__PURE__ */ d(
          "div",
          {
            className: [
              "relative w-full bg-white rounded-card shadow-hover",
              "border border-nl-border-soft overflow-hidden",
              "animate-fade-up",
              q[a] ?? q.md,
              x
            ].join(" "),
            ...i,
            children: [
              (r || t) && /* @__PURE__ */ d("div", { className: "flex items-start justify-between gap-4 px-6 pt-5 pb-3", children: [
                /* @__PURE__ */ d("div", { className: "flex flex-col gap-1", children: [
                  r && /* @__PURE__ */ n("h4", { className: "text-[1.15rem] font-semibold font-display text-nl-text", children: r }),
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
              /* @__PURE__ */ n("div", { className: "px-6 py-2 text-[0.9rem] text-nl-700 leading-relaxed", children: f }),
              s && /* @__PURE__ */ n("div", { className: "flex items-center justify-end gap-2.5 px-6 pt-4 pb-5 mt-2", children: s })
            ]
          }
        )
      ]
    }
  ) : null;
}
function we({
  trigger: e,
  items: t = [],
  onSelect: r,
  align: o = "left",
  className: a = "",
  ...s
}) {
  const [u, x] = A.useState(!1), f = A.useRef(null);
  return A.useEffect(() => {
    if (!u) return;
    const i = (b) => {
      f.current && !f.current.contains(b.target) && x(!1);
    }, l = (b) => {
      b.key === "Escape" && x(!1);
    };
    return document.addEventListener("mousedown", i), window.addEventListener("keydown", l), () => {
      document.removeEventListener("mousedown", i), window.removeEventListener("keydown", l);
    };
  }, [u]), /* @__PURE__ */ d("div", { ref: f, className: ["relative inline-flex font-body", a].join(" "), ...s, children: [
    /* @__PURE__ */ n("span", { onClick: () => x((i) => !i), className: "inline-flex", children: e }),
    u && /* @__PURE__ */ n(
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
          (i, l) => i.divider ? /* @__PURE__ */ n("div", { className: "my-1.5 h-px bg-nl-border-soft" }, `d${l}`) : /* @__PURE__ */ d(
            "button",
            {
              role: "menuitem",
              disabled: i.disabled,
              onClick: () => {
                r?.(i.id), x(!1);
              },
              className: [
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-[9px]",
                "text-[0.86rem] font-medium text-left",
                "transition-colors duration-150",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                i.danger ? "text-nl-danger hover:bg-nl-danger/8" : "text-nl-text hover:bg-nl-primary/8"
              ].join(" "),
              children: [
                i.icon && /* @__PURE__ */ n("span", { className: "text-[0.95rem] opacity-80", children: i.icon }),
                /* @__PURE__ */ n("span", { className: "flex-1", children: i.label }),
                i.shortcut && /* @__PURE__ */ n("span", { className: "text-[0.72rem] text-nl-400 font-mono", children: i.shortcut })
              ]
            },
            i.id
          )
        )
      }
    )
  ] });
}
function ve({
  columns: e = [],
  rows: t = [],
  rowKey: r = "id",
  dense: o = !1,
  className: a = "",
  ...s
}) {
  const u = o ? "px-4 py-2.5" : "px-5 py-3.5", x = (f) => f === "right" ? "text-right" : f === "center" ? "text-center" : "text-left";
  return /* @__PURE__ */ n("div", { className: ["w-full overflow-x-auto rounded-card border border-nl-border-soft bg-white font-body", a].join(" "), ...s, children: /* @__PURE__ */ d("table", { className: "w-full border-collapse text-[0.88rem]", children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: "border-b border-nl-border-soft", children: e.map((f) => /* @__PURE__ */ n(
      "th",
      {
        className: [
          u,
          x(f.align),
          "text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-nl-500 whitespace-nowrap"
        ].join(" "),
        children: f.header
      },
      f.key
    )) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((f, i) => /* @__PURE__ */ n(
      "tr",
      {
        className: "border-b border-nl-border-soft last:border-0 transition-colors duration-150 hover:bg-nl-primary/5",
        children: e.map((l) => /* @__PURE__ */ n("td", { className: [u, x(l.align), "text-nl-700 whitespace-nowrap"].join(" "), children: l.render ? l.render(f) : f[l.key] }, l.key))
      },
      f[r] ?? i
    )) })
  ] }) });
}
const C = [
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
], L = "Inter, system-ui, sans-serif", B = '"Space Grotesk", sans-serif', J = "#dbdcd7", Q = "#a1a1aa", _ = "#71717a", D = "#0f1011";
function Z(e) {
  if (e <= 0) return 1;
  const t = Math.pow(10, Math.floor(Math.log10(e))), r = e / t;
  let o;
  return r <= 1 ? o = 1 : r <= 2 ? o = 2 : r <= 2.5 ? o = 2.5 : r <= 5 ? o = 5 : o = 10, o * t;
}
function H(e) {
  return Math.abs(e) >= 1e6 ? (e / 1e6).toFixed(e % 1e6 ? 1 : 0) + "M" : Math.abs(e) >= 1e3 ? (e / 1e3).toFixed(e % 1e3 ? 1 : 0) + "k" : String(Math.round(e * 100) / 100);
}
function ee({ items: e, style: t }) {
  return !e || e.length < 2 ? null : /* @__PURE__ */ n("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px 18px", ...t }, children: e.map((r, o) => /* @__PURE__ */ d("div", { style: { display: "flex", alignItems: "center", gap: 7 }, children: [
    /* @__PURE__ */ n("span", { style: { width: 10, height: 10, borderRadius: 3, background: r.color, flex: "none" } }),
    /* @__PURE__ */ n("span", { style: { fontFamily: L, fontSize: 12.5, color: _ }, children: r.name })
  ] }, o)) });
}
function ke({
  labels: e = [],
  series: t = [],
  height: r = 240,
  stacked: o = !1,
  showValues: a = !0,
  legend: s = !0,
  className: u = "",
  ...x
}) {
  const i = r, l = { top: 18, right: 14, bottom: 30, left: 38 }, b = 580 - l.left - l.right, g = i - l.top - l.bottom, p = t.map((m, v) => m.color || C[v % C.length]);
  let y;
  o ? y = Z(Math.max(1, ...e.map((m, v) => t.reduce((c, h) => c + (h.values[v] || 0), 0)))) : y = Z(Math.max(1, ...t.flatMap((m) => m.values)));
  const M = [0, y / 2, y], k = b / Math.max(1, e.length), w = t.length === 1;
  return /* @__PURE__ */ d("div", { className: u, ...x, children: [
    /* @__PURE__ */ d("svg", { viewBox: `0 0 580 ${i}`, width: "100%", style: { display: "block", height: "auto", overflow: "visible" }, role: "img", children: [
      M.map((m, v) => {
        const c = l.top + g - m / y * g;
        return /* @__PURE__ */ d("g", { children: [
          /* @__PURE__ */ n("line", { x1: l.left, y1: c, x2: 580 - l.right, y2: c, stroke: J, strokeWidth: "1", strokeDasharray: v === 0 ? "0" : "3 4" }),
          /* @__PURE__ */ n("text", { x: l.left - 8, y: c + 4, textAnchor: "end", fontFamily: L, fontSize: "11", fill: Q, children: H(m) })
        ] }, v);
      }),
      e.map((m, v) => {
        const c = l.left + k * v, h = w ? k * 0.5 : k * 0.66, $ = h / (w ? 1 : t.length), W = c + (k - h) / 2;
        let E = l.top + g;
        return /* @__PURE__ */ d("g", { children: [
          t.map((j, N) => {
            const z = j.values[v] || 0, I = z / y * g;
            let F, S;
            return o ? (F = c + (k - k * 0.5) / 2, S = E - I, E = S, /* @__PURE__ */ n("rect", { x: F, y: S, width: k * 0.5, height: Math.max(0, I), rx: "3", fill: p[N] }, N)) : (F = W + $ * N, S = l.top + g - I, /* @__PURE__ */ d("g", { children: [
              /* @__PURE__ */ n("rect", { x: F, y: S, width: Math.max(1, $ - 3), height: Math.max(0, I), rx: "4", fill: p[N] }),
              a && w && /* @__PURE__ */ n("text", { x: F + ($ - 3) / 2, y: S - 6, textAnchor: "middle", fontFamily: B, fontSize: "12", fontWeight: "600", fill: D, children: H(z) })
            ] }, N));
          }),
          /* @__PURE__ */ n("text", { x: c + k / 2, y: i - l.bottom + 18, textAnchor: "middle", fontFamily: L, fontSize: "11.5", fill: _, children: m })
        ] }, v);
      })
    ] }),
    s && /* @__PURE__ */ n(ee, { items: t.map((m, v) => ({ name: m.name, color: p[v] })), style: { marginTop: 12, paddingLeft: 4 } })
  ] });
}
function ne({
  labels: e = [],
  series: t = [],
  height: r = 240,
  area: o = !1,
  showDots: a = !0,
  legend: s = !0,
  className: u = "",
  ...x
}) {
  const i = r, l = { top: 18, right: 16, bottom: 30, left: 38 }, b = 580 - l.left - l.right, g = i - l.top - l.bottom, p = t.map((c, h) => c.color || C[h % C.length]), y = Z(Math.max(1, ...t.flatMap((c) => c.values))), M = [0, y / 2, y], k = e.length, w = (c) => l.left + (k <= 1 ? b / 2 : b * c / (k - 1)), m = (c) => l.top + g - c / y * g, v = A.useId ? A.useId().replace(/:/g, "") : "g" + Math.random().toString(36).slice(2, 8);
  return /* @__PURE__ */ d("div", { className: u, ...x, children: [
    /* @__PURE__ */ d("svg", { viewBox: `0 0 580 ${i}`, width: "100%", style: { display: "block", height: "auto", overflow: "visible" }, role: "img", children: [
      /* @__PURE__ */ n("defs", { children: o && t.map((c, h) => /* @__PURE__ */ d("linearGradient", { id: `${v}-a${h}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ n("stop", { offset: "0%", stopColor: p[h], stopOpacity: "0.26" }),
        /* @__PURE__ */ n("stop", { offset: "100%", stopColor: p[h], stopOpacity: "0.02" })
      ] }, h)) }),
      M.map((c, h) => {
        const $ = m(c);
        return /* @__PURE__ */ d("g", { children: [
          /* @__PURE__ */ n("line", { x1: l.left, y1: $, x2: 580 - l.right, y2: $, stroke: J, strokeWidth: "1", strokeDasharray: h === 0 ? "0" : "3 4" }),
          /* @__PURE__ */ n("text", { x: l.left - 8, y: $ + 4, textAnchor: "end", fontFamily: L, fontSize: "11", fill: Q, children: H(c) })
        ] }, h);
      }),
      t.map((c, h) => {
        const $ = c.values.map((j, N) => [w(N), m(j)]), W = $.map((j, N) => (N ? "L" : "M") + j[0].toFixed(1) + " " + j[1].toFixed(1)).join(" "), E = `${W} L ${w(k - 1).toFixed(1)} ${m(0).toFixed(1)} L ${w(0).toFixed(1)} ${m(0).toFixed(1)} Z`;
        return /* @__PURE__ */ d("g", { children: [
          o && /* @__PURE__ */ n("path", { d: E, fill: `url(#${v}-a${h})` }),
          /* @__PURE__ */ n("path", { d: W, fill: "none", stroke: p[h], strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          a && $.map((j, N) => /* @__PURE__ */ n("circle", { cx: j[0], cy: j[1], r: "3.4", fill: "#fff", stroke: p[h], strokeWidth: "2" }, N))
        ] }, h);
      }),
      e.map((c, h) => /* @__PURE__ */ n("text", { x: w(h), y: i - l.bottom + 18, textAnchor: "middle", fontFamily: L, fontSize: "11.5", fill: _, children: c }, h))
    ] }),
    s && /* @__PURE__ */ n(ee, { items: t.map((c, h) => ({ name: c.name, color: p[h] })), style: { marginTop: 12, paddingLeft: 4 } })
  ] });
}
function Ne(e) {
  return /* @__PURE__ */ n(ne, { area: !0, ...e });
}
function T(e, t, r, o) {
  return [e + r * Math.cos(o), t + r * Math.sin(o)];
}
function re(e, t, r, o, a, s) {
  const [u, x] = T(e, t, r, a), [f, i] = T(e, t, r, s), l = s - a > Math.PI ? 1 : 0;
  if (o <= 0)
    return `M ${e} ${t} L ${u} ${x} A ${r} ${r} 0 ${l} 1 ${f} ${i} Z`;
  const [b, g] = T(e, t, o, s), [p, y] = T(e, t, o, a);
  return `M ${u} ${x} A ${r} ${r} 0 ${l} 1 ${f} ${i} L ${b} ${g} A ${o} ${o} 0 ${l} 0 ${p} ${y} Z`;
}
function oe({
  data: e = [],
  size: t = 200,
  donut: r = !1,
  thickness: o = 0.42,
  centerLabel: a,
  centerValue: s,
  legend: u = !0,
  className: x = "",
  ...f
}) {
  const i = e.reduce((w, m) => w + (m.value || 0), 0) || 1, l = t / 2, b = t / 2, g = t / 2 - 2, p = r ? g * (1 - o) : 0, y = e.map((w, m) => w.color || C[m % C.length]);
  let M = -Math.PI / 2;
  const k = e.map((w, m) => {
    const v = (w.value || 0) / i, c = M, h = M + v * Math.PI * 2;
    return M = h, { d: re(l, b, g, p, c, h), color: y[m], pct: v };
  });
  return /* @__PURE__ */ d("div", { className: x, style: { display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }, ...f, children: [
    /* @__PURE__ */ d("svg", { viewBox: `0 0 ${t} ${t}`, width: t, height: t, style: { flex: "none", overflow: "visible" }, role: "img", children: [
      k.map((w, m) => /* @__PURE__ */ n("path", { d: w.d, fill: w.color, stroke: "#fff", strokeWidth: r ? 0 : 2 }, m)),
      r && (s != null || a) && /* @__PURE__ */ d("g", { children: [
        s != null && /* @__PURE__ */ n("text", { x: l, y: b + (a ? -2 : 6), textAnchor: "middle", fontFamily: B, fontSize: t * 0.18, fontWeight: "700", fill: D, children: s }),
        a && /* @__PURE__ */ n("text", { x: l, y: b + t * 0.13, textAnchor: "middle", fontFamily: L, fontSize: t * 0.075, fill: _, children: a })
      ] })
    ] }),
    u && /* @__PURE__ */ n("div", { style: { display: "flex", flexDirection: "column", gap: 9 }, children: e.map((w, m) => /* @__PURE__ */ d("div", { style: { display: "flex", alignItems: "center", gap: 9 }, children: [
      /* @__PURE__ */ n("span", { style: { width: 11, height: 11, borderRadius: 3, background: y[m], flex: "none" } }),
      /* @__PURE__ */ n("span", { style: { fontFamily: L, fontSize: 13, color: "#3f3f46", minWidth: 90 }, children: w.label }),
      /* @__PURE__ */ d("span", { style: { fontFamily: B, fontSize: 13, fontWeight: 600, color: D }, children: [
        Math.round(w.value / i * 100),
        "%"
      ] })
    ] }, m)) })
  ] });
}
function $e(e) {
  return /* @__PURE__ */ n(oe, { donut: !0, ...e });
}
export {
  fe as Alert,
  Ne as AreaChart,
  de as Badge,
  ke as BarChart,
  ie as Button,
  se as Card,
  $e as DonutChart,
  we as Dropdown,
  ce as Input,
  ne as LineChart,
  ye as Modal,
  C as NL_CHART_PALETTE,
  me as NlaceAvatar,
  pe as NlaceLogo,
  oe as PieChart,
  ue as Skeleton,
  he as Spinner,
  be as Switch,
  ve as Table,
  xe as Tabs,
  ge as Tooltip
};
