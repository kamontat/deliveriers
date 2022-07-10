import { goto as _goto } from "$app/navigation";

interface GotoOptions {
  path: string;
  templateData?: Record<string, string>;
  query?: URLSearchParams;
}

const parseTemplate = (template: string, data?: Record<string, string>): string => {
  if (!data) return template;

  return Object.keys(data).reduce((acc, key) => {
    return acc.replace(new RegExp(`{${key}}`, "g"), data[key]);
  }, template);
};

export const goto = ({ path, templateData, query }: GotoOptions) => {
  const _path = parseTemplate(path, templateData);
  const __path = query ? _path + "?" + query.toString() : _path;
  return _goto(__path);
};
