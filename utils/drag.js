let draggedItem = null;

function dragstart(event) {
  console.log("dragstart");

  draggedItem = this; // 保存被拖拽的元素
  // setTimeout(() => (this.style.display = "none"), 0);
}

function dragend() {
  setTimeout(() => {
    draggedItem = null;
  }, 0);
}

function dragover(event) {
  event.preventDefault();
  this.classList.add("drag-over");
}

function dragleave() {
  this.classList.remove("drag-over");
}

function drop(event) {
  event.preventDefault();
  this.classList.remove("drag-over");

  const list = $(".block").parent();

  if (draggedItem !== this) {
    if (
      Array.from(list.children).indexOf(draggedItem) <
      Array.from(list.children).indexOf(this)
    ) {
      // 如果拖拽目标在目标元素之后，将其插入到目标元素之后
      $(this).after($(draggedItem));
    } else {
      // 如果拖拽目标在目标元素之前，将其插入到目标元素之前
      $(this).before($(draggedItem));

      $('.block[contenteditable="true"]').first().trigger("input");
    }
  }
}
