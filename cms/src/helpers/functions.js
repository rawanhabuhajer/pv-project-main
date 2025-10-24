export const handleImage = (image) => {
  if (image) {
    if (!image.startsWith("/")) image = `/${image}`;
    return `${process.env.REACT_APP_API_URL}${image}`;
  }
  return "https://picsum.photos/seed/picsum/200/300";
};

export const checkIfUserHasPermission = (
  userPermissions = [],
  testedPermission
) => {
  if (userPermissions.length === 0) return false;
  const hasPermission = userPermissions.includes(testedPermission);
  return hasPermission;
};

export const handleSearchParamsChange = (search, params) => {
  const url = new URLSearchParams("");
  search = { ...search, ...params };
  Object.entries(search).map(([key, value]) => {
    return url.set(key, value);
  });
  return "?" + url;
};

export const themeSwitcherFunction = () => {
  document.querySelector(".themetoggle").classList.toggle("fire");
  document.querySelector("body").classList.toggle("dark");
};

export const sidebarToggleFunction = () => {
  document.querySelector("body").classList.remove("sidebarToggled");
  document.querySelector(".overlay-s").classList.remove("fire");
  document.querySelector("html").classList.remove("offScroll");
};

export const getFullDate = (date, locale) => {
  if (!date) return;
  return new Date(date).toLocaleString(locale === "ar" ? "ar-EG" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true,
  });
};
