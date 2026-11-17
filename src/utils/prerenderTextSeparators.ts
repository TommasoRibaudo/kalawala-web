/**
 * Keeps adjacent text nodes apart in react-snap's snapshot.
 *
 * JSX like `{title} {highlight}`, `<Icon /> {guests}` or `Price: {amount}`
 * renders as several sibling text nodes. A real browser keeps them separate in
 * the live DOM, but serialising that DOM to HTML (which is what react-snap
 * saves) glues them into one: " " + "2" is saved as " 2". On load, hydration
 * expects the " " node, finds " 2", throws React error #418 and then #423 —
 * and re-renders the entire root on the client, throwing away the
 * pre-rendered page. Found 2026-11-17 via the weekly health check: the home
 * hero's guest counter was the first of many such spots, on every page.
 *
 * React's own server renderer solves exactly this by writing an empty comment
 * (`<!-- -->`) between adjacent text nodes; hydration skips plain comments, so
 * the boundaries survive the round-trip. This does the same, right before
 * react-snap takes the snapshot: react-snap calls `window.snapSaveState()`
 * immediately before saving each page (node_modules/react-snap/index.js).
 *
 * Only runs under react-snap (see isPrerender.ts); real visitors never touch it.
 * The comments are left in the hydrated DOM afterwards, as with real SSR.
 */
export function insertTextSeparators(root: Node): number {
  let inserted = 0;
  const walk = (parent: Node) => {
    let prev: ChildNode | null = null;
    // Snapshot the list first: inserting while iterating a live NodeList skips nodes.
    for (const child of Array.from(parent.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE && prev && prev.nodeType === Node.TEXT_NODE) {
        parent.insertBefore(document.createComment(' '), child);
        inserted++;
      }
      if (child.nodeType === Node.ELEMENT_NODE) walk(child);
      prev = child;
    }
  };
  walk(root);
  return inserted;
}

type SnapWindow = Window & { snapSaveState?: () => Record<string, unknown> };

/** Registers the react-snap pre-snapshot hook. Call only when isPrerender(). */
export function registerSnapshotTextSeparators(root: HTMLElement): void {
  (window as SnapWindow).snapSaveState = () => {
    insertTextSeparators(root);
    // Nothing to persist: an empty object tells react-snap not to emit a state script.
    return {};
  };
}
