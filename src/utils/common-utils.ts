export const formatPrice = (value: number, locale: string = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2, // Number of decimal places
  }).format(value);
};

export const convertFileToBase64 = async (file: File): Promise<string> => {
  if (file) {
    try {
      const reader = new FileReader();
      const result = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      return result;
    } catch (error) {
      return "";
    }
  } else {
    return "";
  }
};

export const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
