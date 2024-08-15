document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    input: document.getElementById("encryptor-input"),
    validationMessage: document.getElementById("input-validation-message"),
    encryptButton: document.getElementById("btn-encrypt"),
    decryptButton: document.getElementById("btn-decrypt"),
    resultContainer: document.getElementById("encryption-result"),
  };

  const handleAction = (action) => {
    const text = elements.input.value;

    if (!isTextValid(text)) {
      triggerShakeAnimation(elements.validationMessage);
      return;
    }

    elements.input.value = "";

    const resultText =
      action === "encrypt" ? encryptText(text) : decryptText(text);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

    showResult(resultText);
  };

  const showResult = (resultText) => {
    elements.resultContainer.classList.remove("no-results");
    elements.resultContainer.classList.add("results-shown");
    elements.resultContainer.innerHTML = `
        <p id='encrypted-text-result'>${resultText}</p>
        <button id='btn-copy-text-result' class='btn btn--light-blue'>Copy</button>
      `;

    setupCopyButton();
  };

  const setupCopyButton = () => {
    const encryptedTextResult = document.getElementById(
      "encrypted-text-result"
    );
    const btnCopyTextResult = document.getElementById("btn-copy-text-result");

    btnCopyTextResult.addEventListener("click", () => {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.selectAllChildren(encryptedTextResult);

      navigator.clipboard.writeText(encryptedTextResult.textContent);
    });
  };

  const triggerShakeAnimation = (element) => {
    element.classList.add("shake-effect");
    element.style.color = "red";

    element.addEventListener(
      "animationend",
      () => {
        element.classList.remove("shake-effect");
        element.style.color = "";
      },
      { once: true }
    );
  };

  elements.encryptButton.addEventListener("click", () =>
    handleAction("encrypt")
  );
  elements.decryptButton.addEventListener("click", () =>
    handleAction("decrypt")
  );
});

const inputValidatorRegex = /^[a-z\s]+$/;
const encryptionKeys = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

function isTextValid(text) {
  return inputValidatorRegex.test(text);
}

function encryptText(text) {
  return text
    .split("")
    .map((letter) => encryptionKeys[letter] || letter)
    .join("");
}

function decryptText(text) {
  return Object.entries(encryptionKeys).reduce(
    (textCopy, [key, value]) => textCopy.replaceAll(value, key),
    text
  );
}
