"use client";

import { useSyncExternalStore } from "react";

export type TrayLine = {
  name: string;
  price: number;
  qty: number;
  category: string;
  categoryId: string;
  accent: string;
};

export type TrayItem = Omit<TrayLine, "qty">;

const KEY = "chillcafe.tray.v1";
const MAX_QTY = 30;
const EMPTY: TrayLine[] = [];

let lines: TrayLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function commit(next: TrayLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* private mode / quota — the tray just won't persist */
  }
  emit();
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    lines = parsed.filter(
      (l): l is TrayLine =>
        !!l &&
        typeof l.name === "string" &&
        typeof l.price === "number" &&
        typeof l.qty === "number" &&
        l.qty > 0
    );
  } catch {
    lines = EMPTY;
  }
}

export const tray = {
  subscribe(listener: () => void) {
    if (!hydrated) {
      hydrate();
      if (lines !== EMPTY) queueMicrotask(emit);
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  snapshot: () => lines,
  serverSnapshot: () => EMPTY,

  add(item: TrayItem, qty = 1) {
    const existing = lines.find((l) => l.name === item.name);
    if (existing) {
      tray.setQty(item.name, existing.qty + qty);
      return;
    }
    commit([...lines, { ...item, qty: Math.min(qty, MAX_QTY) }]);
  },

  addMany(items: (TrayItem & { qty: number })[]) {
    let next = [...lines];
    for (const item of items) {
      const i = next.findIndex((l) => l.name === item.name);
      if (i >= 0) {
        next[i] = { ...next[i], qty: Math.min(next[i].qty + item.qty, MAX_QTY) };
      } else {
        next = [...next, { ...item, qty: Math.min(item.qty, MAX_QTY) }];
      }
    }
    commit(next);
  },

  setQty(name: string, qty: number) {
    const clamped = Math.min(Math.max(qty, 0), MAX_QTY);
    commit(
      clamped === 0
        ? lines.filter((l) => l.name !== name)
        : lines.map((l) => (l.name === name ? { ...l, qty: clamped } : l))
    );
  },

  remove(name: string) {
    commit(lines.filter((l) => l.name !== name));
  },

  clear() {
    commit(EMPTY);
  },
};

export function useTray() {
  const items = useSyncExternalStore(tray.subscribe, tray.snapshot, tray.serverSnapshot);
  const count = items.reduce((n, l) => n + l.qty, 0);
  const total = items.reduce((n, l) => n + l.qty * l.price, 0);
  return { items, count, total };
}

let panelOpen = false;
const panelListeners = new Set<() => void>();

export const trayPanel = {
  subscribe(listener: () => void) {
    panelListeners.add(listener);
    return () => panelListeners.delete(listener);
  },
  snapshot: () => panelOpen,
  serverSnapshot: () => false,
  set(next: boolean) {
    if (panelOpen === next) return;
    panelOpen = next;
    panelListeners.forEach((l) => l());
  },
};

export function useTrayPanel() {
  return useSyncExternalStore(
    trayPanel.subscribe,
    trayPanel.snapshot,
    trayPanel.serverSnapshot
  );
}

export function useTrayQty(name: string) {
  const items = useSyncExternalStore(tray.subscribe, tray.snapshot, tray.serverSnapshot);
  return items.find((l) => l.name === name)?.qty ?? 0;
}
