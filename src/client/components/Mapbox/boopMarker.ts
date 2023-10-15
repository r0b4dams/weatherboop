const template = document.getElementById("marker-template") as HTMLTemplateElement;

export const boopMarker = document.importNode(
  template.content.firstElementChild as HTMLElement,
  true,
);
