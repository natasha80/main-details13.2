export const fetchRequest = async (id = 0) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}${id ? `/${id}` : ""}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};