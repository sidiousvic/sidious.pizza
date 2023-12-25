import { Try } from "./dontpanic.ts";

export const removeClassContaining = (type?: string) =>
  [...document.documentElement.classList].map(
    (c) =>
      c.includes(type as string) &&
      document.documentElement.classList.remove(c),
  );

export const removeStoredItem = (type?: string) =>
  localStorage.removeItem(type as string);

export const getStoredItem = (type: string) => localStorage.getItem(type);

export const getMouseEventTarget = (event: MouseEvent) =>
  Try(event.target)(`${event.type} event had no target.`);

export const getElementDataset = (element: HTMLElement) =>
  Try(element.dataset)(`Element ${element.tagName} had no dataset.`);

export const getMouseEventTargetDataset = (event: MouseEvent) =>
  getElementDataset(getMouseEventTarget(event) as HTMLElement);

export const getClickedElementDatasetKey =
  (event: MouseEvent) => (key: string) =>
    Try(getMouseEventTargetDataset(event)[key])(`Dataset ${key} not found.`);

export const getElementById = (id: string) =>
  Try(document.getElementById(id))(`ID ${id} not found.`);

export const getElement = (selector: string) =>
  Try(document.querySelector(selector))(`Selector ${selector} not found.`);

export const addEventListenerToClass =
  (eventType: string) =>
  (selector: string) =>
  (listener: EventListenerOrEventListenerObject) =>
    [...document.querySelectorAll(selector)].map((element) =>
      element.addEventListener(eventType, listener)
    );
