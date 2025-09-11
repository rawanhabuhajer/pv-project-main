// get the numeric date
export const getFullDate = (date, locale) => {
  if (!date) return;
  return new Date(date).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
};
//handle the image link if it is not a full link then add the base url
export const handleImageLink = (image) => {
  if (image?.includes("http")) {
    return image;
  } else {
    // eslint-disable-next-line no-undef
    return `${process.env.NEXT_PUBLIC_MAIN_URL}/${image}`;
  }
};

// handle if url starts with http or https or www or not
export const handleUrl = (url) => {
  if (url?.includes("http") || url?.includes("https")) {
    return url;
  } else if (url?.includes("www")) {
    return `https://${url}`;
  } else {
    return `https://${url}`;
  }
};

// filter the response depend on the slug
export const getSectionData = (data, slug) => {
  return data?.find((obj) => obj.slug === slug);
};

export const numberWithCommas = (number) => {
  // Convert the number to a string
  const numberString = number?.toString();

  // Use regular expression to add commas every three digits
  return numberString?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// convert numbers from kb to readable format
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
