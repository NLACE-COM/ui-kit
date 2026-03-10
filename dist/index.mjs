import { jsx as t, jsxs as s } from "react/jsx-runtime";
import "react";
const i = {
  accent: "bg-nl-accent text-white hover:-translate-y-0.5",
  primary: "bg-nl-primary text-white hover:-translate-y-0.5",
  secondary: "bg-white text-nl-text border border-nl-border-ui hover:-translate-y-0.5",
  success: "bg-nl-success text-nl-success-text hover:-translate-y-0.5",
  outlineLight: "bg-transparent text-white border border-white/50 hover:-translate-y-0.5",
  danger: "bg-nl-danger text-white hover:-translate-y-0.5"
}, d = {
  sm: "px-4 py-1.5 text-[0.82rem]",
  md: "px-[22px] py-[11px] text-[0.9rem]",
  lg: "px-[30px] py-[15px] text-base"
};
function f({
  variant: e = "primary",
  size: r = "md",
  disabled: n = !1,
  className: a = "",
  children: l,
  ...o
}) {
  return /* @__PURE__ */ t(
    "button",
    {
      disabled: n,
      className: [
        "inline-flex items-center justify-center gap-2",
        "rounded-pill font-semibold font-body",
        "transition-all duration-ui ease-nl shadow-none",
        "hover:shadow-hover",
        "focus:outline-none focus:ring-4 focus:ring-nl-primary/20",
        "disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed",
        i[e] ?? i.primary,
        d[r] ?? d.md,
        a
      ].join(" "),
      ...o,
      children: l
    }
  );
}
function y({
  accent: e = !1,
  hover: r = !0,
  padding: n = "p-6",
  className: a = "",
  children: l,
  ...o
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: [
        "rounded-card border",
        e ? "bg-nl-primary text-white border-transparent" : "bg-white border-nl-border-soft shadow-card",
        r && !e ? "transition-all duration-ui ease-nl hover:-translate-y-[3px] hover:shadow-hover" : "",
        n,
        a
      ].join(" "),
      ...o,
      children: l
    }
  );
}
const c = {
  primary: "bg-nl-primary/10 text-nl-primary",
  accent: "bg-nl-accent/10 text-[#d64f2a]",
  success: "bg-nl-success/20 text-nl-success-text",
  danger: "bg-nl-danger/8 text-nl-danger",
  neutral: "bg-nl-400/15 text-nl-700",
  solidPrimary: "bg-nl-primary text-white",
  solidAccent: "bg-nl-accent text-white",
  solidDark: "bg-nl-900 text-white"
};
function w({
  variant: e = "primary",
  className: r = "",
  children: n,
  ...a
}) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: [
        "inline-flex items-center gap-1.5 px-3 py-1",
        "rounded-pill text-[0.78rem] font-semibold font-body",
        c[e] ?? c.primary,
        r
      ].join(" "),
      ...a,
      children: n
    }
  );
}
function v({
  label: e,
  error: r,
  success: n,
  hint: a,
  className: l = "",
  ...o
}) {
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 w-full", children: [
    e && /* @__PURE__ */ t("label", { className: "text-[0.82rem] font-semibold text-nl-text font-body", children: e }),
    /* @__PURE__ */ t(
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
          r ? "border-nl-danger focus:ring-nl-danger/20" : n ? "border-nl-success-dark focus:ring-nl-success-dark/20" : "border-nl-border-ui focus:border-nl-primary focus:ring-nl-primary/20",
          l
        ].join(" "),
        ...o
      }
    ),
    (r || a) && /* @__PURE__ */ t("p", { className: `text-[0.78rem] font-body ${r ? "text-nl-danger" : "text-nl-500"}`, children: r || a })
  ] });
}
const x = {
  info: "bg-nl-primary/8 border-l-[3px] border-nl-primary",
  success: "bg-nl-success-bg border-l-[3px] border-nl-success-dark",
  warning: "bg-yellow-50 border-l-[3px] border-yellow-400",
  error: "bg-nl-danger/7 border-l-[3px] border-nl-danger"
}, u = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕"
}, b = {
  info: "text-nl-primary",
  success: "text-nl-success-text",
  warning: "text-yellow-700",
  error: "text-nl-danger"
};
function N({
  variant: e = "info",
  title: r,
  className: n = "",
  children: a,
  ...l
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "alert",
      className: [
        "flex gap-3.5 rounded-[14px] p-4",
        x[e] ?? x.info,
        n
      ].join(" "),
      ...l,
      children: [
        /* @__PURE__ */ t("span", { className: `text-base mt-0.5 ${b[e]}`, children: u[e] }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
          r && /* @__PURE__ */ t("p", { className: `text-[0.88rem] font-semibold font-body ${b[e]}`, children: r }),
          /* @__PURE__ */ t("p", { className: "text-[0.85rem] font-body text-nl-700", children: a })
        ] })
      ]
    }
  );
}
function j({
  variant: e = "black",
  width: r = 160,
  className: n = "",
  ...a
}) {
  const l = e === "white" ? "#ffffff" : "#141414", o = Math.round(r * 125 / 464);
  return /* @__PURE__ */ s(
    "svg",
    {
      width: r,
      height: o,
      viewBox: "0 0 464 125",
      xmlns: "http://www.w3.org/2000/svg",
      className: n,
      "aria-label": "NLACE",
      role: "img",
      ...a,
      children: [
        /* @__PURE__ */ t("path", { d: "M0 123.169V34.454H28.965L30.297 52.43l-6.326 2a24.309 24.309 0 0 1 6.492-11.152 34.6 34.6 0 0 1 11.487-7.825 35.391 35.391 0 0 1 13.983-2.83c6.659 0 12.263 1.387 16.813 4.161a24.663 24.663 0 0 1 10.488 12.15c3.553 7.99 4.434 14.537 4.434 26.188v54.594H55.933v-52.1a16.819 16.819 0 0 0-1.332-7.157 9.327 9.327 0 0 0-4-4.494 11.593 11.593 0 0 0-6.326-1.332 16.741 16.741 0 0 0-5.327.832 11.132 11.132 0 0 0-4.162 2.663 11.85 11.85 0 0 0-2.83 3.828 13.35 13.35 0 0 0-.832 4.827v52.929H0Z", fill: l }),
        /* @__PURE__ */ t("path", { d: "M103.929 123.169V0h30.964v123.169h-30.964Z", fill: l }),
        /* @__PURE__ */ t("path", { d: "M183.894 124.667a35.164 35.164 0 0 1-19.81-5.825 42.478 42.478 0 0 1-13.817-16.312 54.7 54.7 0 0 1-4.994-23.8c0-9.099 1.665-17.088 4.994-23.968a39.437 39.437 0 0 1 13.817-16.145 35.285 35.285 0 0 1 20.309-5.992 36.708 36.708 0 0 1 11.32 1.664 26.914 26.914 0 0 1 8.989 4.827 36.936 36.936 0 0 1 6.659 7.157 40.531 40.531 0 0 1 4.661 8.655l-6.325-.333V34.454H240.16v88.715H209.031V101.531l6.825.333a33.93 33.93 0 0 1-11.486 16.312 37.088 37.088 0 0 1-9.323 4.824 35.157 35.157 0 0 1-11.153 1.667Zm8.823-25.466a17.28 17.28 0 0 0 9.156-2.33 15.625 15.625 0 0 0 5.826-7.157 25.864 25.864 0 0 0 2.164-10.985 26.3 26.3 0 0 0-2.164-11.152 14.636 14.636 0 0 0-5.826-6.991 18.037 18.037 0 0 0-18.312 0 14.975 14.975 0 0 0-5.66 6.991 28.2 28.2 0 0 0-2 11.152 27.732 27.732 0 0 0 2 10.985 16.031 16.031 0 0 0 5.66 7.157 17.277 17.277 0 0 0 9.156 2.33Z", fill: l }),
        /* @__PURE__ */ t("path", { d: "M298.074 124.834a46.8 46.8 0 0 1-23.638-5.992 44.24 44.24 0 0 1-16.314-16.312 47.109 47.109 0 0 1-5.993-23.8 46.2 46.2 0 0 1 5.993-23.635 43.875 43.875 0 0 1 16.314-16.478 46.79 46.79 0 0 1 23.638-5.992 60.923 60.923 0 0 1 21.974 3.828A38.016 38.016 0 0 1 336.2 47.437L319.382 67.41a18.918 18.918 0 0 0-4.661-4.161 20.772 20.772 0 0 0-6.326-3 22.581 22.581 0 0 0-7.491-1.165 18.4 18.4 0 0 0-9.655 2.5 17.182 17.182 0 0 0-6.492 6.991 22.041 22.041 0 0 0-2.164 9.987 22.041 22.041 0 0 0 2.164 9.987 17.423 17.423 0 0 0 6.326 6.991A18.357 18.357 0 0 0 300.9 98.2a26.04 26.04 0 0 0 7.491-1 20.933 20.933 0 0 0 6.16-2.829 20.131 20.131 0 0 0 4.827-4.328L336.2 110.186A40.092 40.092 0 0 1 319.882 121 60.448 60.448 0 0 1 298.074 124.834Z", fill: l }),
        /* @__PURE__ */ t("path", { d: "M387.768 124.834c-10.099 0-18.811-1.998-26.135-5.826a42.936 42.936 0 0 1-16.98-16.312 47.106 47.106 0 0 1-5.993-23.8 50.173 50.173 0 0 1 3.329-18.475 43.522 43.522 0 0 1 9.322-14.647 40.178 40.178 0 0 1 14.15-9.654 46.4 46.4 0 0 1 18.145-3.5 44.22 44.22 0 0 1 17.479 3.329 38.271 38.271 0 0 1 13.651 9.487 41.031 41.031 0 0 1 8.823 14.481 46.7 46.7 0 0 1 2.83 18.309l-.167 6.991H356.306l-3.829-15.489h48.941l-3 3.329v-3.162a10.241 10.241 0 0 0-2-6.325 11.85 11.85 0 0 0-4.994-4.328 16.521 16.521 0 0 0-7.158-1.5 17.954 17.954 0 0 0-9.489 2.33 14.314 14.314 0 0 0-5.659 6.325 22.894 22.894 0 0 0-2 9.987 23.429 23.429 0 0 0 2.663 11.485 19.088 19.088 0 0 0 8.157 7.49 30.321 30.321 0 0 0 13.318 2.663 27.386 27.386 0 0 0 8.989-1.332 31.062 31.062 0 0 0 8.49-4.66l14.316 20.14a60.03 60.03 0 0 1-11.819 7.49 58.981 58.981 0 0 1-23.472 5.16Z", fill: l }),
        /* @__PURE__ */ t("path", { d: "M448.352 125c-4.994 0-8.878-1.387-11.653-4.161-2.663-2.774-3.995-6.713-3.995-11.818a15.879 15.879 0 0 1 4.328-11.484 15.006 15.006 0 0 1 11.32-4.494c4.883 0 8.712 1.387 11.486 4.161S464 104.917 464 109.021a15.878 15.878 0 0 1-4.328 11.485A15.006 15.006 0 0 1 448.352 125Z", fill: l })
      ]
    }
  );
}
function A({
  size: e = 40,
  rounded: r = "rounded-[22%]",
  className: n = "",
  ...a
}) {
  return /* @__PURE__ */ s(
    "svg",
    {
      width: e,
      height: e,
      viewBox: "0 0 625 625",
      xmlns: "http://www.w3.org/2000/svg",
      className: n,
      "aria-label": "NLACE avatar",
      role: "img",
      ...a,
      children: [
        /* @__PURE__ */ t("rect", { width: "625", height: "625", rx: "140", fill: "#5869f7" }),
        /* @__PURE__ */ t(
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
const p = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[2.5px]",
  lg: "w-10 h-10 border-[3px]"
};
function k({ size: e = "md", className: r = "", ...n }) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "status",
      "aria-label": "Cargando",
      className: [
        "rounded-full border-nl-border-ui border-t-nl-primary",
        "animate-spin-nl",
        p[e] ?? p.md,
        r
      ].join(" "),
      ...n
    }
  );
}
function C({ className: e = "", ...r }) {
  return /* @__PURE__ */ t(
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
      ...r
    }
  );
}
export {
  N as Alert,
  w as Badge,
  f as Button,
  y as Card,
  v as Input,
  A as NlaceAvatar,
  j as NlaceLogo,
  C as Skeleton,
  k as Spinner
};
