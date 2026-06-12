export function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

export function copyWithToast(text, message) {
  navigator.clipboard
    .writeText(text)
    .then(() => showToast(message))
    .catch(() => {});
}
