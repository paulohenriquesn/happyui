"use client";

/**
 * HappyUI for React
 *
 * Thin, typed wrappers over the HappyUI stylesheet. They render the same
 * HTML and classes as the plain CSS kit and add no styles of their own.
 * The only dependency is React (18 or 19).
 *
 *   import "happyui/css";                 // the stylesheet, once, in your root
 *   import { Button } from "./happyui";   // this file
 *
 * Interactive behavior (tabs, menus, dialogs, toasts, theme, reveal on
 * scroll) is done in React, so the vanilla happyui.js is NOT needed.
 *
 * Conventions
 * - Every component accepts className (merged with its own) and passes the
 *   other props to the native element.
 * - Controls with a wrapper (Select, Checkbox, Radio, Switch, Table) put
 *   className and style on the outer element and the rest on the native one.
 * - Sub-parts are separate exports (CardTitle, TabPanel, ...) and not dot
 *   notation, so Server Components can import them.
 * - tone="pink" adds the .hui-pink class. tilt sets --hui-tilt.
 * - A number for tilt is degrees. A number for gap or size is pixels.
 *
 * MIT License
 */

import {
  Children,
  cloneElement,
  createContext,
  createElement,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  AnchorHTMLAttributes,
  AriaAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  FieldsetHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  Ref,
  SelectHTMLAttributes,
  SVGAttributes,
  SyntheticEvent,
  TableHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
} from "react";

/* ==========================================================================
   Foundations: types and tiny helpers
   ========================================================================== */

/** A tone class: the component takes that color. */
export type Tone =
  | "yellow"
  | "orange"
  | "red"
  | "pink"
  | "purple"
  | "blue"
  | "teal"
  | "green"
  | "brand"
  | "paper"
  | "info"
  | "success"
  | "warning"
  | "danger";

/** A hand-placed rotation. A number is degrees, a string is any CSS angle. */
export type Tilt = number | string;

/** A length. A number is pixels, a string is any CSS length. */
export type Length = number | string;

type ClassValue = string | number | false | null | undefined;

/** Join class names and skip the falsy ones. */
function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

const toneClass = (tone?: Tone): string | undefined => (tone ? `hui-${tone}` : undefined);
const px = (value?: Length): string | undefined => (typeof value === "number" ? `${value}px` : value);
const deg = (value?: Tilt): string | undefined => (typeof value === "number" ? `${value}deg` : value);

type Vars = Record<`--${string}`, string | number | undefined>;

/** Merge CSS variables (the ones the stylesheet reads) into a style object. */
function withVars(style: CSSProperties | undefined, vars: Vars): CSSProperties | undefined {
  const defined = Object.entries(vars).filter(([, value]) => value !== undefined);
  if (defined.length === 0) return style;
  return { ...Object.fromEntries(defined), ...style } as CSSProperties;
}

/** createElement for a tag picked at runtime. Children go inside props. */
function h(tag: string, props: Record<string, unknown>): ReactElement {
  return createElement(tag, props);
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

/** One callback ref that feeds several refs. */
function useMergedRef<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((node: T | null) => refs.forEach((ref) => assignRef(ref, node)), refs);
}

/** State that can be controlled (value) or free (initial). */
function useControllable<T>(
  controlled: T | undefined,
  initial: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [inner, setInner] = useState<T>(initial);
  const isControlled = controlled !== undefined;
  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInner(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );
  return [isControlled ? (controlled as T) : inner, set];
}

/** Add a class to an element node (an icon), leave other nodes alone. */
function withClass(node: ReactNode, className: string): ReactNode {
  return isValidElement<{ className?: string }>(node)
    ? cloneElement(node, { className: cx(className, node.props.className) })
    : node;
}

const has = (node: ReactNode): boolean => node !== undefined && node !== null && node !== false && node !== "";

/** The props of a link that can also be a button. */
type LinkAttrs = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel" | "download" | "hrefLang" | "referrerPolicy"
>;

/** Render an <a> when href is a string, otherwise the fallback tag. */
function renderLinkOrElement(fallback: string, props: Record<string, unknown>, ref: unknown): ReactElement {
  const isLink = typeof props.href === "string";
  const button = !isLink && fallback === "button" && props.type === undefined ? { type: "button" } : null;
  return h(isLink ? "a" : fallback, { ...button, ...props, ref });
}

type PartTag =
  | "div"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "ul"
  | "ol"
  | "li"
  | "figure";

/** Props of the simple one-class parts (ButtonGroup, CardFooter, Lede, ...). */
export interface PartProps extends HTMLAttributes<HTMLElement> {
  /** Render another element, for example a different heading level. */
  as?: PartTag;
}

/** Same as PartProps, plus a tone. */
export interface TonePartProps extends PartProps {
  tone?: Tone;
}

/** A component that is one element with a fixed class. */
function createPart(tag: string, base: string, displayName: string) {
  const Part = forwardRef<HTMLElement, PartProps>(function Part({ as, className, ...rest }, ref) {
    return h(as ?? tag, { ...rest, ref, className: cx(base, className) });
  });
  Part.displayName = displayName;
  return Part;
}

/** Same, but the element can take a tone class. */
function createTonePart(tag: string, base: string, displayName: string) {
  const Part = forwardRef<HTMLElement, TonePartProps>(function TonePart({ as, tone, className, ...rest }, ref) {
    return h(as ?? tag, { ...rest, ref, className: cx(base, toneClass(tone), className) });
  });
  Part.displayName = displayName;
  return Part;
}

/* ==========================================================================
   Layout
   ========================================================================== */

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** A narrower reading width. */
  narrow?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { narrow, className, ...rest },
  ref,
) {
  return <div ref={ref} {...rest} className={cx("hui-container", narrow && "hui-container--narrow", className)} />;
});

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Space between children (--hui-gap). */
  gap?: Length;
}

/** Children stacked vertically with one gap. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack({ gap, className, style, ...rest }, ref) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-stack", className)}
      style={withVars(style, { "--hui-gap": px(gap) })}
    />
  );
});

/** Things in a row that wrap when they run out of room. */
export const Cluster = forwardRef<HTMLDivElement, StackProps>(function Cluster(
  { gap, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-cluster", className)}
      style={withVars(style, { "--hui-gap": px(gap) })}
    />
  );
});

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** 2, 3 or 4 use the preset minimum column widths. */
  cols?: 2 | 3 | 4;
  /** Minimum width of a column (--hui-min). */
  min?: Length;
  gap?: Length;
}

/** Responsive grid: as many columns as fit. */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { cols, min, gap, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-grid", cols && `hui-grid--${cols}`, className)}
      style={withVars(style, { "--hui-min": px(min), "--hui-gap": px(gap) })}
    />
  );
});

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Less breathing room. */
  tight?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section({ tight, className, ...rest }, ref) {
  return <section ref={ref} {...rest} className={cx("hui-section", tight && "hui-section--tight", className)} />;
});

/** Centered heading group: eyebrow, title and lede. */
export const SectionHead = createPart("div", "hui-section__head", "SectionHead");

export interface SplitProps extends HTMLAttributes<HTMLDivElement> {
  /** Put the second child first on wide screens. */
  reverse?: boolean;
  /** Two equal columns. */
  even?: boolean;
}

/** Text on one side, picture on the other. */
export const Split = forwardRef<HTMLDivElement, SplitProps>(function Split({ reverse, even, className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-split", reverse && "hui-split--reverse", even && "hui-split--even", className)}
    />
  );
});

export const Hero = createPart("div", "hui-hero", "Hero");
export const HeroCopy = createPart("div", "hui-hero__copy", "HeroCopy");
export const HeroMedia = createPart("div", "hui-hero__media", "HeroMedia");

/* ==========================================================================
   Typography
   ========================================================================== */

/** The big handwritten title (an h1 by default). */
export const Display = createPart("h1", "hui-display", "Display");

export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";

export interface HeadingProps extends PartProps {
  /** The look (.hui-h1 and friends). The element is set with `as`. */
  size?: HeadingSize;
}

/** A heading with the look of your choice. Defaults to an h2 that looks like .hui-h1. */
export const Heading = forwardRef<HTMLElement, HeadingProps>(function Heading(
  { as = "h2", size = "h1", className, ...rest },
  ref,
) {
  return h(as, { ...rest, ref, className: cx(size === "display" ? "hui-display" : `hui-${size}`, className) });
});

/** The little note above a title. */
export const Eyebrow = createTonePart("span", "hui-eyebrow", "Eyebrow");

/** Intro paragraph under a title. */
export const Lede = createPart("p", "hui-lede", "Lede");

/** Long-form text with a comfortable measure. */
export const Prose = createPart("div", "hui-prose", "Prose");

/* ==========================================================================
   Icon
   ========================================================================== */

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Id of a symbol in an inline SVG sprite, with or without the #. */
  symbol?: string;
  size?: "sm" | "md" | "lg" | "xl";
  /** Colors the accent fill of icons that use --hui-icon-accent. */
  tone?: Tone;
}

/**
 * An outline icon. Pass a sprite `symbol` or the SVG shapes as children.
 * It is hidden from screen readers unless you give it an aria-label.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { symbol, size = "md", tone, className, children, ...rest },
  ref,
) {
  const named = rest["aria-label"] !== undefined || rest["aria-labelledby"] !== undefined;
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden={named ? undefined : true}
      role={named ? "img" : undefined}
      {...rest}
      className={cx("hui-icon", size !== "md" && `hui-icon--${size}`, toneClass(tone), className)}
    >
      {symbol ? <use href={symbol.startsWith("#") ? symbol : `#${symbol}`} /> : children}
    </svg>
  );
});

function CloseGlyph() {
  return (
    <Icon size="sm">
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

/* ==========================================================================
   Buttons, chips and links
   ========================================================================== */

export type ButtonVariant = "default" | "primary" | "ink" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonLook {
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: Tone;
  block?: boolean;
  iconOnly?: boolean;
}

function buttonClasses({ variant = "default", size = "md", tone, block, iconOnly }: ButtonLook, ...extra: ClassValue[]) {
  return cx(
    "hui-button",
    variant !== "default" && `hui-button--${variant}`,
    size !== "md" && `hui-button--${size}`,
    block && "hui-button--block",
    iconOnly && "hui-button--icon",
    toneClass(tone),
    ...extra,
  );
}

export interface ButtonOwnProps extends ButtonLook {
  /** Shows a spinning doodle instead of the label and ignores clicks. */
  busy?: boolean;
  /** An icon before the label. */
  icon?: ReactNode;
  /** A small second line under the label. */
  hint?: ReactNode;
}

export interface ButtonProps
  extends ButtonOwnProps,
    LinkAttrs,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps | keyof LinkAttrs> {}

/**
 * A drawn button. With `href` it renders an <a>, otherwise a
 * <button type="button">. Icon-only buttons need an aria-label.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant, size, tone, block, iconOnly, busy, icon, hint, className, children, onClick, disabled, type, ...rest },
  ref,
) {
  const isLink = typeof rest.href === "string";
  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (busy || (isLink && disabled)) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  const iconNode = withClass(icon, "hui-button__icon");
  const content = has(hint) ? (
    <>
      {iconNode}
      <span className="hui-button__text">
        <span className="hui-button__label">{children}</span>
        <span className="hui-button__hint">{hint}</span>
      </span>
    </>
  ) : (
    <>
      {iconNode}
      {children}
    </>
  );
  const props: Record<string, unknown> = {
    ...rest,
    className: buttonClasses({ variant, size, tone, block, iconOnly }, className),
    "aria-busy": busy ? true : undefined,
    onClick: handleClick,
    children: content,
  };
  if (isLink) {
    if (disabled) {
      props["aria-disabled"] = true;
      props.tabIndex = -1;
    }
  } else {
    props.type = type ?? "button";
    props.disabled = disabled;
  }
  return renderLinkOrElement("button", props, ref);
});

/** A row of buttons. */
export const ButtonGroup = createPart("div", "hui-button-group", "ButtonGroup");

export interface ChipOwnProps {
  tone?: Tone;
  /** Sets aria-pressed. The pressed chip takes the tone color. */
  pressed?: boolean;
  icon?: ReactNode;
}

export interface ChipProps
  extends ChipOwnProps,
    LinkAttrs,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ChipOwnProps | keyof LinkAttrs> {}

/** A small toggle, filter or quick choice. */
export const Chip = forwardRef<HTMLButtonElement | HTMLAnchorElement, ChipProps>(function Chip(
  { tone, pressed, icon, className, children, ...rest },
  ref,
) {
  return renderLinkOrElement(
    "button",
    {
      ...rest,
      className: cx("hui-chip", toneClass(tone), className),
      "aria-pressed": pressed,
      children: (
        <>
          {icon}
          {children}
        </>
      ),
    },
    ref,
  );
});

export interface LinkOwnProps {
  tone?: Tone;
  /** An arrow on the left instead of the right. */
  back?: boolean;
}

export interface LinkProps
  extends LinkOwnProps,
    LinkAttrs,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof LinkOwnProps | keyof LinkAttrs> {}

/** A handwritten link with an arrow, for "see more" moments. */
export const Link = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkProps>(function Link(
  { tone, back, className, ...rest },
  ref,
) {
  return renderLinkOrElement(
    "button",
    { ...rest, className: cx("hui-link", back && "hui-link--back", toneClass(tone), className) },
    ref,
  );
});

/* ==========================================================================
   Badge, key, code
   ========================================================================== */

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "solid" | "dot" | "hand" | "count";
  size?: "md" | "lg";
  tone?: Tone;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", size = "md", tone, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      {...rest}
      className={cx(
        "hui-badge",
        variant !== "default" && `hui-badge--${variant}`,
        size === "lg" && "hui-badge--lg",
        toneClass(tone),
        className,
      )}
    />
  );
});

/** A keyboard key. */
export const Kbd = createPart("kbd", "hui-kbd", "Kbd");

/** Inline code. A tone tints the background. */
export const Code = createTonePart("code", "hui-code", "Code");

/** A code block. The text goes in a <code> inside the <pre>. */
export const Pre = forwardRef<HTMLPreElement, HTMLAttributes<HTMLPreElement>>(function Pre(
  { className, children, ...rest },
  ref,
) {
  return (
    <pre ref={ref} {...rest} className={cx("hui-pre", className)}>
      <code>{children}</code>
    </pre>
  );
});

/* ==========================================================================
   Ink: the marks a person leaves on paper
   ========================================================================== */

/** Highlighter box over the words. */
export const Highlight = createTonePart("span", "hui-highlight", "Highlight");
/** Marker stroke behind the lower half of the text. */
export const Marker = createTonePart("span", "hui-marker", "Marker");
/** Hand-drawn swoosh under a short phrase. */
export const Scribble = createTonePart("span", "hui-scribble", "Scribble");
/** A pen line through words you take back. */
export const Strike = createTonePart("span", "hui-strike", "Strike");
/** A loose pen circle around one word. */
export const Circled = createTonePart("span", "hui-circled", "Circled");

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** A word in the middle, like "or". */
  label?: ReactNode;
  /** A plain dashed line instead of the squiggle. */
  dashed?: boolean;
}

/** Squiggly line between blocks, or a line with a word in the middle. */
export function Divider({ label, dashed, className, ...rest }: DividerProps) {
  if (has(label)) {
    return (
      <div {...rest} className={cx("hui-divider-label", className)}>
        {label}
      </div>
    );
  }
  return <hr {...rest} className={cx("hui-divider", dashed && "hui-divider--dashed", className)} />;
}

export type DoodleShape = "star" | "sparkle" | "heart" | "sun" | "swirl" | "arrow" | "check";

export interface DoodleProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: DoodleShape;
  tone?: Tone;
  /** Size of the drawing (--hui-doodle-size). */
  size?: Length;
}

/** A tiny drawing to sprinkle around. Decorative, so hidden from screen readers. */
export function Doodle({ shape = "star", tone, size, className, style, ...rest }: DoodleProps) {
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={cx("hui-doodle", `hui-doodle--${shape}`, toneClass(tone), className)}
      style={withVars(style, { "--hui-doodle-size": px(size) })}
    />
  );
}

export type AnnotationDirection = "up-left" | "up-right" | "down-left" | "down-right" | "plain";

export interface AnnotationProps extends HTMLAttributes<HTMLSpanElement> {
  /** Where the arrow sits and points. "plain" is words only. */
  direction?: AnnotationDirection;
  tone?: Tone;
  tilt?: Tilt;
}

/** A handwritten note with a curved arrow. */
export function Annotation({ direction = "up-left", tone, tilt, className, style, ...rest }: AnnotationProps) {
  return (
    <span
      {...rest}
      className={cx(
        "hui-annotation",
        direction !== "up-left" && `hui-annotation--${direction}`,
        toneClass(tone),
        className,
      )}
      style={withVars(style, { "--hui-tilt": deg(tilt) })}
    />
  );
}

/* ==========================================================================
   Paper: card, frame, tape, note, callout, banner, window
   ========================================================================== */

export interface CardProps extends LinkAttrs, HTMLAttributes<HTMLElement> {
  variant?: "default" | "soft" | "flat" | "dashed";
  /** "lg" gives a roomier padding. */
  size?: "md" | "lg";
  /** Icon on the left, words on the right (put them in a CardBody). */
  row?: boolean;
  /** Lifts on hover, for a card that is not a link. */
  interactive?: boolean;
  tone?: Tone;
  tilt?: Tilt;
  /** The element when there is no href. */
  as?: "div" | "article" | "section" | "aside" | "li";
}

/** A sheet of paper. With `href` it is a link card that lifts on hover. */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { variant = "default", size = "md", row, interactive, tone, tilt, as = "div", className, style, ...rest },
  ref,
) {
  return renderLinkOrElement(
    as,
    {
      ...rest,
      className: cx(
        "hui-card",
        variant !== "default" && `hui-card--${variant}`,
        size === "lg" && "hui-card--lg",
        row && "hui-card--row",
        interactive && "hui-card--interactive",
        toneClass(tone),
        className,
      ),
      style: withVars(style, { "--hui-tilt": deg(tilt) }),
    },
    ref,
  );
});

/** The icon at the top of a card. */
export const CardIcon = forwardRef<SVGSVGElement, IconProps>(function CardIcon({ className, ...rest }, ref) {
  return <Icon ref={ref} {...rest} className={cx("hui-card__icon", className)} />;
});

export const CardTitle = createPart("h3", "hui-card__title", "CardTitle");
export const CardText = createPart("p", "hui-card__text", "CardText");
export const CardMeta = createPart("p", "hui-card__meta", "CardMeta");
/** The words column of a row card. */
export const CardBody = createPart("div", "hui-card__body", "CardBody");
/** Actions at the bottom of a card. */
export const CardFooter = createPart("div", "hui-card__footer", "CardFooter");
/** Picture area at the top. A tone tints the background. */
export const CardMedia = createTonePart("div", "hui-card__media", "CardMedia");

export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  /** No padding, for a picture that fills the frame. */
  bare?: boolean;
  tone?: Tone;
  tilt?: Tilt;
}

/** A taped-on picture, screenshot or demo. */
export const Frame = forwardRef<HTMLDivElement, FrameProps>(function Frame(
  { bare, tone, tilt, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-frame", bare && "hui-frame--bare", toneClass(tone), className)}
      style={withVars(style, { "--hui-tilt": deg(tilt) })}
    />
  );
});

export type TapeCorner = "tl" | "tr" | "top" | "bl" | "br";

export interface TapeProps extends HTMLAttributes<HTMLSpanElement> {
  corner?: TapeCorner;
  tone?: Tone;
}

/** Stick it to a corner of a frame or card. Decorative. */
export function Tape({ corner = "tl", tone, className, ...rest }: TapeProps) {
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={cx("hui-tape", `hui-tape--${corner}`, toneClass(tone), className)}
    />
  );
}

export interface NoteProps extends HTMLAttributes<HTMLDivElement> {
  /** A small line under the note ("sunday, 5 pm"). */
  by?: ReactNode;
  tone?: Tone;
  tilt?: Tilt;
}

/** A sticky note. */
export const Note = forwardRef<HTMLDivElement, NoteProps>(function Note(
  { by, tone, tilt, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-note", toneClass(tone), className)}
      style={withVars(style, { "--hui-tilt": deg(tilt) })}
    >
      {children}
      {has(by) && <small>{by}</small>}
    </div>
  );
});

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** The big handwritten line. An <em> inside it goes on its own line. */
  title?: ReactNode;
  tone?: Tone;
  tilt?: Tilt;
}

/** A big colored box that asks for one action. Children are the actions. */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { title, tone, tilt, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-callout", toneClass(tone), className)}
      style={withVars(style, { "--hui-tilt": deg(tilt) })}
    >
      {has(title) && <p className="hui-callout__title">{title}</p>}
      {children}
    </div>
  );
});

export interface BannerProps extends LinkAttrs, HTMLAttributes<HTMLElement> {
  tone?: Tone;
  tilt?: Tilt;
}

/** The tilted "what's new" pill. With `href` it is a link with an arrow. */
export const Banner = forwardRef<HTMLElement, BannerProps>(function Banner(
  { tone, tilt, className, style, ...rest },
  ref,
) {
  return renderLinkOrElement(
    "div",
    {
      ...rest,
      className: cx("hui-banner", toneClass(tone), className),
      style: withVars(style, { "--hui-tilt": deg(tilt) }),
    },
    ref,
  );
});

export interface WindowProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Text in the title bar. */
  title?: ReactNode;
  /** A dark screen inside the sketch. */
  night?: boolean;
  tilt?: Tilt;
  /** Padding of the body (--hui-window-padding). */
  bodyPadding?: Length;
}

/** A pretend app window for demos and screenshots. Children go in the body. */
export const Window = forwardRef<HTMLDivElement, WindowProps>(function Window(
  { title, night, tilt, bodyPadding, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-window", night && "hui-window--night", className)}
      style={withVars(style, { "--hui-tilt": deg(tilt), "--hui-window-padding": px(bodyPadding) })}
    >
      <div className="hui-window__bar">
        <span className="hui-window__dot" aria-hidden="true" />
        <span className="hui-window__dot" aria-hidden="true" />
        <span className="hui-window__dot" aria-hidden="true" />
        {has(title) && <span className="hui-window__title">{title}</span>}
      </div>
      <div className="hui-window__body">{children}</div>
    </div>
  );
});

/* ==========================================================================
   Forms
   ========================================================================== */

interface FieldContextValue {
  id: string;
  describedBy?: string;
  invalid: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

interface ControlA11y {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
}

/** Takes id, aria-describedby and aria-invalid from the surrounding Field. */
function useFieldControl(props: ControlA11y): ControlA11y {
  const field = useContext(FieldContext);
  return {
    id: props.id ?? field?.id,
    "aria-describedby": cx(props["aria-describedby"], field?.describedBy) || undefined,
    "aria-invalid": props["aria-invalid"] ?? (field?.invalid ? true : undefined),
  };
}

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  label?: ReactNode;
  /** A small handwritten aside next to the label, like "optional". */
  aside?: ReactNode;
  hint?: ReactNode;
  /** An error message. The control inside gets aria-invalid. */
  error?: ReactNode;
  /** Id for the control. Generated when missing. */
  id?: string;
}

/**
 * Label, control and hint or error in one block. The Input, Textarea,
 * Select, Checkbox, Radio, Switch or Range inside is wired to it
 * (id, aria-describedby, aria-invalid) without extra props.
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, aside, hint, error, id, className, children, ...rest },
  ref,
) {
  const generated = useId();
  const controlId = id ?? `hui-field-${generated}`;
  const invalid = has(error);
  const hintId = has(hint) ? `${controlId}-hint` : undefined;
  const errorId = invalid && error !== true ? `${controlId}-error` : undefined;
  const value = useMemo<FieldContextValue>(
    () => ({ id: controlId, describedBy: cx(hintId, errorId) || undefined, invalid }),
    [controlId, hintId, errorId, invalid],
  );
  return (
    <FieldContext.Provider value={value}>
      <div ref={ref} {...rest} className={cx("hui-field", className)}>
        {has(label) && (
          <label className="hui-label" htmlFor={controlId}>
            {label}
            {has(aside) && <span className="hui-label__aside">{aside}</span>}
          </label>
        )}
        {children}
        {hintId && (
          <p className="hui-hint" id={hintId}>
            {hint}
          </p>
        )}
        {errorId && (
          <p className="hui-error" id={errorId}>
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
});

/** A label on its own, for a control outside a Field. */
export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(function Label(
  { className, ...rest },
  ref,
) {
  return <label ref={ref} {...rest} className={cx("hui-label", className)} />;
});

export const Hint = createPart("p", "hui-hint", "Hint");
export const FieldError = createPart("p", "hui-error", "FieldError");

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** The look. The native numeric size attribute is not supported. */
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", className, ...props },
  ref,
) {
  const a11y = useFieldControl(props);
  return (
    <input
      ref={ref}
      {...props}
      {...a11y}
      className={cx("hui-input", size !== "md" && `hui-input--${size}`, className)}
    />
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    const a11y = useFieldControl(props);
    return <textarea ref={ref} {...props} {...a11y} className={cx("hui-textarea", className)} />;
  },
);

/**
 * A native <select> with the drawn chevron. className and style go on the
 * wrapper, everything else on the <select>. Put <option>s inside.
 */
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, style, children, ...props },
  ref,
) {
  const a11y = useFieldControl(props);
  return (
    <div className={cx("hui-select", className)} style={style}>
      <select ref={ref} {...props} {...a11y}>
        {children}
      </select>
    </div>
  );
});

/** An input with a button or label glued to it. */
export const InputGroup = createPart("div", "hui-input-group", "InputGroup");

type ChoiceKind = "check" | "radio" | "switch";

export interface ChoiceProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "className" | "style" | "children"> {
  tone?: Tone;
  /** On the outer label. */
  className?: string;
  /** On the outer label. */
  style?: CSSProperties;
  /** The label text. */
  children?: ReactNode;
}

const Choice = forwardRef<HTMLInputElement, ChoiceProps & { kind: ChoiceKind; indeterminate?: boolean }>(
  function Choice({ kind, tone, indeterminate, className, style, children, ...props }, ref) {
    const a11y = useFieldControl(props);
    const inputRef = useRef<HTMLInputElement>(null);
    const setRef = useMergedRef<HTMLInputElement>(inputRef, ref);
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = Boolean(indeterminate);
    }, [indeterminate]);
    return (
      <label className={cx(`hui-${kind}`, toneClass(tone), className)} style={style}>
        <input
          ref={setRef}
          type={kind === "radio" ? "radio" : "checkbox"}
          role={kind === "switch" ? "switch" : undefined}
          {...props}
          {...a11y}
        />
        {children}
      </label>
    );
  },
);

export interface CheckboxProps extends ChoiceProps {
  /** The dash state, set on the input as a DOM property. */
  indeterminate?: boolean;
}

/** A drawn checkbox. The children are its label. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  return <Choice ref={ref} kind="check" {...props} />;
});

/** A drawn radio button. Give the group a shared name. */
export const Radio = forwardRef<HTMLInputElement, ChoiceProps>(function Radio(props, ref) {
  return <Choice ref={ref} kind="radio" {...props} />;
});

/** An on and off switch with a bouncy knob (role="switch"). */
export const Switch = forwardRef<HTMLInputElement, ChoiceProps>(function Switch(props, ref) {
  return <Choice ref={ref} kind="switch" {...props} />;
});

export interface RangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  tone?: Tone;
}

export const Range = forwardRef<HTMLInputElement, RangeProps>(function Range({ tone, className, ...props }, ref) {
  const a11y = useFieldControl(props);
  return (
    <input
      ref={ref}
      type="range"
      {...props}
      {...a11y}
      className={cx("hui-range", toneClass(tone), className)}
    />
  );
});

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** The group title. */
  legend?: ReactNode;
}

/** A group of related controls under one title. */
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(function Fieldset(
  { legend, className, children, ...rest },
  ref,
) {
  return (
    <fieldset ref={ref} {...rest} className={cx("hui-fieldset", className)}>
      {has(legend) && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
});

/* ==========================================================================
   Navigation: nav bar, logo, tabs, breadcrumb, pagination, menu, footer
   ========================================================================== */

/** The top bar. Put Logo, NavLinks, NavActions and NavMenu inside. */
export const Nav = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Nav(
  { className, children, ...rest },
  ref,
) {
  return (
    <header ref={ref} {...rest} className={cx("hui-nav", className)}>
      <div className="hui-container hui-nav__inner">{children}</div>
    </header>
  );
});

/** The links of the top bar (hidden on small screens, see NavMenu). */
export const NavLinks = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function NavLinks(
  { className, ...rest },
  ref,
) {
  return <nav ref={ref} aria-label="Main" {...rest} className={cx("hui-nav__links", className)} />;
});

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the page you are on (aria-current="page"). */
  current?: boolean;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { current, className, ...rest },
  ref,
) {
  return <a ref={ref} aria-current={current ? "page" : undefined} {...rest} className={cx("hui-nav__link", className)} />;
});

/** Buttons on the right side of the top bar. */
export const NavActions = createPart("div", "hui-nav__actions", "NavActions");

export interface LogoProps extends LinkAttrs, HTMLAttributes<HTMLElement> {
  /** The drawing in the little tilted box. */
  mark?: ReactNode;
  /** Color of the box. */
  tone?: Tone;
}

/** Name and mark. With `href` it is a link. */
export const Logo = forwardRef<HTMLElement, LogoProps>(function Logo(
  { mark, tone, className, children, ...rest },
  ref,
) {
  return renderLinkOrElement(
    "span",
    {
      ...rest,
      className: cx("hui-logo", className),
      children: (
        <>
          {has(mark) && <span className={cx("hui-logo__mark", toneClass(tone))}>{mark}</span>}
          {children}
        </>
      ),
    },
    ref,
  );
});

export interface NavMenuProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "open" | "onToggle"> {
  /** Accessible name of the menu button. */
  label?: string;
  /** Icon of the menu button. A hamburger by default. */
  icon?: ReactNode;
}

/**
 * The small-screen menu of the top bar. Put NavLink children inside. It
 * closes on outside click, on Escape and when a link is chosen.
 */
export const NavMenu = forwardRef<HTMLDetailsElement, NavMenuProps>(function NavMenu(
  { label = "Open menu", icon, className, children, ...rest },
  ref,
) {
  const [open, setOpen] = useState(false);
  const detailsRef = useDetailsDismiss(open, setOpen);
  const setRef = useMergedRef<HTMLDetailsElement>(detailsRef, ref);
  return (
    <details
      ref={setRef}
      {...rest}
      className={cx("hui-nav__menu", className)}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="hui-button hui-button--icon hui-button--sm" aria-label={label}>
        {icon ?? (
          <Icon size="sm">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </Icon>
        )}
      </summary>
      <div
        className="hui-nav__sheet"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest(".hui-nav__link")) setOpen(false);
        }}
      >
        {children}
      </div>
    </details>
  );
});

/* ---------- Tabs ---------- */

interface TabsContextValue {
  value: string | undefined;
  select: (value: string) => void;
  register: (value: string) => void;
  tabId: (value: string) => string;
  panelId: (value: string) => string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(part: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`<${part}> must be used inside <Tabs>.`);
  return context;
}

const slug = (value: string) => value.replace(/[^\w-]/g, "_");

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** The open tab, when you control it. */
  value?: string;
  /** The tab open at first, when you do not. Without it the first tab opens. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** "line" is the lighter look with a marker under the chosen tab. */
  variant?: "solid" | "line";
  tone?: Tone;
}

/**
 * Tabs with arrow keys, Home and End, roving tabindex and the right
 * ARIA roles. Build them with TabList, Tab and TabPanel.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, defaultValue, onValueChange, variant = "solid", tone, className, children, ...rest },
  ref,
) {
  const baseId = useId();
  const [inner, setInner] = useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : inner;
  const first = useRef<string | undefined>(undefined);

  const select = useCallback(
    (next: string) => {
      if (!isControlled) setInner(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const register = useCallback((tab: string) => {
    if (first.current === undefined) first.current = tab;
  }, []);

  // Nothing chosen yet: open the first tab, so the list can be reached by keyboard.
  useEffect(() => {
    if (!isControlled && inner === undefined && first.current !== undefined) setInner(first.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = useMemo<TabsContextValue>(
    () => ({
      value: current,
      select,
      register,
      tabId: (tab) => `${baseId}-tab-${slug(tab)}`,
      panelId: (tab) => `${baseId}-panel-${slug(tab)}`,
    }),
    [current, select, register, baseId],
  );

  return (
    <TabsContext.Provider value={context}>
      <div
        ref={ref}
        {...rest}
        className={cx("hui-tabs", variant === "line" && "hui-tabs--line", toneClass(tone), className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

/** The row of tabs. Give it an aria-label. */
export const TabList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TabList(
  { className, onKeyDown, ...rest },
  ref,
) {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not(:disabled)'));
    const index = tabs.indexOf(event.target as HTMLElement);
    if (index < 0) return;
    let next: HTMLElement | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = tabs[(index + 1) % tabs.length];
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = tabs[(index - 1 + tabs.length) % tabs.length];
    else if (event.key === "Home") next = tabs[0];
    else if (event.key === "End") next = tabs[tabs.length - 1];
    if (!next) return;
    event.preventDefault();
    next.focus();
    next.click();
  };
  return (
    <div
      ref={ref}
      role="tablist"
      {...rest}
      className={cx("hui-tabs__list", className)}
      onKeyDown={handleKeyDown}
    />
  );
});

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Ties the tab to the TabPanel with the same value. */
  value: string;
  icon?: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, icon, className, onClick, children, ...rest },
  ref,
) {
  const { value: current, select, register, tabId, panelId } = useTabsContext("Tab");
  useEffect(() => register(value), [register, value]);
  const selected = current === value;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={tabId(value)}
      aria-selected={selected}
      aria-controls={panelId(value)}
      tabIndex={selected ? 0 : -1}
      {...rest}
      className={cx("hui-tabs__tab", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) select(value);
      }}
    >
      {icon}
      {children}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** The value of the Tab that opens this panel. */
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, className, ...rest },
  ref,
) {
  const { value: current, tabId, panelId } = useTabsContext("TabPanel");
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId(value)}
      aria-labelledby={tabId(value)}
      tabIndex={0}
      hidden={current !== value}
      {...rest}
      className={cx("hui-tabs__panel", className)}
    />
  );
});

/* ---------- Breadcrumb ---------- */

/** A trail of places. Put BreadcrumbItems inside. */
export const Breadcrumb = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Breadcrumb(
  { className, children, ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label="Breadcrumb" {...rest} className={cx("hui-breadcrumb", className)}>
      <ol>{children}</ol>
    </nav>
  );
});

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Makes the item a link. Without it (and without `current`) the children are used as they are. */
  href?: string;
  /** The page you are on. */
  current?: boolean;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(function BreadcrumbItem(
  { href, current, children, ...rest },
  ref,
) {
  return (
    <li ref={ref} {...rest}>
      {current ? <span aria-current="page">{children}</span> : href !== undefined ? <a href={href}>{children}</a> : children}
    </li>
  );
});

/* ---------- Pagination ---------- */

/** Page numbers. Put PaginationItems and PaginationGaps inside. */
export const Pagination = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Pagination(
  { className, ...rest },
  ref,
) {
  return <nav ref={ref} aria-label="Pages" {...rest} className={cx("hui-pagination", className)} />;
});

export interface PaginationItemProps
  extends LinkAttrs,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof LinkAttrs> {
  /** The page you are on (aria-current="page"). */
  current?: boolean;
}

/** One page. With `href` it is a link, otherwise a button. */
export const PaginationItem = forwardRef<HTMLButtonElement | HTMLAnchorElement, PaginationItemProps>(
  function PaginationItem({ current, disabled, className, onClick, ...rest }, ref) {
    return renderLinkOrElement(
      "button",
      {
        ...rest,
        className: cx("hui-pagination__item", className),
        "aria-current": current ? "page" : undefined,
        "aria-disabled": disabled ? true : undefined,
        tabIndex: disabled ? -1 : undefined,
        onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
          if (disabled) event.preventDefault();
          else onClick?.(event);
        },
      },
      ref,
    );
  },
);

/** The "..." between page numbers. */
export function PaginationGap({ className, children = "...", ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...rest} className={cx("hui-pagination__gap", className)}>
      {children}
    </span>
  );
}

/* ---------- Dropdown menu (built on <details>) ---------- */

/** Closes an open <details> on outside click and on Escape. Returns its ref. */
function useDetailsDismiss(open: boolean, setOpen: (open: boolean) => void) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: Event) => {
      const node = ref.current;
      if (node && event.target instanceof Node && !node.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);
  return ref;
}

interface MenuContextValue {
  close: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

const MENU_ITEMS = '[role="menuitem"]:not(:disabled)';

export interface MenuProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "open" | "onToggle"> {
  /** What the button shows: text, an icon or both. */
  trigger: ReactNode;
  /** Accessible name of the button. Needed when it only holds an icon. */
  triggerLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: Tone;
  iconOnly?: boolean;
  /** Which edge of the button the list lines up with. */
  align?: "start" | "end";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * A dropdown menu on <details>. It closes on outside click, on Escape and
 * when an item is chosen. Arrow keys, Home and End move between items.
 */
export const Menu = forwardRef<HTMLDetailsElement, MenuProps>(function Menu(
  {
    trigger,
    triggerLabel,
    variant,
    size,
    tone,
    iconOnly,
    align = "start",
    open,
    defaultOpen,
    onOpenChange,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [isOpen, setOpen] = useControllable(open, defaultOpen ?? false, onOpenChange);
  const detailsRef = useDetailsDismiss(isOpen, setOpen);
  const setRef = useMergedRef<HTMLDetailsElement>(detailsRef, ref);
  const focusFirst = useRef(false);
  const context = useMemo<MenuContextValue>(() => ({ close: () => setOpen(false) }), [setOpen]);

  const items = (): HTMLElement[] => {
    const found = detailsRef.current?.querySelectorAll<HTMLElement>(MENU_ITEMS);
    return found ? Array.from(found) : [];
  };

  useEffect(() => {
    if (isOpen && focusFirst.current) {
      focusFirst.current = false;
      items()[0]?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSummaryKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    if (isOpen) {
      items()[0]?.focus();
    } else {
      focusFirst.current = true;
      setOpen(true);
    }
  };

  const onListKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const list = items();
    if (list.length === 0) return;
    const index = list.indexOf(document.activeElement as HTMLElement);
    let next: HTMLElement | undefined;
    if (event.key === "ArrowDown") next = list[index < 0 ? 0 : (index + 1) % list.length];
    else if (event.key === "ArrowUp") next = list[index < 0 ? list.length - 1 : (index - 1 + list.length) % list.length];
    else if (event.key === "Home") next = list[0];
    else if (event.key === "End") next = list[list.length - 1];
    if (!next) return;
    event.preventDefault();
    next.focus();
  };

  return (
    <MenuContext.Provider value={context}>
      <details
        ref={setRef}
        {...rest}
        className={cx("hui-menu", align === "end" && "hui-menu--end", className)}
        open={isOpen}
        onToggle={(event) => setOpen(event.currentTarget.open)}
      >
        <summary
          className={buttonClasses({ variant, size, tone, iconOnly })}
          aria-label={triggerLabel}
          onKeyDown={onSummaryKeyDown}
        >
          {trigger}
        </summary>
        <div className="hui-menu__list" role="menu" onKeyDown={onListKeyDown}>
          {children}
        </div>
      </details>
    </MenuContext.Provider>
  );
});

export interface MenuItemProps extends LinkAttrs, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof LinkAttrs> {
  /** Red text, for the item that deletes something. */
  danger?: boolean;
  icon?: ReactNode;
  /** A key hint on the right, like "E". */
  shortcut?: ReactNode;
}

/** An action in a Menu. With `href` it is a link. Choosing it closes the menu. */
export const MenuItem = forwardRef<HTMLButtonElement | HTMLAnchorElement, MenuItemProps>(function MenuItem(
  { danger, icon, shortcut, className, onClick, children, ...rest },
  ref,
) {
  const menu = useContext(MenuContext);
  return renderLinkOrElement(
    "button",
    {
      role: "menuitem",
      ...rest,
      className: cx("hui-menu__item", danger && "hui-menu__item--danger", className),
      onClick: (event: ReactMouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) menu?.close();
      },
      children: (
        <>
          {icon}
          {children}
          {has(shortcut) && <Kbd>{shortcut}</Kbd>}
        </>
      ),
    },
    ref,
  );
});

/** A small handwritten heading inside a Menu. */
export const MenuLabel = createPart("span", "hui-menu__label", "MenuLabel");

/** A dashed line between groups of items. */
export function MenuSeparator({ className, ...rest }: HTMLAttributes<HTMLHRElement>) {
  return <hr {...rest} className={cx("hui-menu__sep", className)} />;
}

/* ---------- Footer ---------- */

export const Footer = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Footer(
  { className, ...rest },
  ref,
) {
  return <footer ref={ref} {...rest} className={cx("hui-footer", className)} />;
});

/** The top row of the footer: brand on the left, columns on the right. */
export const FooterMain = createPart("div", "hui-container hui-footer__inner", "FooterMain");
export const FooterBrand = createPart("div", "hui-footer__brand", "FooterBrand");

/** The link columns. Put FooterColumns inside. */
export const FooterColumns = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function FooterColumns(
  { className, ...rest },
  ref,
) {
  return <nav ref={ref} aria-label="Footer" {...rest} className={cx("hui-footer__cols", className)} />;
});

export interface FooterColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
}

/** A titled list of links. Children are <li> items. */
export function FooterColumn({ title, children, ...rest }: FooterColumnProps) {
  return (
    <div {...rest}>
      <h2 className="hui-footer__title">{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}

/** The last row: small print on the left, a wink on the right. */
export const FooterBottom = createPart("div", "hui-container hui-footer__bottom", "FooterBottom");

/* ==========================================================================
   Feedback: alert, toast, tooltip, dialog, progress, spinner, skeleton,
   accordion
   ========================================================================== */

const GLYPHS: Record<string, string> = {
  green: "✓",
  red: "!",
  orange: "!",
  yellow: "★",
  blue: "i",
  purple: "✦",
  pink: "♥",
  teal: "✦",
};

const TONE_ALIASES: Partial<Record<Tone, string>> = {
  success: "green",
  danger: "red",
  warning: "orange",
  info: "blue",
  brand: "yellow",
  paper: "yellow",
};

/** The small character in a round icon when you do not bring your own. */
function toneGlyph(tone?: Tone): string {
  const key = tone ? (TONE_ALIASES[tone] ?? tone) : "yellow";
  return GLYPHS[key] ?? "★";
}

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: Tone;
  title?: ReactNode;
  /** The round icon. A small character by tone when missing, none when false. */
  icon?: ReactNode;
  /** Adds a close button that calls this. */
  onClose?: () => void;
  closeLabel?: string;
}

/** A message in the page. Danger alerts use role="alert", the rest role="status". */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone, title, icon, onClose, closeLabel = "Dismiss", className, children, ...rest },
  ref,
) {
  const glyph = icon === undefined ? toneGlyph(tone) : icon;
  const loud = tone === "danger" || tone === "red";
  return (
    <div
      ref={ref}
      role={loud ? "alert" : "status"}
      {...rest}
      className={cx("hui-alert", toneClass(tone), className)}
    >
      {has(glyph) && (
        <span className="hui-alert__icon" aria-hidden="true">
          {glyph}
        </span>
      )}
      <div className="hui-alert__body">
        {has(title) && <p className="hui-alert__title">{title}</p>}
        {has(children) && <p className="hui-alert__text">{children}</p>}
      </div>
      {onClose && (
        <Button
          className="hui-alert__close"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={closeLabel}
          onClick={onClose}
        >
          <CloseGlyph />
        </Button>
      )}
    </div>
  );
});

/* ---------- Toast ---------- */

export interface ToastOptions {
  title?: ReactNode;
  tone?: Tone;
  /** The round icon. A small character by tone when missing. */
  icon?: ReactNode;
  /** Milliseconds before it leaves. 0 keeps it until dismissed. */
  timeout?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
  message: ReactNode;
  leaving: boolean;
}

/** What useToast() gives you: call it to show a toast and get its id. */
export interface ToastApi {
  (message: ReactNode, options?: ToastOptions): number;
  dismiss: (id: number) => void;
  clear: () => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export interface ToastProviderProps {
  children?: ReactNode;
  /** Default milliseconds before a toast leaves. */
  timeout?: number;
  dismissLabel?: string;
}

/**
 * Renders the toast region (role="status", aria-live="polite") and gives
 * useToast() to everything below it. Mount it once, near the root.
 */
export function ToastProvider({ children, timeout = 4500, dismissLabel = "Dismiss" }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const itemsRef = useRef<ToastItem[]>([]);
  const nextId = useRef(1);
  const leaving = useRef(new Set<number>());
  const autoTimers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const exitTimers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const auto = autoTimers.current;
    const exits = exitTimers.current;
    return () => {
      auto.forEach((timer) => clearTimeout(timer));
      exits.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    const auto = autoTimers.current.get(id);
    if (auto !== undefined) {
      clearTimeout(auto);
      autoTimers.current.delete(id);
    }
    if (leaving.current.has(id)) return;
    leaving.current.add(id);
    setItems((list) => list.map((item) => (item.id === id ? { ...item, leaving: true } : item)));
    const exit = setTimeout(
      () => {
        exitTimers.current.delete(exit);
        leaving.current.delete(id);
        setItems((list) => list.filter((item) => item.id !== id));
      },
      prefersReducedMotion() ? 0 : 280,
    );
    exitTimers.current.add(exit);
  }, []);

  const show = useCallback(
    (message: ReactNode, options: ToastOptions = {}) => {
      const id = nextId.current++;
      setItems((list) => [...list, { ...options, id, message, leaving: false }]);
      const wait = options.timeout ?? timeout;
      if (wait > 0) autoTimers.current.set(id, setTimeout(() => dismiss(id), wait));
      return id;
    },
    [dismiss, timeout],
  );

  const clear = useCallback(() => {
    itemsRef.current.forEach((item) => dismiss(item.id));
  }, [dismiss]);

  const api = useMemo<ToastApi>(() => Object.assign((message: ReactNode, options?: ToastOptions) => show(message, options), { dismiss, clear }), [show, dismiss, clear]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="hui-toast-region" role="status" aria-live="polite">
        {items.map((item) => (
          <div key={item.id} className={cx("hui-toast", toneClass(item.tone), item.leaving && "is-leaving")}>
            <span className="hui-toast__icon" aria-hidden="true">
              {item.icon ?? toneGlyph(item.tone)}
            </span>
            <div className="hui-toast__body">
              {has(item.title) && <strong className="hui-toast__title">{item.title}</strong>}
              {item.message}
            </div>
            <button
              type="button"
              className="hui-toast__close"
              aria-label={dismissLabel}
              onClick={() => dismiss(item.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/** Show toasts: `const toast = useToast(); toast("Saved!", { tone: "green" })`. */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error("useToast() must be used inside <ToastProvider>.");
  return api;
}

/* ---------- Tooltip ---------- */

export interface TooltipProps {
  /** The text of the bubble. */
  content: string;
  position?: "top" | "bottom";
  /** One element (a button, an icon). Plain text gets wrapped in a focusable span. */
  children: ReactNode;
}

/**
 * Wraps a child with data-hui-tooltip. The bubble is pure CSS and shows on
 * hover and keyboard focus. Give icon-only children an aria-label too.
 */
export function Tooltip({ content, position = "top", children }: TooltipProps) {
  const attrs = {
    "data-hui-tooltip": content,
    "data-hui-tooltip-pos": position === "bottom" ? "bottom" : undefined,
  };
  if (isValidElement<Record<string, unknown>>(children)) return cloneElement(children, attrs);
  return (
    <span {...attrs} tabIndex={0}>
      {children}
    </span>
  );
}

/* ---------- Dialog ---------- */

export interface DialogProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose" | "title"> {
  /** Open or closed. You own this state. */
  open: boolean;
  /** Called on Escape, on a click on the backdrop and on the close button. Set `open` to false in it. */
  onClose?: () => void;
  title?: ReactNode;
  /** The calm paragraph under the title. */
  description?: ReactNode;
  /** Buttons at the bottom right. */
  actions?: ReactNode;
  hideCloseButton?: boolean;
  closeLabel?: string;
}

/**
 * A native <dialog> opened with showModal() while `open` is true, so
 * focus trapping, the backdrop and Escape come from the browser.
 */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  {
    open,
    onClose,
    title,
    description,
    actions,
    hideCloseButton,
    closeLabel = "Close",
    className,
    children,
    onCancel,
    onClick,
    onPointerDown,
    "aria-labelledby": labelledBy,
    ...rest
  },
  ref,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const setRef = useMergedRef<HTMLDialogElement>(dialogRef, ref);
  const titleId = useId();
  const openRef = useRef(open);
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    openRef.current = open;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    } else if (!open && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [open]);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    onCancel?.(event);
    if (event.defaultPrevented || !onClose) return;
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={setRef}
      aria-labelledby={labelledBy ?? (has(title) ? titleId : undefined)}
      {...rest}
      className={cx("hui-dialog", className)}
      onCancel={handleCancel}
      onClose={() => {
        // Closed by the browser (a method="dialog" form) while still marked open.
        if (openRef.current) onClose?.();
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        pressedBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        onClick?.(event);
        const onBackdrop = pressedBackdrop.current && event.target === event.currentTarget;
        pressedBackdrop.current = false;
        if (onBackdrop) onClose?.();
      }}
    >
      <div className="hui-dialog__inner">
        {(has(title) || !hideCloseButton) && (
          <div className="hui-dialog__head">
            {has(title) ? (
              <h2 className="hui-dialog__title" id={titleId}>
                {title}
              </h2>
            ) : (
              <span />
            )}
            {!hideCloseButton && (
              <Button variant="ghost" size="sm" iconOnly aria-label={closeLabel} onClick={() => onClose?.()}>
                <CloseGlyph />
              </Button>
            )}
          </div>
        )}
        {has(description) && <p className="hui-dialog__text">{description}</p>}
        {children}
        {has(actions) && <div className="hui-dialog__actions">{actions}</div>}
      </div>
    </dialog>
  );
});

/* ---------- Progress, spinner, skeleton ---------- */

export interface ProgressProps extends Omit<HTMLAttributes<HTMLProgressElement>, "children"> {
  value?: number;
  max?: number;
  tone?: Tone;
  /** Text for browsers without <progress>. The percentage by default. */
  children?: ReactNode;
}

/** A native <progress>. Give it an aria-label. */
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(function Progress(
  { value, max = 100, tone, className, children, ...rest },
  ref,
) {
  const fallback = value !== undefined ? `${Math.round((value / max) * 100)}%` : undefined;
  return (
    <progress
      ref={ref}
      {...rest}
      value={value}
      max={max}
      className={cx("hui-progress", toneClass(tone), className)}
    >
      {children ?? fallback}
    </progress>
  );
});

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Size of the circle (--hui-spinner-size). */
  size?: Length;
  /** Announced to screen readers. Pass false for a purely decorative spinner. */
  label?: string | false;
}

/** A dashed pencil circle that spins. */
export function Spinner({ tone, size, label = "Loading", className, style, ...rest }: SpinnerProps) {
  return (
    <span
      {...(label === false ? { "aria-hidden": true } : { role: "status", "aria-label": label })}
      {...rest}
      className={cx("hui-spinner", toneClass(tone), className)}
      style={withVars(style, { "--hui-spinner-size": px(size) })}
    />
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "line" | "text" | "title" | "circle" | "block";
}

/** A hatched placeholder while content loads. Set the width in `style` or `className`. */
export function Skeleton({ variant = "line", className, ...rest }: SkeletonProps) {
  return (
    <span
      {...rest}
      className={cx("hui-skeleton", variant !== "line" && `hui-skeleton--${variant}`, className)}
    />
  );
}

/* ---------- Accordion ---------- */

/** A stack of AccordionItems. */
export const Accordion = createPart("div", "hui-accordion", "Accordion");

export interface AccordionItemProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "open" | "onToggle" | "title"> {
  /** The question, always visible. */
  title: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** One question and its answer, on a native <details>. */
export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(function AccordionItem(
  { title, open, defaultOpen, onOpenChange, className, children, ...rest },
  ref,
) {
  const [isOpen, setOpen] = useControllable(open, defaultOpen ?? false, onOpenChange);
  return (
    <details
      ref={ref}
      {...rest}
      className={cx("hui-accordion__item", className)}
      open={isOpen}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>{title}</summary>
      <div className="hui-accordion__body">{children}</div>
    </details>
  );
});

/* ==========================================================================
   Data and content: table, avatar, stat, steps, checklist, quote, price,
   option, empty state
   ========================================================================== */

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  caption?: ReactNode;
  /** On the <table>. The plain className goes on the scrolling wrapper. */
  tableClassName?: string;
}

/** A drawn table. Write <thead>, <tbody>, <tr> as usual, with Th and Td if you like. */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { caption, tableClassName, className, style, children, ...rest },
  ref,
) {
  return (
    <div className={cx("hui-table-wrap", className)} style={style}>
      <table ref={ref} {...rest} className={cx("hui-table", tableClassName)}>
        {has(caption) && <caption>{caption}</caption>}
        {children}
      </table>
    </div>
  );
});

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Right-aligned digits. */
  numeric?: boolean;
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(function Th({ numeric, className, ...rest }, ref) {
  return <th ref={ref} {...rest} className={cx(numeric && "is-num", className) || undefined} />;
});

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Right-aligned digits. */
  numeric?: boolean;
}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td({ numeric, className, ...rest }, ref) {
  return <td ref={ref} {...rest} className={cx(numeric && "is-num", className) || undefined} />;
});

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg" | "xl";
  tone?: Tone;
  /** Photo URL. Without it the children, or the first letter of `name`, are shown. */
  src?: string;
  alt?: string;
  name?: string;
}

const firstLetter = (name: string): string => (Array.from(name.trim())[0] ?? "").toUpperCase();

/** A round avatar: a photo, a letter or anything you put inside. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = "md", tone, src, alt, name, className, children, ...rest },
  ref,
) {
  const content = src ? <img src={src} alt={alt ?? name ?? ""} /> : (children ?? (name ? firstLetter(name) : null));
  const labelled = !src && name ? { role: "img", "aria-label": name } : null;
  return (
    <span
      ref={ref}
      {...labelled}
      {...rest}
      className={cx("hui-avatar", size !== "md" && `hui-avatar--${size}`, toneClass(tone), className)}
    >
      {content}
    </span>
  );
});

/** Avatars that overlap a little. */
export const AvatarGroup = createPart("div", "hui-avatar-group", "AvatarGroup");

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: ReactNode;
  label?: ReactNode;
  /** The small change line ("+18% this month"). */
  delta?: ReactNode;
  /** Colors the delta. */
  deltaTone?: Tone;
}

/** A big number with a label. */
export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  { value, label, delta, deltaTone, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest} className={cx("hui-stat", className)}>
      <span className="hui-stat__value">{value}</span>
      {has(label) && <span className="hui-stat__label">{label}</span>}
      {has(delta) && <span className={cx("hui-stat__delta", toneClass(deltaTone))}>{delta}</span>}
    </div>
  );
});

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  vertical?: boolean;
  tone?: Tone;
  /** Number of columns. Counted from the children when missing. */
  columns?: number;
}

/** 1, 2, 3 and done. Put Step children inside. */
export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { vertical, tone, columns, className, style, children, ...rest },
  ref,
) {
  const count = columns ?? Children.toArray(children).length;
  return (
    <ol
      ref={ref}
      {...rest}
      className={cx("hui-steps", vertical && "hui-steps--vertical", toneClass(tone), className)}
      style={withVars(style, { "--hui-steps": vertical ? undefined : count })}
    >
      {children}
    </ol>
  );
});

export interface StepProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  title?: ReactNode;
  /** The element of the title. */
  titleAs?: PartTag;
}

export const Step = forwardRef<HTMLLIElement, StepProps>(function Step(
  { title, titleAs = "h3", className, children, ...rest },
  ref,
) {
  return (
    <li ref={ref} {...rest} className={cx("hui-step", className)}>
      {has(title) && h(titleAs, { className: "hui-step__title", children: title })}
      {has(children) && <p className="hui-step__text">{children}</p>}
    </li>
  );
});

export interface ChecklistProps extends HTMLAttributes<HTMLUListElement> {
  /** Items in a row. */
  inline?: boolean;
  /** Color of the ticks. */
  tone?: Tone;
}

/** A list with hand-drawn ticks. */
export const Checklist = forwardRef<HTMLUListElement, ChecklistProps>(function Checklist(
  { inline, tone, className, ...rest },
  ref,
) {
  return (
    <ul
      ref={ref}
      {...rest}
      className={cx("hui-checklist", inline && "hui-checklist--inline", toneClass(tone), className)}
    />
  );
});

export interface ChecklistItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Crossed out: not included. */
  off?: boolean;
}

export const ChecklistItem = forwardRef<HTMLLIElement, ChecklistItemProps>(function ChecklistItem(
  { off, className, ...rest },
  ref,
) {
  return <li ref={ref} {...rest} className={cx(off && "is-off", className) || undefined} />;
});

export interface QuoteProps extends HTMLAttributes<HTMLElement> {
  /** Who said it. */
  name?: ReactNode;
  /** A line under the name ("runs a tiny bakery"). */
  detail?: ReactNode;
  /** Usually an <Avatar>. */
  avatar?: ReactNode;
  tone?: Tone;
  tilt?: Tilt;
}

/** A testimonial. The children are the words. */
export const Quote = forwardRef<HTMLElement, QuoteProps>(function Quote(
  { name, detail, avatar, tone, tilt, className, style, children, ...rest },
  ref,
) {
  return (
    <figure
      ref={ref}
      {...rest}
      className={cx("hui-quote", toneClass(tone), className)}
      style={withVars(style, { "--hui-tilt": deg(tilt) })}
    >
      <p className="hui-quote__text">{children}</p>
      {(has(name) || has(avatar)) && (
        <figcaption className="hui-quote__by">
          {avatar}
          {(has(name) || has(detail)) && (
            <span>
              {has(name) && <strong>{name}</strong>}
              {has(detail) && <span>{detail}</span>}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
});

export interface PriceProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  name: ReactNode;
  /** The big number ("$9"). */
  amount: ReactNode;
  /** The small text next to it ("per month"). */
  period?: ReactNode;
  description?: ReactNode;
  /** A tilted sticker on the corner ("Most loved"). */
  flag?: ReactNode;
  flagTone?: Tone;
  /** The plan you recommend. */
  featured?: boolean;
  tone?: Tone;
  tilt?: Tilt;
}

/** A pricing card. The children are usually a Checklist and a Button. */
export const Price = forwardRef<HTMLDivElement, PriceProps>(function Price(
  { name, amount, period, description, flag, flagTone = "red", featured, tone, tilt, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      {...rest}
      className={cx("hui-price", featured && "hui-price--featured", toneClass(tone), className)}
      style={withVars(style, { "--hui-tilt": deg(tilt) })}
    >
      {has(flag) && (
        <Badge variant="solid" tone={flagTone} className="hui-price__flag">
          {flag}
        </Badge>
      )}
      <h3 className="hui-price__name">{name}</h3>
      <p className="hui-price__amount">
        {amount}
        {has(period) && <small>{period}</small>}
      </p>
      {has(description) && <p className="hui-price__text">{description}</p>}
      {children}
    </div>
  );
});

interface OptionContent {
  title: ReactNode;
  /** A small line under the title. */
  meta?: ReactNode;
  icon?: ReactNode;
  /** The little dashed circle on the right (download, add, go). */
  action?: ReactNode;
}

function OptionBody({ icon, title, meta, action }: OptionContent) {
  return (
    <>
      {withClass(icon, "hui-option__icon")}
      <span className="hui-option__body">
        <span className="hui-option__title">{title}</span>
        {has(meta) && <span className="hui-option__meta">{meta}</span>}
      </span>
      {has(action) && <span className="hui-option__action">{action}</span>}
    </>
  );
}

export interface OptionProps
  extends OptionContent,
    LinkAttrs,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof LinkAttrs | "title"> {
  tone?: Tone;
  /** The chosen one. aria-current on a link, aria-pressed on a button. */
  selected?: boolean;
}

/** A pick-one card that acts like a link or a toggle button. */
export const Option = forwardRef<HTMLButtonElement | HTMLAnchorElement, OptionProps>(function Option(
  { title, meta, icon, action, tone, selected, className, ...rest },
  ref,
) {
  const isLink = typeof rest.href === "string";
  return renderLinkOrElement(
    "button",
    {
      ...rest,
      className: cx("hui-option", toneClass(tone), className),
      ...(isLink ? { "aria-current": selected ? "true" : undefined } : { "aria-pressed": selected }),
      children: <OptionBody icon={icon} title={title} meta={meta} action={action} />,
    },
    ref,
  );
});

export interface OptionInputProps
  extends OptionContent,
    Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "title" | "className" | "style" | "children"> {
  type?: "radio" | "checkbox";
  tone?: Tone;
  /** On the outer label. */
  className?: string;
  /** On the outer label. */
  style?: CSSProperties;
}

/** A pick-one card with a hidden radio or checkbox inside, for forms. */
export const OptionInput = forwardRef<HTMLInputElement, OptionInputProps>(function OptionInput(
  { type = "radio", title, meta, icon, action, tone, className, style, ...props },
  ref,
) {
  const a11y = useFieldControl(props);
  return (
    <label className={cx("hui-option", toneClass(tone), className)} style={style}>
      <input ref={ref} type={type} {...props} {...a11y} />
      <OptionBody icon={icon} title={title} meta={meta} action={action} />
    </label>
  );
});

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** A big drawing (an Icon). */
  art?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** The element of the title. */
  titleAs?: PartTag;
}

/** "Nothing here yet". The children (a button) go under the words. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { art, title, description, titleAs = "h3", className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest} className={cx("hui-empty", className)}>
      {withClass(art, "hui-empty__art")}
      {has(title) && h(titleAs, { className: "hui-empty__title", children: title })}
      {has(description) && <p className="hui-empty__text">{description}</p>}
      {children}
    </div>
  );
});

/* ==========================================================================
   Motion and theme
   ========================================================================== */

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** The element to render. */
  as?: PartTag;
  /** Position in a group, so siblings come in one after another (--hui-i). */
  index?: number;
}

/**
 * Fades its content in when it scrolls into view. Ink effects inside
 * (Marker, Scribble, Strike) draw themselves at the same time. Nothing is
 * hidden before React runs, so the page works without JavaScript.
 */
export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { as = "div", index, className, style, ...rest },
  ref,
) {
  const nodeRef = useRef<HTMLElement>(null);
  const setRef = useMergedRef<HTMLElement>(nodeRef, ref);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // The stylesheet only hides .hui-reveal blocks when <html> has .hui-js.
    document.documentElement.classList.add("hui-js");
    const node = nodeRef.current;
    if (!node) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return h(as, {
    ...rest,
    ref: setRef,
    className: cx("hui-reveal", shown && "is-in", className),
    style: withVars(style, { "--hui-i": index }),
  });
});

export type ThemeName = "light" | "dark";
export type ThemeMode = ThemeName | "auto";

const THEME_KEY = "happyui-theme";

function savedTheme(): ThemeName | null {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function systemPrefersDark(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(mode: ThemeMode): ThemeName {
  const actual: ThemeName = mode === "auto" ? (systemPrefersDark() ? "dark" : "light") : mode;
  document.documentElement.setAttribute("data-theme", actual);
  return actual;
}

function setTheme(mode: ThemeMode): ThemeName {
  try {
    if (mode === "auto") window.localStorage.removeItem(THEME_KEY);
    else window.localStorage.setItem(THEME_KEY, mode);
  } catch {
    // Storage can be blocked. The theme still changes for this visit.
  }
  return applyTheme(mode);
}

function currentTheme(): ThemeName {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function subscribeTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const media = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  const onSystemChange = () => {
    if (!savedTheme()) applyTheme("auto");
  };
  media?.addEventListener("change", onSystemChange);
  return () => {
    observer.disconnect();
    media?.removeEventListener("change", onSystemChange);
  };
}

/**
 * The theme of the page. It lives in the data-theme attribute of <html> and
 * in localStorage under "happyui-theme" (the same as the vanilla happyui.js).
 * The server always renders "light"; the real value arrives after hydration.
 * To avoid a flash, set data-theme in a tiny script in <head> (see the README).
 */
export function useTheme(): {
  theme: ThemeName;
  isDark: boolean;
  /** "light", "dark", or "auto" to forget the choice and follow the system. */
  setTheme: (mode: ThemeMode) => ThemeName;
  toggleTheme: () => ThemeName;
} {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "light" as ThemeName);

  // Same start as happyui.js: a saved choice wins, otherwise follow the page or the system.
  useEffect(() => {
    const saved = savedTheme();
    const root = document.documentElement;
    if (saved) {
      if (root.getAttribute("data-theme") !== saved) applyTheme(saved);
    } else if (!root.hasAttribute("data-theme")) {
      applyTheme("auto");
    }
  }, []);

  const toggleTheme = useCallback(() => setTheme(currentTheme() === "dark" ? "light" : "dark"), []);
  return { theme, isDark: theme === "dark", setTheme, toggleTheme };
}

export interface ThemeToggleProps extends Omit<ButtonProps, "children" | "iconOnly"> {
  /** Shown in the light theme (the "go dark" icon). A moon by default. */
  lightIcon?: ReactNode;
  /** Shown in the dark theme (the "go light" icon). A sun by default. */
  darkIcon?: ReactNode;
}

/** A small icon button that switches between the light and dark themes. */
export const ThemeToggle = forwardRef<HTMLButtonElement | HTMLAnchorElement, ThemeToggleProps>(function ThemeToggle(
  { lightIcon, darkIcon, size = "sm", onClick, ...rest },
  ref,
) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Button
      ref={ref}
      size={size}
      iconOnly
      aria-label="Switch light or dark theme"
      aria-pressed={isDark}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggleTheme();
      }}
    >
      {has(lightIcon) ? (
        withClass(lightIcon, "hui-only-light")
      ) : (
        <Icon size="sm" className="hui-only-light">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </Icon>
      )}
      {has(darkIcon) ? (
        withClass(darkIcon, "hui-only-dark")
      ) : (
        <Icon size="sm" className="hui-only-dark">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
        </Icon>
      )}
    </Button>
  );
});
