const dialogTriggers = document.querySelectorAll("[data-dialog-target]");

dialogTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const dialogId = trigger.dataset.dialogTarget;
    const dialog = document.getElementById(dialogId);

    if (dialog) {
      dialog.showModal();
    }
  });
});