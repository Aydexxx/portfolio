"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";
import type { ComponentProps, ElementType } from "react";

/**
 * Shared easing — a confident, slightly cinematic ease-out.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Pre-created motion components, defined once at module scope. Creating motion
 * components during render would reset their state each pass, so the `as` prop
 * is restricted to this static set of semantic tags.
 */
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  ul: motion.ul,
  li: motion.li,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
} as const;

export type MotionTag = keyof typeof MOTION_TAGS;

/* ---------------------------------------------------------------------------
   Stagger: a container that orchestrates the entrance of its children.
   Used for page-load orchestration (hero) and grouped reveals.
--------------------------------------------------------------------------- */
type StaggerProps = ComponentProps<typeof motion.div> & {
  as?: MotionTag;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Seconds before the first child begins. */
  delay?: number;
  /** Trigger on scroll-into-view instead of immediately on mount. */
  inView?: boolean;
};

export function Stagger({
  children,
  as = "div",
  stagger = 0.09,
  delay = 0.1,
  inView = false,
  ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  // Cast to ElementType: the map's union of motion components widens props
  // incompatibly, but every entry accepts the motion props we pass.
  const Tag = MOTION_TAGS[as] as ElementType;

  // `whileInView` on this node only flips *its own* variant — Framer Motion's
  // context propagation to children only reads `animate`, not `whileInView`,
  // so nested <FadeIn> children never receive a "show" target and render
  // statically visible with no animation. useInView + a real `animate` string
  // keeps the same propagation path the non-inView case already relies on.
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  const variants: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? {}
        : { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const animate = inView ? (isInView ? "show" : "hidden") : "show";

  return (
    <Tag ref={ref} initial="hidden" animate={animate} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   FadeIn: a single child element. Inherits orchestration from a parent
   <Stagger>, or animates on its own if used standalone.
--------------------------------------------------------------------------- */
type FadeInProps = ComponentProps<typeof motion.div> & {
  as?: MotionTag;
  /** Travel distance in px for the slide. */
  y?: number;
};

export function FadeIn({ children, as = "div", y = 16, ...rest }: FadeInProps) {
  const reduce = useReducedMotion();
  // Cast to ElementType: the map's union of motion components widens props
  // incompatibly, but every entry accepts the motion props we pass.
  const Tag = MOTION_TAGS[as] as ElementType;

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.55, ease: EASE },
    },
  };

  return (
    <Tag variants={variants} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   Reveal: self-contained scroll-triggered reveal for sections built later.
--------------------------------------------------------------------------- */
type RevealProps = FadeInProps & { delay?: number };

export function Reveal({
  children,
  as = "div",
  y = 24,
  delay = 0,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  // Cast to ElementType: the map's union of motion components widens props
  // incompatibly, but every entry accepts the motion props we pass.
  const Tag = MOTION_TAGS[as] as ElementType;

  return (
    <Tag
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
