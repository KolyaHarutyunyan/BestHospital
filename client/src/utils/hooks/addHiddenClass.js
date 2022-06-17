export function addHiddenClass(className = "", isHidden = false) {
   return `${className} ${isHidden ? "hidden" : ""}`;
}
